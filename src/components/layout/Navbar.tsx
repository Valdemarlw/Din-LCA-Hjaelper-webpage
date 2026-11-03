import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useNavbarScroll } from "../../hooks/useNavbarScroll";
import { Button } from "../ui/Button";
import { Logo } from "../ui/Logo";

const links = [
  {
    to: "/viden",
    label: "Viden",
    alsoPaths: ["/blog", "/lca-beregning", "/referenceprojekter", "/ordbog", "/sammenligninger", "/faq"],
  },
  { to: "/vaerktoejer/br18-tjekker", label: "Værktøjer" },
  { to: "/om-os", label: "Om os" },
  { to: "/kontakt", label: "Kontakt" },
] as const;

type NavLink = (typeof links)[number];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrolled, hidden } = useNavbarScroll();
  const { pathname } = useLocation();
  const menuButton = useRef<HTMLButtonElement>(null);

  // Escape closes the open mobile menu and returns focus to its toggle.
  useEffect(() => {
    if (!mobileOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setMobileOpen(false);
        menuButton.current?.focus();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  function isActive(link: NavLink) {
    const matches = (p: string) => pathname === p || pathname.startsWith(p + "/");
    if (matches(link.to)) return true;
    return "alsoPaths" in link && link.alsoPaths.some(matches);
  }

  const solid = scrolled || mobileOpen;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,translate] duration-200 ease-out ${
        solid ? "bg-paper/95 shadow-nav backdrop-blur-sm" : "bg-paper"
      } ${hidden && !mobileOpen ? "-translate-y-full" : "translate-y-0"}`}
    >
      <nav
        aria-label="Hovedmenu"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:h-20 md:px-8"
      >
        <Link
          to="/"
          className="flex shrink-0 items-center rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-spark"
          aria-label="Din LCA Hjælper, til forsiden"
        >
          <Logo kind="wordmark" className="h-6 w-auto sm:h-7 lg:h-8" decorative />
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => {
            const active = isActive(link);
            return (
              <Link
                key={link.to}
                to={link.to}
                aria-current={active ? "page" : undefined}
                className={`rounded-full px-3.5 py-2 text-[15px] font-medium transition-colors hover:bg-green-soft hover:text-green ${
                  active ? "bg-green-soft text-green" : "text-ink/80"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Button to="/kontakt" size="sm" className="ml-4">
            Få et tilbud
          </Button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          {!mobileOpen && (
            <Button to="/kontakt" size="sm" className="min-h-11">
              Få et tilbud
            </Button>
          )}
          <button
            ref={menuButton}
            type="button"
            className="-mr-1 grid h-11 w-11 place-items-center rounded-full text-ink hover:bg-green-soft"
            onClick={() => setMobileOpen((open) => !open)}
            aria-expanded={mobileOpen}
            aria-controls="mobil-menu"
            aria-label={mobileOpen ? "Luk menu" : "Åbn menu"}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
          <div id="mobil-menu" className="border-t border-line bg-paper md:hidden">
            <div className="px-5 pb-6 pt-2">
              {links.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`block border-b border-line py-3.5 text-lg font-medium ${
                    isActive(link) ? "text-green" : "text-ink"
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Button to="/kontakt" className="mt-5 w-full" onClick={() => setMobileOpen(false)}>
                Få et tilbud
              </Button>
            </div>
          </div>
        )}
    </header>
  );
}
