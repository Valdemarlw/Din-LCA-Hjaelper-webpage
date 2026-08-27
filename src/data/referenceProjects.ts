import type { BlogSection, FAQ } from "./blogPosts";

export type ReferenceProject = {
  slug: string;
  title: string;
  metaTitle?: string;
  description: string;
  type: string;
  location: string;
  etageareal?: string;
  graensevaerdi?: string;
  resultat?: string;
  foer?: string;
  reduktion?: string;
  status: string;
  statusTone?: "success" | "info" | "warning";
  metrics?: {
    label: string;
    value: string;
    unit?: string;
    tone?: "positive" | "negative" | "neutral" | "primary";
  }[];
  journey?: {
    label: string;
    value: string;
    detail: string;
  }[];
  datePublished?: string;
  dateModified?: string;
  highlights: string[];
  content: BlogSection[];
  faqs: FAQ[];
  relatedProjectType: string;
};

export const referenceProjects: ReferenceProject[] = [
  // Ternedalen, sommerhus under 150 m²
  {
    slug: "ternedalen-42",
    title: "Ternedalen: sommerhus-LCA fra 6,88 til 3,839",
    metaTitle: "Sommerhus-LCA: 6,88 til 3,839",
    description:
      "Se den dokumenterede sommerhus-LCA fra 6,88 til 3,839 kg CO₂e/m²/år: fire beregningstrin, hotspots, metode og forbehold før endelig A5.",
    type: "Sommerhus under 150 m²",
    location: "Ternedalen",
    etageareal: "94 m²",
    graensevaerdi: "4,0",
    resultat: "3,839",
    foer: "6,88",
    reduktion: "44,2 %",
    status: "Under grænsen, tidlig fase",
    statusTone: "info",
    metrics: [
      { label: "Første QA", value: "6,88", unit: "kg CO₂e/m²/år", tone: "negative" },
      { label: "Aktuelt resultat", value: "3,839", unit: "kg CO₂e/m²/år", tone: "positive" },
      { label: "BR18-grænse", value: "4,0", unit: "kg CO₂e/m²/år", tone: "neutral" },
      { label: "Samlet forskel", value: "44,2 %", tone: "primary" },
    ],
    journey: [
      {
        label: "Første QA",
        value: "6,88",
        detail: "Den første gennemgang viste, at projektet lå klart over grænsen.",
      },
      {
        label: "Første optimeringsrunde",
        value: "4,38",
        detail: "Designvalg, produkter og levetider blev gennemgået og rettet til projektets faktiske løsninger.",
      },
      {
        label: "Rettelser og EPD'er",
        value: "3,9837",
        detail: "Fundament, installationer og levetider blev korrigeret, og flere produkter fik projektspecifik dokumentation.",
      },
      {
        label: "Aktuelt scenarie",
        value: "3,839",
        detail: "Det seneste scenarie bruger den valgte isolering og ligger 0,161 under grænsen.",
      },
    ],
    datePublished: "2026-08-27",
    dateModified: "2026-08-27",
    highlights: [
      "Tallet faldt ikke på grund af ét materialeskift. Beregningsrettelser, EPD'er, levetider og dokumenterede valg flyttede resultatet samlet.",
      "Den aktuelle rapport er afstemt med LUCA: 15 konstruktioner og 46 lag matcher mellem projekt og rapport.",
      "Resultatet er fra den tidlige fase. A5 og den endelige as-built-opdatering skal stadig afsluttes.",
    ],
    relatedProjectType: "sommerhus",
    content: [
      {
        type: "heading2",
        text: "Kort svar",
      },
      {
        type: "paragraph",
        text: "Den tidlige LCA for sommerhuset startede på 6,88 kg CO₂e/m²/år. Efter gennemgang af beregningen, materialerne, levetiderne og dokumentationen stod det aktuelle scenarie på 3,839 mod BR18-grænsen på 4,0. Det svarer til en forskel på 3,041 eller 44,2 % fra den første QA.",
      },
      {
        type: "heading2",
        text: "Fire dokumenterede trin",
      },
      {
        type: "table",
        headers: ["Trin", "Resultat", "Hvad der skete"],
        rows: [
          ["Første QA", "6,88", "Baseline blev kontrolleret mod projektmaterialet"],
          ["Første optimeringsrunde", "4,38", "Designvalg, produkter og levetider blev gennemgået"],
          ["Rettelser og EPD'er", "3,9837", "Modellen blev rettet, og produktdata blev dokumenteret"],
          ["Aktuelt scenarie", "3,839", "Valgt isolering og korrigerede A4-kategorier"],
        ],
      },
      {
        type: "paragraph",
        text: "Det er en samlet beregnings- og optimeringsrejse. Hele forskellen kan derfor ikke tilskrives EPD'er eller materialeskift. En del kom fra rettelser i beregningsgrundlaget og fra antagelser, der blev gjort synlige og kontrollerbare.",
      },
      {
        type: "paragraph",
        text: "LCA-optimering af et sommerhus begynder derfor med at kontrollere beregningen. Først derefter giver det mening at sammenligne materialer og EPD'er.",
      },
      {
        type: "heading2",
        text: "Hotspots i det aktuelle scenarie",
      },
      {
        type: "paragraph",
        text: "Hotspotanalysen gør det tydeligt, hvor den resterende klimapåvirkning ligger. Terrændækket er stadig den største post, mens fundament, vinduer og tag følger efter.",
      },
      {
        type: "table",
        headers: ["Bygningsdel", "kg CO₂e/m²/år", "Andel"],
        rows: [
          ["Terrændæk", "0,911", "23,7 %"],
          ["Fundament", "0,447", "11,6 %"],
          ["Vinduer", "0,304", "7,9 %"],
          ["Tag", "0,295", "7,7 %"],
        ],
      },
      {
        type: "heading2",
        text: "Sådan blev beregningen bedre",
      },
      {
        type: "list",
        items: [
          "Beregningsgrundlaget blev kontrolleret, så fundament, installationer og mindre lag ikke stod forkert eller manglede.",
          "Produktspecifikke EPD'er blev brugt, hvor de passede til de valgte produkter og kunne erstatte generiske data.",
          "Levetider og udskiftninger blev gennemgået, fordi B4 kan flytte resultatet mærkbart over den 50-årige betragtningsperiode.",
          "Hotspotanalysen styrede indsatsen mod de poster, der faktisk fyldte i projektet.",
        ],
      },
      {
        type: "heading2",
        text: "Evidens og forbehold",
      },
      {
        type: "table",
        headers: ["Kontrol", "Dokumenteret status"],
        rows: [
          ["Rapport mod LUCA", "15 af 15 konstruktioner og 46 af 46 lag matcher"],
          ["Uafhængig kontrol", "Materialeresultatet afviger -0,36 %, og forskellen er forklaret"],
          ["Projektfase", "Tidlig beregning. Endelig A5 og as-built-opdatering udestår"],
          ["Vinduer", "Antagelsen om vinduesudskiftning mangler skriftlig bekræftelse"],
        ],
      },
      {
        type: "paragraph",
        text: "Casen viser, hvorfor en [tidlig LCA-beregning for sommerhuse](/lca-beregning/sommerhus) er nyttig: Der er tid til at rette modellen og undersøge materialerne, før projektet er låst. Se også forklaringen af [hotspotanalyse](/ordbog/hotspot-analyse) og den tidlige analyse fra [Agavevej](/referenceprojekter/agavevej-4a).",
      },
    ],
    faqs: [
      {
        question: "Hvad var grænseværdien i Ternedalen-casen?",
        answer:
          "Sommerhuset er under 150 m², så hovedgrænsen var 4,0 kg CO₂e/m²/år. Det aktuelle scenarie står på 3,839, altså cirka 0,161 eller 4,0 % under grænsen.",
      },
      {
        question: "Kom hele forbedringen fra produktspecifikke EPD'er?",
        answer:
          "Nej. EPD'er var en del af arbejdet, men beregningsrettelser, levetider, materialevalg og dokumenterede antagelser bidrog også. Derfor beskriver vi det som en beregnings- og optimeringsrejse.",
      },
      {
        question: "Er beregningen endelig?",
        answer:
          "Nej. Resultatet er fra den tidlige fase. A5 og beregningen skal opdateres med de faktiske oplysninger fra byggeriet før den endelige aflevering.",
      },
    ],
  },

  // Agavevej, tidlig LCA og hotspotanalyse uden dokumenteret slutresultat
  {
    slug: "agavevej-4a",
    title: "Agavevej: tidlig LCA viste tre klare hotspots",
    metaTitle: "Tidlig LCA og hotspots på Agavevej",
    description:
      "Se den tidlige LCA på 5,87 kg CO₂e/m²/år og hotspotanalysen, hvor tag, terrændæk og fundament stod for 72 %. Siden viser ikke et udokumenteret slutresultat.",
    type: "Tidlig LCA og hotspotanalyse",
    location: "Knebel, Djursland",
    resultat: "5,87",
    status: "Tidlig analyse",
    statusTone: "info",
    metrics: [
      { label: "Tidlig beregning", value: "5,87", unit: "kg CO₂e/m²/år", tone: "neutral" },
      { label: "Største hotspot", value: "43 %", unit: "tag", tone: "primary" },
      { label: "Tre hotspots", value: "72 %", unit: "af den tidlige beregning", tone: "primary" },
    ],
    dateModified: "2026-08-27",
    highlights: [
      "Hotspotanalysen viste præcist, hvilke bygningsdele der fyldte mest i den tidlige beregning.",
      "Taget stod for 43 %, mens terrændæk og fundament bidrog med yderligere 29 %.",
      "Casen dokumenterer en tidlig beregning og en prioritering, ikke et slutresultat.",
    ],
    relatedProjectType: "",
    content: [
      {
        type: "heading2",
        text: "Kort svar",
      },
      {
        type: "paragraph",
        text: "Den tidlige beregning stod på 5,87 kg CO₂e/m²/år. Formålet med analysen var at finde de bygningsdele, der trak mest, så den videre dokumentation og projektering kunne starte det rigtige sted.",
      },
      {
        type: "heading2",
        text: "Tre bygningsdele stod for 72 %",
      },
      {
        type: "paragraph",
        text: "Tag, terrændæk og fundament fyldte mest i den tidlige beregning. Fordelingen gjorde det muligt at prioritere dokumentation og mulige ændringer frem for at gennemgå alle materialer med samme vægt.",
      },
      {
        type: "table",
        headers: ["Bygningsdel", "CO₂-ækv./m²/år", "Andel af total"],
        rows: [
          ["Tagkonstruktion", "2,52", "43 %"],
          ["Terrændæk", "1,10", "19 %"],
          ["Fundament", "0,59", "10 %"],
        ],
      },
      {
        type: "paragraph",
        text: "Taget stod alene for 2,52 kg CO₂e/m²/år. Det gjorde tagets materialer og udskiftninger til det første sted, der skulle undersøges nærmere.",
      },
      {
        type: "heading2",
        text: "Hvad analysen kunne bruges til",
      },
      {
        type: "list",
        items: [
          "Undersøg tagets produktdata og levetider først, fordi taget stod for 43 %.",
          "Afklar beton og isolering i terrændæk og fundament, som tilsammen stod for 29 %.",
          "Brug produktspecifikke EPD'er, når de matcher de produkter, projektet faktisk anvender.",
          "Genberegn efter dokumenterede ændringer i stedet for at fremskrive et forventet slutresultat.",
        ],
      },
      {
        type: "heading2",
        text: "Hvad casen ikke dokumenterer",
      },
      {
        type: "paragraph",
        text: "De tilgængelige projektfiler dokumenterer ikke et senere slutresultat. Bygningstypen og den tilhørende grænseværdi er heller ikke afklaret entydigt i kilderne. Derfor viser siden den tidlige beregning og hotspotanalysen, ikke et dokumenteret slutresultat eller en overholdelsesstatus.",
      },
      {
        type: "paragraph",
        text: "Læs hvordan en [hotspotanalyse](/ordbog/hotspot-analyse) bruges i praksis, eller se den fulde dokumenterede beregningsrejse fra [Ternedalen](/referenceprojekter/ternedalen-42).",
      },
    ],
    faqs: [
      {
        question: "Hvad viser Agavevej-casen?",
        answer:
          "Den viser en tidlig LCA-beregning på 5,87 kg CO₂e/m²/år og en hotspotfordeling, hvor tag, terrændæk og fundament stod for 72 % tilsammen.",
      },
      {
        question: "Hvorfor viser siden ikke en grænseværdi eller et slutresultat?",
        answer:
          "De gennemgåede kilder er ikke entydige om bygningstypen, og de dokumenterer ikke et senere slutresultat. Vi viser derfor kun den beregning og analyse, som kan spores direkte til projektmaterialet.",
      },
    ],
  },

  // ─── Lagerhal i Randers ───
  {
    slug: "lagerhal-laesovej-randers",
    title: "Kold lagerhal i Randers: stål og beton under kontrol",
    description:
      "En uopvarmet lagerhal på 600 m² med stålspær og betondæk bestod LCA-kravet med 16% margin. Resultatet: 6,307 vs. grænsen 7,5 kg CO₂e/m²/år.",
    type: "Lagerhal (uopvarmet)",
    location: "Randers",
    etageareal: "600 m²",
    graensevaerdi: "7,5",
    resultat: "6,307",
    status: "Bestået",
    highlights: [
      "Simple bygninger er ikke altid simple LCA-sager. Stål og beton dominerer CO₂-regnskabet.",
      "Tidlig LCA afslører, hvor valget af leverandør tæller. Stålet alene stod for 30% af aftrykket.",
      "Hotspot-analysen er en handlingsplan. Bygherren ved præcis, hvilke materialer der kræver opmærksomhed.",
    ],
    relatedProjectType: "erhverv",
    content: [
      {
        type: "heading2",
        text: "Udfordringen",
      },
      {
        type: "paragraph",
        text: "Bygherren stod med en kold lagerhal på 600 m², der skulle have byggetilladelse. Byggeriet var simpelt, stålspær, metalplader og et betondæk, men BR18 kræver LCA-dokumentation uanset bygningens kompleksitet.",
      },
      {
        type: "paragraph",
        text: "Udfordringen var dobbelt: For det første var stålspærene endnu ikke bestilt, så deres præcise klimaaftryk var ukendt. For det andet kan simple industribygninger med meget stål og beton overraske, fordi netop de materialer har høj CO₂-belastning pr. kg, og der er ingen isolering eller lette materialer til at \"fortynde\" aftrykket.",
      },
      {
        type: "paragraph",
        text: "Bygherren ville vide, om projektet kunne overholde kravet, inden han gik videre med bestillingen.",
      },
      {
        type: "heading2",
        text: "Hotspot-analyse",
      },
      {
        type: "paragraph",
        text: "Vores analyse afslørede, at tre konstruktionsgrupper tilsammen stod for 72% af den samlede klimapåvirkning:",
      },
      {
        type: "table",
        headers: ["Bygningsdel", "CO₂-ækv./m²/år", "Andel af total"],
        rows: [
          ["Søjler og bjælker (stål)", "1,88", "30%"],
          ["Terrændæk (beton + stabilgrus)", "1,39", "22%"],
          ["Fundamenter (fundablokke + beton)", "1,24", "20%"],
        ],
      },
      {
        type: "paragraph",
        text: "Stålet var den største post. Søjler og bjælker alene stod for næsten en tredjedel af hele bygningens CO₂-aftryk, udelukkende fra produktionsfasen (A1-3). Det er typisk for industribygninger, hvor den bærende stålkonstruktion udgør en markant andel af den samlede materialemasse.",
      },
      {
        type: "paragraph",
        text: "Beton fyldte mere end forventet. Terrændæk og fundamenter bidrog tilsammen med 42%. Selvom konstruktionerne er relativt simple, 120 mm fiberarmeret beton på 250 mm stabilgrus, giver de store arealer (575 m² terrændæk, 110 lbm fundament) et betydeligt samlet volumen beton.",
      },
      {
        type: "paragraph",
        text: "Taget havde skjult end-of-life-belastning. Tagkonstruktionen havde en lav produktionsfase (A1-3: 0,24), men høj affaldsbehandling (C3: 0,49) og bortskaffelse (C4: 0,28). Metalplader og stålspær kræver energikrævende genanvendelse ved nedrivning.",
      },
      {
        type: "heading2",
        text: "Løsningen",
      },
      {
        type: "paragraph",
        text: "Da byggeriet endnu ikke var startet, fokuserede vi på at levere et klart beslutningsgrundlag:",
      },
      {
        type: "list",
        items: [
          "Stålspær med standardværdier: Fordi stålspærene ikke var bestilt endnu, beregnede vi med generiske værdier for konstruktionsstål. Det gav bygherren et konservativt estimat at forholde sig til, og en klar besked om, at valget af stålleverandør kan flytte resultatet mærkbart.",
          "Konstruktionsdata fra leverandør: Bygherren leverede produktdata direkte fra Stark, inklusiv åsetømmer, beslag, skruer og metalplader. Det betød, at vi kunne modellere den faktiske konstruktion frem for at gætte.",
          "Ingen energi i beregningen: Bygningen er kold og uopvarmet, så driftsenergien (B6) udgik. Det forenklede beregningen, men fjernede samtidig en \"buffer\", al klimapåvirkning kommer fra materialerne alene.",
        ],
      },
      {
        type: "heading2",
        text: "Resultatet",
      },
      {
        type: "paragraph",
        text: "Projektet bestod med 16% margin. Det er nok til at give tryghed, men ikke så meget, at man kan ignorere materialevalgene i udførelsesfasen. Når stålspærene bestilles og de faktiske EPD'er kendes, opdateres beregningen, og marginen kan enten vokse eller skrumpe.",
      },
      {
        type: "heading2",
        text: "Hvad projektet viser",
      },
      {
        type: "list",
        items: [
          "Simple bygninger er ikke altid simple LCA-sager. En kold lagerhal uden isolering lyder ukompliceret, men stål og beton dominerer CO₂-regnskabet og kan presse resultatet tættere på grænsen, end du forventer.",
          "Tidlig LCA afslører, hvor valget af leverandør tæller. Når stålet alene står for 30% af aftrykket, kan forskellen mellem to stålleverandørers EPD'er flytte resultatet markant.",
          "Hotspot-analysen er en handlingsplan. Bygherren ved nu præcis, hvilke materialer der kræver opmærksomhed, og hvilke der er ubetydelige for det samlede resultat.",
        ],
      },
    ],
    faqs: [
      {
        question: "Kræver uopvarmede lagerhaller også LCA?",
        answer:
          "Ja. Fra juli 2025 er alle uopvarmede bygninger over 50 m² omfattet af LCA-kravet og skal overholde grænseværdien på 7,5 kg CO₂e/m²/år.",
      },
      {
        question: "Hvad koster en LCA-beregning for en lagerhal?",
        answer:
          "A4/A5-beregning og dokumentation er inkluderet. Industri- og erhvervsprojekter prissættes efter omfang og kompleksitet. Send tegninger for et fast tilbud inden 24 timer.",
      },
    ],
  },

  // ─── Lagerhal og kontor i Esbjerg ───
  {
    slug: "he-bluhmesvej-67",
    title: "Lagerhal og kontor i Esbjerg: LCA under tidspres",
    description:
      "To erhvervsbygninger, lagerhal (1.296 m²) og kontor (1.299 m²), bestod begge LCA-kravet. Byggeriet var allerede i gang, så fokus lå på EPD-dokumentation af de valgte materialer.",
    type: "Lagerhal og kontor (erhverv)",
    location: "Esbjerg",
    etageareal: "1.296 + 1.299 m²",
    graensevaerdi: "7,5",
    resultat: "6,84 / 6,18",
    status: "Bestået",
    highlights: [
      "Start LCA-beregningen tidligt. Uden mulighed for at ændre konstruktioner var EPD-dokumentation det eneste redskab.",
      "EPD'er er ikke bare \"nice to have\". Med en margin på 0,66 ville Bygning 1 sandsynligvis ikke have bestået med Tabel 7-værdier.",
      "To bygninger = dobbelt kompleksitet. Forskellige konstruktioner kræver separat beregning og tættere koordinering.",
    ],
    relatedProjectType: "erhverv",
    content: [
      {
        type: "heading2",
        text: "Udfordringen",
      },
      {
        type: "paragraph",
        text: "Entreprenøren henvendte sig med et kombineret lager- og kontorprojekt i Esbjerg, to separate bygninger med vidt forskellige konstruktioner. Lagerhallen var en stålkonstruktion med sandwich-paneler, mens kontordelen var en mere traditionel konstruktion med beton og mineraluld.",
      },
      {
        type: "paragraph",
        text: "Det særlige ved dette projekt var, at byggeriet allerede var gået i gang, da LCA-beregningen blev bestilt. Det skabte et tidspres, som normalt ikke er der: materialerne var valgt, bestilt og i nogle tilfælde allerede monteret. Der var ikke plads til at skifte konstruktioner, beregningen skulle dokumentere det, der faktisk blev bygget.",
      },
      {
        type: "paragraph",
        text: "Det betød, at hele forløbet handlede om at skaffe produktspecifikke EPD'er til de materialer, der allerede var på vej ind i bygningen. Uden EPD'er ville beregningen falde tilbage på generiske Tabel 7-værdier, som typisk er mere konservative, og med et resultat tæt på grænsen ville det kunne betyde forskellen mellem bestået og ikke bestået.",
      },
      {
        type: "heading2",
        text: "Overblik",
      },
      {
        type: "table",
        headers: ["", "Bygning 1 (Lagerhal)", "Bygning 2 (Kontor)"],
        rows: [
          ["Etageareal", "1.296 m²", "1.299 m²"],
          ["Opvarmet areal", "188 m²", "290 m²"],
          ["Opvarmning", "Fjernvarme", "Fjernvarme"],
          ["Grænseværdi", "7,5 kg CO₂e/m²/år", "7,5 kg CO₂e/m²/år"],
          ["Resultat", "6,84 kg CO₂e/m²/år", "6,18 kg CO₂e/m²/år"],
          ["Status", "Bestået", "Bestået"],
        ],
      },
      {
        type: "heading2",
        text: "Hotspot-analyse",
      },
      {
        type: "paragraph",
        text: "Hotspot-analysen for Bygning 1 (lagerhallen) viste følgende fordeling:",
      },
      {
        type: "table",
        headers: ["Bygningsdel", "CO₂-ækv./m²/år", "Andel af total"],
        rows: [
          ["Terrændæk", "1,51", "27%"],
          ["Tage", "1,03", "18%"],
          ["Fundamenter", "0,89", "16%"],
          ["Vinduer, døre, glasfacader", "0,80", "14%"],
          ["Ydervægge", "0,60", "11%"],
        ],
      },
      {
        type: "paragraph",
        text: "Terrændæk, tag og fundamenter stod tilsammen for 61% af klimaaftrykket. For en lagerhal med stort grundareal er terrændækket typisk den største post, fordi der er meget betongulv i forhold til den samlede konstruktion.",
      },
      {
        type: "paragraph",
        text: "Ydervæggene, sandwich-paneler med mineraluld, bidrog med 11%, hvilket er relativt lavt for den type bygning.",
      },
      {
        type: "heading2",
        text: "Løsningen",
      },
      {
        type: "paragraph",
        text: "Da konstruktionerne allerede var fastlagt, fokuserede vi udelukkende på dokumentation:",
      },
      {
        type: "list",
        items: [
          "Sandwich-paneler: Entreprenøren brugte Balex sandwich-paneler med mineraluldskerne. Vi indhentede producentens EPD, som dokumenterede lavere klimaaftryk end den generiske Tabel 7-værdi for tilsvarende paneler.",
          "Beton og fundamenter: Produktspecifikke EPD'er fra betonleverandøren erstattede de generiske værdier. For fundamenter og terrændæk, som tilsammen udgjorde 43% af aftrykket, var dette den vigtigste enkeltstående indsats.",
          "Systematisk EPD-indsamling: Fordi byggeriet kørte parallelt, koordinerede vi løbende med entreprenøren for at indhente EPD'er, efterhånden som leverandørerne blev valgt. Det krævede tæt kommunikation og hurtig opfølgning.",
        ],
      },
      {
        type: "heading2",
        text: "Resultatet",
      },
      {
        type: "table",
        headers: ["", "Bygning 1", "Bygning 2"],
        rows: [
          ["Resultat", "6,84 kg CO₂e/m²/år", "6,18 kg CO₂e/m²/år"],
          ["Grænseværdi", "7,5 kg CO₂e/m²/år", "7,5 kg CO₂e/m²/år"],
          ["Margin", "0,66 under grænsen", "1,32 under grænsen"],
          ["Status", "Bestået", "Bestået"],
        ],
      },
      {
        type: "paragraph",
        text: "Begge bygninger bestod, men med en margin på kun 0,66 for lagerhallen. Det understreger, at projektet ikke havde meget plads at give af, og at de produktspecifikke EPD'er var afgørende for at komme under grænsen.",
      },
      {
        type: "heading2",
        text: "Hvad projektet viser",
      },
      {
        type: "list",
        items: [
          "Start LCA-beregningen tidligt. Da byggeriet her var startet før LCA'en, var der ingen mulighed for at ændre konstruktioner. Det eneste redskab var EPD-dokumentation, og det var kun lige nok. Havde beregningen været lavet før byggestart, kunne man have optimeret de største hotspots og fået en større margin.",
          "EPD'er er ikke bare \"nice to have\". Med en margin på 0,66 kg CO₂e/m²/år ville Bygning 1 sandsynligvis ikke have bestået med rene Tabel 7-værdier. Produktspecifikke EPD'er var forskellen mellem godkendt og ikke godkendt.",
          "Erhvervsbyggeri har sin egen dynamik. Store etagearealer med lavt opvarmet areal, stålkonstruktioner og sandwich-paneler giver en anden hotspot-profil end boligbyggeri. Terrændæk og fundamenter dominerer, fordi hallens grundplan er stort i forhold til klimaskærmen.",
          "To bygninger = dobbelt kompleksitet. Med forskellige konstruktioner i lager- og kontordelen skal hver bygning beregnes separat. Det kræver mere data, flere EPD'er og tættere koordinering med entreprenøren.",
        ],
      },
    ],
    faqs: [
      {
        question: "Kan man stadig bestå LCA, selvom byggeriet allerede er i gang?",
        answer:
          "Ja, men mulighederne er begrænsede. Når konstruktionerne er fastlagt, handler det udelukkende om at dokumentere de valgte materialer med produktspecifikke EPD'er. Det kan være nok, som i dette projekt, men marginen bliver typisk mindre, end hvis LCA'en var lavet tidligt nok til at optimere.",
      },
      {
        question: "Hvad koster LCA for to erhvervsbygninger?",
        answer:
          "Prisen afhænger af kompleksiteten. To separate bygninger kræver to separate beregninger. Kontakt os med tegninger for et samlet tilbud inden 24 timer.",
      },
    ],
  },
];

export function getReferenceProject(slug: string): ReferenceProject | undefined {
  return referenceProjects.find((rp) => rp.slug === slug);
}
