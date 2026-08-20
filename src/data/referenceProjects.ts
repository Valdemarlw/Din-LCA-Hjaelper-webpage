import type { BlogSection, FAQ } from "./blogPosts";

export type ReferenceProject = {
  slug: string;
  title: string;
  metaTitle?: string;
  description: string;
  type: string;
  location: string;
  etageareal?: string;
  graensevaerdi: string;
  resultat: string;
  foer?: string;
  reduktion?: string;
  status: string;
  highlights: string[];
  content: BlogSection[];
  faqs: FAQ[];
  relatedProjectType: string;
};

export const referenceProjects: ReferenceProject[] = [
  // ─── Sommerhus i Knebel ───
  {
    slug: "agavevej-4a",
    title: "Sommerhus i Knebel: fra 47% over grænsen til godkendt",
    metaTitle: "Sommerhus i Knebel, 40 % lavere CO₂",
    description:
      "Et sommerhus under 150 m² startede med 5,87 kg CO₂e/m²/år, 47% over grænsen på 4,0. Med hotspot-analyse og produktspecifikke EPD'er landede resultatet på 3,538. En reduktion på 40% uden designændringer.",
    type: "Sommerhus under 150 m²",
    location: "Knebel, Djursland",
    graensevaerdi: "4,0",
    resultat: "3,538",
    foer: "5,87",
    reduktion: "40%",
    status: "Bestået",
    highlights: [
      "Generiske værdier er konservative. Produktspecifikke EPD'er afspejler virkeligheden og kan sænke resultatet markant.",
      "Hotspot-analysen er afgørende. Ved at fokusere på de 3 største bidragsydere fik vi størst effekt med mindst mulig ændring.",
      "Sommerhuse kræver tidlig LCA. Med en grænse på 4,0 er der ikke meget plads til fejl.",
    ],
    relatedProjectType: "sommerhus",
    content: [
      {
        type: "heading2",
        text: "Udfordringen",
      },
      {
        type: "paragraph",
        text: "Arkitekten stod med et sommerhusprojekt i Knebel, der skulle overholde BR18's strengeste grænseværdi: 4,0 kg CO₂e/m²/år for ferieboliger under 150 m² opvarmet etageareal.",
      },
      {
        type: "paragraph",
        text: "Den første LCA-beregning viste 5,87, hele 47% over grænsen. Projektet kunne ikke godkendes uden ændringer.",
      },
      {
        type: "heading2",
        text: "Hotspot-analyse",
      },
      {
        type: "paragraph",
        text: "Vores hotspot-analyse identificerede tre bygningsdele, der tilsammen stod for 72% af det samlede CO₂-aftryk:",
      },
      {
        type: "table",
        headers: ["Bygningsdel", "CO₂-ækv./m²/år", "Andel af total"],
        rows: [
          ["Tagkonstruktion (tagpap)", "2,52", "43%"],
          ["Terrændæk (EPS + beton)", "1,10", "19%"],
          ["Fundamenter (beton + letklinker)", "0,59", "10%"],
        ],
      },
      {
        type: "paragraph",
        text: "Taget var den klare synder. Tagpappen, overpap og underpap i bitumen, stod alene for 43% af det samlede CO₂-regnskab. Med udskiftning over 50 år (modul B4) fordoblede bidraget sig næsten.",
      },
      {
        type: "heading2",
        text: "En strukturel udfordring",
      },
      {
        type: "paragraph",
        text: "Projektet havde en overdækning (carport/terrasseoverdækning), der gav en ekstra udfordring: ifølge BR18 tæller overdækninger kun med 25% af arealet i referenceberegningen, men materialerne tæller 100%.",
      },
      {
        type: "paragraph",
        text: "Det betyder, at der reelt var \"mere bygning\" end referencearealet afspejlede, og CO₂-budgettet blev tilsvarende strammere.",
      },
      {
        type: "heading2",
        text: "Løsningen",
      },
      {
        type: "paragraph",
        text: "I stedet for at redesigne projektet fokuserede vi på at erstatte generiske beregningsværdier med produktspecifikke EPD'er fra de faktiske producenter:",
      },
      {
        type: "list",
        items: [
          "Tagpap: Vi fandt en producent med en markant lavere EPD-værdi end den generiske Tabel 7-værdi. Den generiske værdi på 5,69 kg CO₂/m² blev erstattet med producentens dokumenterede tal.",
          "Genbrugsmaterialer: Der blev tilføjet genbrugsmaterialer i projektet, som bidrog med lavere CO₂-aftryk end konventionelle alternativer.",
          "Terrændæk: Skift fra hvid EPS til grå EPS med produktspecifik EPD gav yderligere besparelser.",
          "Beton og fundamenter: Produktspecifikke EPD'er fra betonleverandøren erstattede de konservative generiske værdier.",
        ],
      },
      {
        type: "heading2",
        text: "Resultatet",
      },
      {
        type: "table",
        headers: ["", "Før", "Efter"],
        rows: [
          ["Samlet CO₂", "5,87 kg CO₂e/m²/år", "3,538 kg CO₂e/m²/år"],
          ["Afstand til grænse", "+47% over", "Under grænsen"],
          ["Status", "Ikke godkendt", "Bestået"],
        ],
      },
      {
        type: "paragraph",
        text: "En reduktion på 40%, uden at ændre projektets design eller konstruktion. Forskellen lå udelukkende i at dokumentere de faktiske materialer med produktspecifikke EPD'er og optimere de største hotspots.",
      },
      {
        type: "heading2",
        text: "Hvad projektet viser",
      },
      {
        type: "list",
        items: [
          "Generiske værdier er konservative. Tabel 7-værdierne har sikkerhedsmarginer indlagt. Produktspecifikke EPD'er afspejler virkeligheden og kan sænke resultatet markant.",
          "Hotspot-analysen er afgørende. Ved at fokusere indsatsen på de 3 største bidragsydere (tag, terrændæk, fundament) fik vi størst effekt med mindst mulig ændring.",
          "Sommerhuse kræver tidlig LCA. Med en grænse på 4,0 er der ikke meget plads til fejl. Jo tidligere beregningen laves, jo flere muligheder er der for at justere.",
        ],
      },
    ],
    faqs: [
      {
        question: "Hvad kostede LCA-optimeringen for dette sommerhus?",
        answer:
          "En komplet beregning for et typisk enfamiliehus eller sommerhus koster 5.000-7.000 kr ekskl. moms. A4/A5-beregning og dokumentation er inkluderet. Optimering med produktspecifikke EPD'er er en del af vores standardydelse.",
      },
      {
        question: "Kan alle sommerhuse optimeres så meget?",
        answer:
          "Potentialet afhænger af, hvor langt den generiske beregning er fra grænsen, og hvilke materialer der bruges. I dette projekt var der stor forskel mellem generiske og produktspecifikke værdier for tagpappen. Andre projekter kan have mindre potentiale, men en hotspot-analyse viser altid, hvor mulighederne ligger.",
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
