import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ANALYTICS_SETTINGS_EVENT,
  readAnalyticsConsent,
  setAnalyticsConsent,
  type AnalyticsConsent as Consent,
} from "../../lib/analytics";
import { Button } from "../ui/Button";

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
      className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-2xl rounded-sheet bg-white p-5 shadow-sheet ring-1 ring-line md:p-6"
      aria-label="Indstillinger for anonym statistik"
      data-nosnippet
    >
      <h2 className="text-lg font-bold text-ink">Hjælp os med at gøre hjemmesiden bedre</h2>
      <p className="mt-2 text-[15px] leading-relaxed text-body">
        Må vi bruge anonym besøgsstatistik til at forstå, hvordan hjemmesiden bliver brugt? Læs mere
        under{" "}
        <Link className="text-green underline underline-offset-2" to="/privatliv">
          privatliv og statistik
        </Link>
        .
      </p>
      <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Button variant="secondary" onClick={() => choose("denied")}>
          Nej tak
        </Button>
        <Button onClick={() => choose("granted")}>Ja tak</Button>
      </div>
    </aside>
  );
}
