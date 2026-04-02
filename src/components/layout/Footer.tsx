import { Link } from "react-router-dom";
import { Phone, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-bg-alt border-t border-border">
      <div className="mx-auto max-w-6xl px-5 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand & Entity */}
          <div>
            <Link to="/" className="text-navy font-bold text-lg">
              DIN LCA HJÆLPER
            </Link>
            <p className="mt-3 text-sm text-muted">
              Specialiseret i LCA-beregning for byggeri efter BR18. Vi betjener arkitekter og rådgivere i hele Danmark med myndighedsklar dokumentation for bolig, erhverv og industri.
            </p>
            <p className="mt-2 text-xs text-muted">CVR: 45 80 00 59 · Valdemar Løvschal Wernblad</p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-semibold text-navy mb-3">Sider</h3>
            <div className="flex flex-col gap-2">
              <Link to="/om-os" className="text-sm text-muted hover:text-primary transition-colors">
                Om os
              </Link>
              <Link to="/kontakt" className="text-sm text-muted hover:text-primary transition-colors">
                Kontakt
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-navy mb-3">Kontakt</h3>
            <div className="flex flex-col gap-2">
              <a href="tel:+4529899999" className="flex items-center gap-2 text-sm text-muted hover:text-primary transition-colors">
                <Phone size={14} />
                +45 29 89 99 99
              </a>
              <a href="mailto:valdemar.wernblad@dinlcahjælper.dk" className="flex items-center gap-2 text-sm text-muted hover:text-primary transition-colors">
                <Mail size={14} />
                valdemar.wernblad@dinlcahjælper.dk
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted">
            &copy; {new Date().getFullYear()} Din LCA Hjælper. Alle rettigheder forbeholdes.
          </p>
          <p className="text-xs text-muted">
            Powered by <a href="https://a45lca.dk" target="_blank" rel="noopener noreferrer" className="text-a45-green hover:underline font-medium">A45</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
