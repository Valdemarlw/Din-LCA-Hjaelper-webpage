import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { projectTypes } from "../data/projectTypes";
import { PageHero } from "../components/ui/PageHero";
import { CtaPanel } from "../components/ui/CtaPanel";
import { Tag } from "../components/ui/Tag";
import { LCA_BEREGNING_SEO_TITLE } from "../lib/seoTitles";

const PAGE_URL = "https://dinlcahjælper.dk/lca-beregning";
const TITLE = LCA_BEREGNING_SEO_TITLE;
const DESCRIPTION =
  "Vi laver din LCA-beregning efter BR18 og leverer en myndighedsklar rapport. Fast pris fra 4.000 kr. ekskl. moms, enfamiliehuse typisk 5.000-7.000 kr. Tilbud inden 24 timer.";

const textLink =
  "font-semibold text-green underline decoration-spark/70 underline-offset-4 transition-colors hover:decoration-spark";

const included = [
  "Tidlig beregning med hotspot-analyse, der viser de mest CO₂-tunge bygningsdele",
  "Materialeoptimering med konkrete forslag, hvis grænseværdien er i fare",
  "A4- og A5-beregning med dokumenterede generiske forudsætninger i den tidlige beregning",
  "Opdatering ved færdigmelding med endelige mængder og registreret byggepladsforbrug",
  "Myndighedsklar rapport klar til kommunen",
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "LCA-beregning efter BR18",
  description: DESCRIPTION,
  provider: {
    "@type": "Organization",
    name: "Din LCA Hjælper",
    url: "https://dinlcahjælper.dk",
  },
  areaServed: { "@type": "Country", name: "Denmark" },
  url: PAGE_URL,
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Forside", item: "https://dinlcahjælper.dk" },
    { "@type": "ListItem", position: 2, name: "LCA-beregning", item: PAGE_URL },
  ],
};

export function ProjectTypesPage() {
  return (
    <div>
      <Helmet>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href={PAGE_URL} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:url" content={PAGE_URL} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="da_DK" />
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <PageHero
        crumbs={[{ label: "Forside", to: "/" }, { label: "LCA-beregning" }]}
        title="LCA-beregning til dit byggeri"
        lede="Vi laver LCA-beregningen efter BR18 og leverer en myndighedsklar rapport til kommunen. Fast pris fra 4.000 kr. ekskl. moms, og du får tilbuddet inden 24 timer."
      />

      <section className="bg-paper pb-16 md:pb-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-12 md:px-8">
          <div className="md:col-span-7">
            <h2 className="text-2xl font-bold leading-tight text-ink md:text-3xl">Hvad er en LCA-beregning?</h2>
            <p className="mt-4 leading-relaxed text-body">
              En LCA-beregning (livscyklusvurdering) opgør bygningens klimapåvirkning i kg CO₂e pr. m² pr. år over en
              betragtningsperiode på 50 år. Den dokumenterer over for kommunen, at byggeriet holder grænseværdien i BR18
              for sin bygningstype. Læs mere i{" "}
              <Link to="/blog/hvad-er-lca-beregning" className={textLink}>
                hvad en LCA-beregning er
              </Link>{" "}
              og{" "}
              <Link to="/blog/hvornaar-er-lca-lovpligtig" className={textLink}>
                hvornår den er lovpligtig
              </Link>
              .
            </p>

            <h2 className="mt-10 text-2xl font-bold leading-tight text-ink md:text-3xl">Det får du</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed text-body">
              {included.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-5">
            <div className="rounded-sheet bg-white p-6 ring-1 ring-line md:p-7">
              <h2 className="text-xl font-bold leading-snug text-ink">Hvad koster en LCA-beregning?</h2>
              <p className="mt-3 leading-relaxed text-body">
                Fra 4.000 kr. ekskl. moms. Prisen følger bygningstype og opvarmet areal. Et typisk enfamiliehus eller
                sommerhus ligger på 5.000-7.000 kr. Rækkehuse og projekter med flere boliger starter ved 8.000 kr. og får
                altid et manuelt tilbud.
              </p>
              <p className="mt-3 leading-relaxed text-body">
                Se{" "}
                <Link to="/blog/lca-beregning-pris" className={textLink}>
                  priserne pr. bygningstype
                </Link>{" "}
                eller få et estimat i{" "}
                <Link to="/vaerktoejer/br18-tjekker" className={textLink}>
                  BR18-tjekkeren
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-paper pb-20 md:pb-28">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <h2 className="text-2xl font-bold leading-tight text-ink md:text-3xl">LCA-beregning efter bygningstype</h2>
          <p className="mt-3 max-w-[62ch] leading-relaxed text-body">
            Grænseværdierne i BR18 varierer efter bygningstype. Vælg din projekttype for at se de specifikke krav og
            udfordringer.
          </p>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {projectTypes.map((pt) => (
              <div key={pt.slug} className="h-full">
                <Link
                  to={`/lca-beregning/${pt.slug}`}
                  className="group flex h-full flex-col rounded-sheet bg-white p-6 ring-1 ring-line transition-[box-shadow] duration-150 hover:ring-green/40 md:p-7"
                >
                  <Tag tone="mist" className="self-start">
                    {pt.grensevaerdi} kg CO₂e/m²/år
                  </Tag>
                  <h3 className="mt-5 text-xl font-bold leading-snug text-ink transition-colors group-hover:text-green">
                    {pt.title.replace("LCA-beregning for ", "")}
                  </h3>
                  <p className="mt-3 line-clamp-4 flex-1 text-[15px] leading-relaxed text-body">
                    {pt.content[0]?.text || pt.description}
                  </p>
                  <span className="mt-6 text-sm font-semibold text-green underline decoration-spark/70 underline-offset-4 group-hover:decoration-spark">
                    Læs mere
                  </span>
                </Link>
              </div>
            ))}
          </div>

          <CtaPanel
            className="mt-14"
            title="Få en fast pris på din LCA-beregning"
            text="Send tegningerne, så får du et fast tilbud inden 24 timer. Du kender prisen, før du siger ja."
            cta="Send dine tegninger"
          />
        </div>
      </section>
    </div>
  );
}
