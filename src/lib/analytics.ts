import type posthog from "posthog-js";

export const ANALYTICS_CONSENT_KEY = "dlh_analytics_consent";
export const ANALYTICS_CONSENT_EVENT = "dlh:analytics-consent";
export const ANALYTICS_SETTINGS_EVENT = "dlh:analytics-settings";

const POSTHOG_PUBLIC_KEY = "phc_BAQKbzS6sCxTYUfRoZqp5aykwEySuVW9GGSHUaQVLL4X";
const POSTHOG_API_HOST = "https://eu.i.posthog.com";
const ALLOWED_UTM_PARAMETERS = new Set([
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
]);
const URL_PROPERTY_KEYS = [
  "$current_url",
  "$referrer",
  "$initial_current_url",
  "$initial_referrer",
] as const;

const ALLOWED_PROPERTY_KEYS = new Set([
  "side",
  "fra_side",
  "placering",
  "bygningstype",
  "byggeri",
  "status",
  "projekttype",
]);

export type AnalyticsConsent = "granted" | "denied";
export type AnalyticsEvent =
  | "kontakt_cta_klik"
  | "kontakt_email_klik"
  | "kontakt_formular_sendt"
  | "kontakt_formular_startet"
  | "kontakt_telefon_klik"
  | "br18_tjekker_brugt";

type PostHogClient = typeof posthog;

let clientPromise: Promise<PostHogClient> | null = null;
let lastPageView: { url: string; at: number } | null = null;

export function readAnalyticsConsent(
  storage: Pick<Storage, "getItem"> | undefined = typeof window === "undefined"
    ? undefined
    : window.localStorage
): AnalyticsConsent | null {
  const value = storage?.getItem(ANALYTICS_CONSENT_KEY);
  return value === "granted" || value === "denied" ? value : null;
}

export function sanitizeAnalyticsProperties(
  properties: Record<string, string | number | boolean | undefined>
): Record<string, string | number | boolean> {
  return Object.fromEntries(
    Object.entries(properties).filter(
      ([key, value]) => ALLOWED_PROPERTY_KEYS.has(key) && value !== undefined
    )
  ) as Record<string, string | number | boolean>;
}

export function sanitizeAnalyticsUrl(rawUrl: string): string {
  try {
    const url = new URL(rawUrl, "https://xn--dinlcahjlper-edb.dk");
    for (const key of [...url.searchParams.keys()]) {
      if (!ALLOWED_UTM_PARAMETERS.has(key)) url.searchParams.delete(key);
    }
    url.hash = "";
    return url.toString();
  } catch {
    return "";
  }
}

function analyticsClient(): Promise<PostHogClient> | null {
  if (typeof window === "undefined" || readAnalyticsConsent() !== "granted") return null;

  clientPromise ??= import("posthog-js").then(({ default: client }) => {
    client.init(POSTHOG_PUBLIC_KEY, {
      api_host: POSTHOG_API_HOST,
      autocapture: false,
      capture_pageview: false,
      capture_pageleave: false,
      capture_exceptions: false,
      cookieless_mode: "always",
      disable_session_recording: true,
      disable_conversations: true,
      disable_product_tours: true,
      disable_surveys: true,
      advanced_disable_feature_flags: true,
      person_profiles: "never",
      persistence: "memory",
      before_send: (event) => {
        if (!event) return event;
        const properties = { ...event.properties };
        for (const key of URL_PROPERTY_KEYS) {
          const value = properties[key];
          if (typeof value === "string") properties[key] = sanitizeAnalyticsUrl(value);
        }
        return { ...event, properties };
      },
    });
    return client;
  });
  return clientPromise;
}

export function initAnalytics(): void {
  void analyticsClient();
}

export function setAnalyticsConsent(consent: AnalyticsConsent): void {
  if (typeof window === "undefined") return;

  const analyticsWasLoaded = clientPromise !== null;
  window.localStorage.setItem(ANALYTICS_CONSENT_KEY, consent);
  if (consent === "granted") {
    initAnalytics();
  }

  window.dispatchEvent(new CustomEvent(ANALYTICS_CONSENT_EVENT, { detail: consent }));
  if (consent === "denied" && analyticsWasLoaded) {
    window.location.reload();
  }
}

export function capturePageView(): void {
  if (typeof window === "undefined" || readAnalyticsConsent() !== "granted") return;
  const url = `${window.location.pathname}${window.location.search}`;
  const now = Date.now();
  if (lastPageView?.url === url && now - lastPageView.at < 1000) return;

  lastPageView = { url, at: now };
  void analyticsClient()?.then((client) =>
    client.capture("$pageview", { $current_url: window.location.href })
  );
}

export function trackAnalyticsEvent(
  event: AnalyticsEvent,
  properties: Record<string, string | number | boolean | undefined> = {}
): void {
  if (typeof window === "undefined" || readAnalyticsConsent() !== "granted") return;
  void analyticsClient()?.then((client) =>
    client.capture(event, sanitizeAnalyticsProperties(properties))
  );
}
