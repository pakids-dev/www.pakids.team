"use client";

import { useCallback, useEffect, useRef } from "react";

type PushEventPayload = Record<string, unknown>;

const LOG_ENDPOINT = "/api/analytics/log";

const SESSION_ID_KEY = "pakids_session_id";
const SESSION_TS_KEY = "pakids_session_ts";
const SESSION_TIMEOUT_MS = 30 * 60 * 1000; // 30분

function pushToDataLayer(eventName: string, payload: PushEventPayload = {}) {
  if (typeof window === "undefined") return;
  const win = window as unknown as { dataLayer?: unknown[] };
  const dataLayer = win.dataLayer ?? [];
  dataLayer.push({ event: eventName, ...payload });
  win.dataLayer = dataLayer;
}

function safeNow() {
  return Date.now();
}

function generateId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `sess_${safeNow()}_${Math.random().toString(16).slice(2)}`;
}

type SessionInfo = { sessionId: string; lastActive: number } | null;

function getOrCreateSession(): SessionInfo {
  if (typeof window === "undefined") return null;
  try {
    const rawId = window.localStorage.getItem(SESSION_ID_KEY) || undefined;
    const rawTs = window.localStorage.getItem(SESSION_TS_KEY) || undefined;
    const lastActive = rawTs ? Number(rawTs) : 0;
    const now = safeNow();
    const expired = !lastActive || now - lastActive > SESSION_TIMEOUT_MS;

    const sessionId = !rawId || expired ? generateId() : rawId;
    const nextTs = now;

    window.localStorage.setItem(SESSION_ID_KEY, sessionId);
    window.localStorage.setItem(SESSION_TS_KEY, String(nextTs));

    return { sessionId, lastActive: nextTs };
  } catch {
    return null;
  }
}

function bumpSessionActivity(sessionId: string | null) {
  if (typeof window === "undefined" || !sessionId) return;
  try {
    window.localStorage.setItem(SESSION_ID_KEY, sessionId);
    window.localStorage.setItem(SESSION_TS_KEY, String(safeNow()));
  } catch {
    // ignore
  }
}

async function logEvent(eventType: string, payload: PushEventPayload = {}) {
  if (typeof window === "undefined") return;
  const body = JSON.stringify({ event_type: eventType, ...payload });

  try {
    if (typeof navigator !== "undefined" && "sendBeacon" in navigator) {
      const blob = new Blob([body], { type: "application/json" });
      navigator.sendBeacon(LOG_ENDPOINT, blob);
      return;
    }

    await fetch(LOG_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
      keepalive: true,
    });
  } catch {
    // 네트워크 오류는 무시 (GTM 추적에 영향 없도록)
  }
}

function getChannel(): string {
  if (typeof window === "undefined") return "direct";
  const params = new URLSearchParams(window.location.search);
  const urlChannel = params.get("ch");
  const stored = window.sessionStorage.getItem("pakids_channel");

  const channel = urlChannel?.trim() || stored || "direct";
  window.sessionStorage.setItem("pakids_channel", channel);
  return channel;
}

export function useAnalytics(pagePath: string) {
  const channelRef = useRef<string>("direct");
  const viewedSectionsRef = useRef<Set<string>>(new Set());
  const sessionIdRef = useRef<string>("");

  useEffect(() => {
    const session = getOrCreateSession();
    sessionIdRef.current = session?.sessionId ?? "";
    const channel = getChannel();
    channelRef.current = channel;
    pushToDataLayer("page_view_with_channel", {
      channel,
      page_path: pagePath,
    });
    void logEvent("page_view", {
      channel,
      page_path: pagePath,
      session_id: sessionIdRef.current || undefined,
    });
    bumpSessionActivity(sessionIdRef.current || null);
  }, [pagePath]);

  const trackSectionView = useCallback(
    (sectionName?: string) => {
      const name = sectionName?.trim() || "unknown";
      if (viewedSectionsRef.current.has(name)) return;
      viewedSectionsRef.current.add(name);
      pushToDataLayer("section_view", {
        section_name: name,
        channel: channelRef.current,
      });
      void logEvent("section_view", {
        section_name: name,
        channel: channelRef.current,
        page_path: pagePath,
        session_id: sessionIdRef.current || undefined,
      });
      bumpSessionActivity(sessionIdRef.current || null);
    },
    [pagePath]
  );

  const trackCtaClick = useCallback(
    (ctaType: string, sectionName?: string) => {
      const name = sectionName?.trim() || "unknown";
      pushToDataLayer("cta_click", {
        cta_type: ctaType,
        section_name: name,
        channel: channelRef.current,
      });
      void logEvent("cta_click", {
        cta_type: ctaType,
        section_name: name,
        channel: channelRef.current,
        page_path: pagePath,
        session_id: sessionIdRef.current || undefined,
      });
      bumpSessionActivity(sessionIdRef.current || null);
    },
    [pagePath]
  );

  return {
    channel: channelRef.current,
    trackSectionView,
    trackCtaClick,
  };
}

