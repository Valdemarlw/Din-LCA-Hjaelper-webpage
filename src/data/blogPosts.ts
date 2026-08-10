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
  // ─── Post: Hvad koster en LCA-beregning? (pris) ───
  {
    slug: "lca-beregning-pris",
    title: "Hvad koster en LCA-beregning? Priser i 2026 og hvad der påvirker dem",
    description:
      "Hvad koster en LCA-beregning efter BR18? Vejledende priser for bolig, sommerhus og erhverv, hvad der driver prisen, og hvordan du får et fast tilbud inden 24 timer.",
    date: "2026-06-22",
    readingTime: "7 min",
    content: [
      {
        type: "paragraph",
        text: "Hvad en LCA-beregning koster afhænger af projektets omfang og kompleksitet, ikke af arealet alene. For et typisk enfamiliehus eller sommerhus ligger en komplet beregning omkring 5.000-7.000 kr ekskl. moms. Rækkehuse og projekter med flere boliger starter ved 8.000 kr og får altid et manuelt tilbud. Det samme gælder store eller komplekse erhvervsprojekter.",
      },
      {
        type: "heading2",
        text: "Hvad koster en LCA-beregning? Kort svar",
      },
      {
        type: "paragraph",
        text: "Her er et vejledende prisinterval pr. bygningstype for en komplet LCA-beregning. Alle priser er ekskl. moms:",
      },
      {
        type: "table",
        headers: ["Bygningstype", "Vejledende pris (komplet beregning)"],
        rows: [
          ["Enfamiliehus", "Typisk 5.000-7.000 kr"],
          ["Sommerhus og fritidshus", "Typisk 5.000-7.000 kr"],
          ["Rækkehus og projekter med flere boliger", "Fra 8.000 kr, manuelt tilbud"],
          ["Lager og hal", "5.500-9.500 kr"],
          ["Kontor, handel og etagebyggeri", "8.000-12.500 kr"],
          ["Store eller komplekse projekter", "Individuelt tilbud"],
        ],
      },
      {
        type: "paragraph",
        text: "Tallene er vejledende. Den faktiske pris afhænger af, hvor mange konstruktionstyper projektet har, og hvilke grænseværdikrav der gælder. Brug vores [BR18-tjekker](/vaerktoejer/br18-tjekker) for at få et hurtigt prisestimat for netop dit projekt, eller [send tegningerne](/kontakt) og få et fast tilbud inden 24 timer. Er du i tvivl, om dit projekt overhovedet skal have en LCA, så se [hvornår en LCA-beregning er lovpligtig](/blog/hvornaar-er-lca-lovpligtig).",
      },
      {
        type: "heading2",
        text: "Hvad bestemmer prisen på en LCA-beregning?",
      },
      {
        type: "paragraph",
        text: "Prisen følger arbejdsmængden, og arbejdsmængden bestemmes af, hvor sammensat byggeriet er. De vigtigste faktorer er:",
      },
      {
        type: "list",
        items: [
          "Antal konstruktionstyper: Hver unik ydervæg, tagopbygning, dæk og fundament skal kortlægges, mappes til materialer og beregnes. Et hus med 17 forskellige lagopbygninger kræver mere arbejde end en simpel hal med fire.",
          "Grænseværdikravet: Et sommerhus under 150 m² skal holde [4,0 kg CO₂e/m²/år](/blog/graensevaerdier-co2), den strammeste grænse i BR18. Det kræver mere optimering og flere [produktspecifikke EPD'er](/ordbog/produktspecifikke-data) end et erhvervsbyggeri med grænsen 7,5.",
          "Bygningstype: Bolig, sommerhus, lager og kontor har forskellige standardpriser, fordi de typisk rummer forskelligt antal konstruktioner og forskellig kompleksitet.",
          "Datagrundlag: En beregning udelukkende på [generiske data](/ordbog/generiske-data) er hurtigere end en, hvor vi finder og indlæser produktspecifikke EPD'er for at komme under grænsen.",
        ],
      },
      {
        type: "paragraph",
        text: "Bemærk, at arealet i sig selv ikke afgør prisen. Et lille, lagtæt hus kan kræve mere arbejde end en stor, bar lagerhal. Derfor prissætter vi efter omfang og kompleksitet, ikke pr. kvadratmeter.",
      },
      {
        type: "heading2",
        text: "LCA Komplet eller LCA Direkte?",
      },
      {
        type: "paragraph",
        text: "Vi tilbyder to niveauer, så du kun betaler for det, du har brug for:",
      },
      {
        type: "list",
        items: [
          "LCA Komplet: Vi håndterer hele beregningen, inklusive at trække mængderne ud af dine tegninger eller din Revit-model. Det passer til de fleste kunder.",
          "LCA Direkte: Hvis du leverer et struktureret mængdeudtræk, som vi kan bruge direkte, trækker vi op til 1.000 kr fra prisen. Vi bekræfter altid først, at Revit-udtrækket eller mængdelisten er brugbar.",
        ],
      },
      {
        type: "paragraph",
        text: "Begge niveauer indeholder den samme faglige beregning, [hotspot-analyse](/ordbog/hotspot-analyse) og myndighedsklare rapport. Forskellen er kun, hvem der laver mængdeopgørelsen.",
      },
      {
        type: "heading2",
        text: "Hvad er inkluderet i prisen?",
      },
      {
        type: "paragraph",
        text: "En LCA-beregning hos Din LCA Hjælper er en samlet løsning, ikke en stykpris pr. delydelse. Hver beregning indeholder:",
      },
      {
        type: "list",
        items: [
          "Tidlig beregning med [hotspot-analyse](/ordbog/hotspot-analyse), der viser de mest CO₂-tunge bygningsdele",
          "Materialeoptimering med konkrete forslag, hvis grænseværdien er i fare",
          "[A4- og A5-beregning](/blog/a4-a5-dokumentation) med dokumenterede generiske forudsætninger i den tidlige beregning",
          "Opdatering ved færdigmelding med endelige mængder og registreret byggepladsforbrug",
          "Myndighedsklar rapport klar til kommunen",
        ],
      },
      {
        type: "paragraph",
        text: "Mange rådgivere tager ekstra for opdateringen ved færdigmelding. Hos os er den med i prisen, fordi en LCA-rapport skal afspejle det faktisk opførte byggeri for at blive godkendt.",
      },
      {
        type: "heading2",
        text: "Pris i forhold til at lave beregningen selv",
      },
      {
        type: "paragraph",
        text: "[LCAbyg](/ordbog/lcabyg) er gratis at hente, så i teorien koster en LCA-beregning ingenting, hvis du laver den selv. I praksis er din egen tid den reelle omkostning. En beregning tager typisk 15-30 timer, når du er rutineret, og betydeligt mere de første gange. Med en timepris på 800 kr svarer det til 12.000-24.000 kr i intern tid, før læringskurven er regnet med.",
      },
      {
        type: "paragraph",
        text: "Er du allerede gået i stå i LCAbyg, kan det betale sig at [få beregningen ud af hænderne](/blog/lcabyg-hjaelp-outsource). Vi har sammenlignet de to muligheder i detaljer i [Din LCA Hjælper vs. LCAbyg](/sammenligninger/din-lca-hjaelper-vs-lcabyg).",
      },
      {
        type: "heading2",
        text: "Hvorfor er vores priser lavere end de store ingeniørhuse?",
      },
      {
        type: "paragraph",
        text: "Vi laver udelukkende LCA for byggeri. Vi laver ikke energiberegning, statik eller [DGNB-certificering](/ordbog/dgnb). Den fokusering giver lavere overhead og en proces, der er strømlinet til præcis denne opgave. Det er grunden til, at vi kan holde priserne nede uden at gå på kompromis med kvaliteten. Se vores løsninger for [enfamiliehuse](/lca-beregning/enfamiliehus), [sommerhuse](/lca-beregning/sommerhus) og [erhverv](/lca-beregning/erhverv).",
      },
      {
        type: "heading2",
        text: "Få en fast pris på dit projekt",
      },
      {
        type: "paragraph",
        text: "Vil du vide, hvad netop dit byggeri koster? Brug [BR18-tjekkeren](/vaerktoejer/br18-tjekker) for et hurtigt estimat, eller [send dine tegninger](/kontakt), så får du et fast tilbud inden 24 timer. Du kender prisen, før du siger ja.",
      },
    ],
    faqs: [
      {
        question: "Hvad koster en LCA-beregning for et enfamiliehus?",
        answer:
          "For et typisk enfamiliehus ligger en komplet beregning omkring 5.000-7.000 kr ekskl. moms. Den endelige pris afhænger af antallet af konstruktionstyper og projektets kompleksitet, ikke af arealet alene. Send dine tegninger, så giver vi et fast tilbud inden 24 timer.",
      },
      {
        question: "Er priserne inkl. eller ekskl. moms?",
        answer:
          "Alle vores priser er ekskl. moms. De fleste af vores kunder er erhvervskunder, der kan trække momsen fra, så det er prisen ekskl. moms, der er relevant for dem.",
      },
      {
        question: "Hvad er forskellen på LCA Komplet og LCA Direkte?",
        answer:
          "LCA Komplet er standardløsningen, hvor vi også trækker mængderne ud af dine tegninger. LCA Direkte kan spare dig op til 1.000 kr, hvis du leverer et struktureret mængdeudtræk, som vi kan bruge direkte. Vi bekræfter datagrundlaget, før rabatten indgår i tilbuddet.",
      },
      {
        question: "Er opdatering ved færdigmelding inkluderet i prisen?",
        answer:
          "Ja. Vi opdaterer beregningen med endelige mængder og registreret byggepladsforbrug ved færdigmelding. LCA-rapporten skal afspejle det opførte byggeri, og derfor hører opdateringen med i en komplet løsning.",
      },
      {
        question: "Hvorfor får jeg ikke en fast pris pr. kvadratmeter?",
        answer:
          "Fordi arealet ikke er det, der bestemmer arbejdet. To huse på samme størrelse kan kræve vidt forskellig indsats afhængigt af antallet af konstruktioner, og hvilken grænseværdi der gælder. Vi prissætter derfor efter projektets omfang og kompleksitet og giver dig altid en fast samlet pris på forhånd.",
      },
      {
        question: "Hvad hvis mit projekt er meget stort eller komplekst?",
        answer:
          "Større eller særligt komplekse projekter håndterer vi manuelt og giver et individuelt tilbud. Send tegningerne, så ser vi på omfanget og vender tilbage med en fast pris inden 24 timer.",
      },
    ],
  },

  // ─── Post: Hvornår er en LCA-beregning lovpligtig? ───
  {
    slug: "hvornaar-er-lca-lovpligtig",
    title: "Hvornår er en LCA-beregning lovpligtig? Bygningstyper og arealgrænser",
    description:
      "Skal dit byggeri have en LCA-beregning efter BR18? Se hvilke bygningstyper og arealgrænser der er omfattet, hvilke undtagelser der gælder, og hvad der sker, hvis beregningen mangler.",
    date: "2026-06-22",
    readingTime: "6 min",
    content: [
      {
        type: "paragraph",
        text: "En LCA-beregning er lovpligtig for stort set alt nybyggeri i Danmark efter [BR18](/ordbog/br18), og kravet gælder også de fleste tilbygninger. Men der findes vigtige undtagelser, og der er forskel på, om dit projekt skal lave en beregning, og om det skal overholde en grænseværdi. I denne artikel gennemgår vi reglerne bygningstype for bygningstype, og du kan tjekke dit eget projekt på sekunder med vores [BR18-tjekker](/vaerktoejer/br18-tjekker).",
      },
      {
        type: "heading2",
        text: "To krav, ikke ét: beregningspligt og grænseværdi",
      },
      {
        type: "paragraph",
        text: "BR18's klimakrav hviler på to paragraffer, og de skal holdes adskilt:",
      },
      {
        type: "list",
        items: [
          "§ 297 er beregningspligten: kravet om overhovedet at lave en LCA og dokumentere den.",
          "§ 298 er grænseværdien: det tal i kg CO₂e/m²/år, som beregningen skal holde sig under.",
        ],
      },
      {
        type: "paragraph",
        text: "Forskellen har konsekvenser. Et byggeri kan være forpligtet til at lave en LCA, men være undtaget fra grænseværdien. Så skal du stadig levere beregningen, der er bare ikke et tal, den skal overholde. Det gælder blandt andet visse samfundskritiske bygninger, som vi vender tilbage til nedenfor.",
      },
      {
        type: "heading2",
        text: "Hvilke byggerier er omfattet?",
      },
      {
        type: "paragraph",
        text: "Som udgangspunkt skal der laves en LCA-beregning for:",
      },
      {
        type: "list",
        items: [
          "Alt nyt opvarmet byggeri, uanset størrelse",
          "Uopvarmede bygninger over 50 m² (fx lagerhaller og parkeringshuse)",
          "Tilbygninger til erhverv og etageboliger, uanset størrelse",
          "Tilbygninger til enfamiliehuse, rækkehuse og sommerhuse, men kun fra 250 m² opvarmet etageareal og opefter",
        ],
      },
      {
        type: "paragraph",
        text: "Bemærk, at der ikke længere er nogen 1.000 m²-grænse. Frem til 1. juli 2025 gjaldt grænseværdien kun for byggeri over 1.000 m², men den tærskel er afskaffet. I dag er stort set alt nybyggeri omfattet, uanset størrelse. Læs mere om [de nye klimakrav fra 2025](/blog/klimakrav-2025).",
      },
      {
        type: "heading2",
        text: "Grænseværdier efter bygningstype",
      },
      {
        type: "paragraph",
        text: "Hvis dit byggeri er omfattet af grænseværdien, afhænger kravet af bygningstypen. Fra 1. juli 2025 gælder:",
      },
      {
        type: "table",
        headers: ["Bygningstype", "Grænseværdi (kg CO₂e/m²/år)"],
        rows: [
          ["Sommerhuse under 150 m²", "4,0"],
          ["Sommerhuse 150 m² og derover, enfamiliehuse, række-/kæde-/dobbelthuse", "6,7"],
          ["Etageboliger, kontor, handel, lager", "7,5"],
          ["Øvrigt nybyggeri (skoler, institutioner, p-huse)", "8,0"],
        ],
      },
      {
        type: "paragraph",
        text: "Derudover skal byggeprocessen ([A4](/ordbog/modul-a4) + [A5](/ordbog/modul-a5)) overholde en separat grænse på 1,5 kg CO₂e/m²/år for alle bygningstyper. Se den fulde [oversigt over grænseværdier](/blog/graensevaerdier-co2).",
      },
      {
        type: "heading2",
        text: "Hvad er undtaget?",
      },
      {
        type: "paragraph",
        text: "Følgende er helt fritaget for LCA-kravet:",
      },
      {
        type: "list",
        items: [
          "Uopvarmede bygninger under 50 m²",
          "Tilbygninger under 250 m² til enfamiliehuse, rækkehuse, stuehuse og sommerhuse",
          "Transportable konstruktioner og midlertidige, flytbare pavilloner",
          "Almindelige ombygninger og renoveringer af eksisterende byggeri",
        ],
      },
      {
        type: "paragraph",
        text: "En vigtig nuance: undtagelsen for tilbygninger under 250 m² gælder kun boliger og ferieboliger. En tilbygning til et kontor eller en etagebolig er omfattet, uanset hvor lille den er.",
      },
      {
        type: "heading2",
        text: "Samfundskritiske bygninger: beregning uden grænseværdi",
      },
      {
        type: "paragraph",
        text: "Nogle bygningstyper skal lave og indsende en LCA, men er undtaget fra selve grænseværdien. Det gælder blandt andet industriproduktion med integreret produktionsapparat, energi-, vand- og affaldsforsyning, hospitaler, fængsler og forsvarets operative bygninger. For dem er der beregningspligt efter § 297, men intet tal at overholde efter § 298, og dermed intet optimeringskrav.",
      },
      {
        type: "heading2",
        text: "Hvad sker der, hvis LCA-beregningen mangler?",
      },
      {
        type: "paragraph",
        text: "LCA-dokumentationen kontrolleres ved færdigmelding. Mangler beregningen, eller overskrider den grænseværdien, kan kommunen nægte ibrugtagningstilladelse. Byggeriet betragtes som ulovligt, indtil forholdet er lovliggjort. Myndighederne fører tilsyn via stikprøver, og manglende eller fejlagtig dokumentation kan udløse bøde.",
      },
      {
        type: "paragraph",
        text: "Derfor er det afgørende at få afklaret kravet tidligt. Jo før du ved, om dit projekt er omfattet, og hvilken grænse der gælder, jo bedre kan [materialevalgene optimeres](/blog/hvad-er-lca-beregning), inden de er fastlåste.",
      },
      {
        type: "heading2",
        text: "Tjek dit eget projekt",
      },
      {
        type: "paragraph",
        text: "Er du i tvivl, om dit byggeri er omfattet? Vores [BR18-tjekker](/vaerktoejer/br18-tjekker) giver dig svaret på sekunder: vælg bygningstype, angiv om det er nybyggeri eller tilbygning, og indtast det opvarmede areal. Værktøjet fortæller, om en LCA er lovpligtig, hvilken grænseværdi der gælder, og [hvad en beregning vil koste](/blog/lca-beregning-pris). Er du stadig i tvivl om afgrænsningen, er du velkommen til at [kontakte os](/kontakt) uforpligtende.",
      },
    ],
    faqs: [
      {
        question: "Er min tilbygning omfattet af LCA-kravet?",
        answer:
          "Tilbygninger til enfamiliehuse, rækkehuse og sommerhuse er undtaget, hvis de er under 250 m² opvarmet etageareal. Er tilbygningen 250 m² eller derover, er den omfattet. Tilbygninger til erhverv og etageboliger er omfattet uanset størrelse.",
      },
      {
        question: "Gælder LCA-kravet for renovering?",
        answer:
          "Nej. Almindelige ombygninger og renoveringer af eksisterende byggeri er fritaget. Kravet gælder kun nybyggeri og tilbygninger over de nævnte bagatelgrænser.",
      },
      {
        question: "Skal et uopvarmet lager have en LCA-beregning?",
        answer:
          "Ja, hvis det er over 50 m². Uopvarmede bygninger over 50 m² er omfattet og skal overholde grænseværdien 7,5 kg CO₂e/m²/år for et lager eller 8,0 for et parkeringshus. For uopvarmede bygninger sættes driftsenergien (B6) til 0 i beregningen. Uopvarmede bygninger under 50 m² er helt fritaget.",
      },
      {
        question: "Er der stadig en 1.000 m²-grænse?",
        answer:
          "Nej. Frem til 1. juli 2025 gjaldt grænseværdien kun for byggeri over 1.000 m². Den tærskel er afskaffet. I dag er stort set alt nybyggeri omfattet, uanset størrelse.",
      },
      {
        question: "Hvad sker der, hvis jeg ikke laver beregningen?",
        answer:
          "Så kan kommunen nægte ibrugtagningstilladelse ved færdigmelding, og byggeriet betragtes som ulovligt, indtil forholdet er lovliggjort. Manglende eller fejlagtig dokumentation kan desuden udløse bøde. Derfor er det en god idé at få kravet afklaret tidligt i projektet.",
      },
    ],
  },

  // ─── Post: Sidder du fast i LCAbyg? (hjælp / outsource) ───
  {
    slug: "lcabyg-hjaelp-outsource",
    title: "Sidder du fast i LCAbyg? Sådan får du beregningen igennem til tiden",
    description:
      "LCAbyg har en stejl læringskurve, og mængdeopgørelse, EPD-import og A4/A5 er typiske faldgruber. Læs hvornår du bør kæmpe videre, og hvornår det betaler sig at outsource LCA-beregningen.",
    date: "2026-06-22",
    readingTime: "6 min",
    content: [
      {
        type: "paragraph",
        text: "[LCAbyg](/ordbog/lcabyg) er det gratis, statslige beregningsprogram til bygnings-LCA, og det er solidt. Men det har en stejl læringskurve, og mange arkitekter og rådgivere går i stå undervejs, typisk i mængdeopgørelsen, EPD-importen eller [A4/A5-dokumentationen](/blog/a4-a5-dokumentation). Hvis en byggetilladelse rykker tættere på, end oplæringen kan nå, er det ikke det rette tidspunkt at lære et nyt værktøj fra bunden. Her gennemgår vi de typiske steder, folk sidder fast, og hvornår det betaler sig at få hjælp.",
      },
      {
        type: "heading2",
        text: "Hvor folk typisk går i stå i LCAbyg",
      },
      {
        type: "list",
        items: [
          "Mængdeopgørelsen: At få korrekte mængder ud af tegninger eller en Revit-model er det mest tidskrævende trin, og det er her, de fleste fejl opstår.",
          "Materialemapping: At vælge de rigtige poster fra bygningsreglementets [generiske data](/ordbog/generiske-data) kræver kendskab til, hvordan konstruktioner er bygget op.",
          "EPD-import: At finde, validere og indlæse [produktspecifikke EPD'er](/ordbog/produktspecifikke-data), som ofte er nødvendige for at komme under grænsen, er en disciplin i sig selv.",
          "A4 og A5: Byggeprocessens [transport- og byggepladsdata](/blog/a4-a5-dokumentation) ligger ved siden af selve LCAbyg og kræver data fra leverandører og entreprenører.",
          "Fejl, der ikke flagges: LCAbyg regner det, du indtaster. Programmet fortæller dig ikke, om en konstruktion er sat konceptuelt forkert op.",
        ],
      },
      {
        type: "paragraph",
        text: "Ingen af delene er uoverkommelige. Men de tager tid at lære, og rutinen forsvinder igen mellem hvert projekt, hvis du kun har en håndfuld LCA-sager om året.",
      },
      {
        type: "heading2",
        text: "Kæmp videre eller giv opgaven fra dig?",
      },
      {
        type: "paragraph",
        text: "Det giver god mening at lave beregningen selv, hvis tegnestuen har en intern LCA-ansvarlig og nok projekter til at holde rutinen ved lige. Det er typisk tid at få hjælp, når:",
      },
      {
        type: "list",
        items: [
          "Du har 1-3 LCA-projekter om året, og rutinen er væk mellem hver",
          "Deadline for byggetilladelse er tættere på, end oplæringen kan nå",
          "Du er allerede gået i stå i mængdeopgørelse, EPD-import eller A4/A5-data",
          "Tegnestuens timer er bedre brugt på arkitektur end på at fejlfinde et beregningsværktøj",
        ],
      },
      {
        type: "paragraph",
        text: "Vi har lavet en grundig [sammenligning af at gøre det selv i LCAbyg vs. at få hjælp](/sammenligninger/din-lca-hjaelper-vs-lcabyg), hvis du vil se de to muligheder side om side.",
      },
      {
        type: "heading2",
        text: "Sådan fungerer det at outsource beregningen",
      },
      {
        type: "paragraph",
        text: "Du behøver ikke starte forfra. Vi kan tage over, uanset hvor langt du er:",
      },
      {
        type: "list",
        items: [
          "Send dine tegninger og konstruktionsbeskrivelser, og din LCAbyg-fil, hvis du er gået i stå i en",
          "Vi giver et fast tilbud inden 24 timer",
          "Vi gennemgår dit udkast, retter eventuelle fejl i mængdeopgørelsen og fører projektet i mål",
          "Du modtager både den myndighedsklare rapport og selve LCAbyg-filen, så du har fuld adgang bagefter",
        ],
      },
      {
        type: "paragraph",
        text: "Vi bruger selv LCAbyg i alle vores projekter. Du sparer altså ikke på værktøjet, du sparer på den tid, det tager at blive god til at bruge det.",
      },
      {
        type: "heading2",
        text: "Når deadline er tæt på",
      },
      {
        type: "paragraph",
        text: "Akut tidspres er en af de hyppigste grunde til, at folk kontakter os. Vores tidlige beregning med [hotspot-analyse](/ordbog/hotspot-analyse) tager typisk 1-2 uger fra modtaget materiale, og i tidlig fase kan vi levere en foreløbig beregning hurtigere. I vores [referenceprojekt fra Esbjerg](/referenceprojekter/he-bluhmesvej-67) blev LCA'en bestilt efter byggestart og kom alligevel i mål med EPD-dokumentation under tidspres.",
      },
      {
        type: "heading2",
        text: "Hvad koster det?",
      },
      {
        type: "paragraph",
        text: "En komplet beregning for et enfamiliehus ligger typisk omkring 5.000-7.000 kr ekskl. moms, og leverer du selv et struktureret mængdeudtræk, bliver det billigere. Sammenlign det med 15-30 timers eget arbejde i LCAbyg. Se [hvad en LCA-beregning koster](/blog/lca-beregning-pris) for en fuld gennemgang, eller få et hurtigt estimat med [BR18-tjekkeren](/vaerktoejer/br18-tjekker).",
      },
      {
        type: "heading2",
        text: "Kom videre med din beregning",
      },
      {
        type: "paragraph",
        text: "Sidder du fast, eller vil du bare have LCA'en ud af hænderne? [Send os dine tegninger](/kontakt), og din LCAbyg-fil, hvis du har en, så får du et fast tilbud inden 24 timer og en beregning, der lever op til [BR18](/ordbog/br18).",
      },
    ],
    faqs: [
      {
        question: "Kan I overtage en LCAbyg-fil, jeg er gået i stå i?",
        answer:
          "Ja. Hvis du er kørt fast i en LCAbyg-fil, kan vi tage over og færdiggøre beregningen. Vi gennemgår dit udkast, retter eventuelle fejl i mængdeopgørelsen og kører projektet i mål. Send filen sammen med tegningerne, så giver vi et fast tilbud inden 24 timer.",
      },
      {
        question: "Får jeg LCAbyg-filen, så jeg kan rette i den selv?",
        answer:
          "Ja. Du modtager både den myndighedsklare rapport og selve LCAbyg-filen, så du har fuld adgang, hvis du selv vil justere materialer senere. Opdatering med faktiske mængder ved færdigmelding klarer vi normalt som en del af prisen.",
      },
      {
        question: "Bruger I selv LCAbyg?",
        answer:
          "Ja. LCAbyg er det officielle danske beregningsværktøj, og vi bruger det i alle vores projekter. Forskellen er, at vi kender faldgruberne og har en fast proces fra tegning til myndighedsklar rapport.",
      },
      {
        question: "Kan I nå det, hvis min deadline er tæt på?",
        answer:
          "Ofte ja. Den tidlige beregning tager typisk 1-2 uger fra modtaget materiale, og i tidlig fase kan vi levere en foreløbig beregning hurtigere. Kontakt os med din deadline, så siger vi ærligt, om vi kan nå det.",
      },
      {
        question: "Hvad hvis jeg kun har ét projekt om året?",
        answer:
          "Så er det næsten altid bedst at få hjælp. Den tid, det tager at lære LCAbyg ordentligt, overstiger hurtigt prisen for en udført beregning, og rutinen forsvinder igen inden næste projekt.",
      },
    ],
  },

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
          "Alle nye opvarmede byggerier, uanset størrelse",
          "Uopvarmede bygninger over 50 m²",
          "Tilbygninger til etageboliger, kontorer og institutioner, uanset størrelse",
          "Tilbygninger til enfamiliehuse, rækkehuse og sommerhuse, over 250 m²",
        ],
      },
      {
        type: "paragraph",
        text: "Beregningen skal dokumenteres ved færdigmelding for at opnå ibrugtagningstilladelse. Det betyder, at LCA-rapporten skal afspejle det faktisk byggede, ikke kun det projekterede. Derfor anbefaler vi at starte LCA-beregningen tidligt og [opdatere den ved færdigmelding](/kontakt). Se den fulde gennemgang af [hvornår en LCA-beregning er lovpligtig](/blog/hvornaar-er-lca-lovpligtig).",
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
          "A4/A5-dokumentation: Indsamling af data for transport og byggeproces, læs mere om [A4 og A5 faserne](/blog/a4-a5-dokumentation)",
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
        text: "Prisen for en LCA-beregning afhænger af projektets omfang og kompleksitet, særligt antallet af konstruktionstyper og hvilket grænseværdikrav der gælder, ikke af arealet alene. For et typisk enfamiliehus ligger en komplet beregning omkring 5.000-7.000 kr ekskl. moms. A4/A5-beregning og dokumentation er inkluderet. Vi giver fast tilbud inden for 24 timer efter modtagelse af tegninger. Se [hvad en LCA-beregning koster](/blog/lca-beregning-pris) for en fuld gennemgang af priser og hvad der påvirker dem.",
      },
      {
        type: "paragraph",
        text: "Til sammenligning ligger de fleste konkurrenter højere, især de store rådgivende ingeniørfirmaer. Vores priser er lave fordi vi er specialiseret udelukkende i LCA for byggeri, hvilket giver lavere overhead og en mere fokuseret proces.",
      },
      {
        type: "heading2",
        text: "Hvornår bør du starte din LCA-beregning?",
      },
      {
        type: "paragraph",
        text: "Jo tidligere, jo bedre. En tidlig LCA-beregning giver dig mulighed for at optimere materialevalg inden de er fastlåste. Mange bygherrer og arkitekter oplever at materialerne i tidlig fase overskrider grænseværdien, og det er langt billigere at ændre materialer på tegnebrættet end på byggepladsen.",
      },
      {
        type: "paragraph",
        text: "Med de [nye klimakrav fra 2025](/blog/klimakrav-2025) er grænseværdierne strammet for flere bygningstyper. Det gør den tidlige beregning endnu vigtigere, særligt for [sommerhuse](/blog/lca-sommerhuse), som har de strengeste krav.",
      },
      {
        type: "heading2",
        text: "Få hjælp til din LCA-beregning",
      },
      {
        type: "paragraph",
        text: "Hos Din LCA Hjælper håndterer vi hele LCA-processen for dig. Hotspot-analyse, materialeoptimering og A4/A5-beregning er en del af opgaven. Se vores [bygningstype-sider](/lca-beregning) for de specifikke krav til dit projekt, eller [kontakt os](/kontakt) for et uforpligtende tilbud.",
      },
    ],
    faqs: [
      {
        question: "Kan jeg lave min egen LCA-beregning?",
        answer:
          "Teknisk set ja, der findes self-service værktøjer som LCAbyg. Men en korrekt LCA kræver faglig indsigt i materialer, konstruktioner og BR18-kravene. Fejl i beregningen kan betyde at rapporten ikke godkendes ved færdigmelding, hvilket forsinker hele byggesagen.",
      },
      {
        question: "Hvad sker der hvis min LCA overskrider grænseværdien?",
        answer:
          "Hvis beregningen viser overskridelse, skal der foretages materialeændringer eller konstruktionstilpasninger inden færdigmelding. Derfor er en tidlig hotspot-analyse vigtig, den identificerer præcis hvilke bygningsdele der skal optimeres.",
      },
      {
        question: "Skal LCA-beregningen opdateres efter byggeriet?",
        answer:
          "Ja. LCA-rapporten til kommunen skal afspejle det faktisk byggede, ikke kun det projekterede. Det betyder at beregningen skal opdateres med faktiske mængder ved færdigmelding. Hos Din LCA Hjælper er denne opdatering inkluderet i prisen.",
      },
      {
        question: "Hvad er forskellen på LCA og energirammeberegning?",
        answer:
          "Energirammeberegningen dokumenterer bygningens energiforbrug under drift (opvarmning, køling, ventilation). LCA-beregningen dækker den samlede miljøpåvirkning over hele levetiden, inkl. materialeproduktion, transport, byggeproces og nedrivning. Begge er lovpligtige efter BR18, men det er to separate beregninger.",
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
        text: "De differentierede grænseværdier er opdelt efter bygningstype. Her er en oversigt, se også vores [komplette guide til grænseværdier](/blog/graensevaerdier-co2) for detaljer:",
      },
      {
        type: "table",
        headers: ["Bygningstype", "Grænseværdi (kg CO₂e/m²/år)"],
        rows: [
          ["Sommerhuse under 150 m²", "4,0"],
          ["Enfamiliehuse og rækkehuse", "6,7"],
          ["Etageboliger og kontorer", "7,5"],
          ["Øvrigt nybyggeri", "8,0"],
          ["Byggeproces (A4+A5), alle typer", "1,5"],
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
        text: "Med en grænseværdi på kun 4,0 kg CO₂e/m²/år er [sommerhuse](/blog/lca-sommerhuse) den bygningstype med de strengeste krav. Det skyldes bl.a. at sommerhuse typisk har et relativt lille opvarmet areal, men stadig kræver fundamenter, tag og ydervægge. Materialevalg er her helt afgørende, tunge konstruktioner i beton kan hurtigt overskride grænsen.",
      },
      {
        type: "heading3",
        text: "Enfamiliehuse og rækkehuse",
      },
      {
        type: "paragraph",
        text: "Grænsen på 6,7 kg CO₂e/m²/år er opnåelig for de fleste projekter med gennemtænkte materialevalg. Men det kræver opmærksomhed, særligt fundamenter, ydervægge og tagkonstruktioner er typiske hotspots. En tidlig [LCA-beregning](/blog/hvad-er-lca-beregning) gør det muligt at optimere inden materialerne er fastlåste.",
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
        text: "Det betyder at dokumentation af A4- og A5-faserne nu er obligatorisk. Hos Din LCA Hjælper beregner vi transport og byggeproces som en del af LCA-opgaven og opdaterer den endelige rapport med de projektdata, der foreligger.",
      },
      {
        type: "heading2",
        text: "Sådan forbereder du dig",
      },
      {
        type: "list",
        items: [
          "Start LCA-beregningen tidligt, gerne i skitsefasen, så materialevalgene kan optimeres",
          "Bestil en [hotspot-analyse](/ordbog/hotspot-analyse) for at identificere de mest CO₂-tunge bygningsdele",
          "Planlæg A4/A5-dokumentation fra byggeriets start, det er lettere at indsamle data løbende end bagefter",
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
          "Hvis LCA-beregningen viser overskridelse af grænseværdien, kan byggeriet ikke få ibrugtagningstilladelse. Materialerne skal ændres og beregningen opdateres. Derfor er en tidlig beregning med hotspot-analyse afgørende, det er langt billigere at ændre materialer på tegnebrættet end på byggepladsen.",
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
        text: "For mange arkitekter og bygherrer er A4/A5 den mest udfordrende del af LCA-beregningen, fordi den kræver data fra leverandører og entreprenører, data som ofte ikke er tilgængelig uden en struktureret indsamlingsproces.",
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
        text: "Miljøpåvirkningen beregnes ud fra transportafstand, transportmiddel og materialernes vægt. I vores tidlige beregning bruger vi dokumenterede generiske transportforudsætninger. Hvis projektet har brugbare projektspecifikke oplysninger, kan de indgå i den endelige beregning.",
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
        text: "Bemærk at vandforbrug på byggepladsen er undtaget fra A5, og maskiner under 1 ton er helt fritaget fra klimaregnskabet. A5-data kræver typisk input fra hovedentreprenøren og underentreprenørerne. Det er her de fleste projekter møder udfordringer, mange entreprenører er ikke vant til at registrere og rapportere disse data systematisk.",
      },
      {
        type: "heading2",
        text: "Hvorfor er A4/A5 lovpligtigt?",
      },
      {
        type: "paragraph",
        text: "Med de [nye klimakrav fra 2025](/blog/klimakrav-2025) er der indført en separat grænseværdi for byggeprocessen. Grænsen er 1,5 kg CO₂e/m²/år for A4+A5 samlet, uanset bygningstype. Det betyder at dokumentation af transport og byggeproces nu er et selvstændigt krav, adskilt fra den samlede LCA-grænseværdi.",
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
        text: "Den største udfordring er at få registreret byggepladsforbruget, mens byggeriet står på:",
      },
      {
        type: "list",
        items: [
          "Entreprenøren skal registrere el, varme, gas og brændstof pr. kalenderår",
          "Materialespild og endelige mængder skal bekræftes eller korrigeres",
          "Data skal samles under byggeriet, ikke rekonstrueres ved færdigmelding",
        ],
      },
      {
        type: "paragraph",
        text: "Derfor bør det tidligt aftales, hvem der leverer hvilke oplysninger, og hvilke standardforudsætninger der kan bruges, indtil de faktiske data foreligger.",
      },
      {
        type: "heading2",
        text: "Sådan håndterer vi A4/A5",
      },
      {
        type: "paragraph",
        text: "Vi regner A4 og A5 som en del af LCA-opgaven. Tidligt bruger vi dokumenterede generiske forudsætninger: A4 følger den dokumenterede transportmetode, og A5 bruger foreløbige værdier for byggepladsforbrug og materialespild. Samtidig gør vi det klart, hvad entreprenøren skal registrere før den endelige rapport:",
      },
      {
        type: "list",
        items: [
          "El, varme, gas og brændstof på byggepladsen pr. kalenderår",
          "Endelige materialemængder og eventuelle ændringer i projektet",
          "Materialespild, når projektet har bedre oplysninger end den foreløbige antagelse",
          "Hvilke værdier der er registrerede, oplyste eller baseret på generiske forudsætninger",
        ],
      },
      {
        type: "paragraph",
        text: "Efter byggeriet erstatter vi de foreløbige A5-værdier med det registrerede byggepladsforbrug og opdaterer beregningen med de endelige projektoplysninger. A4/A5-dokumentation er en del af den samlede [LCA-opgave](/blog/hvad-er-lca-beregning).",
      },
      {
        type: "heading2",
        text: "Sådan kommer du i gang",
      },
      {
        type: "paragraph",
        text: "Planlæg A4/A5-dokumentation fra byggeriets start, det er langt nemmere at indsamle data løbende end at rekonstruere det bagefter. I vores [referenceprojekt fra Esbjerg](/referenceprojekter/he-bluhmesvej-67) blev LCA'en bestilt efter byggestart, og EPD-dokumentation var det eneste redskab til at komme under grænsen. [Kontakt os](/kontakt) for at høre mere om hvordan vi håndterer A4/A5 som del af din LCA-beregning.",
      },
    ],
    faqs: [
      {
        question: "Kan A4/A5-data estimeres, eller skal de måles?",
        answer:
          "Ja. Den tidlige beregning bruger dokumenterede generiske forudsætninger. Efter byggeriet erstatter vi de foreløbige A5-værdier med det registrerede el-, varme-, gas- og brændstofforbrug og opdaterer de øvrige projektoplysninger.",
      },
      {
        question: "Hvornår skal A4/A5-data indsamles?",
        answer:
          "Entreprenøren bør registrere el, varme, gas og brændstof løbende under byggeriet. Vi sender et skema til formålet. Det er svært at rekonstruere byggepladsforbruget bagefter.",
      },
      {
        question: "Hvem er ansvarlig for at levere A4/A5-data?",
        answer:
          "Bygherren har det overordnede ansvar for LCA-dokumentationen. I praksis kommer oplysningerne fra leverandører og entreprenører. Vi beskriver, hvilke data der mangler, og indarbejder dem i beregningen, når de foreligger.",
      },
      {
        question: "Tæller A4/A5 med i den samlede LCA-grænseværdi?",
        answer:
          "A4 og A5 skal opgøres som en del af LCA-dokumentationen, men de vurderes mod deres egen grænse på 1,5 kg CO₂e/m²/år. Bygningens anden grænse vurderes separat og omfatter A1-A3, B4, B6 og C3-C4.",
      },
    ],
  },

  // ─── Post 4: LCA-beregning for sommerhuse ───
  {
    slug: "lca-sommerhuse",
    title: "LCA-beregning for sommerhuse: udfordringer og løsninger",
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
        text: "Betonfundamenter er ofte den største CO₂-synder i sommerhuse. Et traditionelt terrændæk med armeringsstål og betonplade kan alene bruge en stor del af det tilladte CO₂-budget. Alternative fundamenttyper, som skruefundamenter eller lette funderingsløsninger, kan reducere udledningen markant.",
      },
      {
        type: "heading3",
        text: "Ydervægge og isolering",
      },
      {
        type: "paragraph",
        text: "Tunge ydervægge i mursten eller beton er problematiske ved den lave grænse. Lette trækonstruktioner med minerauld- eller træfiberisolering klarer sig typisk bedre i LCA-beregningen. Valget af isoleringsmateriale har også betydning, EPS/XPS (polystyren) har en højere CO₂-profil end f.eks. mineraluld.",
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
          "Start med en tidlig [LCA-beregning](/blog/hvad-er-lca-beregning), gerne allerede i skitsefasen, så du kan optimere inden materialerne er fastlåste",
          "Brug en [hotspot-analyse](/ordbog/hotspot-analyse) til at identificere de 2-3 bygningsdele der bidrager mest til CO₂",
          "Overvej lette konstruktioner: Træ i stedet for beton, skruefundament i stedet for støbt fundament",
          "Vælg isoleringsmaterialer med lav CO₂-profil (mineraluld, træfiber)",
          "Anvend lokale materialer hvor muligt, det reducerer transportbidraget i [A4-fasen](/blog/a4-a5-dokumentation)",
          "Planlæg for lavt spild under opførelsen (A5), præcis tilskæring og genanvendelse af materialer",
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
        text: "Hos Din LCA Hjælper har vi erfaring med sommerhusprojekter og kender udfordringerne ved den lave grænseværdi. A4/A5-beregning og dokumentation er en del af opgaven. Se vores [service for sommerhuse](/lca-beregning/sommerhus), eller [kontakt os](/kontakt) for et tilbud. En komplet beregning koster typisk 5.000-7.000 kr ekskl. moms.",
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
          "En komplet beregning koster typisk 5.000-7.000 kr ekskl. moms. A4/A5-beregning og dokumentation er inkluderet. Send os dine tegninger, så giver vi et fast tilbud inden for 24 timer.",
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
            "Strengeste krav, kræver lette konstruktioner",
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
        text: "Er du i tvivl om dit projekt overholder grænseværdierne? Hos Din LCA Hjælper laver vi en tidlig beregning med hotspot-analyse, så du ved, hvor projektet står, inden materialerne er bestilt. [Kontakt os](/kontakt) for et fast tilbud. A4/A5-beregning og dokumentation er inkluderet.",
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
          "Nej. A4+A5 har sin egen grænse på 1,5 kg CO₂e/m²/år. Bygningens grænse for A1-A3, B4, B6 og C3-C4 vurderes separat, så en lav værdi for A4+A5 kan ikke opveje en overskridelse dér.",
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
