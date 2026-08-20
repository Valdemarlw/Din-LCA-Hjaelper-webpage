export const MAX_SEO_TITLE_LENGTH = 60;

export function buildSeoTitle(title: string): string {
  return `${title} | Din LCA Hjælper`;
}

export const BR18_CHECKER_SEO_TITLE = buildSeoTitle(
  "BR18 LCA-tjekker, se krav og pris",
);
