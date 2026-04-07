import type { BlogSection, FAQ } from "./blogPosts";

export type ProjectType = {
  slug: string;
  title: string;
  description: string;
  grensevaerdi: string;
  a45Grense: string;
  content: BlogSection[];
  faqs: FAQ[];
};

export const projectTypes: ProjectType[] = [
  // ─── Enfamiliehus ───
  {
    slug: "enfamiliehus",
    title: "LCA-beregning for enfamiliehuse",
    description:
      "Komplet LCA-beregning for enfamiliehuse, rækkehuse og stuehuse efter BR18. Grænseværdi 6,7 kg CO₂e/m²/år. Priser fra 3.500 kr.",
    grensevaerdi: "6,7",
    a45Grense: "1,5",
    content: [
      {
        type: "paragraph",
        text: "Alle nye enfamiliehuse i Danmark skal have en LCA-beregning efter [BR18](/ordbog/br18). [Grænseværdien](/ordbog/graensevaerdi) er 6,7 kg CO₂e/m²/år for stuehuse, fritliggende enfamiliehuse, rækkehuse, kædehuse og dobbelthuse. Byggeprocessen (A4+A5) skal desuden overholde en separat grænse på 1,5 kg CO₂e/m²/år.",
      },
      {
        type: "paragraph",
        text: "Grænsen på 6,7 er sat ud fra, at danske helårshuse traditionelt bygges med tungere materialer som tegl, porebeton og betonfundamenter. Det betyder, at du godt kan bygge i tegl og stadig overholde kravet, hvis du er opmærksom på de rigtige steder i projektet.",
      },
      {
        type: "heading2",
        text: "Hvad indgår i grænseværdien?",
      },
      {
        type: "paragraph",
        text: "Hovedgrænseværdien på 6,7 dækker modulerne [A1-A3](/ordbog/modul-a1-a3) (materialeproduktion), [B4](/ordbog/modul-b4) (udskiftning af bygningsdele), [B6](/ordbog/modul-b6) (driftsenergi) og [C3-C4](/ordbog/modul-c3-c4) (affaldsbehandling og deponering). [Betragtningsperioden](/ordbog/betragtningsperiode) er 50 år. Byggeprocessen (transport og opførelse) har sit eget regnskab med grænsen 1,5.",
      },
      {
        type: "heading2",
        text: "Hvor ligger CO₂-udfordringerne i et enfamiliehus?",
      },
      {
        type: "paragraph",
        text: "De bygningsdele, der typisk fylder mest i CO₂-regnskabet, er:",
      },
      {
        type: "list",
        items: [
          "Fundament og terrændæk: Beton og armering er de tungeste poster i de fleste projekter.",
          "Ydervægge: Tegl kan overholde grænsen fint, men det er vigtigt at vælge produkter med lave produktspecifikke EPD'er. Teglproducenter, der fx bruger biogas i ovnene, har markant lavere CO₂-aftryk end gennemsnittet.",
          "Tagkonstruktion og tagbelægning: Betontagsten bidrager mere end fx metaltagplader. Valget af tagbelægning kan gøre en stor forskel.",
          "Vinduer og glaspartier: Store glasarealer bidrager mere end mindre vinduer.",
        ],
      },
      {
        type: "paragraph",
        text: "En [hotspot-analyse](/ordbog/hotspot-analyse) tidligt i projektet viser præcis, hvilke dele der kræver opmærksomhed. Det vigtigste redskab er [produktspecifikke EPD'er](/ordbog/produktspecifikke-data): de erstatter bygningsreglementets konservative standardværdier med de faktiske tal fra producenten og kan trække regnskabet markant ned.",
      },
      {
        type: "heading2",
        text: "Tilbygninger til enfamiliehuse",
      },
      {
        type: "paragraph",
        text: "For tilbygninger til enfamiliehuse, rækkehuse og stuehuse gælder en bagatelgrænse: tilbygninger under 250 m² opvarmet etageareal er helt fritaget for LCA-kravet. Først ved 250 m² opvarmet etageareal eller derover skal tilbygningen overholde grænseværdien på 6,7. Ombygninger og renoveringer er ikke omfattet.",
      },
      {
        type: "heading2",
        text: "Processen for dit enfamiliehus",
      },
      {
        type: "list",
        items: [
          "Send tegninger og konstruktionsbeskrivelser til os",
          "Vi giver fast tilbud inden 24 timer",
          "Tidlig LCA-beregning med [hotspot-analyse](/blog/hvad-er-lca-beregning) og materialeforslag",
          "A45-platformen sættes op til [A4/A5-dokumentation](/blog/a4-a5-dokumentation)",
          "Beregningen opdateres med faktiske mængder ved færdigmelding",
          "Myndighedsklar rapport klar til kommunen",
        ],
      },
      {
        type: "paragraph",
        text: "Den tidlige beregning og hotspot-analyse tager typisk 1-2 uger fra modtaget materiale. Selve LCA-forløbet løber dog hele vejen til færdigmelding, hvor vi opdaterer beregningen med faktiske mængder fra det færdige byggeri. Læs mere om [hvad en LCA-beregning indeholder](/blog/hvad-er-lca-beregning) eller se [alle grænseværdier](/blog/graensevaerdier-co2).",
      },
    ],
    faqs: [
      {
        question: "Hvad koster en LCA-beregning for et enfamiliehus?",
        answer:
          "Prisen starter fra 3.500 kr inkl. adgang til A45-platformen. Den endelige pris afhænger af projektets størrelse og antal konstruktionstyper. Send os dine tegninger, så giver vi et fast tilbud inden 24 timer.",
      },
      {
        question: "Kan mit enfamiliehus i tegl overholde grænseværdien?",
        answer:
          "Ja. Grænsen på 6,7 er designet til at rumme traditionelt dansk byggeri med tegl og beton. Det vigtigste er at vælge teglprodukter med lave produktspecifikke EPD'er og holde øje med fundament og tagbelægning. En tidlig hotspot-analyse viser, om der er behov for justeringer.",
      },
      {
        question:
          "Gælder LCA-kravet også for rækkehuse og dobbelthuse?",
        answer:
          "Ja. Rækkehuse, kædehuse, dobbelthuse og stuehuse er i samme kategori som enfamiliehuse i BR18 og skal overholde den samme grænseværdi på 6,7 kg CO₂e/m²/år.",
      },
    ],
  },

  // ─── Sommerhus ───
  {
    slug: "sommerhus",
    title: "LCA-beregning for sommerhuse",
    description:
      "LCA-beregning for sommerhuse, campinghytter og ferieboliger. Grænseværdi 4,0 (under 150 m²) eller 6,7 (over 150 m²). Priser fra 3.500 kr.",
    grensevaerdi: "4,0 / 6,7",
    a45Grense: "1,5",
    content: [
      {
        type: "paragraph",
        text: "Sommerhuse, campinghytter og lignende ferieboliger har de strengeste CO₂-krav i [BR18](/ordbog/br18). For ferieboliger med under 150 m² opvarmet etageareal er [grænseværdien](/ordbog/graensevaerdi) 4,0 kg CO₂e/m²/år. Ferieboliger med 150 m² opvarmet etageareal eller derover følger grænsen 6,7. Begge typer skal desuden overholde den separate A4+A5-grænse på 1,5.",
      },
      {
        type: "paragraph",
        text: "Den lave grænse stiller store krav til materialevalg. Hos Din LCA Hjælper kender vi udfordringerne og hjælper dig med at ramme grænsen fra projektets start.",
      },
      {
        type: "heading2",
        text: "Hvorfor er grænsen strengere for sommerhuse?",
      },
      {
        type: "paragraph",
        text: "Grænsen på 4,0 afspejler, at traditionelle sommerhuse under 150 m² typisk opføres som lette træbyggerier med lette fundamenter, fx skruefundamenter. Den type konstruktion har et lavt CO₂-aftryk, og lovgivningen er sat derefter.",
      },
      {
        type: "paragraph",
        text: "Til sammenligning bruger helårshuse typisk tungere materialer som tegl, porebeton og dybe betonfundamenter, og de har strengere krav til brandsikring og lydisolering. Det presser CO₂-regnskabet op, og derfor er grænsen for enfamiliehuse sat til 6,7.",
      },
      {
        type: "paragraph",
        text: "Ferieboliger med 150 m² opvarmet etageareal eller derover får samme grænse som enfamiliehuse (6,7), fordi store sommerhuse i praksis bygges efter samme standarder som helårshuse med støbte gulve, tunge partier og store glasfacader.",
      },
      {
        type: "heading2",
        text: "Typiske udfordringer",
      },
      {
        type: "list",
        items: [
          "Betonfundamenter kan alene bruge en stor del af CO₂-budgettet. Skruefundamenter eller lette funderingsløsninger er ofte nødvendige.",
          "Tunge ydervægge i mursten eller beton er problematiske. Lette trækonstruktioner med mineraluld klarer sig bedre.",
          "Tagkonstruktionen er en typisk hotspot. Betontagsten har en høj CO₂-profil, og tagpap kan også fylde i regnskabet, medmindre du vælger et produkt med en god [EPD](/ordbog/epd).",
          "Isoleringsmaterialer har betydning: EPS/XPS har en højere CO₂-profil end mineraluld eller træfiber.",
        ],
      },
      {
        type: "heading2",
        text: "Sådan overholder du grænseværdien",
      },
      {
        type: "paragraph",
        text: "Grænsen på 4,0 kræver gennemtænkte materialevalg, men det betyder ikke, at du er begrænset til én byggemetode. Nøglen er at starte tidligt og vælge materialer med lave CO₂-aftryk:",
      },
      {
        type: "list",
        items: [
          "Bestil en [LCA-beregning](/blog/hvad-er-lca-beregning) allerede i skitsefasen",
          "Brug [hotspot-analysen](/ordbog/hotspot-analyse) til at finde de 2-3 bygningsdele, der bidrager mest",
          "Vælg produkter med [produktspecifikke EPD'er](/ordbog/produktspecifikke-data) i stedet for [generiske standardværdier](/ordbog/generiske-data). Det kan sænke CO₂-aftrykket markant i [A1-A3](/ordbog/modul-a1-a3)",
          "Overvej grøn beton, hvor cement delvist er erstattet af fx flyveaske, for at reducere betonens CO₂-bidrag",
          "Vælg isolering med lav CO₂-profil (mineraluld, træfiber)",
          "Brug lokale materialer for at reducere [A4-bidraget](/blog/a4-a5-dokumentation)",
        ],
      },
      {
        type: "heading2",
        text: "Processen for dit sommerhus",
      },
      {
        type: "list",
        items: [
          "Send tegninger og konstruktionsbeskrivelser til os",
          "Vi giver fast tilbud inden 24 timer",
          "Tidlig LCA-beregning med [hotspot-analyse](/blog/hvad-er-lca-beregning) og materialeforslag",
          "A45-platformen sættes op til [A4/A5-dokumentation](/blog/a4-a5-dokumentation)",
          "Beregningen opdateres med faktiske mængder ved færdigmelding",
          "Myndighedsklar rapport klar til kommunen",
        ],
      },
      {
        type: "heading2",
        text: "Tilbygninger til sommerhuse",
      },
      {
        type: "paragraph",
        text: "Tilbygninger til sommerhuse og ferieboliger under 250 m² opvarmet etageareal er fritaget for LCA-kravet. Ved 250 m² eller derover gælder samme grænseværdi som hovedbygningen. Ombygninger og renoveringer er ikke omfattet.",
      },
      {
        type: "heading2",
        text: "Typisk CO₂-fordeling i et sommerhus",
      },
      {
        type: "table",
        headers: ["Bygningsdel", "Andel af samlet CO₂"],
        rows: [
          ["Fundament og terrændæk", "25-35%"],
          ["Ydervægge inkl. isolering", "20-30%"],
          ["Tagkonstruktion", "15-25%"],
          ["Vinduer og døre", "10-15%"],
          ["Øvrige bygningsdele", "10-15%"],
        ],
      },
      {
        type: "paragraph",
        text: "Tallene varierer fra projekt til projekt, men mønsteret er tydeligt: fundamentet og de bærende konstruktioner står for størstedelen. Optimeringen skal fokuseres her. Se vores [referenceprojekt for et sommerhus i Knebel](/referenceprojekter/agavevej-4a), hvor vi reducerede CO₂-aftrykket med 40% via produktspecifikke EPD'er. Se den [komplette oversigt over grænseværdier](/blog/graensevaerdier-co2) for alle bygningstyper.",
      },
    ],
    faqs: [
      {
        question: "Hvornår gælder grænsen 4,0 og hvornår 6,7?",
        answer:
          "Sommerhuse, campinghytter og lignende ferieboliger under 150 m² opvarmet etageareal skal overholde 4,0 kg CO₂e/m²/år. Er ferieboligen 150 m² eller derover, gælder grænsen 6,7.",
      },
      {
        question: "Kan et sommerhus med beton overholde 4,0-grænsen?",
        answer:
          "Det er udfordrende, men det kan lade sig gøre med de rigtige valg. Nøglen er at bruge betonprodukter med lave produktspecifikke EPD'er, fx grøn beton hvor cement delvist er erstattet af flyveaske. Det reducerer CO₂-aftrykket direkte i A1-A3 modulerne. Hold de øvrige bygningsdele lette, og bestil en tidlig hotspot-analyse, som viser om projektet kan nå 4,0 med den valgte konstruktion.",
      },
      {
        question: "Hvad koster en LCA-beregning for et sommerhus?",
        answer:
          "Prisen starter fra 3.500 kr inkl. A45-adgang. Den endelige pris afhænger af projektets kompleksitet. Send dine tegninger, så giver vi et fast tilbud inden 24 timer.",
      },
    ],
  },

  // ─── Erhverv ───
  {
    slug: "erhverv",
    title: "LCA-beregning for erhverv og kontor",
    description:
      "LCA-beregning for kontorbygninger, handel, lager og erhvervsbyggeri. Grænseværdi 7,5 kg CO₂e/m²/år. Priser fra 3.500 kr.",
    grensevaerdi: "7,5",
    a45Grense: "1,5",
    content: [
      {
        type: "paragraph",
        text: "Kontorer, handel, lager og lignende erhvervsbyggeri skal overholde en [grænseværdi](/ordbog/graensevaerdi) på 7,5 kg CO₂e/m²/år efter [BR18](/ordbog/br18). Byggeprocessen (A4+A5) har en separat grænse på 1,5. Kravet gælder for alt nybyggeri, og uopvarmede lagerbygninger og haller over 50 m² opvarmet etageareal er også omfattet.",
      },
      {
        type: "paragraph",
        text: "Hos Din LCA Hjælper har vi erfaring med erhvervsprojekter op til 3.000 m². Vi laver en tidlig beregning med hotspot-analyse, så du kender CO₂-profilen, før byggeriet går i gang.",
      },
      {
        type: "heading2",
        text: "Hvilke bygninger er omfattet?",
      },
      {
        type: "paragraph",
        text: "I BR18 er kontorer, handel og lager samlet i kategorien \"Etageboliger, samt kontor, handel, lager og lignende\" med en fælles grænseværdi på 7,5. Grænseværdien dækker modulerne [A1-A3](/ordbog/modul-a1-a3) (materialeproduktion), [B4](/ordbog/modul-b4) (udskiftning), [B6](/ordbog/modul-b6) (driftsenergi) og [C3-C4](/ordbog/modul-c3-c4) (endt levetid) over en 50-årig [betragtningsperiode](/ordbog/betragtningsperiode).",
      },
      {
        type: "paragraph",
        text: "Uopvarmede bygninger som lagerhaller er også omfattet, hvis de er over 50 m². Uopvarmede bygninger under 50 m² er helt fritaget. Grænsen gælder uanset om bygningen er opvarmet eller ej.",
      },
      {
        type: "heading2",
        text: "Hvor ligger CO₂-udfordringerne i erhvervsbyggeri?",
      },
      {
        type: "paragraph",
        text: "Erhvervsbyggeri bruger typisk mere beton og stål end boligbyggeri. De vigtigste poster i CO₂-regnskabet er:",
      },
      {
        type: "list",
        items: [
          "Bærende konstruktioner: Søjle-bjælkesystemer, etagedæk og trapper i beton og stål udgør typisk den største CO₂-post. Vælg produkter med lave [produktspecifikke EPD'er](/ordbog/produktspecifikke-data) for at reducere bidraget.",
          "Facadeløsninger: Glasfacader og tunge facadeelementer kræver opmærksomhed. Lette facadesystemer kan reducere regnskabet.",
          "Parkeringskældre: Konstruktioner under terræn er betontunge og bidrager væsentligt.",
          "Driftsenergi (modul B6): Ventilationsanlæg og kølesystemer i kontorbygninger påvirker energiforbruget over den 50-årige betragtningsperiode.",
        ],
      },
      {
        type: "paragraph",
        text: "Med en grænse på 7,5 er der god plads til at bygge i beton og stål, hvis du bruger produktspecifikke EPD'er og er opmærksom på de tungeste poster. En tidlig [hotspot-analyse](/ordbog/hotspot-analyse) viser, hvor optimeringen giver mest effekt.",
      },
      {
        type: "heading2",
        text: "Tilbygninger til erhverv",
      },
      {
        type: "paragraph",
        text: "For erhvervsbyggeri gælder ingen bagatelgrænse. Alle tilbygninger til kontorer, handel, institutioner og lager er omfattet af LCA-kravet, uanset tilbygningens størrelse. Det adskiller sig fra boligbyggeri, hvor tilbygninger under 250 m² opvarmet etageareal er fritaget. Ombygninger og renoveringer er ikke omfattet.",
      },
      {
        type: "heading2",
        text: "Processen for dit erhvervsprojekt",
      },
      {
        type: "list",
        items: [
          "Send tegninger og konstruktionsbeskrivelser",
          "Vi giver fast tilbud inden 24 timer",
          "Tidlig LCA-beregning med [hotspot-analyse](/blog/hvad-er-lca-beregning)",
          "A45-platformen sættes op til [A4/A5-dokumentation](/blog/a4-a5-dokumentation)",
          "Beregningen opdateres med faktiske mængder ved færdigmelding",
          "Myndighedsklar rapport klar til kommunen",
        ],
      },
      {
        type: "paragraph",
        text: "Vi håndterer erhvervsprojekter op til 3.000 m². Se vores referenceprojekter: en [kold lagerhal i Randers](/referenceprojekter/lagerhal-laesovej-randers) med 16% margin og et [kombineret lager- og kontorprojekt i Esbjerg](/referenceprojekter/he-bluhmesvej-67) med to separate bygninger. Læs mere om de [nye klimakrav fra 2025](/blog/klimakrav-2025) eller se [alle grænseværdier](/blog/graensevaerdier-co2).",
      },
    ],
    faqs: [
      {
        question: "Hvad koster en LCA-beregning for erhvervsbyggeri?",
        answer:
          "Prisen starter fra 3.500 kr inkl. A45-adgang. Erhvervsprojekter er typisk mere komplekse end boliger, og prisen afhænger af areal, antal konstruktionstyper og kompleksitet. Send tegninger for et fast tilbud inden 24 timer.",
      },
      {
        question: "Gælder kravet også for uopvarmede haller og lagre?",
        answer:
          "Ja. Fra juli 2025 er uopvarmede bygninger over 50 m² omfattet af LCA-kravet og skal overholde grænseværdien 7,5 kg CO₂e/m²/år. Bygninger under 50 m² er fritaget.",
      },
      {
        question: "Hvad er forskellen på erhverv og 'øvrigt nybyggeri'?",
        answer:
          "Kontorer, handel og lager har grænsen 7,5. Kategorien 'øvrigt nybyggeri' dækker institutioner, skoler, børnehaver og parkeringshuse og har en lidt højere grænse på 8,0 kg CO₂e/m²/år.",
      },
    ],
  },
];

export function getProjectType(slug: string): ProjectType | undefined {
  return projectTypes.find((pt) => pt.slug === slug);
}
