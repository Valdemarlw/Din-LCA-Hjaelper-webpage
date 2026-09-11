import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
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

  function isActive(link: NavLink) {
    const matches = (p: string) => pathname === p || pathname.startsWith(p + "/");
    if (matches(link.to)) return true;
    return "alsoPaths" in link && link.alsoPaths.some(matches);
  }

  const solid = scrolled || mobileOpen;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,translate] duration-300 ${
        solid ? "bg-paper/90 shadow-nav backdrop-blur-md" : "bg-transparent"
      } ${hidden && !mobileOpen ? "-translate-y-full" : "translate-y-0"}`}
    >
      <nav
        aria-label="Hovedmenu"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:h-20 md:px-8"
      >
        <Link
          to="/"
          className="flex shrink-0 items-center rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green"
          aria-label="Din LCA Hjælper, til forsiden"
        >
          <Logo kind="wordmark" className="hidden h-8 w-auto md:block lg:h-9" decorative />
          <Logo kind="mark" className="h-10 w-auto md:hidden" decorative />
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => {
            const active = isActive(link);
            return (
              <Link
                key={link.to}
                to={link.to}
                aria-current={active ? "page" : undefined}
                className={`relative rounded-md px-3 py-2 text-[15px] font-medium transition-colors hover:text-green ${
                  active
                    ? "text-green after:absolute after:inset-x-3 after:-bottom-0.5 after:h-0.5 after:rounded-full after:bg-green"
                    : "text-ink/80"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Button to="/kontakt" variant="secondary" size="sm" className="ml-4">
            Start din LCA
          </Button>
        </div>

        <button
          type="button"
          className="-mr-2 rounded-md p-2 text-ink md:hidden"
          onClick={() => setMobileOpen((open) => !open)}
          aria-expanded={mobileOpen}
          aria-controls="mobil-menu"
          aria-label={mobileOpen ? "Luk menu" : "Åbn menu"}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobil-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-line bg-paper md:hidden"
          >
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
                Start din LCA
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
