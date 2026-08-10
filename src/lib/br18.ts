/**
 * BR18 LCA-beslutningslogik — ren logik (ingen UI, ingen backend).
 *
 * Kanonisk kilde: BR18 §297 + §298, jf. vault
 * 02_Areas/BR18-compliance/lca-krav-oversigt.md og
 * .claude/skills/dlh-tilbud/references/br18-lca-regler.md.
 *
 * KRITISK distinktion:
 *   §297 = beregningspligt (skal der laves en LCA?)
 *   §298 = grænseværdi (er der et tal at overholde?)
 * En bygning kan være beregningspligtig MEN undtaget fra grænseværdi.
 * Værktøjet må ALDRIG forveksle "undtaget fra grænseværdi" med
 * "undtaget fra LCA".
 */

import type { PrisType } from "./pris";

export type Bygningstype =
  | "enfamiliehus" // stuehus og fritliggende enfamiliehus
  | "raekkehus" // række-, kæde- og dobbelthuse
  | "sommerhus" // sommerhuse, campinghytter og lign. ferieboliger
  | "etagebolig"
  | "kontor"
  | "handel"
  | "lager"
  | "institution" // skoler, daginstitutioner
  | "andet"; // øvrigt nybyggeri (fx parkeringshuse)

export type Byggeri = "nybyggeri" | "tilbygning";

export interface BR18Input {
  bygningstype: Bygningstype;
  byggeri: Byggeri;
  /** Opvarmet etageareal i m². */
  m2: number;
  /** Hele bygningen er uopvarmet. */
  uopvarmet: boolean;
  /**
   * Samfundskritisk / industriproduktion: BBR-anvendelseskoder undtaget fra
   * grænseværdi i § 298 stk. 9-10 (industriproduktion, energi-/vand-/
   * affaldsforsyning, hospital, fængsel, tribune, forsvarets operative
   * bygninger). Stadig beregnings-/dokumentationspligtige.
   */
  samfundskritisk: boolean;
}

export type LovpligtStatus =
  | "lovpligtig" // LCA påkrævet + grænseværdi gælder
  | "kun_dokumentation" // §297-beregningspligt, men undtaget §298-grænseværdi
  | "undtaget_tilbygning" // tilbygning < 250 m² til bolig/feriebolig
  | "undtaget_helt"; // ikke omfattet af LCA-krav

export interface BR18Resultat {
  status: LovpligtStatus;
  /** kg CO₂-eq/m²/år, eller null hvis ingen grænseværdi gælder. */
  graensevaerdi: number | null;
  /** Lavemissionsklassens (frivillige) grænseværdi, eller null. */
  lavemission: number | null;
  /** Byggeproces A4+A5-grænse (1,5), eller null hvis ikke relevant. */
  a4a5: number | null;
  /** Lavemissionsklassens A4+A5-grænse (1,1), eller null. */
  a4a5Lavemission: number | null;
  /** Kort tekst om B6-driftsmetode (BE18 vs standardværdier vs 0). */
  b6Metode: string;
  /** Verdict-overskrift (dansk). */
  overskrift: string;
  /** Forklaring (dansk). */
  forklaring: string;
  /** Anbefalet næste skridt (dansk). */
  naesteSkridt: string;
}

/** Dropdown-valg til UI'et — værdi + visningsnavn. */
export const BYGNINGSTYPER: { value: Bygningstype; label: string }[] = [
  { value: "enfamiliehus", label: "Enfamiliehus" },
  { value: "raekkehus", label: "Rækkehus / kædehus / dobbelthus" },
  { value: "sommerhus", label: "Sommerhus / fritidshus" },
  { value: "etagebolig", label: "Etagebolig" },
  { value: "kontor", label: "Kontorbygning" },
  { value: "handel", label: "Butik / handel" },
  { value: "lager", label: "Lager / hal" },
  { value: "institution", label: "Institution (skole, daginstitution)" },
  { value: "andet", label: "Andet / øvrigt nybyggeri" },
];

/**
 * § 297 stk. 3: tilbygninger UNDER 250 m² er kun undtaget for disse
 * bolig-/ferietyper. Alle andre tilbygninger (erhverv, etagebolig) er
 * omfattet uanset størrelse.
 */
const BOLIG_FRITAGNE_TILBYGNINGSTYPER: Bygningstype[] = [
  "enfamiliehus",
  "raekkehus",
  "sommerhus",
];

/**
 * Mapping fra bygningstype til pris-type (4 buckets i prisformlen).
 * Bemærk: dette er en effort-proxy, ikke en juridisk klassifikation.
 * Defaults — juster hvis faktiske timer afviger:
 *   etagebolig/kontor/handel/institution -> kontor/etage (flere konstruktioner)
 *   andet/øvrigt -> lager/hal (simpel, stor struktur)
 */
export function prisTypeFor(bygningstype: Bygningstype): PrisType {
  switch (bygningstype) {
    case "enfamiliehus":
      return "enfamiliehus";
    case "raekkehus":
      return "raekkehus";
    case "sommerhus":
      return "sommerhus";
    case "lager":
      return "lager";
    case "andet":
      return "lager";
    case "etagebolig":
    case "kontor":
    case "handel":
    case "institution":
      return "kontor";
  }
}

interface Graense {
  std: number;
  lav: number;
}

