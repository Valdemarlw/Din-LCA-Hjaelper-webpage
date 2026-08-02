import type { BlogSection, FAQ } from "./blogPosts";

export type Comparison = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  shortIntro: string;
  alternativeName: string;
  date: string;
  readingTime: string;
  content: BlogSection[];
  faqs: FAQ[];
  relatedTerms: string[];
};

export const comparisons: Comparison[] = [
  {
    slug: "din-lca-hjaelper-vs-lcabyg",
    title: "Din LCA Hjælper vs. LCAbyg: Hvornår bør du få hjælp?",
    metaTitle: "Din LCA Hjælper vs. LCAbyg: Hvornår får du hjælp?",
    metaDescription:
      "LCAbyg er gratis og dækker BR18, men har en stejl læringskurve. Sammenlign LCAbyg-DIY med Din LCA Hjælpers LCA-service. Pris, tid og hvornår hver løsning passer.",
    shortIntro:
      "LCAbyg er det rigtige valg for arkitektfirmaer, der har tid til at lære værktøjet og projekter nok til at vedligeholde rutinen. Når LCA-beregningen ligger uden for kerneforretningen, eller når en deadline kommer for tæt på, giver det mening at få hjælp i stedet for at oplære en ny medarbejder fra bunden.",
    alternativeName: "LCAbyg",
    date: "2026-04-07",
    readingTime: "6 min",
    content: [
      {
        type: "heading2",
        text: "Hurtig opsummering",
      },
      {
        type: "list",
        items: [
          "[LCAbyg](/ordbog/lcabyg) er gratis, statsligt udviklet af BUILD ved Aalborg Universitet og er det officielle danske værktøj til [BR18](/ordbog/br18). Solidt og veldokumenteret, men de nye A4/A5-krav fra juli 2025 kræver supplerende dataark ved siden af programmet.",
          "Læringskurven er reel: Mængdeopgørelse, materialevalg, EPD-import og rapportgenerering kræver typisk 20-40 timers oplæring, før den første beregning er pålidelig.",
          "Vores rolle er at håndtere hele LCA-beregningen for dig. Du sender tegninger og konstruktionsbeskrivelser, vi leverer en myndighedsklar rapport. Vi bruger selv LCAbyg i baggrunden.",
        ],
      },
      {
        type: "heading2",
        text: "Sammenligning side om side",
      },
      {
        type: "table",
        headers: ["", "LCAbyg (gør det selv)", "Din LCA Hjælper"],
        rows: [
          [
            "Pris",
            "0 kr (programmet er gratis). Dine egne timer er den reelle omkostning.",
            "Fra 4.000 kr. Beregning og dokumentation af [A4](/ordbog/modul-a4)/[A5](/ordbog/modul-a5) er inkluderet.",
          ],
          [
            "Tid for arkitekten",
            "Typisk 15-30 timer pr. projekt, når du er rutineret. Første gang ofte over 40 timer.",
            "1-2 timer: Du sender tegninger, vi spørger ind, du modtager rapport.",
          ],
          [
            "Læringskurve",
            "Stejl. Mængdeopgørelse, modulforståelse, EPD-import og fejlfinding skal læres fra bunden.",
            "Ingen. Du beholder fokus på arkitekturen.",
          ],
          [
            "[BR18-grænseværdi](/ordbog/graensevaerdi)",
            "Beregnes korrekt, hvis du har sat op rigtigt. Værktøjet flagger ikke konceptuelle fejl.",
            "Vi sikrer, at alle moduler er sat op korrekt og at resultatet matcher byggeriets faktiske udformning.",
          ],
          [
            "[Hotspot-analyse](/ordbog/hotspot-analyse)",
            "Du skal selv tolke resultaterne og finde optimeringspotentialet.",
            "Inkluderet. Vi peger på de 3-5 bygningsdele, hvor materialevalg flytter mest.",
          ],
          [
            "Materialeoptimering med [EPD'er](/ordbog/epd)",
            "Du finder, importerer og validerer EPD'er selv.",
            "Vi finder relevante produktspecifikke [EPD'er](/ordbog/epd) og kører dem ind i beregningen.",
          ],
          [
            "A4/A5-dokumentation",
            "Skal etableres separat. Indsamling af leverandør- og entreprenørdata er ofte den største flaskehals.",
            "Vi beregner A4/A5, dokumenterer forudsætningerne og opdaterer med faktiske projektdata før den endelige rapport.",
          ],
          [
            "Opdatering ved færdigmelding",
            "Du justerer selv beregningen med faktiske mængder.",
            "Vi opdaterer beregningen og leverer den endelige rapport.",
          ],
          [
            "Bedst til",
            "Tegnestuer med mange LCA-projekter og en intern LCA-ansvarlig.",
            "Tegnestuer, der vil have LCA ud af hænderne på et fast budget.",
          ],
        ],
      },
      {
        type: "heading2",
        text: "Når LCAbyg er det rigtige valg",
      },
      {
        type: "paragraph",
        text: "LCAbyg er bygget til præcis det formål: at lave bygnings-LCA efter dansk lovgivning. Hvis tegnestuen i forvejen har en intern LCA-ansvarlig eller jævnligt nok projekter til at holde rutinen ved lige, giver det god mening at køre beregningerne internt. Programmet er gratis, det indeholder bygningsreglementets [generiske data](/ordbog/generiske-data) og opdateres løbende af BUILD.",
      },
      {
        type: "list",
        items: [
          "Tegnestuen har en eller flere medarbejdere, der allerede kender [EN 15978](/ordbog/en-15978) og BR18-modulerne.",
          "Der er minimum 4-6 LCA-projekter om året, så viden ikke ruster i mellemtiden.",
          "Projekterne har tid nok i kalenderen til, at læring og fejl er en acceptabel del af processen.",
          "Tegnestuen vil opbygge LCA som en intern kompetence og se det som en investering.",
        ],
      },
      {
        type: "heading2",
        text: "Når det giver mening at få hjælp",
      },
      {
        type: "paragraph",
        text: "For mange små og mellemstore tegnestuer ligger LCA i en gråzone: nødvendigt for myndighederne, men for sjældent til at retfærdiggøre at en arkitekt bruger 20-40 timer på at lære LCAbyg fra bunden. Det er den situation, vi er bygget til. Er du allerede gået i stå, så læs [hvordan du får beregningen igennem til tiden](/blog/lcabyg-hjaelp-outsource).",
      },
      {
        type: "list",
        items: [
          "Du har 1-3 LCA-projekter om året, og rutinen forsvinder mellem hver beregning.",
          "Deadline for byggetilladelse rykker tættere på, end oplæringen kan nå.",
          "Du har prøvet LCAbyg og er kørt fast i mængdeopgørelse, EPD-import eller A4/A5-data.",
          "Tegnestuens timer er bedre brugt på arkitektur end på at fejlfinde et beregningsværktøj.",
          "Du vil have et fast tilbud, så LCA ikke bliver en skjult omkostning i projektet.",
        ],
      },
      {
        type: "heading2",
        text: "Hvad du får hos Din LCA Hjælper",
      },
      {
        type: "paragraph",
        text: "Vi er udelukkende specialiseret i LCA for byggeri. Det giver lavere overhead end de store rådgivende ingeniørfirmaer og en fast proces til præcis denne opgave. Hver beregning indeholder hotspot-analyse, materialeforslag baseret på produktspecifikke EPD'er, A4/A5-beregning og opdatering ved færdigmelding. Se vores løsninger for [enfamiliehuse](/lca-beregning/enfamiliehus), [sommerhuse](/lca-beregning/sommerhus) og [erhverv](/lca-beregning/erhverv), eller læs vores referenceprojekter, fx [sommerhuset i Knebel](/referenceprojekter/agavevej-4a), hvor produktspecifikke EPD'er trak resultatet ned med 40%.",
      },
      {
        type: "heading2",
        text: "Den korte version",
      },
      {
        type: "paragraph",
        text: "LCAbyg er ikke konkurrenten, det er værktøjet. Spørgsmålet er ikke, hvilket program du skal vælge, men hvem der skal bruge det. Hvis det er dig selv, så hent LCAbyg på build.dk og sæt tid af til at lære det. Hvis du hellere vil have beregningen ud af hænderne, så send os tegningerne og få et fast tilbud inden 24 timer.",
      },
    ],
    faqs: [
      {
        question: "Bruger Din LCA Hjælper også LCAbyg?",
        answer:
          "Ja. LCAbyg er det officielle danske beregningsværktøj, og vi bruger det i alle vores projekter. Forskellen er, at vi kender de små faldgruber og har en fast proces fra tegning til myndighedsklar rapport. Du sparer altså ikke på værktøjet, du sparer på den tid, det tager at blive god til at bruge det.",
      },
      {
        question: "Kan jeg starte i LCAbyg og overdrage projektet til jer senere?",
        answer:
          "Ja. Hvis du er kørt fast i en LCAbyg-fil, kan vi tage over og færdiggøre beregningen. Vi gennemgår dit udkast, retter eventuelle fejl i mængdeopgørelsen og kører projektet i mål. Send filen sammen med tegningerne, så giver vi et fast tilbud inden 24 timer.",
      },
      {
        question: "Hvad koster det vs. min egen tid?",
        answer:
          "Vores priser starter fra 4.000 kr for et standard enfamiliehus, inkl. A4/A5-beregning og dokumentation. Hvis din egen timepris er 800 kr, og en LCA-beregning tager dig 15-25 timer, koster din egen tid 12.000-20.000 kr, uden at tælle læringskurven for de første projekter med. Regn på det for dit eget projekt: hvor mange timer bruger du, og hvad er dine timer værd i et debiterbart projekt?",
      },
      {
        question: "Hvad hvis jeg kun har ét enkelt projekt om året?",
        answer:
          "Så er det næsten altid bedst at få hjælp. Den tid det tager at lære LCAbyg ordentligt overstiger meget hurtigt prisen for en udført beregning, og rutinen forsvinder igen inden næste projekt. Lad os tage den ene om året, så du kan fokusere på de øvrige opgaver i tegnestuen.",
      },
      {
        question: "Får jeg LCAbyg-filen, så jeg kan rette i den selv?",
        answer:
          "Ja. Du modtager både den myndighedsklare rapport og selve LCAbyg-filen, så du har fuld adgang, hvis du selv vil justere materialer senere. Når beregningen skal opdateres med faktiske mængder ved færdigmelding, er det normalt noget vi klarer som del af prisen.",
      },
    ],
    relatedTerms: [
      "lcabyg",
      "br18",
      "graensevaerdi",
      "epd",
      "hotspot-analyse",
      "modul-a1-a3",
    ],
  },
];

export function getComparison(slug: string): Comparison | undefined {
  return comparisons.find((c) => c.slug === slug);
}
