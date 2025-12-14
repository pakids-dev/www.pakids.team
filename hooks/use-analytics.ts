"use client";

import { useCallback, useEffect, useRef } from "react";

type PushEventPayload = Record<string, unknown>;

function pushToDataLayer(eventName: string, payload: PushEventPayload = {}) {
  if (typeof window === "undefined") return;
  const dataLayer = (window as { dataLayer?: unknown[] }).dataLayer ?? [];
  dataLayer.push({ event: eventName, ...payload });
  (window as { dataLayer: unknown[] }).dataLayer = dataLayer;
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

  useEffect(() => {
    const channel = getChannel();
    channelRef.current = channel;
    pushToDataLayer("page_view_with_channel", {
      channel,
      page_path: pagePath,
    });
  }, [pagePath]);

  const trackSectionView = useCallback((sectionName?: string) => {
    const name = sectionName?.trim() || "unknown";
    if (viewedSectionsRef.current.has(name)) return;
    viewedSectionsRef.current.add(name);
    pushToDataLayer("section_view", {
      section_name: name,
      channel: channelRef.current,
    });
  }, []);

  const trackCtaClick = useCallback(
    (ctaType: string, sectionName?: string) => {
      const name = sectionName?.trim() || "unknown";
      pushToDataLayer("cta_click", {
        cta_type: ctaType,
        section_name: name,
        channel: channelRef.current,
      });
    },
    []
  );

  return {
    channel: channelRef.current,
    trackSectionView,
    trackCtaClick,
  };
}

