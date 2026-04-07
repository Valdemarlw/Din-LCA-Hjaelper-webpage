import type { BlogSection, FAQ } from "./blogPosts";

export type GlossaryTerm = {
  slug: string;
  term: string;
  shortDefinition: string;
  content: BlogSection[];
  faqs: FAQ[];
  relatedTerms: string[];
  relatedBlogPosts: string[];
};

export const glossaryTerms: GlossaryTerm[] = [
  // ─── Tier 1: High priority ───

  {
    slug: "epd",
    term: "EPD (Environmental Product Declaration)",
    shortDefinition:
      "En EPD er en frivillig, tredjepartsverificeret miljøvaredeklaration, der dokumenterer en byggevares klimapåvirkning efter standarden DS/EN 15804.",
    content: [
      {
        type: "heading2",
        text: "Hvad er en EPD?",
      },
      {
        type: "paragraph",
        text: "EPD står for Environmental Product Declaration — på dansk miljøvaredeklaration. Det er en frivillig, tredjepartsverificeret rapport, der dokumenterer en byggevares miljømæssige påvirkninger og ressourceforbrug over hele dens livscyklus.",
      },
      {
        type: "paragraph",
        text: "For at en EPD kan bruges i en [LCA-beregning](/blog/hvad-er-lca-beregning) efter BR18, skal den følge den europæiske standard DS/EN 15804 (enten +A1 eller +A2). En EPD er typisk gyldig i 5 år fra udstedelsesdatoen.",
      },
      {
        type: "heading2",
        text: "Hvorfor er EPD'er vigtige i LCA?",
      },
      {
        type: "paragraph",
        text: "I en LCA-beregning kan du enten bruge [generiske data](/ordbog/generiske-data) fra bygningsreglementets bilag 2 eller [produktspecifikke data](/ordbog/produktspecifikke-data) fra EPD'er. EPD-data er næsten altid lavere end de generiske værdier, fordi de afspejler producentens faktiske produktionsforhold.",
      },
      {
        type: "paragraph",
        text: "Det betyder, at skiftet fra generiske data til EPD-dokumenterede produkter kan give en markant forbedring af bygningens klimaregnskab — uden at ændre selve materialevalgene. Se vores case fra [sommerhuset i Knebel](/referenceprojekter/agavevej-4a), hvor EPD'er reducerede resultatet med 40%.",
      },
      {
        type: "heading2",
        text: "Typer af EPD'er",
      },
      {
        type: "list",
        items: [
          "Produktspecifik EPD: Dokumenterer ét bestemt produkt fra én producent",
          "Projektspecifik EPD: Udarbejdet til et konkret byggeprojekt",
          "Branche-EPD: Dækker en hel produktkategori med gennemsnitsdata fra flere producenter",
        ],
      },
      {
        type: "heading2",
        text: "Sådan bruges EPD'er i praksis",
      },
      {
        type: "paragraph",
        text: "Når vi laver en [hotspot-analyse](/ordbog/hotspot-analyse), identificerer vi de bygningsdele med størst klimapåvirkning. For disse poster undersøger vi, om der findes EPD'er for de valgte produkter. Hvis ja, erstatter vi de generiske data med EPD-data i [LCAbyg](/ordbog/lcabyg), og resultatet forbedres typisk mærkbart.",
      },
    ],
    faqs: [
      {
        question: "Er det et krav at bruge EPD'er i LCA-beregningen?",
        answer:
          "Nej, det er frivilligt. BR18 tillader både generiske data og EPD-data. Men generiske data er bevidst sat konservativt højt, så EPD'er giver næsten altid et bedre resultat.",
      },
      {
        question: "Hvor finder du EPD'er for byggematerialer?",
        answer:
          "EPD'er kan findes i databaser som EPD Danmark, ECO Platform og hos de enkelte producenter. Mange store producenter har EPD'er tilgængelige på deres hjemmeside.",
      },
    ],
    relatedTerms: [
      "generiske-data",
      "produktspecifikke-data",
      "gwp",
      "co2-aekvivalenter",
      "en-15978",
    ],
    relatedBlogPosts: ["hvad-er-lca-beregning", "graensevaerdier-co2"],
  },

  {
    slug: "graensevaerdi",
    term: "Grænseværdi",
    shortDefinition:
      "Grænseværdien er den maksimalt tilladte CO₂-udledning pr. m² pr. år for et byggeri efter BR18. Værdien afhænger af bygningstypen.",
    content: [
      {
        type: "heading2",
        text: "Hvad er en grænseværdi i LCA?",
      },
      {
        type: "paragraph",
        text: "Grænseværdien er det lovpligtige loft for et byggeris klimapåvirkning målt i kg [CO₂-ækvivalenter](/ordbog/co2-aekvivalenter) pr. m² [etageareal](/ordbog/etageareal) pr. år. Byggeriet skal dokumentere, at det samlede [GWP](/ordbog/gwp)-resultat ligger under grænseværdien for at opnå ibrugtagningstilladelse.",
      },
      {
        type: "heading2",
        text: "Grænseværdier fra 1. juli 2025",
      },
      {
        type: "paragraph",
        text: "Fra 1. juli 2025 gælder differentierede [grænseværdier efter bygningstype](/blog/graensevaerdier-co2):",
      },
      {
        type: "table",
        headers: ["Bygningstype", "Grænseværdi (kg CO₂e/m²/år)"],
        rows: [
          ["Sommerhuse under 150 m²", "4,0"],
          ["Sommerhuse 150 m² og over, enfamiliehuse, rækkehuse", "6,7"],
          ["Etageboliger, kontor, handel, lager", "7,5"],
          ["Øvrigt nybyggeri (skoler, institutioner, p-huse)", "8,0"],
        ],
      },
      {
        type: "heading2",
        text: "Separat grænseværdi for byggeprocessen",
      },
      {
        type: "paragraph",
        text: "Ud over hovedgrænseværdien gælder en separat grænseværdi på 1,5 kg CO₂e/m²/år for byggeprocessen ([modul A4](/ordbog/modul-a4) + [modul A5](/ordbog/modul-a5)). Denne grænse er ens for alle bygningstyper og opgøres som et selvstændigt regnskab.",
      },
      {
        type: "heading2",
        text: "Hvilke moduler indgår i hovedgrænseværdien?",
      },
      {
        type: "paragraph",
        text: "Hovedgrænseværdien summerer modulerne [A1-A3](/ordbog/modul-a1-a3) (produktion), [B4](/ordbog/modul-b4) (udskiftning), [B6](/ordbog/modul-b6) (driftsenergi) og [C3-C4](/ordbog/modul-c3-c4) (endt levetid). [Modul D](/ordbog/modul-d) skal deklareres separat, men tæller ikke med i grænseværdien.",
      },
    ],
    faqs: [
      {
        question: "Hvad sker der, hvis grænseværdien overskrides?",
        answer:
          "Kommunen kan nægte ibrugtagningstilladelse. Byggeriet betragtes som ulovligt, indtil forholdet er lovliggjort. Derfor anbefaler vi altid en tidlig hotspot-analyse.",
      },
      {
        question: "Kan du modregne besparelser mellem hovedgrænsen og byggeprocessen?",
        answer:
          "Nej. Hovedgrænseværdien og byggeprocessens grænseværdi (1,5 kg CO₂e/m²/år) er helt separate regnskaber. Besparelser i det ene kan ikke trækkes fra det andet.",
      },
    ],
    relatedTerms: [
      "co2-aekvivalenter",
      "gwp",
      "etageareal",
      "br18",
      "modul-a1-a3",
    ],
    relatedBlogPosts: ["graensevaerdier-co2", "klimakrav-2025"],
  },

  {
    slug: "hotspot-analyse",
    term: "Hotspot-analyse",
    shortDefinition:
      "En hotspot-analyse sorterer bygningsdelene efter klimapåvirkning og viser, hvor det har størst effekt at optimere materialevalgene.",
    content: [
      {
        type: "heading2",
        text: "Hvad er en hotspot-analyse?",
      },
      {
        type: "paragraph",
        text: "En hotspot-analyse er et værktøj i [LCA-beregningen](/blog/hvad-er-lca-beregning), der rangerer bygningsdelene efter størrelsen af deres klimapåvirkning. Formålet er hurtigt at synliggøre de elementer — fx fundament, etagedæk eller facadeisolering — som bidrager allermest til projektets samlede CO₂-regnskab.",
      },
      {
        type: "heading2",
        text: "Hvorfor er hotspot-analysen vigtig?",
      },
      {
        type: "paragraph",
        text: "Ved at identificere de tunge poster ved du præcis, hvor det giver størst effekt at fokusere på klimavenlige materialevalg. I stedet for at optimere tilfældigt kan du målrette indsatsen mod de 3-5 bygningsdele, der typisk udgør 60-80% af den samlede klimabelastning.",
      },
      {
        type: "paragraph",
        text: "Et typisk eksempel: Et fundament i traditionel beton kan udgøre op til 30% af et enfamiliehus' samlede [GWP](/ordbog/gwp). Ved at skifte til en beton med lavere CO₂-aftryk, dokumenteret via en [EPD](/ordbog/epd), kan du reducere resultatet mærkbart.",
      },
      {
        type: "heading2",
        text: "Hvornår laves hotspot-analysen?",
      },
      {
        type: "paragraph",
        text: "Hotspot-analysen bør laves tidligt i projektet — helst i designfasen — så materialevalgene stadig kan ændres. Hos Din LCA Hjælper inkluderer vi altid en hotspot-analyse som en del af den tidlige LCA-screening.",
      },
    ],
    faqs: [
      {
        question: "Er hotspot-analyse et lovkrav?",
        answer:
          "Nej, hotspot-analyse er ikke et selvstændigt lovkrav. Men det er et centralt værktøj til at sikre, at byggeriet overholder grænseværdien, og det er god praksis hos professionelle LCA-rådgivere.",
      },
      {
        question: "Hvad koster en hotspot-analyse?",
        answer:
          "Hos Din LCA Hjælper er hotspot-analysen inkluderet i alle LCA-beregninger. Den er en fast del af vores tidlige screening, som danner grundlag for materialeoptimering.",
      },
    ],
    relatedTerms: ["epd", "gwp", "graensevaerdi", "modul-a1-a3", "lcabyg"],
    relatedBlogPosts: ["hvad-er-lca-beregning", "graensevaerdier-co2"],
  },

  {
    slug: "br18",
    term: "BR18 (Bygningsreglementet 2018)",
    shortDefinition:
      "BR18 er det danske bygningsreglement, der bl.a. stiller krav om LCA-beregning og CO₂-grænseværdier for nybyggeri.",
    content: [
      {
        type: "heading2",
        text: "Hvad er BR18?",
      },
      {
        type: "paragraph",
        text: "BR18 (Bygningsreglementet 2018) er det gældende danske bygningsreglement, der fastsætter de tekniske krav til byggeri i Danmark. Reglementet dækker alt fra konstruktion og brand til energi og indeklima — og siden 2023 også klimakrav i form af lovpligtig [LCA-beregning](/blog/hvad-er-lca-beregning).",
      },
      {
        type: "heading2",
        text: "Hvad kræver BR18 om LCA?",
      },
      {
        type: "paragraph",
        text: "BR18 kræver, at der ved opførelse af nybyggeri og større tilbygninger udarbejdes en livscyklusvurdering (LCA), der opgør bygningens samlede klimapåvirkning. Beregningen skal:",
      },
      {
        type: "list",
        items: [
          "Udføres efter standarden [EN 15978](/ordbog/en-15978)",
          "Dække en [betragtningsperiode](/ordbog/betragtningsperiode) på 50 år",
          "Omfatte modulerne [A1-A3](/ordbog/modul-a1-a3), [A4](/ordbog/modul-a4)+[A5](/ordbog/modul-a5), [B4](/ordbog/modul-b4), [B6](/ordbog/modul-b6), [C3-C4](/ordbog/modul-c3-c4) og [D](/ordbog/modul-d)",
          "Afspejle det faktisk opførte byggeri (as-built data) ved færdigmelding",
          "Overholde de gældende [grænseværdier](/ordbog/graensevaerdi) for bygningstypen",
        ],
      },
      {
        type: "heading2",
        text: "Hvornår gælder LCA-kravet?",
      },
      {
        type: "paragraph",
        text: "Fra 1. juli 2025 er LCA-beregning lovpligtigt for stort set alt nybyggeri, uopvarmede bygninger over 50 m² samt tilbygninger (med undtagelse af boligtilbygninger under 250 m²). Uden godkendt LCA-rapport kan kommunen nægte ibrugtagningstilladelse. Læs mere om de [nye klimakrav](/blog/klimakrav-2025).",
      },
    ],
    faqs: [
      {
        question: "Gælder BR18's klimakrav for renovering?",
        answer:
          "Nej. Almindelige ombygninger, renoveringer og udskiftninger på eksisterende byggeri er fritaget fra LCA-kravene. Kravet gælder kun nybyggeri og tilbygninger over de angivne bagatelgrænser.",
      },
      {
        question: "Hvad er datagrundlaget i BR18?",
        answer:
          "BR18 kræver enten produktspecifikke EPD'er efter DS/EN 15804 eller bygningsreglementets egne generiske data fra bilag 2, tabel 7. De generiske værdier er bevidst sat konservativt højt.",
      },
    ],
    relatedTerms: [
      "graensevaerdi",
      "en-15978",
      "betragtningsperiode",
      "lcabyg",
      "epd",
    ],
    relatedBlogPosts: ["klimakrav-2025", "graensevaerdier-co2"],
  },

  {
    slug: "modul-a1-a3",
    term: "Modul A1-A3 (Produktionsfasen)",
    shortDefinition:
      "Modul A1-A3 dækker klimapåvirkningen fra udvinding af råmaterialer, transport til fabrik og fremstilling af byggematerialer.",
    content: [
      {
        type: "heading2",
        text: "Hvad er modul A1-A3?",
      },
      {
        type: "paragraph",
        text: "Modul A1-A3 er de tre første moduler i en bygnings livscyklus efter [EN 15978](/ordbog/en-15978). Tilsammen udgør de produktionsfasen — fra råmaterialeudvinding til det færdige byggeprodukt forlader fabrikken.",
      },
      {
        type: "heading3",
        text: "De tre delmoduler",
      },
      {
        type: "list",
        items: [
          "A1: Udvinding af råmaterialer samt brug af sekundære materialer",
          "A2: Transport af råmaterialer til fabrik",
          "A3: Selve fremstillingsprocessen af det færdige byggeprodukt",
        ],
      },
      {
        type: "heading2",
        text: "Betydning i LCA-beregningen",
      },
      {
        type: "paragraph",
        text: "Modul A1-A3 er typisk den største enkeltpost i en bygnings klimaregnskab og indgår direkte i [grænseværdien](/ordbog/graensevaerdi). Det er ofte her, en [hotspot-analyse](/ordbog/hotspot-analyse) viser det største optimeringspotentiale — eksempelvis ved at vælge byggematerialer med lavere CO₂-aftryk dokumenteret via [EPD'er](/ordbog/epd).",
      },
      {
        type: "paragraph",
        text: "I [LCAbyg](/ordbog/lcabyg) beregnes A1-A3 automatisk ud fra de valgte materialer og mængder. Man kan bruge enten [generiske data](/ordbog/generiske-data) eller [produktspecifikke data](/ordbog/produktspecifikke-data).",
      },
    ],
    faqs: [
      {
        question: "Hvorfor rapporteres A1-A3 samlet?",
        answer:
          "A1, A2 og A3 rapporteres samlet, fordi EPD'er typisk opgiver produktionsfasens klimapåvirkning som én samlet værdi. Standarden EN 15804 tillader dette, da de tre processer hænger tæt sammen.",
      },
    ],
    relatedTerms: [
      "epd",
      "generiske-data",
      "produktspecifikke-data",
      "graensevaerdi",
      "en-15978",
    ],
    relatedBlogPosts: ["hvad-er-lca-beregning", "graensevaerdier-co2"],
  },

  {
    slug: "modul-a4",
    term: "Modul A4 (Transport til byggeplads)",
    shortDefinition:
      "Modul A4 dækker klimapåvirkningen fra transport af byggematerialer og tungt materiel fra fabrik/forhandler til byggepladsen.",
    content: [
      {
        type: "heading2",
        text: "Hvad er modul A4?",
      },
      {
        type: "paragraph",
        text: "Modul A4 er en del af byggefasen i [EN 15978](/ordbog/en-15978) og dækker den logistiske klimapåvirkning fra transport ind til byggepladsen. Sammen med [modul A5](/ordbog/modul-a5) udgør det byggeprocessen, der har sin egen [grænseværdi](/ordbog/graensevaerdi) på 1,5 kg CO₂e/m²/år.",
      },
      {
        type: "heading2",
        text: "Hvad indgår i modul A4?",
      },
      {
        type: "list",
        items: [
          "Transport af byggematerialer fra fabrik eller grossist til byggepladsen, inkl. eventuel midlertidig oplagring",
          "Transport af tungt materiel som stilladser, kraner og maskiner (over 1 ton) til og fra byggepladsen",
        ],
      },
      {
        type: "heading2",
        text: "Dokumentation af A4-data",
      },
      {
        type: "paragraph",
        text: "A4-dokumentation kræver oplysninger om transportafstande og transportform fra leverandører. Læs mere om [A4 og A5 dokumentation](/blog/a4-a5-dokumentation) og hvordan A45-platformen gør dataindsamlingen enklere.",
      },
    ],
    faqs: [
      {
        question: "Er modul A4 en del af hovedgrænseværdien?",
        answer:
          "Nej. Modul A4 indgår sammen med A5 i en separat grænseværdi for byggeprocessen på 1,5 kg CO₂e/m²/år. Det er et selvstændigt regnskab, adskilt fra hovedgrænseværdien.",
      },
    ],
    relatedTerms: [
      "modul-a5",
      "graensevaerdi",
      "br18",
      "en-15978",
      "modul-a1-a3",
    ],
    relatedBlogPosts: ["a4-a5-dokumentation", "klimakrav-2025"],
  },

  {
    slug: "modul-a5",
    term: "Modul A5 (Opførelse og montering)",
    shortDefinition:
      "Modul A5 dækker klimapåvirkningen fra aktiviteter på byggepladsen: energiforbrug, materialespild, byggeaffald og bortkørsel.",
    content: [
      {
        type: "heading2",
        text: "Hvad er modul A5?",
      },
      {
        type: "paragraph",
        text: "Modul A5 dækker selve byggeaktiviteten på pladsen og er sammen med [modul A4](/ordbog/modul-a4) underlagt den separate [grænseværdi](/ordbog/graensevaerdi) for byggeprocessen på 1,5 kg CO₂e/m²/år.",
      },
      {
        type: "heading2",
        text: "Hvad indgår i modul A5?",
      },
      {
        type: "list",
        items: [
          "Energi- og brændstofforbrug til belysning, udtørring af råhus, skurvogne og maskiner over 1 ton",
          "Produktion og håndtering af byggeaffald samt afskær og materialespild på pladsen",
          "Bortkørsel og transport af affaldsfraktioner og overskudsjord fra byggepladsen til modtagealæg/deponi",
        ],
      },
      {
        type: "heading2",
        text: "Dokumentation af A5-data",
      },
      {
        type: "paragraph",
        text: "A5 kræver data fra underentreprenører om brændstofforbrug, el-forbrug og affaldsmængder. A45-platformen gør det nemt at indsamle disse data automatisk. Læs mere om [A4 og A5 dokumentation](/blog/a4-a5-dokumentation).",
      },
    ],
    faqs: [
      {
        question: "Hvad fylder typisk mest i A5?",
        answer:
          "Byggeaffald fylder typisk mest og udgør ca. 38% af den samlede byggeproces (A4+A5), efterfulgt af energiforbrug på pladsen (27%) og bortkørsel af affald (8%). De resterende 27% er transport ind til pladsen, som hører under modul A4.",
      },
    ],
    relatedTerms: [
      "modul-a4",
      "graensevaerdi",
      "br18",
      "en-15978",
      "modul-a1-a3",
    ],
    relatedBlogPosts: ["a4-a5-dokumentation", "klimakrav-2025"],
  },

  {
    slug: "modul-b4",
    term: "Modul B4 (Udskiftning)",
    shortDefinition:
      "Modul B4 dækker klimapåvirkningen ved udskiftning af bygningsdele med kortere levetid end betragtningsperioden på 50 år.",
    content: [
      {
        type: "heading2",
        text: "Hvad er modul B4?",
      },
      {
        type: "paragraph",
        text: "Modul B4 hører til brugsfasen i [EN 15978](/ordbog/en-15978) og opgør klimapåvirkningen, når bygningsdele skal udskiftes inden for [betragtningsperioden](/ordbog/betragtningsperiode) på 50 år. Hvis et materiale fx har en forventet levetid på 25 år, vil det skulle udskiftes én gang i løbet af de 50 år.",
      },
      {
        type: "heading2",
        text: "Hvordan beregnes B4?",
      },
      {
        type: "paragraph",
        text: "Klimapåvirkningen for en udskiftning beregnes som summen af produktion af den nye byggevare ([modul A1-A3](/ordbog/modul-a1-a3)) og affaldsbehandling af den gamle ([modul C3-C4](/ordbog/modul-c3-c4)). Transport (A4) og montering (A5) medregnes ikke i B4-udskiftningen.",
      },
      {
        type: "heading2",
        text: "Typiske B4-poster",
      },
      {
        type: "paragraph",
        text: "Bygningsdele med kortere levetid end 50 år, som typisk bidrager til B4, inkluderer tagbeklædning, vinduer, fuger, maling og visse installationer. Ved at vælge materialer med længere levetid kan du reducere B4-bidraget.",
      },
    ],
    faqs: [
      {
        question: "Indgår modul B4 i grænseværdien?",
        answer:
          "Ja. B4 indgår i hovedgrænseværdien sammen med A1-A3, B6 og C3-C4. Det er en del af det samlede klimaregnskab, der holdes op mod den bygningstype-specifikke grænse.",
      },
    ],
    relatedTerms: [
      "betragtningsperiode",
      "modul-a1-a3",
      "modul-c3-c4",
      "graensevaerdi",
      "en-15978",
    ],
    relatedBlogPosts: ["hvad-er-lca-beregning", "graensevaerdier-co2"],
  },

  {
    slug: "modul-b6",
    term: "Modul B6 (Driftsenergi)",
    shortDefinition:
      "Modul B6 dækker klimapåvirkningen fra bygningens energiforbrug til opvarmning, køling, ventilation og belysning over 50 år.",
    content: [
      {
        type: "heading2",
        text: "Hvad er modul B6?",
      },
      {
        type: "paragraph",
        text: "Modul B6 hører til brugsfasen i [EN 15978](/ordbog/en-15978) og opgør klimapåvirkningen fra den energi, bygningen forbruger til drift i hele [betragtningsperioden](/ordbog/betragtningsperiode) på 50 år.",
      },
      {
        type: "heading2",
        text: "Hvad dækker B6?",
      },
      {
        type: "list",
        items: [
          "Opvarmning (fjernvarme, gas, varmepumpe m.m.)",
          "Køling og ventilation",
          "Varmt brugsvand",
          "Belysning",
        ],
      },
      {
        type: "paragraph",
        text: "Energibehovet bestemmes typisk via bygningens energirammeberegning og omregnes til CO₂-udledning via fremskrevne emissionsfaktorer for el, fjernvarme og gas. For uopvarmede bygninger (fx lagerhaller) sættes B6 til 0.",
      },
      {
        type: "heading2",
        text: "B6 i grænseværdien",
      },
      {
        type: "paragraph",
        text: "Modul B6 indgår i hovedgrænseværdien sammen med [A1-A3](/ordbog/modul-a1-a3), [B4](/ordbog/modul-b4) og [C3-C4](/ordbog/modul-c3-c4). Driftsenergi kan udgøre en væsentlig andel af det samlede resultat, især for bygninger med højt energiforbrug.",
      },
    ],
    faqs: [
      {
        question: "Hvad er B6 for uopvarmede bygninger?",
        answer:
          "For uopvarmede bygninger som lagerhaller og parkeringshuse sættes driftsenergien (B6) til 0 i LCA-beregningen, da der ikke er energiforbrug til opvarmning eller køling.",
      },
    ],
    relatedTerms: [
      "betragtningsperiode",
      "modul-a1-a3",
      "modul-b4",
      "graensevaerdi",
      "en-15978",
    ],
    relatedBlogPosts: ["hvad-er-lca-beregning", "graensevaerdier-co2"],
  },

  {
    slug: "modul-c3-c4",
    term: "Modul C3-C4 (Endt levetid)",
    shortDefinition:
      "Modul C3-C4 dækker klimapåvirkningen fra affaldsbehandling (C3) og endelig bortskaffelse/deponi (C4) af byggematerialer efter nedrivning.",
    content: [
      {
        type: "heading2",
        text: "Hvad er modul C3-C4?",
      },
      {
        type: "paragraph",
        text: "Modul C3 og C4 hører til fasen for endt levetid i [EN 15978](/ordbog/en-15978). De dækker den del af nedrivningsfasen, der indgår i klimakravene efter [BR18](/ordbog/br18).",
      },
      {
        type: "heading3",
        text: "C3: Forbehandling af affald",
      },
      {
        type: "paragraph",
        text: "C3 opgør klimapåvirkningen fra affaldsbehandling og forbehandling forud for genbrug eller genanvendelse — fx sortering, knusning eller oparbejdning af byggematerialer.",
      },
      {
        type: "heading3",
        text: "C4: Bortskaffelse",
      },
      {
        type: "paragraph",
        text: "C4 opgør klimapåvirkningen fra den endelige bortskaffelse af affald, som ikke genanvendes — typisk deponi eller forbrænding.",
      },
      {
        type: "heading2",
        text: "Hvad medregnes ikke?",
      },
      {
        type: "paragraph",
        text: "Selve nedrivningen (C1) og transporten af affald fra byggepladsen (C2) medregnes ikke i LCA-kravet i BR18. Kun C3 og C4 indgår i [grænseværdien](/ordbog/graensevaerdi).",
      },
    ],
    faqs: [
      {
        question: "Hvad er forskellen på C3-C4 og modul D?",
        answer:
          "C3-C4 opgør klimapåvirkningen fra selve affaldshåndteringen og tæller med i grænseværdien. Modul D opgør det potentielle klimagevinst ved genanvendelse i næste livscyklus, men tæller ikke med i grænseværdien.",
      },
    ],
    relatedTerms: [
      "modul-d",
      "modul-a1-a3",
      "modul-b4",
      "graensevaerdi",
      "en-15978",
    ],
    relatedBlogPosts: ["hvad-er-lca-beregning", "graensevaerdier-co2"],
  },

  {
    slug: "modul-d",
    term: "Modul D (Genanvendelsespotentiale)",
    shortDefinition:
      "Modul D opgør de potentielle klimagevinster ved genbrug og genanvendelse af byggematerialer uden for bygningens livscyklus. Det skal deklareres, men tæller ikke i grænseværdien.",
    content: [
      {
        type: "heading2",
        text: "Hvad er modul D?",
      },
      {
        type: "paragraph",
        text: "Modul D ligger uden for bygningens egentlige systemgrænse i [EN 15978](/ordbog/en-15978). Det angiver de potentielle miljømæssige gevinster (eller belastninger), der opstår i den næste livscyklus — fx når byggematerialer kan genbruges, genanvendes eller forbrændes til energiindvinding.",
      },
      {
        type: "heading2",
        text: "Modul D og grænseværdien",
      },
      {
        type: "paragraph",
        text: "Modul D skal opgøres og deklareres separat i LCA-rapporten, men resultatet må ikke trækkes fra bygningens samlede klimapåvirkning. Det tæller altså ikke med i vurderingen af, om byggeriet overholder [grænseværdien](/ordbog/graensevaerdi) i [BR18](/ordbog/br18).",
      },
      {
        type: "heading2",
        text: "Eksempler på modul D",
      },
      {
        type: "list",
        items: [
          "Stålkonstruktioner, der kan genbruges direkte i nyt byggeri",
          "Beton, der kan knuses og genanvendes som tilslagsmateriale",
          "Træ, der forbrændes og erstatter fossile brændsler til fjernvarme",
        ],
      },
    ],
    faqs: [
      {
        question: "Hvorfor tæller modul D ikke med i grænseværdien?",
        answer:
          "Modul D repræsenterer fremtidige, potentielle gevinster, som endnu ikke er realiserede. Da det er usikkert, om materialerne faktisk genanvendes, holdes det separat for at undgå, at bygherrer 'regner sig fri' med antagelser om fremtidigt genbrug.",
      },
    ],
    relatedTerms: [
      "modul-c3-c4",
      "modul-a1-a3",
      "graensevaerdi",
      "en-15978",
      "br18",
    ],
    relatedBlogPosts: ["hvad-er-lca-beregning", "graensevaerdier-co2"],
  },

  // ─── Tier 2: Supporting terms ───

  {
    slug: "generiske-data",
    term: "Generiske data",
    shortDefinition:
      "Generiske data er konservative gennemsnitsværdier for byggematerialers klimapåvirkning, fastsat i BR18 bilag 2, tabel 7.",
    content: [
      {
        type: "heading2",
        text: "Hvad er generiske data?",
      },
      {
        type: "paragraph",
        text: "Generiske data er standardværdier for byggematerialers klimapåvirkning, som er fastsat af myndighederne i [BR18](/ordbog/br18) bilag 2, tabel 7. De dækker brede materialekategorier (fx 'beton' eller 'tegl') og bruges, når der ikke foreligger [produktspecifikke data](/ordbog/produktspecifikke-data) fra en [EPD](/ordbog/epd).",
      },
      {
        type: "heading2",
        text: "Hvorfor er generiske data konservative?",
      },
      {
        type: "paragraph",
        text: "De generiske værdier er bevidst sat højt, så en bygnings klimapåvirkning ikke undervurderes, når specifikke tal mangler. Det fungerer som et incitament til at bruge produktspecifikke EPD-data, der næsten altid giver et lavere og mere retvisende resultat.",
      },
      {
        type: "heading2",
        text: "Generiske data vs. EPD-data",
      },
      {
        type: "paragraph",
        text: "Forskellen kan være betydelig. I vores [referenceprojekt fra Knebel](/referenceprojekter/agavevej-4a) gik resultatet fra 5,87 til 3,538 kg CO₂e/m²/år — en reduktion på 40% — alene ved at erstatte generiske data med produktspecifikke EPD'er for de mest klimatunge poster.",
      },
    ],
    faqs: [
      {
        question: "Hvornår skal du bruge generiske data?",
        answer:
          "Generiske data bruges, når der ikke findes en gyldig EPD for det valgte produkt. I den tidlige designfase er generiske data ofte den eneste mulighed, fordi materialevalgene endnu ikke er fastlagt.",
      },
    ],
    relatedTerms: [
      "produktspecifikke-data",
      "epd",
      "br18",
      "modul-a1-a3",
      "lcabyg",
    ],
    relatedBlogPosts: ["hvad-er-lca-beregning", "graensevaerdier-co2"],
  },

  {
    slug: "produktspecifikke-data",
    term: "Produktspecifikke data",
    shortDefinition:
      "Produktspecifikke data stammer fra en EPD og dokumenterer det præcise klimaaftryk for ét bestemt produkt fra én bestemt producent.",
    content: [
      {
        type: "heading2",
        text: "Hvad er produktspecifikke data?",
      },
      {
        type: "paragraph",
        text: "Produktspecifikke data stammer fra en [EPD (miljøvaredeklaration)](/ordbog/epd) og dokumenterer det faktiske klimaaftryk for ét konkret produkt fra en bestemt producent. I modsætning til [generiske data](/ordbog/generiske-data) afspejler de producentens reelle produktionsforhold og optimeringer.",
      },
      {
        type: "heading2",
        text: "Fordele ved produktspecifikke data",
      },
      {
        type: "list",
        items: [
          "Mere retvisende klimaresultat end generiske gennemsnitsværdier",
          "Næsten altid lavere CO₂-aftryk end generiske data",
          "Belønner producenter, der investerer i bæredygtig produktion",
          "Kan være afgørende for at overholde [grænseværdien](/ordbog/graensevaerdi)",
        ],
      },
      {
        type: "heading2",
        text: "Krav til produktspecifikke data i BR18",
      },
      {
        type: "paragraph",
        text: "For at produktspecifikke data kan bruges i en LCA-beregning efter [BR18](/ordbog/br18), skal de stamme fra en EPD udført efter standarden DS/EN 15804. EPD'en skal være gyldig (ikke udløbet) og dække det specifikke produkt, der anvendes i byggeriet.",
      },
    ],
    faqs: [
      {
        question: "Er produktspecifikke data altid bedre end generiske?",
        answer:
          "I langt de fleste tilfælde giver produktspecifikke EPD-data et lavere resultat, fordi generiske data er bevidst sat konservativt. Men det er altid en god idé at sammenligne, da enkelte specialprodukter kan have et højere aftryk end gennemsnittet.",
      },
    ],
    relatedTerms: [
      "generiske-data",
      "epd",
      "br18",
      "modul-a1-a3",
      "hotspot-analyse",
    ],
    relatedBlogPosts: ["hvad-er-lca-beregning", "graensevaerdier-co2"],
  },

  {
    slug: "betragtningsperiode",
    term: "Betragtningsperiode",
    shortDefinition:
      "Betragtningsperioden er den standardiserede tidsramme på 50 år, som LCA-beregningen opgøres over i det danske bygningsreglement.",
    content: [
      {
        type: "heading2",
        text: "Hvad er betragtningsperioden?",
      },
      {
        type: "paragraph",
        text: "Betragtningsperioden er den beregnings- og vurderingsmæssige tidsramme for en bygnings livscyklusvurdering. I det danske bygningsreglement ([BR18](/ordbog/br18)) er den fastsat til præcis 50 år, regnet fra tidspunktet for færdigmelding.",
      },
      {
        type: "heading2",
        text: "Hvorfor netop 50 år?",
      },
      {
        type: "paragraph",
        text: "Den faste periode sikrer, at alle klimaberegninger på tværs af byggerier i Danmark kan sammenlignes direkte. Den bruges uanset, om bygningens faktiske forventede levetid er længere — fx 80 eller 100 år.",
      },
      {
        type: "heading2",
        text: "Konsekvenser for beregningen",
      },
      {
        type: "list",
        items: [
          "Materialer med levetid over 50 år tæller kun for 50 års brug",
          "Materialer med kortere levetid (fx 25 år) indregnes som udskiftet undervejs i [modul B4](/ordbog/modul-b4)",
          "Driftsenergi ([modul B6](/ordbog/modul-b6)) beregnes for de fulde 50 år",
          "Resultatet divideres med 50 for at få den årlige enhed: kg CO₂e/m²/år",
        ],
      },
    ],
    faqs: [
      {
        question: "Kan du bruge en anden betragtningsperiode end 50 år?",
        answer:
          "Nej, ikke i BR18-beregningen. Betragtningsperioden er fastsat til 50 år for alle bygningstyper. Ved frivillige certificeringer som DGNB kan der dog bruges andre perioder til supplerende analyser.",
      },
    ],
    relatedTerms: [
      "br18",
      "modul-b4",
      "modul-b6",
      "graensevaerdi",
      "en-15978",
    ],
    relatedBlogPosts: ["hvad-er-lca-beregning", "klimakrav-2025"],
  },

  {
    slug: "gwp",
    term: "GWP (Global Warming Potential)",
    shortDefinition:
      "GWP er miljøpåvirkningsindikatoren, der måler et byggeris opvarmningspotentiale i kg CO₂-ækvivalenter. Det er GWP-værdien, som skal overholde grænseværdierne i BR18.",
    content: [
      {
        type: "heading2",
        text: "Hvad er GWP?",
      },
      {
        type: "paragraph",
        text: "GWP står for Globalt Opvarmningspotentiale (Global Warming Potential) og er den miljøpåvirkningsindikator, der måles på i den danske byggelovgivning. GWP angiver den potentielle opvarmning af jordens overfladetemperatur forårsaget af drivhusgasser.",
      },
      {
        type: "heading2",
        text: "Hvordan måles GWP?",
      },
      {
        type: "paragraph",
        text: "GWP måles i enheden kg [CO₂-ækvivalenter](/ordbog/co2-aekvivalenter) (CO₂e). Det kaldes ækvivalenter, fordi andre drivhusgasser end kuldioxid — fx metan og lattergas — omregnes og vægtes, så deres opvarmende effekt svarer til effekten af CO₂.",
      },
      {
        type: "heading2",
        text: "GWP i LCA-beregningen",
      },
      {
        type: "paragraph",
        text: "I en [LCA-beregning](/blog/hvad-er-lca-beregning) efter [BR18](/ordbog/br18) er det den samlede GWP-værdi (i kg CO₂e/m²/år), der holdes op mod [grænseværdierne](/ordbog/graensevaerdi). GWP-værdier for materialer hentes fra enten [generiske data](/ordbog/generiske-data) eller [EPD'er](/ordbog/epd).",
      },
    ],
    faqs: [
      {
        question: "Er GWP den eneste indikator i LCA?",
        answer:
          "Nej, EN 15978 definerer flere miljøpåvirkningsindikatorer. Men i BR18's klimakrav er det kun GWP (målt i CO₂-ækvivalenter), der er lovpligtigt at dokumentere og overholde grænseværdien for.",
      },
    ],
    relatedTerms: [
      "co2-aekvivalenter",
      "graensevaerdi",
      "epd",
      "br18",
      "en-15978",
    ],
    relatedBlogPosts: ["hvad-er-lca-beregning", "graensevaerdier-co2"],
  },

  {
    slug: "co2-aekvivalenter",
    term: "CO₂-ækvivalenter",
    shortDefinition:
      "CO₂-ækvivalenter (CO₂e) er en fælles enhed, der samler effekten af alle drivhusgasser til ét sammenligneligt tal. Bygningens klimapåvirkning måles i kg CO₂e/m²/år.",
    content: [
      {
        type: "heading2",
        text: "Hvad er CO₂-ækvivalenter?",
      },
      {
        type: "paragraph",
        text: "CO₂-ækvivalenter (forkortet CO₂e) er en fælles måleenhed, der gør det muligt at sammenligne effekten af forskellige drivhusgasser. Udledningen af gasser som metan og lattergas omregnes og vægtes, så deres klimabelastning svarer til en tilsvarende mængde kuldioxid (CO₂).",
      },
      {
        type: "heading2",
        text: "CO₂e i bygningsreglementet",
      },
      {
        type: "paragraph",
        text: "I [BR18](/ordbog/br18) måles bygningens klimapåvirkning i enheden kg CO₂e/m²/år — kilogram CO₂-ækvivalenter pr. kvadratmeter [etageareal](/ordbog/etageareal) pr. år. Denne enhed bruges til at sammenligne resultatet med de gældende [grænseværdier](/ordbog/graensevaerdi).",
      },
      {
        type: "heading2",
        text: "Beregningseksempel",
      },
      {
        type: "paragraph",
        text: "En bygning med et samlet [GWP](/ordbog/gwp)-resultat på 500.000 kg CO₂e, et etageareal på 200 m² og en [betragtningsperiode](/ordbog/betragtningsperiode) på 50 år giver: 500.000 / (200 × 50) = 50 kg CO₂e/m²/år. Denne værdi sammenlignes med grænseværdien for bygningstypen.",
      },
    ],
    faqs: [
      {
        question: "Hvorfor hedder det ækvivalenter og ikke bare CO₂?",
        answer:
          "Fordi enheden inkluderer alle drivhusgasser — ikke kun CO₂. Metan, lattergas og andre gasser omregnes til deres CO₂-ækvivalent ud fra, hvor meget de bidrager til den globale opvarmning.",
      },
    ],
    relatedTerms: [
      "gwp",
      "graensevaerdi",
      "etageareal",
      "betragtningsperiode",
      "br18",
    ],
    relatedBlogPosts: ["hvad-er-lca-beregning", "graensevaerdier-co2"],
  },

  {
    slug: "etageareal",
    term: "Etageareal (LCA-referenceareal)",
    shortDefinition:
      "Etagearealet i LCA er et modificeret referenceareal baseret på BBR, hvor fx kældre tæller 100%, udestuer 50% og carporte 25%.",
    content: [
      {
        type: "heading2",
        text: "Hvad er etagearealet i LCA?",
      },
      {
        type: "paragraph",
        text: "I LCA-sammenhæng tages der udgangspunkt i det opvarmede etageareal jf. BBR, men der anvendes et modificeret LCA-referenceareal. De forskellige arealtyper vægtes forskelligt, fordi de har forskelligt materialebehov.",
      },
      {
        type: "heading2",
        text: "Arealvægtning",
      },
      {
        type: "table",
        headers: ["Arealtype", "Medregnes med"],
        rows: [
          ["Opvarmet etageareal", "100%"],
          ["Kældre", "100%"],
          ["Udestuer og integrerede garager", "50%"],
          ["Integrerede carporte og overdækninger, udvendige trapper, ramper, altangange", "25%"],
        ],
      },
      {
        type: "heading2",
        text: "Betydning for grænseværdien",
      },
      {
        type: "paragraph",
        text: "Bygningens samlede CO₂-udledning divideres med referencearealet og [betragtningsperioden](/ordbog/betragtningsperiode) (50 år) for at nå frem til resultatet i kg [CO₂e](/ordbog/co2-aekvivalenter)/m²/år. Et større referenceareal giver dermed et lavere resultat pr. m², da udledningen fordeles over flere kvadratmeter.",
      },
    ],
    faqs: [
      {
        question: "Tæller en uopvarmet garage med i etagearealet?",
        answer:
          "En integreret garage tæller med 50% i LCA-referencearealet. Integrerede carporte og overdækninger tæller med 25%. En fritliggende carport eller skur regnes som en selvstændig bygning og er fritaget, hvis den er uopvarmet og under 50 m².",
      },
    ],
    relatedTerms: [
      "graensevaerdi",
      "co2-aekvivalenter",
      "betragtningsperiode",
      "br18",
      "gwp",
    ],
    relatedBlogPosts: ["graensevaerdier-co2", "klimakrav-2025"],
  },

  {
    slug: "en-15978",
    term: "EN 15978",
    shortDefinition:
      "EN 15978 er den europæiske standard, der fastsætter beregningsmetoden for vurdering af bygningers miljømæssige kvalitet i en livscyklusvurdering (LCA).",
    content: [
      {
        type: "heading2",
        text: "Hvad er EN 15978?",
      },
      {
        type: "paragraph",
        text: "EN 15978 (fuldt navn: DS/EN 15978) er den europæiske standard, der definerer beregningsmetoden for at vurdere bygningers miljømæssige kvalitet over deres livscyklus. Det er denne standard, [BR18](/ordbog/br18) baserer sine LCA-krav på.",
      },
      {
        type: "heading2",
        text: "Livscyklusmodulerne",
      },
      {
        type: "paragraph",
        text: "Standarden inddeler bygningens fulde livscyklus i 5 overordnede faser med i alt 17 moduler:",
      },
      {
        type: "list",
        items: [
          "Produktfasen: [A1-A3](/ordbog/modul-a1-a3) (råmaterialer, transport til fabrik, fremstilling)",
          "Byggefasen: [A4](/ordbog/modul-a4) (transport til plads), [A5](/ordbog/modul-a5) (opførelse)",
          "Brugsfasen: B1-B7, hvor [B4](/ordbog/modul-b4) (udskiftning) og [B6](/ordbog/modul-b6) (driftsenergi) indgår i BR18-kravet",
          "Endt levetid: C1-C4, hvor [C3-C4](/ordbog/modul-c3-c4) (affaldsbehandling og deponi) indgår i BR18-kravet",
          "Uden for system: [Modul D](/ordbog/modul-d) (genanvendelsespotentiale)",
        ],
      },
      {
        type: "heading2",
        text: "EN 15978 og BR18",
      },
      {
        type: "paragraph",
        text: "BR18 kræver ikke, at alle 17 moduler beregnes. Kun A1-A3, A4-A5, B4, B6, C3-C4 og D er medtaget. Modulerne A1-A3+B4+B6+C3-C4 summeres i hovedgrænseværdien, A4+A5 har separat [grænseværdi](/ordbog/graensevaerdi), og D deklareres men tæller ikke med.",
      },
    ],
    faqs: [
      {
        question: "Hvad er forskellen på EN 15978 og EN 15804?",
        answer:
          "EN 15978 er standarden for bygnings-LCA (hele bygningen). EN 15804 er standarden for produkt-EPD'er (enkelte byggevarer). EPD-data efter EN 15804 bruges som input i en bygnings-LCA efter EN 15978.",
      },
    ],
    relatedTerms: [
      "br18",
      "modul-a1-a3",
      "epd",
      "graensevaerdi",
      "betragtningsperiode",
    ],
    relatedBlogPosts: ["hvad-er-lca-beregning", "klimakrav-2025"],
  },

  {
    slug: "lcabyg",
    term: "LCAbyg",
    shortDefinition:
      "LCAbyg er et gratis, statsligt beregningsprogram til bygnings-LCA, udviklet af BUILD (Aalborg Universitet). Det er det primære værktøj til at overholde BR18's klimakrav.",
    content: [
      {
        type: "heading2",
        text: "Hvad er LCAbyg?",
      },
      {
        type: "paragraph",
        text: "LCAbyg er et gratis softwareværktøj udviklet specifikt til at udføre bygnings-LCA'er, der overholder de danske klimakrav i [BR18](/ordbog/br18). Programmet indeholder bygningsreglementets [generiske data](/ordbog/generiske-data) og har funktioner til at importere [EPD'er](/ordbog/epd).",
      },
      {
        type: "heading2",
        text: "Hvem har udviklet LCAbyg?",
      },
      {
        type: "paragraph",
        text: "LCAbyg er udviklet og vedligeholdes af BUILD — Institut for Byggeri, By og Miljø under Aalborg Universitet. Det er det officielle beregningsværktøj, der understøtter BR18's LCA-krav.",
      },
      {
        type: "heading2",
        text: "Funktioner i LCAbyg",
      },
      {
        type: "list",
        items: [
          "Beregning af alle relevante livscyklusmoduler (A1-A3, A4-A5, B4, B6, C3-C4, D)",
          "Indbyggede generiske data fra BR18 bilag 2",
          "Import af produktspecifikke EPD-data",
          "Automatisk beregning af udskiftninger i [modul B4](/ordbog/modul-b4)",
          "Resultater opgjort i kg CO₂e/m²/år klar til sammenligning med [grænseværdien](/ordbog/graensevaerdi)",
        ],
      },
    ],
    faqs: [
      {
        question: "Er det et krav at bruge LCAbyg?",
        answer:
          "Nej, BR18 stiller ikke krav om et bestemt beregningsværktøj. Men LCAbyg er det mest udbredte i Danmark, fordi det er gratis, indeholder de officielle data og er designet til at opfylde netop BR18's krav.",
      },
    ],
    relatedTerms: [
      "br18",
      "generiske-data",
      "epd",
      "en-15978",
      "graensevaerdi",
    ],
    relatedBlogPosts: ["hvad-er-lca-beregning", "klimakrav-2025"],
  },

  {
    slug: "dgnb",
    term: "DGNB",
    shortDefinition:
      "DGNB er en frivillig bæredygtighedscertificering (sølv, guld, platin), der vurderer bygninger helhedsorienteret ud fra miljø, sociale og økonomiske aspekter — bredere end BR18's klimakrav.",
    content: [
      {
        type: "heading2",
        text: "Hvad er DGNB?",
      },
      {
        type: "paragraph",
        text: "DGNB (Deutsche Gesellschaft für Nachhaltiges Bauen) er et frivilligt bæredygtighedscertificeringssystem, der vurderer bygninger helhedsorienteret. I Danmark administreres ordningen af Green Building Council Denmark (DK-GBC) med niveauerne sølv, guld og platin.",
      },
      {
        type: "heading2",
        text: "DGNB vs. BR18 LCA-krav",
      },
      {
        type: "paragraph",
        text: "Mens [BR18](/ordbog/br18) kun stiller et lovpligtigt minimumskrav for klimapåvirkning målt i [CO₂-ækvivalenter](/ordbog/co2-aekvivalenter), kigger DGNB bredere på miljøkriterier — herunder biodiversitet, miljøfarlige stoffer og indeklima. I nyere DGNB-versioner (fra 2023) er BR18's CO₂-krav et indbygget minimumskrav.",
      },
      {
        type: "heading2",
        text: "Hvornår er DGNB relevant?",
      },
      {
        type: "paragraph",
        text: "DGNB er relevant for bygherrer, der ønsker at dokumentere bæredygtighed ud over lovkravene — typisk ved større erhvervs- og boligprojekter. Certificeringen belønner projekter, der ligger markant under [grænseværdierne](/ordbog/graensevaerdi) i BR18.",
      },
      {
        type: "paragraph",
        text: "Bemærk: Din LCA Hjælper udsteder ikke DGNB-certificeringer, men vi kan levere den LCA-beregning, der indgår som deldokumentation i en DGNB-ansøgning.",
      },
    ],
    faqs: [
      {
        question: "Er DGNB et krav for at bygge i Danmark?",
        answer:
          "Nej, DGNB er helt frivilligt. Det lovpligtige krav er LCA-beregning efter BR18 med overholdelse af grænseværdierne. DGNB er en tillægscertificering for bygherrer, der ønsker at gå videre.",
      },
    ],
    relatedTerms: [
      "br18",
      "graensevaerdi",
      "co2-aekvivalenter",
      "en-15978",
      "lcabyg",
    ],
    relatedBlogPosts: ["klimakrav-2025", "graensevaerdier-co2"],
  },
];

export function getGlossaryTerm(slug: string): GlossaryTerm | undefined {
  return glossaryTerms.find((t) => t.slug === slug);
}
