import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { blogPosts } from "../data/blogPosts";
import { PageHero } from "../components/ui/PageHero";
import { formatDanishDate } from "../lib/format";

export function BlogPage() {
  return (
    <div>
      <Helmet>
        <title>Artikler om LCA-beregning og BR18 | Din LCA Hjælper</title>
        <meta
          name="description"
          content="Artikler og guides om LCA-beregning for byggeri i Danmark. Lær om klimakrav, grænseværdier, A4/A5-dokumentation og meget mere."
        />
        <link rel="canonical" href="https://dinlcahjælper.dk/blog" />
        <meta property="og:title" content="Artikler om LCA-beregning og BR18 | Din LCA Hjælper" />
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
        title="Artikler om LCA-beregning og BR18"
        lede={
          <>
            Artikler og guides om LCA-beregning, klimakrav og bæredygtigt byggeri i Danmark. Skal du have lavet
            beregningen, så se{" "}
            <Link
              to="/lca-beregning"
              className="font-semibold text-white underline decoration-spark/70 underline-offset-4 transition-colors hover:decoration-spark"
            >
              vores LCA-beregning
            </Link>
            .
          </>
        }
      />

      <section className="bg-paper pb-20 md:pb-28">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          {blogPosts.length > 0 ? (
            <div className="border-t border-line">
              {blogPosts.map((post) => (
                <div key={post.slug}>
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
                      <span className="mt-4 inline-block text-sm font-semibold text-green underline decoration-spark/70 underline-offset-4 group-hover:decoration-spark">
                        Læs artiklen
                      </span>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-lg text-muted">Artikler er på vej, kom snart tilbage.</p>
          )}
        </div>
      </section>
    </div>
  );
}
