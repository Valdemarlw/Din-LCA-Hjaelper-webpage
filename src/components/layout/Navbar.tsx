import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useNavbarScroll } from "../../hooks/useNavbarScroll";
import { Button } from "../ui/Button";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const scrolled = useNavbarScroll();
  const location = useLocation();

  const links = [
    { to: "/viden", label: "Viden", alsoPaths: ["/blog", "/lca-beregning", "/referenceprojekter"] },
    { to: "/vaerktoejer/br18-tjekker", label: "Værktøjer" },
    { to: "/om-os", label: "Om os" },
    { to: "/kontakt", label: "Kontakt" },
  ] as const;

  function isActive(link: typeof links[number]) {
    if (location.pathname === link.to || location.pathname.startsWith(link.to + "/")) return true;
    if ("alsoPaths" in link) {
      return link.alsoPaths.some(
        (p) => location.pathname === p || location.pathname.startsWith(p + "/")
      );
    }
    return false;
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-0 transition-all duration-300 ${
        scrolled
          ? "bg-bg/90 backdrop-blur-md shadow-sm border-b border-border/50"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 md:px-8 h-16 md:h-20">
        <Link to="/" className="flex items-center gap-2 text-navy font-bold text-lg" onClick={() => setMobileOpen(false)}>
          DIN LCA HJÆLPER
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive(link) ? "text-primary" : "text-navy"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Button to="/kontakt" variant="secondary" className="text-sm px-5 py-2.5">
            Start din LCA
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-navy"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Luk menu" : "Åbn menu"}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-bg/95 backdrop-blur-lg border-t border-border overflow-hidden"
          >
            <div className="px-5 py-6 flex flex-col gap-4">
              {links.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`text-base font-medium py-2 ${
                    isActive(link) ? "text-primary" : "text-navy"
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Button to="/kontakt" variant="secondary" className="mt-2 w-full" onClick={() => setMobileOpen(false)}>
                Start din LCA
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
