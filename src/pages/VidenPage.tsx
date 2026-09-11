import type { ReactNode } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { pageTransition } from "../lib/animations";
import { blogPosts } from "../data/blogPosts";
import { glossaryTerms } from "../data/glossary";
import { projectTypes } from "../data/projectTypes";
import { referenceProjects } from "../data/referenceProjects";
import { PreferredSourcePrompt } from "../components/content/PreferredSourcePrompt";
import { PageHero } from "../components/ui/PageHero";
import { Tag } from "../components/ui/Tag";
import { formatDanishDate } from "../lib/format";
import { statusTagTone, statusToneOf } from "../lib/statusTone";

const textLink =
  "shrink-0 text-sm font-semibold text-green underline decoration-green/40 underline-offset-4 transition-colors hover:decoration-green";
const readMore =
  "mt-6 text-sm font-semibold text-green underline decoration-green/40 underline-offset-4 group-hover:decoration-green";

function SectionHeader({
  title,
  text,
  to,
  linkLabel,
}: {
  title: string;
  text?: string;
  to?: string;
  linkLabel?: string;
}) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        <h2 className="text-2xl font-bold leading-tight md:text-3xl">{title}</h2>
        {text && <p className="mt-2 text-body">{text}</p>}
      </div>
      {to && linkLabel && (
        <Link to={to} className={textLink}>
          {linkLabel}
        </Link>
      )}
    </div>
  );
}

function Band({ tone = "paper", id, children }: { tone?: "paper" | "mist"; id?: string; children: ReactNode }) {
  return (
    <section id={id} className={`${tone === "mist" ? "bg-mist" : "bg-paper"} py-14 md:py-20`}>
      <div className="mx-auto max-w-6xl px-5 md:px-8">{children}</div>
    </section>
  );
}

