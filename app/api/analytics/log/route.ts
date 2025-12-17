import { NextRequest, NextResponse } from "next/server";

import { getSupabaseServiceClient } from "@/lib/supabase";

type EventType = "page_view" | "section_view" | "cta_click";

type RequestBody = {
  event_type?: EventType;
  channel?: string;
  page_path?: string;
  section_name?: string;
  cta_type?: string;
  session_id?: string;
};

function getClientContext(request: NextRequest) {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || undefined;

  return {
    user_agent: request.headers.get("user-agent") ?? undefined,
    ip_address: ip,
    referrer: request.headers.get("referer") ?? request.headers.get("referrer") ?? undefined,
  };
}

export async function POST(request: NextRequest) {
  let body: RequestBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "잘못된 JSON 요청입니다." }, { status: 400 });
  }

  const { event_type, channel, page_path, section_name, cta_type, session_id } = body ?? {};
  const allowed: EventType[] = ["page_view", "section_view", "cta_click"];

  if (!event_type || !allowed.includes(event_type)) {
    return NextResponse.json({ error: "허용되지 않은 event_type 입니다." }, { status: 400 });
  }

  const supabase = getSupabaseServiceClient();
  const context = getClientContext(request);

  const { error } = await supabase.from("analytics_events").insert({
    event_type,
    channel,
    page_path,
    section_name,
    cta_type,
    session_id,
    ...context,
  });

  if (error) {
    console.error("[analytics/log] Supabase insert 실패:", error.message);
    return NextResponse.json({ error: "Supabase 저장 실패" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

