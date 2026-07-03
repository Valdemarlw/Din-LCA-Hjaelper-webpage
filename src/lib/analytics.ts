/**
 * Tiny typed wrapper around Plausible custom events.
 * No-ops when the script is blocked or not yet loaded (the queue stub
 * in index.html buffers early calls). Never put PII in props.
 */

type Props = Record<string, string | number | boolean>;

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Props }) => void;
  }
}

export type AnalyticsEvent =
  | "contact_form_started"
  | "contact_form_submitted"
  | "cta_clicked"
  | "outbound_contact_clicked"
  | "br18_checker_completed"
  | "price_estimate_shown"
  | "maengdeudtraek_toggled";

export function track(event: AnalyticsEvent, props?: Props) {
  if (typeof window === "undefined") return;
  window.plausible?.(event, props ? { props } : undefined);
}

/** Bucket areal so raw project sizes never leave the browser. */
export function arealBucket(m2: number): string {
  if (!Number.isFinite(m2) || m2 <= 0) return "ukendt";
  if (m2 < 100) return "under-100";
  if (m2 <= 250) return "100-250";
  if (m2 <= 1000) return "251-1000";
  return "over-1000";
}
