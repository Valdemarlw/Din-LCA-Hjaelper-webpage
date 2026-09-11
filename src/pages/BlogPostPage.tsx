import { useParams, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { pageTransition } from "../lib/animations";
import { getBlogPost } from "../data/blogPosts";
import { RenderSection } from "../components/content/RenderSection";
import { FAQList } from "../components/ui/FAQList";
import { CtaPanel } from "../components/ui/CtaPanel";
import { PageHero } from "../components/ui/PageHero";
import { buildSeoTitle } from "../lib/seoTitles";
import { formatDanishDate } from "../lib/format";

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getBlogPost(slug) : undefined;

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const seoTitle = buildSeoTitle(post.metaTitle ?? post.title);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: "Valdemar Løvschal Wernblad",
      url: "https://dinlcahjælper.dk/om-os",
    },
    publisher: {
      "@type": "Organization",
      name: "Din LCA Hjælper",
      url: "https://dinlcahjælper.dk",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://dinlcahjælper.dk/blog/${post.slug}`,
    },
  };

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
      {
        "@type": "ListItem",
        position: 3,
        name: "Artikler",
        item: "https://dinlcahjælper.dk/blog",
      },
      {
        "@type": "ListItem",
        position: 4,
        name: post.title,
        item: `https://dinlcahjælper.dk/blog/${post.slug}`,
      },
    ],
  };

  const faqSchema =
    post.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: post.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }
      : null;

  return (
    <motion.div {...pageTransition}>
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={post.description} />
        <link
          rel="canonical"
          href={`https://dinlcahjælper.dk/blog/${post.slug}`}
        />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={post.description} />
        <meta
          property="og:url"
          content={`https://dinlcahjælper.dk/blog/${post.slug}`}
        />
        <meta property="og:type" content="article" />
        <meta property="og:locale" content="da_DK" />
        <meta property="article:published_time" content={post.date} />
        <meta property="article:author" content="Valdemar Løvschal Wernblad" />
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
        {faqSchema && (
          <script type="application/ld+json">
            {JSON.stringify(faqSchema)}
          </script>
        )}
      </Helmet>

      <article>
        <PageHero
          width="narrow"
          crumbs={[
            { label: "Forside", to: "/" },
            { label: "Viden", to: "/viden" },
            { label: "Artikler", to: "/blog" },
            { label: post.title },
          ]}
          title={post.title}
        >
          <p className="mt-6 text-sm text-muted">
            <time dateTime={post.date}>{formatDanishDate(post.date)}</time>, {post.readingTime} læsning
          </p>
        </PageHero>

        <div className="bg-paper pb-20 md:pb-28">
          <div className="mx-auto max-w-[46rem] px-5 md:px-8">
            <div>
              {post.content.map((section, i) => (
                <RenderSection key={i} section={section} />
              ))}
            </div>

            {post.faqs.length > 0 && (
              <section className="mt-16">
                <h2 className="mb-6 text-2xl font-bold md:text-3xl">Ofte stillede spørgsmål</h2>
                <FAQList items={post.faqs} />
              </section>
            )}

            <CtaPanel
              className="mt-16"
              title="Har du brug for en LCA-beregning?"
              text="Vi håndterer hele processen, fra tidlig fase til myndighedsklar rapport. Et typisk enfamiliehus koster 5.000-7.000 kr ekskl. moms."
              cta="Få et tilbud"
            />
          </div>
        </div>
      </article>
    </motion.div>
  );
}
