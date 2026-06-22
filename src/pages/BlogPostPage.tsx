import { useParams, Navigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { pageTransition, fadeUp } from "../lib/animations";
import { getBlogPost } from "../data/blogPosts";
import { Button } from "../components/ui/Button";
import { RenderSection, FAQItem } from "../components/content/RenderSection";
import { Calendar, Clock } from "lucide-react";

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getBlogPost(slug) : undefined;

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

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
        <title>{`${post.title} | Din LCA Hjælper`}</title>
        <meta name="description" content={post.description} />
        <link
          rel="canonical"
          href={`https://dinlcahjælper.dk/blog/${post.slug}`}
        />
        <meta property="og:title" content={`${post.title} | Din LCA Hjælper`} />
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

      <article className="relative overflow-hidden bg-gradient-to-br from-bg via-bg to-primary-light/30">
        {/* Hero */}
        <div className="py-16 md:py-24 lg:py-28">
          <div className="absolute left-0 top-1/3 -translate-x-1/2 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
          <div className="mx-auto max-w-3xl px-5 md:px-8 relative">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex items-center gap-2 text-sm text-muted">
                <li>
                  <Link
                    to="/"
                    className="hover:text-primary transition-colors"
                  >
                    Forside
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link
                    to="/viden"
                    className="hover:text-primary transition-colors"
                  >
                    Viden
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link
                    to="/blog"
                    className="hover:text-primary transition-colors"
                  >
                    Artikler
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="text-navy font-medium truncate max-w-[200px]">
                  {post.title}
                </li>
              </ol>
            </nav>

            <motion.h1
              className="text-3xl md:text-4xl lg:text-[44px] font-bold text-navy leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {post.title}
            </motion.h1>

            <motion.div
              className="mt-4 flex items-center gap-4 text-sm text-muted"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <span className="flex items-center gap-1.5">
                <Calendar size={14} />
                {post.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={14} />
                {post.readingTime}
              </span>
            </motion.div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-bg pb-20 md:pb-28">
          <motion.div
            className="mx-auto max-w-3xl px-5 md:px-8"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            <div>
              {post.content.map((section, i) => (
                <RenderSection key={i} section={section} />
              ))}
            </div>

            {/* FAQ Section */}
            {post.faqs.length > 0 && (
              <div className="mt-16">
                <h2 className="text-2xl md:text-3xl font-semibold text-navy mb-6">
                  Ofte stillede spørgsmål
                </h2>
                <div className="rounded-2xl border border-border bg-white px-6 md:px-8">
                  {post.faqs.map((faq) => (
                    <FAQItem
                      key={faq.question}
                      question={faq.question}
                      answer={faq.answer}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="mt-16 rounded-2xl bg-primary-light p-8 md:p-10 text-center">
              <h2 className="text-2xl font-semibold text-navy">
                Har du brug for en LCA-beregning?
              </h2>
              <p className="mt-3 text-body max-w-lg mx-auto">
                Vi håndterer hele processen, fra tidlig fase til myndighedsklar
                rapport. Priser fra 4.000 kr.
              </p>
              <div className="mt-6">
                <Button to="/kontakt">Få et tilbud</Button>
              </div>
            </div>
          </motion.div>
        </div>
      </article>
    </motion.div>
  );
}
