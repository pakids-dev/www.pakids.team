"use server";

import { BetaAnalyticsDataClient } from "@google-analytics/data";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

type DateRangeKey = "today" | "7d" | "30d";

const SESSION_COOKIE = "admin_session";
const EVENT_NAME = "page_view_with_channel";

async function ensureAuth() {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE)?.value;
    return token === "ok";
}

function resolveDateRange(range: DateRangeKey | string) {
    if (range === "today") {
        return { startDate: "today", endDate: "today" };
    }
    if (range === "30d") {
        return { startDate: "30daysAgo", endDate: "today" };
    }
    return { startDate: "7daysAgo", endDate: "today" };
}

function getAnalyticsClient() {
    const rawKey = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
    const propertyId = process.env.GA4_PROPERTY_ID;

    if (!rawKey || !propertyId) {
        throw new Error("GOOGLE_SERVICE_ACCOUNT_KEY 또는 GA4_PROPERTY_ID가 설정되지 않았습니다.");
    }

    let credentials: Record<string, string>;
    try {
        // Base64로 인코딩된 경우 디코딩 시도
        let keyString = rawKey;
        try {
            const decoded = Buffer.from(rawKey, "base64").toString("utf-8");
            if (decoded.startsWith("{")) {
                keyString = decoded;
            }
        } catch {
            // Base64가 아니면 원본 사용
        }
        credentials = JSON.parse(keyString);
    } catch (error) {
        const message = error instanceof Error ? error.message : "알 수 없는 오류";
        throw new Error(`GOOGLE_SERVICE_ACCOUNT_KEY 파싱 실패: ${message}`);
    }

    if (typeof credentials.private_key === "string") {
        credentials.private_key = credentials.private_key.replace(/\\n/g, "\n");
    }

    const client = new BetaAnalyticsDataClient({
        credentials,
    });

    return { client, propertyId };
}

export async function GET(request: NextRequest) {
    if (!(await ensureAuth())) {
        return NextResponse.json({ error: "인증이 필요합니다." }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const range = (searchParams.get("range") as DateRangeKey | null) ?? "7d";
    const { startDate, endDate } = resolveDateRange(range);

    let client: BetaAnalyticsDataClient;
    let propertyId: string;

    try {
        const context = getAnalyticsClient();
        client = context.client;
        propertyId = context.propertyId;
    } catch (error) {
        const message = error instanceof Error ? error.message : "알 수 없는 오류";
        return NextResponse.json({ error: message }, { status: 500 });
    }

    try {
        // 기본 페이지뷰 데이터 조회
        const [report] = await client.runReport({
            property: `properties/${propertyId}`,
            dateRanges: [{ startDate, endDate }],
            dimensions: [{ name: "pagePath" }],
            metrics: [{ name: "screenPageViews" }],
            orderBys: [
                {
                    metric: { metricName: "screenPageViews" },
                    desc: true,
                },
            ],
            limit: 20,
        });

        const rows =
            report.rows?.map((row) => {
                const channel = row.dimensionValues?.[0]?.value || "unknown";
                const count = Number(row.metricValues?.[0]?.value ?? "0") || 0;
                return { channel, count };
            }) ?? [];

        const total = rows.reduce((sum, row) => sum + row.count, 0);

        return NextResponse.json({
            range,
            startDate,
            endDate,
            total,
            rows,
        });
    } catch (error) {
        const message =
            error instanceof Error ? error.message : "GA4 데이터 조회 중 오류가 발생했습니다.";
        console.error(error);
        return NextResponse.json({ error: message }, { status: 500 });
    }
}


