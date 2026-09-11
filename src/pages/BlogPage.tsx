import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { pageTransition } from "../lib/animations";
import { blogPosts } from "../data/blogPosts";
import { PageHero } from "../components/ui/PageHero";
import { RevealGroup, RevealItem } from "../components/motion/Reveal";
import { formatDanishDate } from "../lib/format";

export function BlogPage() {
  return (
    <motion.div {...pageTransition}>
      <Helmet>
        <title>Viden om LCA-beregning | Din LCA Hjælper</title>
        <meta
          name="description"
          content="Artikler og guides om LCA-beregning for byggeri i Danmark. Lær om klimakrav, grænseværdier, A4/A5-dokumentation og meget mere."
        />
        <link rel="canonical" href="https://dinlcahjælper.dk/blog" />
        <meta property="og:title" content="Viden om LCA-beregning | Din LCA Hjælper" />
        <meta
          property="og:description"
          content="Artikler og guides om LCA-beregning for byggeri i Danmark."
        />
        <meta property="og:url" content="https://dinlcahjælper.dk/blog" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="da_DK" />
      </Helmet>

      <PageHero
        crumbs={[{ label: "Forside", to: "/" }, { label: "Viden", to: "/viden" }, { label: "Artikler" }]}
        title="Viden om LCA-beregning"
        lede="Artikler og guides om LCA-beregning, klimakrav og bæredygtigt byggeri i Danmark."
      />

      <section className="bg-paper pb-20 md:pb-28">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          {blogPosts.length > 0 ? (
            <RevealGroup className="border-t border-line" stagger={0.12} delay={0.2}>
              {blogPosts.map((post) => (
                <RevealItem key={post.slug}>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="group grid gap-3 border-b border-line py-8 transition-colors hover:bg-white md:grid-cols-12 md:gap-8 md:px-4"
                  >
                    <p className="text-sm text-muted md:col-span-3">
                      <time dateTime={post.date}>{formatDanishDate(post.date)}</time>
                      <span className="block">{post.readingTime}</span>
                    </p>
                    <div className="md:col-span-9">
                      <h2 className="text-xl font-bold leading-snug text-ink transition-colors group-hover:text-green md:text-2xl">
                        {post.title}
                      </h2>
                      <p className="mt-3 max-w-[62ch] leading-relaxed text-body">{post.description}</p>
                      <span className="mt-4 inline-block text-sm font-semibold text-green underline decoration-green/40 underline-offset-4 group-hover:decoration-green">
                        Læs mere
                      </span>
                    </div>
                  </Link>
                </RevealItem>
              ))}
            </RevealGroup>
          ) : (
            <p className="text-lg text-muted">Artikler er på vej, kom snart tilbage.</p>
          )}
        </div>
      </section>
    </motion.div>
  );
}
