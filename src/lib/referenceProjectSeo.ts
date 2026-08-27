import type { ReferenceProject } from "../data/referenceProjects";

const siteUrl = "https://dinlcahjælper.dk";

export function buildReferenceProjectSchemas(project: ReferenceProject) {
  const url = `${siteUrl}/referenceprojekter/${project.slug}`;

  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: project.title,
    description: project.description,
    mainEntityOfPage: url,
    author: {
      "@type": "Organization",
      name: "Din LCA Hjælper",
      url: siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "Din LCA Hjælper",
      url: siteUrl,
    },
    url,
    ...(project.datePublished ? { datePublished: project.datePublished } : {}),
    ...(project.dateModified ? { dateModified: project.dateModified } : {}),
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Forside", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Viden", item: `${siteUrl}/viden` },
      { "@type": "ListItem", position: 3, name: "Referenceprojekter", item: `${siteUrl}/referenceprojekter` },
      { "@type": "ListItem", position: 4, name: project.title, item: url },
    ],
  };

  return { article, breadcrumb };
}
