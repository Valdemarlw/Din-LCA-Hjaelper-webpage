import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  ANALYTICS_CONSENT_EVENT,
  capturePageView,
  initAnalytics,
  readAnalyticsConsent,
  trackAnalyticsEvent,
} from "../../lib/analytics";

function placementFor(anchor: HTMLAnchorElement): string {
  if (anchor.dataset.analyticsLocation) return anchor.dataset.analyticsLocation;
  if (anchor.closest("footer")) return "footer";
  if (anchor.closest("nav")) return "navigation";
  return "indhold";
}

export function AnalyticsController() {
  const location = useLocation();

  useEffect(() => {
    if (readAnalyticsConsent() === "granted") {
      initAnalytics();
      capturePageView();
    }
  }, [location.pathname, location.search]);

  useEffect(() => {
    const handleConsent = () => capturePageView();
    const handleClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest("a");
      if (!(anchor instanceof HTMLAnchorElement)) return;

      const common = {
        fra_side: window.location.pathname,
        placering: placementFor(anchor),
      };

      if (anchor.href.startsWith("tel:")) {
        trackAnalyticsEvent("kontakt_telefon_klik", common);
      } else if (anchor.href.startsWith("mailto:")) {
        trackAnalyticsEvent("kontakt_email_klik", common);
      } else if (new URL(anchor.href, window.location.href).pathname === "/kontakt") {
        trackAnalyticsEvent("kontakt_cta_klik", common);
      }
    };

    window.addEventListener(ANALYTICS_CONSENT_EVENT, handleConsent);
    document.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener(ANALYTICS_CONSENT_EVENT, handleConsent);
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return null;
}
