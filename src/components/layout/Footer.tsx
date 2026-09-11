import { Link } from "react-router-dom";
import { ANALYTICS_SETTINGS_EVENT } from "../../lib/analytics";
import { Logo } from "../ui/Logo";

const videnLinks = [
  { to: "/blog", label: "Artikler" },
  { to: "/lca-beregning", label: "Bygningstyper" },
  { to: "/referenceprojekter", label: "Referenceprojekter" },
  { to: "/ordbog", label: "LCA-ordbog" },
  { to: "/sammenligninger/din-lca-hjaelper-vs-lcabyg", label: "vs. LCAbyg" },
  { to: "/faq", label: "FAQ" },
  { to: "/om-os", label: "Om os" },
  { to: "/kontakt", label: "Kontakt" },
];

export function Footer() {
  return (
    <footer className="bg-green-deep text-mist/80">
      <div className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Link
              to="/"
              className="inline-block rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mist"
              aria-label="Din LCA Hjælper, til forsiden"
            >
              <Logo variant="light" className="h-9 w-auto" decorative />
            </Link>
            <p className="mt-6 max-w-sm text-[15px] leading-relaxed">
              Specialiseret i LCA-beregning for byggeri efter BR18. Vi betjener arkitekter og
              rådgivere i hele Danmark med myndighedsklar dokumentation for bolig, erhverv og
              industri.
            </p>
            <p className="mt-6 text-sm text-mist/60">
              CVR: 45 80 00 59
              <br />
              Valdemar Løvschal Wernblad
            </p>
          </div>

          <div className="md:col-span-3 md:col-start-6">
            <h3 className="text-sm font-semibold text-white">Viden</h3>
            <ul className="mt-4 space-y-2.5">
              {videnLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-[15px] transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4 md:col-start-9">
            <h3 className="text-sm font-semibold text-white">Kontakt</h3>
            <ul className="mt-4 space-y-2.5 text-[15px]">
              <li>
                <a href="tel:+4529899999" className="transition-colors hover:text-white">
                  +45 29 89 99 99
                </a>
              </li>
              <li>
                <a
                  href="mailto:valdemar.wernblad@dinlcahjælper.dk"
                  className="break-words transition-colors hover:text-white"
                >
                  valdemar.wernblad@dinlcahjælper.dk
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/15 pt-6 text-sm text-mist/60 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} Din LCA Hjælper. Alle rettigheder forbeholdes.</p>
          <div className="flex items-center gap-5">
            <Link to="/privatliv" className="transition-colors hover:text-white">
              Privatliv og statistik
            </Link>
            <button
              type="button"
              className="transition-colors hover:text-white"
              onClick={() => window.dispatchEvent(new Event(ANALYTICS_SETTINGS_EVENT))}
            >
              Statistikindstillinger
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
