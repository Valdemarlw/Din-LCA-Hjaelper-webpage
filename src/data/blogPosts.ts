export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  readingTime: string;
  content: BlogSection[];
  faqs: FAQ[];
};

export type BlogSection = {
  type: "paragraph" | "heading2" | "heading3" | "list" | "table";
  text?: string;
  items?: string[];
  rows?: string[][];
  headers?: string[];
};

export type FAQ = {
  question: string;
  answer: string;
};

export const blogPosts: BlogPost[] = [
  // ─── Post 1: Hvad er en LCA-beregning? ───
  {
    slug: "hvad-er-lca-beregning",
    title: "Hvad er en LCA-beregning? Alt du skal vide",
    description:
      "En LCA-beregning opgør et byggeris CO₂-udledning over en 50-årig betragtningsperiode. Læs om hvad LCA er, hvornår det er lovpligtigt, og hvordan processen foregår.",
    date: "2026-04-02",
    readingTime: "6 min",
    content: [
      {
        type: "paragraph",
        text: "En LCA-beregning (livscyklusvurdering) er en systematisk opgørelse af et byggeris miljøpåvirkning over en betragtningsperiode på 50 år. Beregningen opgør CO₂-udledning fra materialeproduktion, udskiftning, driftsenergi og bortskaffelse, og er lovpligtig for alt nybyggeri i Danmark efter [BR18](/ordbog/br18). Resultatet afleveres som en rapport til kommunen ved færdigmelding.",
      },
      {
        type: "paragraph",
        text: "For arkitekter og rådgivere er LCA-beregningen en central del af byggesagen. Uden en godkendt LCA-rapport kan byggeriet ikke få ibrugtagningstilladelse. I denne artikel forklarer vi hvad en LCA-beregning indeholder, hvornår den er lovpligtig, og hvordan processen typisk foregår.",
      },
      {
        type: "heading2",
        text: "Hvad indeholder en LCA-beregning?",
      },
      {
        type: "paragraph",
        text: "En LCA-beregning for byggeri dækker udvalgte faser af bygningens livscyklus efter den europæiske standard [EN 15978](/ordbog/en-15978). I BR18 indgår følgende moduler i [grænseværdien](/ordbog/graensevaerdi):",
      },
      {
        type: "list",
        items: [
          "[A1-A3 (produktfasen)](/ordbog/modul-a1-a3): Udvinding af råmaterialer, transport til fabrik og fremstilling af byggematerialer",
          "[B4 (udskiftning)](/ordbog/modul-b4): Udskiftning af bygningsdele med kortere levetid end betragtningsperioden på 50 år",
          "[B6 (driftsenergi)](/ordbog/modul-b6): Bygningens energiforbrug til opvarmning, køling og ventilation",
          "[C3-C4 (endt levetid)](/ordbog/modul-c3-c4): Forbehandling af byggeaffald og endelig bortskaffelse/deponering",
        ],
      },
      {
        type: "paragraph",
        text: "Derudover har byggeprocessen (A4 transport + A5 opførelse) sin egen separate grænseværdi på 1,5 kg CO₂e/m²/år. Modul D (genanvendelsespotentiale) skal beregnes og rapporteres, men tæller ikke med i grænseværdien.",
      },
      {
        type: "paragraph",
        text: "Det vigtigste resultat er bygningens samlede CO₂-udledning målt i kg CO₂-ækvivalenter pr. m² pr. år (kg CO₂e/m²/år). Denne værdi holdes op mod de gældende [grænseværdier i BR18](/blog/graensevaerdier-co2).",
      },
      {
        type: "heading2",
        text: "Hvornår er LCA-beregning lovpligtigt?",
      },
      {
        type: "paragraph",
        text: "LCA-beregning er lovpligtigt for alle nye byggerier i Danmark. Kravet følger af Bygningsreglementet 2018 (BR18) og gælder:",
      },
      {
        type: "list",
        items: [
          "Alle nye opvarmede byggerier — uanset størrelse",
          "Uopvarmede bygninger over 50 m²",
          "Tilbygninger til etageboliger, kontorer og institutioner — uanset størrelse",
          "Tilbygninger til enfamiliehuse, rækkehuse og sommerhuse — over 250 m²",
        ],
      },
      {
        type: "paragraph",
        text: "Beregningen skal dokumenteres ved færdigmelding for at opnå ibrugtagningstilladelse. Det betyder, at LCA-rapporten skal afspejle det faktisk byggede — ikke kun det projekterede. Derfor anbefaler vi at starte LCA-beregningen tidligt og [opdatere den ved færdigmelding](/kontakt).",
      },
      {
        type: "heading2",
        text: "Hvordan foregår en LCA-beregning?",
      },
      {
        type: "paragraph",
        text: "En typisk LCA-beregning for et nybyggeri følger disse trin:",
      },
      {
        type: "list",
        items: [
          "Indsamling af projektmateriale: Tegninger, konstruktionsbeskrivelser og materialelister",
          "Tidlig beregning: En foreløbig LCA baseret på projekterede materialer og mængder",
          "[Hotspot-analyse](/ordbog/hotspot-analyse): Identifikation af de bygningsdele der bidrager mest til CO₂-udledningen",
          "Materialeoptimering: Forslag til alternative materialer hvis grænseværdien er i fare",
          "A4/A5-dokumentation: Indsamling af data for transport og byggeproces — læs mere om [A4 og A5 faserne](/blog/a4-a5-dokumentation)",
          "Opdatering ved færdigmelding: Beregningen justeres med faktiske mængder fra det færdige byggeri",
          "Myndighedsklar rapport: Endelig dokumentation klar til aflevering til kommunen",
        ],
      },
      {
        type: "paragraph",
        text: "Den tidlige beregning og hotspot-analyse tager typisk 1-2 uger fra modtaget materiale. Selve LCA-forløbet løber hele vejen til færdigmelding, hvor beregningen opdateres med faktiske mængder fra det færdige byggeri. Vi anbefaler at involvere en LCA-specialist så tidligt som muligt, så materialevalgene kan bygge på LCA-resultaterne.",
      },
      {
        type: "heading2",
        text: "Hvad koster en LCA-beregning?",
      },
      {
        type: "paragraph",
        text: "Prisen for en LCA-beregning varierer afhængigt af projektets størrelse, kompleksitet og antal konstruktionstyper. Hos Din LCA Hjælper starter priserne fra 3.500 kr inkl. adgang til A45-platformen for A4/A5-dokumentation. Vi giver fast tilbud inden for 24 timer efter modtagelse af tegninger.",
      },
      {
        type: "paragraph",
        text: "Til sammenligning ligger de fleste konkurrenter højere — især de store rådgivende ingeniørfirmaer. Vores priser er lave fordi vi er specialiseret udelukkende i LCA for byggeri, hvilket giver lavere overhead og en mere fokuseret proces.",
      },
      {
        type: "heading2",
        text: "Hvornår bør du starte din LCA-beregning?",
      },
      {
        type: "paragraph",
        text: "Jo tidligere, jo bedre. En tidlig LCA-beregning giver dig mulighed for at optimere materialevalg inden de er fastlåste. Mange bygherrer og arkitekter oplever at materialerne i tidlig fase overskrider grænseværdien — og det er langt billigere at ændre materialer på tegnebrættet end på byggepladsen.",
      },
      {
        type: "paragraph",
        text: "Med de [nye klimakrav fra 2025](/blog/klimakrav-2025) er grænseværdierne strammet for flere bygningstyper. Det gør den tidlige beregning endnu vigtigere — særligt for [sommerhuse](/blog/lca-sommerhuse), som har de strengeste krav.",
      },
      {
        type: "heading2",
        text: "Få hjælp til din LCA-beregning",
      },
      {
        type: "paragraph",
        text: "Hos Din LCA Hjælper håndterer vi hele LCA-processen for dig. Vi er specialiseret udelukkende i LCA for byggeri og inkluderer altid hotspot-analyse, materialeoptimering og adgang til [A45-platformen](https://a45lca.dk) for A4/A5-dokumentation. Se vores [bygningstype-sider](/lca-beregning) for de specifikke krav til dit projekt, eller [kontakt os](/kontakt) for et uforpligtende tilbud.",
      },
    ],
    faqs: [
      {
        question: "Kan jeg lave min egen LCA-beregning?",
        answer:
          "Teknisk set ja — der findes self-service værktøjer som LCAbyg. Men en korrekt LCA kræver faglig indsigt i materialer, konstruktioner og BR18-kravene. Fejl i beregningen kan betyde at rapporten ikke godkendes ved færdigmelding, hvilket forsinker hele byggesagen.",
      },
      {
        question: "Hvad sker der hvis min LCA overskrider grænseværdien?",
        answer:
          "Hvis beregningen viser overskridelse, skal der foretages materialeændringer eller konstruktionstilpasninger inden færdigmelding. Derfor er en tidlig hotspot-analyse vigtig — den identificerer præcis hvilke bygningsdele der skal optimeres.",
      },
      {
        question: "Skal LCA-beregningen opdateres efter byggeriet?",
        answer:
          "Ja. LCA-rapporten til kommunen skal afspejle det faktisk byggede, ikke kun det projekterede. Det betyder at beregningen skal opdateres med faktiske mængder ved færdigmelding. Hos Din LCA Hjælper er denne opdatering inkluderet i prisen.",
      },
      {
        question: "Hvad er forskellen på LCA og energirammeberegning?",
        answer:
          "Energirammeberegningen dokumenterer bygningens energiforbrug under drift (opvarmning, køling, ventilation). LCA-beregningen dækker den samlede miljøpåvirkning over hele levetiden — inkl. materialeproduktion, transport, byggeproces og nedrivning. Begge er lovpligtige efter BR18, men det er to separate beregninger.",
      },
    ],
  },

  // ─── Post 2: Nye klimakrav 2025 ───
  {
    slug: "klimakrav-2025",
    title: "Nye klimakrav 2025: Hvad betyder det for dit byggeri?",
    description:
      "Fra 1. juli 2025 gælder nye, skærpede klimakrav for nybyggeri i Danmark. Læs om de differentierede grænseværdier og hvad de betyder for dit projekt.",
    date: "2026-04-02",
    readingTime: "5 min",
    content: [
      {
        type: "paragraph",
        text: "Fra 1. juli 2025 gælder nye, differentierede [grænseværdier](/ordbog/graensevaerdi) for CO₂-udledning i nybyggeri i Danmark. De nye klimakrav erstatter den tidligere ensartede grænseværdi og indfører specifikke krav baseret på bygningstype. For arkitekter og bygherrer betyder det, at grænseværdierne nu varierer fra 4,0 til 8,0 kg CO₂e/m²/år, og at der er indført en separat grænse for byggeprocessen (A4+A5).",
      },
      {
        type: "paragraph",
        text: "De nye krav er en markant stramning for flere bygningstyper, og det er afgørende at forstå hvilke grænser der gælder for dit konkrete projekt. I denne artikel gennemgår vi ændringerne og hvad de betyder i praksis.",
      },
      {
        type: "heading2",
        text: "De nye grænseværdier fra juli 2025",
      },
      {
        type: "paragraph",
        text: "De differentierede grænseværdier er opdelt efter bygningstype. Her er en oversigt — se også vores [komplette guide til grænseværdier](/blog/graensevaerdier-co2) for detaljer:",
      },
      {
        type: "table",
        headers: ["Bygningstype", "Grænseværdi (kg CO₂e/m²/år)"],
        rows: [
          ["Sommerhuse under 150 m²", "4,0"],
          ["Enfamiliehuse og rækkehuse", "6,7"],
          ["Etageboliger og kontorer", "7,5"],
          ["Øvrigt nybyggeri", "8,0"],
          ["Byggeproces (A4+A5) — alle typer", "1,5"],
        ],
      },
      {
        type: "heading2",
        text: "Hvad er nyt i forhold til tidligere?",
      },
      {
        type: "paragraph",
        text: "Før juli 2025 gjaldt en ensartet grænseværdi på 12,0 kg CO₂e/m²/år for alle bygningstyper. De nye krav indebærer tre vigtige ændringer:",
      },
      {
        type: "list",
        items: [
          "Differentierede grænser: Forskellige bygningstyper har nu forskellige krav. Sommerhuse har de strengeste, øvrigt nybyggeri de mildeste",
          "Markant stramning: Selv den højeste nye grænse (8,0) er en tredjedel af den tidligere (12,0). For sommerhuse er stramningen endnu større (4,0 vs. 12,0)",
          "Separat A4+A5-grænse: Der er indført en ny, separat grænseværdi på 1,5 kg CO₂e/m²/år specifikt for transport og byggeproces. Læs mere om [A4 og A5 dokumentation](/blog/a4-a5-dokumentation)",
        ],
      },
      {
        type: "heading2",
        text: "Hvad betyder det for dit projekt?",
      },
      {
        type: "heading3",
        text: "Sommerhuse",
      },
      {
        type: "paragraph",
        text: "Med en grænseværdi på kun 4,0 kg CO₂e/m²/år er [sommerhuse](/blog/lca-sommerhuse) den bygningstype med de strengeste krav. Det skyldes bl.a. at sommerhuse typisk har et relativt lille opvarmet areal, men stadig kræver fundamenter, tag og ydervægge. Materialevalg er her helt afgørende — tunge konstruktioner i beton kan hurtigt overskride grænsen.",
      },
      {
        type: "heading3",
        text: "Enfamiliehuse og rækkehuse",
      },
      {
        type: "paragraph",
        text: "Grænsen på 6,7 kg CO₂e/m²/år er opnåelig for de fleste projekter med gennemtænkte materialevalg. Men det kræver opmærksomhed — særligt fundamenter, ydervægge og tagkonstruktioner er typiske hotspots. En tidlig [LCA-beregning](/blog/hvad-er-lca-beregning) gør det muligt at optimere inden materialerne er fastlåste.",
      },
      {
        type: "heading3",
        text: "Erhverv og etagebyggeri",
      },
      {
        type: "paragraph",
        text: "Etageboliger og kontorer skal holde 7,5 kg CO₂e/m²/år, mens øvrigt erhvervsbyggeri har grænsen 8,0. Selv om disse er de mildeste grænser, er de stadig en markant stramning fra de tidligere 12,0. Store betonkonstruktioner, parkeringskældre og facadeløsninger kræver særlig opmærksomhed.",
      },
      {
        type: "heading2",
        text: "Den nye A4+A5-grænse",
      },
      {
        type: "paragraph",
        text: "En af de vigtigste nyheder er den separate grænseværdi for byggeprocessen. [A4](/ordbog/modul-a4) dækker transport af materialer til byggepladsen, og [A5](/ordbog/modul-a5) dækker spild og affald under opførelsen. Grænsen er 1,5 kg CO₂e/m²/år for alle bygningstyper.",
      },
      {
        type: "paragraph",
        text: "Det betyder at dokumentation af A4- og A5-faserne nu er obligatorisk. Hos Din LCA Hjælper inkluderer vi altid adgang til [A45-platformen](https://a45lca.dk), som gør det nemt at indsamle transportdata fra leverandører og spilddata fra entreprenører.",
      },
      {
        type: "heading2",
        text: "Sådan forbereder du dig",
      },
      {
        type: "list",
        items: [
          "Start LCA-beregningen tidligt — gerne i skitsefasen, så materialevalgene kan optimeres",
          "Bestil en [hotspot-analyse](/ordbog/hotspot-analyse) for at identificere de mest CO₂-tunge bygningsdele",
          "Planlæg A4/A5-dokumentation fra byggeriets start — det er lettere at indsamle data løbende end bagefter",
          "Overvej alternative materialer til de tunge konstruktioner (fundament, ydervægge, tag)",
        ],
      },
      {
        type: "paragraph",
        text: "Har du brug for hjælp til at navigere de nye klimakrav? [Kontakt os](/kontakt) for et uforpligtende tilbud på en LCA-beregning. Vi giver fast pris inden for 24 timer.",
      },
    ],
    faqs: [
      {
        question: "Gælder de nye klimakrav for byggerier ansøgt før juli 2025?",
        answer:
          "Nej. De nye grænseværdier gælder for byggerier med byggetilladelse ansøgt efter 1. juli 2025. Projekter med tidligere ansøgning følger de hidtidige regler.",
      },
      {
        question: "Hvad sker der hvis mit byggeri overskrider den nye grænse?",
        answer:
          "Hvis LCA-beregningen viser overskridelse af grænseværdien, kan byggeriet ikke få ibrugtagningstilladelse. Materialerne skal ændres og beregningen opdateres. Derfor er en tidlig beregning med hotspot-analyse afgørende — det er langt billigere at ændre materialer på tegnebrættet end på byggepladsen.",
      },
      {
        question:
          "Er der undtagelser fra de nye klimakrav?",
        answer:
          "LCA-kravet gælder generelt for alt nybyggeri. Undtaget er bl.a. midlertidige bygninger med kort levetid og visse småbygninger. Kontakt din kommune for specifik vejledning om dit projekt.",
      },
    ],
  },

  // ─── Post 3: A4 og A5 dokumentation ───
  {
    slug: "a4-a5-dokumentation",
    title: "A4 og A5: Dokumentation af byggeprocessens CO₂",
    description:
      "A4 og A5 faserne i LCA dækker transport og byggeproces. Læs om hvad de indeholder, hvorfor de er lovpligtige, og hvordan du dokumenterer dem.",
    date: "2026-04-02",
    readingTime: "5 min",
    content: [
      {
        type: "paragraph",
        text: "A4 og A5 er de faser i en LCA-beregning der dækker byggeprocessens miljøpåvirkning: transport af materialer til byggepladsen ([A4](/ordbog/modul-a4)) og spild, affald og energiforbrug under selve opførelsen ([A5](/ordbog/modul-a5)). Fra juli 2025 er der indført en separat [grænseværdi](/ordbog/graensevaerdi) på 1,5 kg CO₂e/m²/år for A4+A5, og dokumentation er nu obligatorisk for alt nybyggeri i Danmark.",
      },
      {
        type: "paragraph",
        text: "For mange arkitekter og bygherrer er A4/A5 den mest udfordrende del af LCA-beregningen, fordi den kræver data fra leverandører og entreprenører — data som ofte ikke er tilgængelig uden en struktureret indsamlingsproces.",
      },
      {
        type: "heading2",
        text: "Hvad dækker A4-fasen?",
      },
      {
        type: "paragraph",
        text: "A4 omhandler al transport til og fra byggepladsen. Det dækker:",
      },
      {
        type: "list",
        items: [
          "Transport af byggematerialer fra producent/leverandør til byggepladsen",
          "Transport af materiel, maskiner og stilladser til og fra pladsen",
          "Omlastning og midlertidig oplagring undervejs (terminalprocesser)",
        ],
      },
      {
        type: "paragraph",
        text: "Miljøpåvirkningen beregnes ud fra transportafstand, transportmiddel og materialernes vægt. Data indsamles typisk fra følgesedler og fakturaer. Lokale materialer giver kortere transport og dermed lavere A4-udledning. Bemærk: maskiner og materiel under 1 ton er fritaget.",
      },
      {
        type: "heading2",
        text: "Hvad dækker A5-fasen?",
      },
      {
        type: "paragraph",
        text: "A5 dækker selve byggeprocessen på pladsen:",
      },
      {
        type: "list",
        items: [
          "Energiforbrug på byggepladsen (strøm til belysning og værktøj, opvarmning af skure, brændstof til maskiner over 1 ton)",
          "Materialespild under opførelsen (skæreaffald, defekte leverancer, overskydende materialer)",
          "Bortkørsel af byggeaffald og overskudsjord fra pladsen til modtageanlæg",
        ],
      },
      {
        type: "paragraph",
        text: "Bemærk at vandforbrug på byggepladsen er undtaget fra A5, og maskiner under 1 ton er helt fritaget fra klimaregnskabet. A5-data kræver typisk input fra hovedentreprenøren og underentreprenørerne. Det er her de fleste projekter møder udfordringer — mange entreprenører er ikke vant til at registrere og rapportere disse data systematisk.",
      },
      {
        type: "heading2",
        text: "Hvorfor er A4/A5 lovpligtigt?",
      },
      {
        type: "paragraph",
        text: "Med de [nye klimakrav fra 2025](/blog/klimakrav-2025) er der indført en separat grænseværdi for byggeprocessen. Grænsen er 1,5 kg CO₂e/m²/år for A4+A5 samlet — uanset bygningstype. Det betyder at dokumentation af transport og byggeproces nu er et selvstændigt krav, adskilt fra den samlede LCA-grænseværdi.",
      },
      {
        type: "paragraph",
        text: "Baggrunden er at byggeprocessen udgør en betydelig del af et byggeris samlede CO₂-udledning, og myndighederne ønsker specifik dokumentation af denne del.",
      },
      {
        type: "heading2",
        text: "Udfordringen: Indsamling af data",
      },
      {
        type: "paragraph",
        text: "Den største udfordring ved A4/A5-dokumentation er at indsamle pålidelige data fra hele forsyningskæden:",
      },
      {
        type: "list",
        items: [
          "Leverandører har ikke altid transportdata klar i et brugbart format",
          "Entreprenører registrerer sjældent spild og affald systematisk",
          "Data skal indsamles løbende under byggeriet — ikke først ved færdigmelding",
          "Mange aktører er involveret, og koordinering tager tid",
        ],
      },
      {
        type: "paragraph",
        text: "Det er præcis denne udfordring, A45-platformen er bygget til at løse.",
      },
      {
        type: "heading2",
        text: "A45: Automatiseret A4/A5-dokumentation",
      },
      {
        type: "paragraph",
        text: "[A45](https://a45lca.dk) er en platform udviklet af Din LCA Hjælper specifikt til dokumentation af A4- og A5-faserne. Platformen gør det muligt at:",
      },
      {
        type: "list",
        items: [
          "Uploade fakturaer og følgesedler — AI'en udtrækker transportdata automatisk",
          "Tracke CO₂-forbrug i realtid mod BR18-grænseværdien via et dashboard",
          "Invitere underentreprenører og leverandører med rollebaseret adgang",
          "Eksportere myndighedsklar BR18-rapport med ét klik",
        ],
      },
      {
        type: "paragraph",
        text: "Alle kunder hos Din LCA Hjælper får automatisk adgang til A45 som del af deres LCA-beregning. Vi mener A4/A5-dokumentation hører med i en komplet [LCA-løsning](/blog/hvad-er-lca-beregning) — det skal ikke være en ekstra hovedpine.",
      },
      {
        type: "heading2",
        text: "Sådan kommer du i gang",
      },
      {
        type: "paragraph",
        text: "Planlæg A4/A5-dokumentation fra byggeriets start — det er langt nemmere at indsamle data løbende end at rekonstruere det bagefter. I vores [referenceprojekt fra Esbjerg](/referenceprojekter/he-bluhmesvej-67) blev LCA'en bestilt efter byggestart, og EPD-dokumentation var det eneste redskab til at komme under grænsen. [Kontakt os](/kontakt) for at høre mere om hvordan vi håndterer A4/A5 som del af din LCA-beregning.",
      },
    ],
    faqs: [
      {
        question: "Kan A4/A5-data estimeres, eller skal de måles?",
        answer:
          "Der kan bruges standardværdier som udgangspunkt, men myndighederne foretrækker projektspecifikke data. Jo mere præcise data, jo mere pålidelig beregning. Med A45-platformen kan du indsamle faktiske data løbende under byggeriet.",
      },
      {
        question: "Hvornår skal A4/A5-data indsamles?",
        answer:
          "Løbende under hele byggeprocessen. Transportdata (A4) registreres ved levering af materialer. Spilddata (A5) registreres under opførelsen. Start fra første leverance — det er svært at rekonstruere data bagefter.",
      },
      {
        question: "Hvem er ansvarlig for at levere A4/A5-data?",
        answer:
          "Bygherren har det overordnede ansvar for LCA-dokumentationen, men i praksis indsamles data fra leverandører og entreprenører. A45-platformen gør det nemt at invitere alle parter og indsamle data struktureret.",
      },
      {
        question: "Tæller A4/A5 med i den samlede LCA-grænseværdi?",
        answer:
          "A4 og A5 indgår i den samlede LCA-beregning, men fra juli 2025 er der også en separat grænseværdi specifikt for A4+A5 på 1,5 kg CO₂e/m²/år. Så A4/A5 skal overholde både sin egen grænse og bidrage til den samlede.",
      },
    ],
  },

  // ─── Post 4: LCA-beregning for sommerhuse ───
  {
    slug: "lca-sommerhuse",
    title: "LCA-beregning for sommerhuse — udfordringer og løsninger",
    description:
      "Sommerhuse har den strengeste CO₂-grænseværdi i BR18 på kun 4,0 kg CO₂e/m²/år. Læs om udfordringerne og hvordan du overholder kravet.",
    date: "2026-04-02",
    readingTime: "5 min",
    content: [
      {
        type: "paragraph",
        text: "Sommerhuse med under 150 m² opvarmet etageareal har den strengeste CO₂-grænseværdi i BR18: kun 4,0 kg CO₂e/m²/år. Det er næsten halvt så meget som enfamiliehuse (6,7). For arkitekter der projekterer sommerhuse er det afgørende at tænke LCA ind fra første streg, så materialevalg kan tilpasses tidligt i processen.",
      },
      {
        type: "heading2",
        text: "Hvorfor er grænseværdien strengere for sommerhuse?",
      },
      {
        type: "paragraph",
        text: "Grænsen på 4,0 afspejler, at traditionelle sommerhuse typisk opføres som lette træbyggerier med lette fundamenter. Den type konstruktion har et lavt CO₂-aftryk, og lovgivningen er sat derefter. Helårshuse bruger derimod tungere materialer (tegl, porebeton, dybe betonfundamenter), og har derfor grænsen 6,7. Ferieboliger med 150 m² opvarmet etageareal eller derover får samme grænse som enfamiliehuse, fordi store sommerhuse i praksis bygges efter samme standarder.",
      },
      {
        type: "paragraph",
        text: "Desuden bruger sommerhuse ofte robuste materialer beregnet til at modstå vejr og vind i eksponerede områder (kyster, skove), hvilket kan drive CO₂-udledningen op. Se den [komplette oversigt over grænseværdier](/blog/graensevaerdier-co2) for alle bygningstyper.",
      },
      {
        type: "heading2",
        text: "Typiske udfordringer",
      },
      {
        type: "heading3",
        text: "Fundament og terrændæk",
      },
      {
        type: "paragraph",
        text: "Betonfundamenter er ofte den største CO₂-synder i sommerhuse. Et traditionelt terrændæk med armeringsstål og betonplade kan alene bruge en stor del af det tilladte CO₂-budget. Alternative fundamenttyper — som skruefundamenter eller lette funderingsløsninger — kan reducere udledningen markant.",
      },
      {
        type: "heading3",
        text: "Ydervægge og isolering",
      },
      {
        type: "paragraph",
        text: "Tunge ydervægge i mursten eller beton er problematiske ved den lave grænse. Lette trækonstruktioner med minerauld- eller træfiberisolering klarer sig typisk bedre i LCA-beregningen. Valget af isoleringsmateriale har også betydning — EPS/XPS (polystyren) har en højere CO₂-profil end f.eks. mineraluld.",
      },
      {
        type: "heading3",
        text: "Tagkonstruktion",
      },
      {
        type: "paragraph",
        text: "Tagkonstruktionen er en anden typisk hotspot. Betontagsten vejer tungt i LCA, og tagpap kan også fylde i regnskabet, medmindre du vælger et produkt med en god [EPD](/ordbog/epd). Lettere alternativer som metaltagplader, naturskifer eller træspån klarer sig bedre. Konstruktionen under taget (spær vs. betonplader) har ligeledes stor indflydelse.",
      },
      {
        type: "heading2",
        text: "Løsninger: Sådan overholder du grænseværdien",
      },
      {
        type: "list",
        items: [
          "Start med en tidlig [LCA-beregning](/blog/hvad-er-lca-beregning) — gerne allerede i skitsefasen, så du kan optimere inden materialerne er fastlåste",
          "Brug en [hotspot-analyse](/ordbog/hotspot-analyse) til at identificere de 2-3 bygningsdele der bidrager mest til CO₂",
          "Overvej lette konstruktioner: Træ i stedet for beton, skruefundament i stedet for støbt fundament",
          "Vælg isoleringsmaterialer med lav CO₂-profil (mineraluld, træfiber)",
          "Anvend lokale materialer hvor muligt — det reducerer transportbidraget i [A4-fasen](/blog/a4-a5-dokumentation)",
          "Planlæg for lavt spild under opførelsen (A5) — præcis tilskæring og genanvendelse af materialer",
        ],
      },
      {
        type: "heading2",
        text: "Eksempel: Typisk CO₂-fordeling i et sommerhus",
      },
      {
        type: "paragraph",
        text: "I et typisk sommerhus på 100-130 m² ser CO₂-fordelingen ofte sådan ud:",
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
        text: "Tallene varierer fra projekt til projekt, men mønsteret er klart: Fundamentet og de bærende konstruktioner står for størstedelen. Det er her optimeringen skal fokuseres. I vores [referenceprojekt fra Knebel](/referenceprojekter/agavevej-4a) stod tagkonstruktionen alene for 43% af CO₂-aftrykket, og med [produktspecifikke EPD'er](/ordbog/produktspecifikke-data) blev det samlede resultat reduceret med 40%.",
      },
      {
        type: "heading2",
        text: "Få hjælp til LCA for dit sommerhus",
      },
      {
        type: "paragraph",
        text: "Hos Din LCA Hjælper har vi erfaring med sommerhusprojekter og kender de specifikke udfordringer ved den lave grænseværdi. Alle kunder får adgang til [A45-platformen](https://a45lca.dk) til A4/A5-dokumentation som del af beregningen. Se vores [service for sommerhuse](/lca-beregning/sommerhus) for de præcise krav, eller [kontakt os](/kontakt) for et tilbud. Priser fra 3.500 kr.",
      },
    ],
    faqs: [
      {
        question: "Gælder grænsen på 4,0 for alle sommerhuse?",
        answer:
          "Grænsen på 4,0 kg CO₂e/m²/år gælder for sommerhuse, campinghytter og lignende ferieboliger med under 150 m² opvarmet etageareal. Ferieboliger med 150 m² opvarmet etageareal eller derover følger den samme grænseværdi som enfamiliehuse: 6,7 kg CO₂e/m²/år.",
      },
      {
        question: "Kan et sommerhus med beton overholde grænseværdien?",
        answer:
          "Det er udfordrende, men det kan lade sig gøre med de rigtige valg. Brug betonprodukter med lave produktspecifikke EPD'er, fx grøn beton hvor cement delvist er erstattet af flyveaske. Det reducerer CO₂-aftrykket direkte i A1-A3. Hold de øvrige bygningsdele lette, og bestil en tidlig hotspot-analyse for at se om projektet kan nå 4,0.",
      },
      {
        question: "Hvad koster en LCA-beregning for et sommerhus?",
        answer:
          "Prisen afhænger af projektets kompleksitet, men starter typisk fra 3.500 kr inkl. A45-adgang. Send os dine tegninger, så giver vi et fast tilbud inden for 24 timer.",
      },
    ],
  },

  // ─── Post 5: Grænseværdier for CO₂ i byggeri ───
  {
    slug: "graensevaerdier-co2",
    title: "Grænseværdier for CO₂ i byggeri: Komplet oversigt",
    description:
      "Komplet oversigt over grænseværdier for CO₂-udledning i nybyggeri efter BR18. Tabeller med alle bygningstyper og den separate A4+A5-grænse.",
    date: "2026-04-02",
    readingTime: "4 min",
    content: [
      {
        type: "paragraph",
        text: "Grænseværdierne for CO₂ i nybyggeri er fastsat i [Bygningsreglementet 2018 (BR18)](/ordbog/br18) og angiver den maksimalt tilladte CO₂-udledning pr. m² pr. år for en bygnings samlede livscyklus. Fra 1. juli 2025 gælder differentierede grænseværdier afhængigt af bygningstype, samt en separat grænse for byggeprocessen (A4+A5). Alle nybyggerier i Danmark skal overholde disse grænser for at opnå ibrugtagningstilladelse.",
      },
      {
        type: "heading2",
        text: "Grænseværdier efter bygningstype",
      },
      {
        type: "paragraph",
        text: "Følgende grænseværdier gælder fra 1. juli 2025:",
      },
      {
        type: "table",
        headers: [
          "Bygningstype",
          "Grænseværdi (kg CO₂e/m²/år)",
          "Bemærkning",
        ],
        rows: [
          [
            "Sommerhuse under 150 m² opvarmet etageareal",
            "4,0",
            "Strengeste krav — kræver lette konstruktioner",
          ],
          [
            "Enfamiliehuse, rækkehuse og stuehuse",
            "6,7",
            "Gælder også ferieboliger på 150 m² eller derover",
          ],
          ["Etageboliger", "7,5", "Inkl. ungdomsboliger og ældreboliger"],
          ["Kontorer", "7,5", "Samme grænse som etageboliger"],
          [
            "Øvrigt nybyggeri",
            "8,0",
            "Industri, haller, institutioner m.m.",
          ],
        ],
      },
      {
        type: "heading2",
        text: "Separat grænseværdi for byggeprocessen (A4+A5)",
      },
      {
        type: "paragraph",
        text: "Ud over den samlede LCA-grænseværdi er der fra juli 2025 en separat grænse for byggeprocessen:",
      },
      {
        type: "table",
        headers: ["Fase", "Grænseværdi", "Dækker"],
        rows: [
          [
            "A4+A5 samlet",
            "1,5 kg CO₂e/m²/år",
            "Transport til byggeplads + spild og affald under opførelse",
          ],
        ],
      },
      {
        type: "paragraph",
        text: "Denne grænse gælder for alle bygningstyper. Læs mere om [A4 og A5 dokumentation](/blog/a4-a5-dokumentation) og hvordan du indsamler de nødvendige data.",
      },
      {
        type: "heading2",
        text: "Hvad måles der på?",
      },
      {
        type: "paragraph",
        text: "Grænseværdierne måles i kg [CO₂-ækvivalenter](/ordbog/co2-aekvivalenter) pr. m² pr. år (kg CO₂e/m²/år). Beregningen dækker en [betragtningsperiode](/ordbog/betragtningsperiode) på 50 år. Hovedgrænseværdien omfatter modulerne [A1-A3](/ordbog/modul-a1-a3), [B4](/ordbog/modul-b4), [B6](/ordbog/modul-b6) og [C3-C4](/ordbog/modul-c3-c4), mens byggeprocessen (A4+A5) har sin egen separate grænse.",
      },
      {
        type: "paragraph",
        text: "BR18 bruger et såkaldt [referenceareal](/ordbog/etageareal) som divisor for materialernes klimaaftryk. Referencearealet tager udgangspunkt i det opvarmede etageareal, men tillægger vægtede andele for andre arealer: udestuer og integrerede garager tæller 50%, mens integrerede carporte og overdækninger tæller 25%. Driftsenergien (modul B6) divideres separat med det opvarmede etageareal alene. Se vores [guide til LCA-beregning](/blog/hvad-er-lca-beregning) for en fuld forklaring af processen.",
      },
      {
        type: "heading2",
        text: "Tidligere grænseværdier (før juli 2025)",
      },
      {
        type: "paragraph",
        text: "Til sammenligning gjaldt følgende grænseværdier før 1. juli 2025:",
      },
      {
        type: "table",
        headers: ["Periode", "Grænseværdi", "Bemærkning"],
        rows: [
          [
            "2023-2025 (over 1.000 m²)",
            "12,0 kg CO₂e/m²/år",
            "Kun bygninger over 1.000 m² skulle overholde grænsen",
          ],
          [
            "2023-2025 (under 1.000 m²)",
            "Kun dokumentationskrav",
            "LCA-beregning påkrævet, men ingen grænseværdi",
          ],
          ["Før 2023", "Ingen krav", "Hverken LCA-beregning eller grænseværdi"],
        ],
      },
      {
        type: "paragraph",
        text: "Stramningen fra 12,0 til 4,0-8,0 er markant og stiller nye krav til materialevalg og planlægning. Læs mere om [hvad de nye klimakrav betyder for dit byggeri](/blog/klimakrav-2025).",
      },
      {
        type: "heading2",
        text: "Typiske hotspots i LCA-beregningen",
      },
      {
        type: "paragraph",
        text: "Disse bygningsdele bidrager typisk mest til CO₂-udledningen og bør prioriteres i optimeringen:",
      },
      {
        type: "list",
        items: [
          "Fundamenter og terrændæk (beton og armering)",
          "Ydervægge og facadebeklædning",
          "Tagkonstruktion og tagbelægning",
          "Vinduer og glaspartier",
          "Isoleringsmaterialer (type og mængde)",
        ],
      },
      {
        type: "paragraph",
        text: "En [hotspot-analyse](/ordbog/hotspot-analyse) identificerer præcis hvilke dele der er mest CO₂-tunge i dit konkrete projekt, så optimeringen kan fokuseres rigtigt.",
      },
      {
        type: "heading2",
        text: "Få overblik over dit projekt",
      },
      {
        type: "paragraph",
        text: "Er du i tvivl om dit projekt overholder grænseværdierne? Hos Din LCA Hjælper laver vi en tidlig beregning med hotspot-analyse, så du ved præcis hvor du står — inden materialerne er bestilt. [Kontakt os](/kontakt) for et tilbud. Priser fra 3.500 kr inkl. A45-adgang.",
      },
    ],
    faqs: [
      {
        question: "Hvor stor margin bør man have til grænseværdien?",
        answer:
          "Vi anbefaler en margin på mindst 10-15% under grænseværdien i den tidlige beregning, da faktiske mængder ved færdigmelding kan afvige fra det projekterede. En hotspot-analyse identificerer hvor optimeringen giver mest effekt, så du kan bygge marginen ind de rigtige steder.",
      },
      {
        question: "Gælder grænseværdierne også for renovering og tilbygninger?",
        answer:
          "For tilbygninger til etageboliger, kontorer og institutioner gælder LCA-kravet uanset størrelse. For enfamiliehuse, rækkehuse og sommerhuse gælder kravet kun for tilbygninger på 250 m² eller derover. Rene renoveringer er generelt undtaget fra LCA-kravet.",
      },
      {
        question: "Kan jeg kompensere for en høj A1-A3 med en lav A4+A5?",
        answer:
          "Nej. A4+A5 har sin egen separate grænseværdi (1,5 kg CO₂e/m²/år) som skal overholdes uafhængigt. Derudover tæller A4+A5 også med i den samlede LCA-grænse. Begge grænser skal overholdes.",
      },
      {
        question: "Hvor finder jeg de officielle grænseværdier?",
        answer:
          "Grænseværdierne er fastsat i BR18 (Bygningsreglementet) og kan findes på bygningsreglementet.dk. Bolig- og Planstyrelsen opdaterer løbende vejledningen.",
      },
    ],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}
