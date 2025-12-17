"use server";

import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { getSupabaseServiceClient } from "@/lib/supabase";

type DateRangeKey = "today" | "7d" | "30d";

type SessionSetMap = Map<string, Set<string>>;
type CountMap = Map<string, number>;
type NestedCountMap = Map<string, Map<string, number>>;

const SESSION_COOKIE = "admin_session";

async function ensureAuth() {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE)?.value;
    return token === "ok";
}

function formatDate(date: Date) {
    return date.toISOString().slice(0, 10);
}

function resolveDateRange(range: DateRangeKey | string) {
    const end = new Date();
    end.setHours(23, 59, 59, 999);

    const start = new Date(end);
    start.setHours(0, 0, 0, 0);

    if (range === "today") {
        // same day
    } else if (range === "30d") {
        start.setDate(start.getDate() - 29);
    } else {
        // default 7d
        start.setDate(start.getDate() - 6);
    }

    return {
        queryStart: start.toISOString(),
        queryEnd: end.toISOString(),
        displayStart: formatDate(start),
        displayEnd: formatDate(end),
    };
}

function addSession(sessionMap: SessionSetMap, channel: string, sessionId?: string | null) {
    if (!sessionId) return;
    const next = sessionMap.get(channel) ?? new Set<string>();
    next.add(sessionId);
    sessionMap.set(channel, next);
}

function increment(countMap: CountMap, key: string) {
    countMap.set(key, (countMap.get(key) ?? 0) + 1);
}

function incrementNested(map: NestedCountMap, key: string, nestedKey: string) {
    const nested = map.get(key) ?? new Map<string, number>();
    nested.set(nestedKey, (nested.get(nestedKey) ?? 0) + 1);
    map.set(key, nested);
}

export async function GET(request: NextRequest) {
    if (!(await ensureAuth())) {
        return NextResponse.json({ error: "인증이 필요합니다." }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const range = (searchParams.get("range") as DateRangeKey | null) ?? "7d";
    const { queryStart, queryEnd, displayStart, displayEnd } = resolveDateRange(range);

    const supabase = getSupabaseServiceClient();

    try {
        const [pageRes, sectionRes, ctaRes] = await Promise.all([
            supabase
                .from("analytics_events")
                .select("channel, session_id")
                .eq("event_type", "page_view")
                .gte("created_at", queryStart)
                .lte("created_at", queryEnd),
            supabase
                .from("analytics_events")
                .select("channel, session_id")
                .eq("event_type", "section_view")
                .gte("created_at", queryStart)
                .lte("created_at", queryEnd),
            supabase
                .from("analytics_events")
                .select("channel, session_id, cta_type")
                .eq("event_type", "cta_click")
                .gte("created_at", queryStart)
                .lte("created_at", queryEnd),
        ]);

        if (pageRes.error) throw new Error(pageRes.error.message);
        if (sectionRes.error) throw new Error(sectionRes.error.message);
        if (ctaRes.error) throw new Error(ctaRes.error.message);

        const sessionMap: SessionSetMap = new Map();
        const pageCounts: CountMap = new Map();
        const sectionCounts: CountMap = new Map();
        const ctaCounts: NestedCountMap = new Map();

        for (const row of pageRes.data ?? []) {
            const channel = row.channel || "unknown";
            increment(pageCounts, channel);
            addSession(sessionMap, channel, row.session_id);
        }

        for (const row of sectionRes.data ?? []) {
            const channel = row.channel || "unknown";
            increment(sectionCounts, channel);
            addSession(sessionMap, channel, row.session_id);
        }

        for (const row of ctaRes.data ?? []) {
            const channel = row.channel || "unknown";
            const type = row.cta_type || "unknown";
            incrementNested(ctaCounts, channel, type);
            addSession(sessionMap, channel, row.session_id);
        }

        const channels = new Set<string>([
            ...pageCounts.keys(),
            ...sectionCounts.keys(),
            ...ctaCounts.keys(),
            ...sessionMap.keys(),
        ]);

        const rows = Array.from(channels).map((channel) => ({
            channel,
            count: pageCounts.get(channel) ?? 0,
        }));
        rows.sort((a, b) => b.count - a.count);

        const total = rows.reduce((sum, row) => sum + row.count, 0);

        const sessionStats = Array.from(channels).map((channel) => ({
            channel,
            sessions: sessionMap.get(channel)?.size ?? 0,
        }));
        sessionStats.sort((a, b) => b.sessions - a.sessions);

        const sectionAverages = Array.from(channels).map((channel) => {
            const totalSections = sectionCounts.get(channel) ?? 0;
            const sessions = sessionMap.get(channel)?.size ?? 0;
            const avgPerSession = sessions > 0 ? totalSections / sessions : 0;
            return { channel, avgPerSession, totalSections };
        });
        sectionAverages.sort((a, b) => b.avgPerSession - a.avgPerSession);

        const ctaTypeAverages = Array.from(channels).map((channel) => {
            const sessions = sessionMap.get(channel)?.size ?? 0;
            const typeMap = ctaCounts.get(channel) ?? new Map<string, number>();
            const items = Array.from(typeMap.entries()).map(([ctaType, count]) => ({
                ctaType,
                avgPerSession: sessions > 0 ? count / sessions : 0,
                total: count,
            }));
            items.sort((a, b) => b.avgPerSession - a.avgPerSession);
            return { channel, items, sessions };
        });

        return NextResponse.json({
            range,
            startDate: displayStart,
            endDate: displayEnd,
            total,
            rows,
            sessionStats,
            sectionAverages,
            ctaTypeAverages,
        });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Supabase 조회 중 오류가 발생했습니다.";
        console.error("[admin/analytics] error", error);
        return NextResponse.json({ error: message }, { status: 500 });
    }
}