/** § 298 stk. 1: grænseværdi (standard + lavemission) pr. bygningstype. */
function graenseFor(bygningstype: Bygningstype, m2: number): Graense {
  switch (bygningstype) {
    case "sommerhus":
      return m2 < 150 ? { std: 4.0, lav: 3.2 } : { std: 6.7, lav: 5.4 };
    case "enfamiliehus":
    case "raekkehus":
      return { std: 6.7, lav: 5.4 };
    case "etagebolig":
    case "kontor":
    case "handel":
    case "lager":
      return { std: 7.5, lav: 6.1 };
    case "institution":
    case "andet":
      return { std: 8.0, lav: 6.4 };
  }
}

function b6MetodeFor(input: BR18Input): string {
  if (input.uopvarmet) return "B6 (driftsenergi) sættes til 0 for uopvarmet byggeri.";
  if (input.byggeri === "tilbygning")
    return "Driftsenergi (B6) beregnes med standardværdier (BR18 Tabel 13) — du behøver ikke en energirammeberegning.";
  if (input.bygningstype === "sommerhus")
    return "Driftsenergi (B6) beregnes med standardværdier (BR18 Tabel 12) — du behøver ikke en energirammeberegning.";
  return "Driftsenergi (B6) kræver en energirammeberegning (BE18 / fra 29. maj 2026 den nye EPBD-metode).";
}

/**
 * Hovedfunktionen: vurder et projekt mod BR18 §297/§298.
 * Rækkefølgen er bevidst: helt undtaget -> tilbygnings-bagatel ->
 * samfundskritisk (kun dokumentation) -> lovpligtig med grænseværdi.
 */
export function evaluateBR18(input: BR18Input): BR18Resultat {
  const b6Metode = b6MetodeFor(input);

  // 1) Helt undtaget fra LCA: uopvarmet bygning under 50 m².
  if (input.uopvarmet && input.m2 < 50) {
    return {
      status: "undtaget_helt",
      graensevaerdi: null,
      lavemission: null,
      a4a5: null,
      a4a5Lavemission: null,
      b6Metode,
      overskrift: "Ingen LCA påkrævet",
      forklaring:
        "Uopvarmede bygninger under 50 m² er undtaget fra LCA-kravet i BR18 (§ 297 stk. 2). Du skal ikke lave en klimaberegning for dette projekt.",
      naesteSkridt:
        "Du har ikke et lovkrav her. Er du i tvivl om afgrænsningen, så send os projektet — vi kigger på det uforpligtende.",
    };
  }

  // 2) Tilbygning under 250 m² til bolig/feriebolig: undtaget (§ 297 stk. 3).
  if (
    input.byggeri === "tilbygning" &&
    BOLIG_FRITAGNE_TILBYGNINGSTYPER.includes(input.bygningstype) &&
    input.m2 < 250
  ) {
    return {
      status: "undtaget_tilbygning",
      graensevaerdi: null,
      lavemission: null,
      a4a5: null,
      a4a5Lavemission: null,
      b6Metode,
      overskrift: "Undtaget — tilbygning under 250 m²",
      forklaring:
        "Tilbygninger under 250 m² opvarmet etageareal til enfamiliehuse, række-/kæde-/dobbelthuse og sommerhuse er undtaget fra LCA-kravet (§ 297 stk. 3). Bemærk: dette gælder kun bolig- og ferieboliger — erhverv og etageboliger er omfattet uanset størrelse.",
      naesteSkridt:
        "Du har ikke et lovkrav. Nogle vælger alligevel en frivillig beregning (fx til en bæredygtighedsambition eller bygherre-krav). Vil du have et estimat, så regn videre nedenfor.",
    };
  }

  // 3) Samfundskritisk / industriproduktion: beregningspligt, men ingen
  //    grænseværdi (§ 298 stk. 9-10).
  if (input.samfundskritisk) {
    return {
      status: "kun_dokumentation",
      graensevaerdi: null,
      lavemission: null,
      a4a5: null,
      a4a5Lavemission: null,
      b6Metode,
      overskrift: "LCA skal beregnes og dokumenteres — men der er ingen grænseværdi",
      forklaring:
        "Bygninger som industriproduktion, energi-/vand-/affaldsforsyning, hospitaler, fængsler og forsvarets operative bygninger er undtaget fra grænseværdien (§ 298 stk. 9-10). Du skal stadig udarbejde og indsende selve LCA-beregningen efter § 297 — der er bare ikke et tal, beregningen skal overholde, og dermed intet optimeringskrav.",
      naesteSkridt:
        "Du skal stadig levere en dokumenteret LCA-beregning til byggesagen. Send os projektet, så laver vi den.",
    };
  }

  // 4) Lovpligtig med grænseværdi.
  const g = graenseFor(input.bygningstype, input.m2);
  return {
    status: "lovpligtig",
    graensevaerdi: g.std,
    lavemission: g.lav,
    a4a5: 1.5,
    a4a5Lavemission: 1.1,
    b6Metode,
    overskrift: "Ja — der skal laves en LCA-beregning",
    forklaring: `Projektet er omfattet af BR18's klimakrav (§ 297-298). Den samlede klimapåvirkning (A1-A3, B4, B6, C3-C4) skal holdes under grænseværdien på ${g.std
      .toString()
      .replace(".", ",")} kg CO₂-eq/m²/år. Byggeprocessen (A4+A5) har en separat grænse på 1,5 kg CO₂-eq/m²/år.`,
    naesteSkridt:
      "Du skal dokumentere det med en LCA-beregning til byggesagen. Send os dine tegninger, så får du et fast tilbud og en beregning, der lever op til kravet.",
  };
}
