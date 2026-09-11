import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { pageTransition } from "../lib/animations";
import { BR18Checker } from "../components/tools/BR18Checker";
import { BR18_CHECKER_SEO_TITLE } from "../lib/seoTitles";
import { PageHero } from "../components/ui/PageHero";
import { FAQList } from "../components/ui/FAQList";
import { Button } from "../components/ui/Button";

const SITE = "https://dinlcahjælper.dk";
const PATH = "/vaerktoejer/br18-tjekker";

const faqs = [
  {
    question: "Hvornår er en LCA-beregning lovpligtig?",
    answer:
      "Efter BR18 (§ 297) skal der laves en LCA-beregning ved opførelse af nye bygninger og ved tilbygninger. Undtaget er bl.a. uopvarmede bygninger under 50 m², transportable og midlertidige konstruktioner, samt tilbygninger under 250 m² til enfamiliehuse, række-/kæde-/dobbelthuse og sommerhuse. Erhverv og etageboliger er omfattet uanset størrelse.",
  },
  {
    question: "Hvilken grænseværdi gælder for mit byggeri?",
    answer:
      "Grænseværdien afhænger af bygningstypen (kg CO₂-eq/m²/år): sommerhuse under 150 m² 4,0; sommerhuse fra 150 m², enfamiliehuse og række-/kæde-/dobbelthuse 6,7; etageboliger, kontor, handel og lager 7,5; øvrigt byggeri som skoler og institutioner 8,0. Byggeprocessen (A4+A5) har en separat grænse på 1,5 for alle typer.",
  },
  {
    question: "Er min tilbygning omfattet af LCA-kravet?",
    answer:
      "Tilbygninger til enfamiliehuse, række-/kæde-/dobbelthuse og sommerhuse er undtaget, hvis de er under 250 m² opvarmet etageareal. Er tilbygningen 250 m² eller derover, er den omfattet. Tilbygninger til erhverv og etageboliger er omfattet uanset størrelse.",
  },
  {
    question: "Hvad koster en LCA-beregning?",
    answer:
      "Prisen afhænger af projektets omfang og kompleksitet, antallet af konstruktioner og hvilke grænseværdikrav, der gælder. For et typisk enfamiliehus ligger en komplet beregning omkring 5.000-7.000 kr. ekskl. moms. Brug værktøjet til at få et vejledende estimat for netop dit projekt, eller send tegningerne og få et fast tilbud.",
  },
  {
    question: "Hvad er A4 og A5 i en LCA-beregning?",
    answer:
      "A4 er transporten af byggematerialer til byggepladsen, og A5 er selve byggeprocessen (energiforbrug, spild og affald på pladsen). Siden 1. juli 2025 skal A4 og A5 medregnes, og de har en samlet grænseværdi på 1,5 kg CO₂-eq/m²/år.",
  },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Forside", item: SITE },
    { "@type": "ListItem", position: 2, name: "BR18-tjekker", item: SITE + PATH },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Sådan tjekker du, om dit projekt skal have en LCA-beregning",
  description:
    "Find ud af, om dit byggeprojekt er omfattet af BR18's klimakrav, hvilken grænseværdi der gælder, og hvad en beregning koster.",
  step: [
    { "@type": "HowToStep", name: "Vælg bygningstype", text: "Vælg den bygningstype, der passer til dit projekt." },
    { "@type": "HowToStep", name: "Angiv nybyggeri eller tilbygning", text: "Vælg om der er tale om nybyggeri eller en tilbygning." },
    { "@type": "HowToStep", name: "Indtast opvarmet areal", text: "Indtast bygningens opvarmede etageareal i m²." },
    { "@type": "HowToStep", name: "Se resultatet", text: "Værktøjet viser om en LCA er lovpligtig, hvilken grænseværdi der gælder, og et vejledende prisestimat." },
  ],
};

export function BR18CheckerPage() {
  return (
    <motion.div {...pageTransition}>
      <Helmet>
        <title>{BR18_CHECKER_SEO_TITLE}</title>
        <meta
          name="description"
          content="Gratis værktøj: find ud af, om dit byggeprojekt skal have en LCA-beregning efter BR18, hvilken grænseværdi der gælder, og hvad en beregning koster. Svar på sekunder."
        />
        <link rel="canonical" href={SITE + PATH} />
        <meta property="og:title" content={BR18_CHECKER_SEO_TITLE} />
        <meta
          property="og:description"
          content="Gratis værktøj: er en LCA-beregning lovpligtig for dit projekt? Se grænseværdi og vejledende pris på sekunder."
        />
        <meta property="og:url" content={SITE + PATH} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="da_DK" />
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(howToSchema)}</script>
      </Helmet>

      <PageHero
        crumbs={[{ label: "Forside", to: "/" }, { label: "BR18-tjekker" }]}
        title="Skal dit projekt have en LCA-beregning?"
        lede="Svar på tre spørgsmål og find ud af, om dit byggeri er omfattet af BR18's klimakrav, hvilken grænseværdi der gælder, og hvad en beregning koster."
      />

      {/* Værktøjet */}
      <section className="bg-paper pb-16 md:pb-24">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <BR18Checker />
          <p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted">
            Værktøjet giver et vejledende svar baseret på BR18 § 297-298 (gældende fra 1. juli
            2025). Det erstatter ikke en konkret byggesagsvurdering. Er du i tvivl om afgrænsningen
            for dit projekt, er du velkommen til at kontakte os uforpligtende.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-mist py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <h2 className="text-3xl font-bold leading-tight md:text-4xl lg:sticky lg:top-28">
                Ofte stillede spørgsmål
              </h2>
            </div>
            <div className="lg:col-span-8">
              <FAQList items={faqs} />
              <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-lg text-ink">Klar til at få din beregning?</p>
                <Button to="/kontakt">Send dine tegninger</Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