export function VidenPage() {
  const recentPosts = blogPosts.slice(0, 3);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Forside",
        item: "https://dinlcahjælper.dk",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Viden",
        item: "https://dinlcahjælper.dk/viden",
      },
    ],
  };

  return (
    <motion.div {...pageTransition}>
      <Helmet>
        <title>Viden om LCA-beregning | Din LCA Hjælper</title>
        <meta
          name="description"
          content="Artikler, bygningstyper og guides om LCA-beregning for byggeri i Danmark. Lær om klimakrav, grænseværdier og LCA-processen."
        />
        <link rel="canonical" href="https://dinlcahjælper.dk/viden" />
        <meta property="og:title" content="Viden om LCA-beregning | Din LCA Hjælper" />
        <meta property="og:description" content="Artikler, bygningstyper og guides om LCA-beregning for byggeri i Danmark." />
        <meta property="og:url" content="https://dinlcahjælper.dk/viden" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="da_DK" />
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>

      <PageHero
        crumbs={[{ label: "Forside", to: "/" }, { label: "Viden" }]}
        title="Viden om LCA-beregning"
        lede="Artikler, bygningstyper og guides om LCA-beregning, klimakrav og bæredygtigt byggeri i Danmark."
      />

      {/* Artikler */}
      <Band>
        <SectionHeader title="Artikler" to="/blog" linkLabel="Se alle artikler" />
        <div className="mt-8 border-t border-line">
          {recentPosts.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="group grid gap-3 border-b border-line py-7 transition-colors hover:bg-white md:grid-cols-12 md:gap-8 md:px-4"
            >
              <p className="text-sm text-muted md:col-span-3">
                <time dateTime={post.date}>{formatDanishDate(post.date)}</time>
                <span className="block">{post.readingTime}</span>
              </p>
              <div className="md:col-span-9">
                <h3 className="text-xl font-bold leading-snug text-ink transition-colors group-hover:text-green">
                  {post.title}
                </h3>
                <p className="mt-2 max-w-[62ch] text-[15px] leading-relaxed text-body">{post.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </Band>

      {/* LCA-ordbog */}
      <Band tone="mist">
        <SectionHeader
          title="LCA-ordbog"
          text="Centrale begreber inden for LCA-beregning forklaret."
          to="/ordbog"
          linkLabel="Se alle begreber"
        />
        <div className="mt-10 grid gap-x-8 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
          {glossaryTerms.slice(0, 6).map((term) => (
            <Link key={term.slug} to={`/ordbog/${term.slug}`} className="group block border-t border-green/25 pt-4">
              <h3 className="text-lg font-bold leading-snug text-ink transition-colors group-hover:text-green">
                {term.term}
              </h3>
              <p className="mt-2 line-clamp-3 text-[15px] leading-relaxed text-body">{term.shortDefinition}</p>
            </Link>
          ))}
        </div>
      </Band>

      {/* Bygningstyper */}
      <Band>
        <SectionHeader
          title="LCA efter bygningstype"
          text="Grænseværdierne i BR18 varierer efter bygningstype. Vælg din projekttype."
          to="/lca-beregning"
          linkLabel="Se alle bygningstyper"
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {projectTypes.map((pt) => (
            <Link
              key={pt.slug}
              to={`/lca-beregning/${pt.slug}`}
              className="group flex h-full flex-col rounded-sheet bg-white p-6 transition-colors hover:bg-green-soft"
            >
              <Tag tone="mist" className="self-start">
                {pt.grensevaerdi} kg CO₂e/m²/år
              </Tag>
              <h3 className="mt-5 text-lg font-bold leading-snug text-ink transition-colors group-hover:text-green">
                {pt.title.replace("LCA-beregning for ", "")}
              </h3>
              <p className="mt-2 line-clamp-3 flex-1 text-[15px] leading-relaxed text-body">{pt.description}</p>
              <span className={readMore}>Læs mere</span>
            </Link>
          ))}
        </div>
      </Band>

      {/* Referenceprojekter */}
      <Band tone="mist">
        <SectionHeader
          title="Referenceprojekter"
          text="Rigtige byggeprojekter med dokumenterede LCA-resultater."
          to="/referenceprojekter"
          linkLabel="Se alle referenceprojekter"
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {referenceProjects.map((project) => {
            const tone = statusToneOf(project);
            return (
              <Link
                key={project.slug}
                to={`/referenceprojekter/${project.slug}`}
                className="group flex h-full flex-col rounded-sheet bg-white p-6 transition-colors hover:bg-green-soft"
              >
                <p className="text-[13px] text-muted">
                  {project.type}, {project.location}
                </p>
                <div className="mt-3">
                  <Tag tone={statusTagTone[tone]}>{project.status}</Tag>
                </div>
                <h3 className="mt-4 flex-1 text-lg font-bold leading-snug text-ink transition-colors group-hover:text-green">
                  {project.title}
                </h3>
                <div className="mt-5 flex flex-wrap gap-x-5 gap-y-1 border-t border-line pt-4 text-sm text-muted">
                  {(project.metrics?.slice(0, 2) ?? []).map((metric) => (
                    <span key={metric.label}>
                      {metric.label}: <span className="font-semibold text-ink">{metric.value}</span>
                    </span>
                  ))}
                  {!project.metrics && project.resultat && (
                    <span>
                      Resultat: <span className="font-semibold text-green">{project.resultat}</span>
                      {project.graensevaerdi && ` vs. grænse ${project.graensevaerdi}`}
                    </span>
                  )}
                </div>
                <span className={readMore}>Læs hele casen</span>
              </Link>
            );
          })}
        </div>
      </Band>

      {/* Sammenligninger */}
      <Band id="sammenligninger">
        <SectionHeader title="Sammenligninger" text="Hvordan Din LCA Hjælper står sig over for andre løsninger." />
        <Link
          to="/sammenligninger/din-lca-hjaelper-vs-lcabyg"
          className="group mt-8 block max-w-2xl rounded-sheet bg-white p-6 transition-colors hover:bg-green-soft md:p-8"
        >
          <h3 className="text-xl font-bold leading-snug text-ink transition-colors group-hover:text-green">
            Din LCA Hjælper vs. LCAbyg: Hvornår bør du få hjælp?
          </h3>
          <p className="mt-3 leading-relaxed text-body">
            LCAbyg er gratis og dækker BR18, men har en stejl læringskurve.
            Sammenlign pris, tid og hvornår hver løsning passer.
          </p>
          <span className={`${readMore} inline-block`}>Læs sammenligningen</span>
        </Link>
      </Band>

      <PreferredSourcePrompt />
    </motion.div>
  );
}
