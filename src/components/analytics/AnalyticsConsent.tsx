import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ANALYTICS_SETTINGS_EVENT,
  readAnalyticsConsent,
  setAnalyticsConsent,
  type AnalyticsConsent as Consent,
} from "../../lib/analytics";

export function AnalyticsConsent() {
  const [choice, setChoice] = useState<Consent | null>(() => readAnalyticsConsent());
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    const openSettings = () => setSettingsOpen(true);
    window.addEventListener(ANALYTICS_SETTINGS_EVENT, openSettings);
    return () => window.removeEventListener(ANALYTICS_SETTINGS_EVENT, openSettings);
  }, []);

  if (choice !== null && !settingsOpen) return null;

  function choose(nextChoice: Consent) {
    setAnalyticsConsent(nextChoice);
    setChoice(nextChoice);
    setSettingsOpen(false);
  }

  return (
    <aside
      className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-3xl rounded-2xl border border-border bg-white p-5 shadow-xl md:p-6"
      aria-label="Indstillinger for anonym statistik"
      data-nosnippet
    >
      <h2 className="text-lg font-semibold text-navy">Hjælp os med at gøre hjemmesiden bedre</h2>
      <p className="mt-2 text-sm leading-relaxed text-body">
        Må vi bruge anonym besøgsstatistik til at forstå, hvordan hjemmesiden bliver brugt? Læs mere
        under{" "}
        <Link className="text-primary underline" to="/privatliv">
          privatliv og statistik
        </Link>
        .
      </p>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <button
          type="button"
          className="rounded-[10px] border border-border px-5 py-3 font-medium text-navy transition-colors hover:border-primary"
          onClick={() => choose("denied")}
        >
          Nej tak
        </button>
        <button
          type="button"
          className="rounded-[10px] bg-primary px-5 py-3 font-medium text-white transition-colors hover:bg-primary-hover"
          onClick={() => choose("granted")}
        >
          Ja tak
        </button>
      </div>
    </aside>
  );
}
