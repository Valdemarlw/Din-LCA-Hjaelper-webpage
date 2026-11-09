export const MAX_SEO_TITLE_LENGTH = 60;

export function buildSeoTitle(title: string): string {
  return `${title} | Din LCA Hjælper`;
}

export const BR18_CHECKER_SEO_TITLE = buildSeoTitle(
  "BR18 LCA-tjekker, se krav og pris",
);

/** /lca-beregning is the service page for the head search "lca beregning". */
export const LCA_BEREGNING_SEO_TITLE = buildSeoTitle(
  "LCA-beregning efter BR18, fra 4.000 kr.",
);
