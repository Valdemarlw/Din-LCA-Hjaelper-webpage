/**
 * DLH pris-lommeregner — ren logik (ingen UI, ingen backend).
 *
 * Kanonisk kilde: vault .claude/skills/dlh-tilbud/references/pris-formel.md
 * (knæk-model besluttet 2026-06-21, ratificeret og udvidet 2026-08-10).
 *
 * Alle beløb er EKSKL. moms. Konstanterne er samlet ét sted, så de kan
 * re-tunes uden at røre UI eller beslutningslogik.
 */

export type PrisType = "enfamiliehus" | "sommerhus" | "raekkehus" | "lager" | "kontor";
type FormelPrisType = Exclude<PrisType, "raekkehus">;
export type Serviceniveau = "komplet" | "direkte";

export interface PrisKonstant {
  /** Fast grundpris for typen. */
  grundpris: number;
  /** Kr/m² op til knækket. */
  sats1: number;
  /** Knæk-punkt i m². Brug Infinity for lineær (intet knæk). */
  knaek: number;
  /** Kr/m² over knækket. */
  sats2: number;
  /** Loft for LCA Komplet; derover gives intet auto-tal. */
  loft: number;
}

/** Konstanter pr. pris-type. Eneste sted tallene defineres. */
export const PRIS_KONSTANTER: Record<FormelPrisType, PrisKonstant> = {
  enfamiliehus: { grundpris: 3500, sats1: 20, knaek: 100, sats2: 8, loft: 8000 },
  sommerhus: { grundpris: 3500, sats1: 20, knaek: 100, sats2: 8, loft: 8000 },
  lager: { grundpris: 4000, sats1: 18, knaek: 150, sats2: 8, loft: 12500 },
  // Kontor/etage er lineær: intet knæk (knaek = Infinity, sats2 = 0).
  kontor: { grundpris: 5000, sats1: 30, knaek: Infinity, sats2: 0, loft: 12500 },
};

/** Absolut gulv — en pris kommer aldrig under dette. */
export const GULV = 4000;
/** Rabat ved LCA Direkte (kunden leverer struktureret mængdeudtræk). */
export const DIREKTE_RABAT = 1000;

export type PrisResultat =
  | { type: "pris"; komplet: number; direkte: number }
  | { type: "individuelt" };

function rundTil100(n: number): number {
  return Math.round(n / 100) * 100;
}

/**
 * Beregn vejledende pris for en pris-type og et opvarmet areal.
 * Returnerer både Komplet- og Direkte-pris, eller "individuelt" hvis
 * Komplet-prisen overstiger typens loft (store jobs scopes manuelt).
 */
export function beregnPris(prisType: PrisType, m2: number): PrisResultat {
  // Rækkehuse og andre multi-unit-projekter scopes altid manuelt. M² alene
  // fanger ikke antal boliger, variationer eller dokumentationsomfang.
  if (prisType === "raekkehus") return { type: "individuelt" };

  const k = PRIS_KONSTANTER[prisType];
  const raw =
    k.grundpris +
    k.sats1 * Math.min(m2, k.knaek) +
    k.sats2 * Math.max(0, m2 - k.knaek);
  // Gulvet gælder ALTID — også Komplet-prisen (jf. pris-formel.md).
  const komplet = Math.max(rundTil100(raw), GULV);

  // Loftet tjekkes på Komplet-prisen (den fulde opgave).
  if (komplet > k.loft) return { type: "individuelt" };

  const direkte = Math.max(komplet - DIREKTE_RABAT, GULV);
  return { type: "pris", komplet, direkte };
}

/** Formatér et heltal kr som dansk valuta uden decimaler, fx 6500 -> "6.500". */
export function formatKr(n: number): string {
  return n.toLocaleString("da-DK");
}
