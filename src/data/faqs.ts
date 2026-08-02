import type { FAQ } from "./blogPosts";

export type FAQCategory = {
  slug: string;
  title: string;
  description: string;
  faqs: FAQ[];
};

export const faqCategories: FAQCategory[] = [
  {
    slug: "generelt",
    title: "Generelt om LCA",
    description:
      "Grundlæggende om hvad en LCA-beregning er, og hvad den indeholder.",
    faqs: [
      {
        question: "Hvad er en LCA-beregning?",
        answer:
          "En LCA-beregning (livscyklusvurdering) opgør et byggeris samlede miljøpåvirkning over hele dets levetid, fra materialeproduktion til nedrivning. Beregningen er lovpligtig efter BR18 og dokumenterer bl.a. CO₂-udledning pr. m² pr. år. Resultatet afleveres som en rapport til kommunen sammen med færdigmeldingen.",
      },
      {
        question: "Hvad indeholder en LCA-rapport?",
        answer:
          "En LCA-rapport indeholder bygningens samlede klimapåvirkning opgjort i kg CO₂-ækvivalenter pr. m² pr. år over en 50-årig betragtningsperiode. Rapporten skal opsplitte resultaterne i separate værdier for faserne A1-A3, A4-A5, B4, B6, C3-C4 og D. Derudover indeholder den typisk en hotspot-analyse der viser, hvilke bygningsdele der bidrager mest til klimabelastningen.",
      },
      {
        question: "Hvad er forskellen på LCA-screening og fuld LCA?",
        answer:
          "En LCA-screening er en tidlig beregning baseret på foreløbige projektdata, der giver et estimat af klimapåvirkningen og identificerer hotspots. En fuld LCA er den endelige beregning baseret på as-built data, altså de faktiske materialer og mængder i det færdige byggeri. Den fulde LCA er den, der indsendes til kommunen ved færdigmelding.",
      },
      {
        question: "Hvad er en betragtningsperiode?",
        answer:
          "Betragtningsperioden er den tidsramme, bygningens livscyklus vurderes over i LCA-beregningen. I Danmark er den fastsat til præcis 50 år i bygningsreglementet, uanset bygningens forventede levetid. Det betyder, at materialer med levetid over 50 år kun tæller for 50 års brug, mens materialer med kortere levetid indregnes som udskiftet undervejs.",
      },
      {
        question: "Hvad er CO₂-ækvivalenter?",
        answer:
          "CO₂-ækvivalenter (CO₂e) er en fælles enhed, der samler effekten af alle drivhusgasser, ikke kun CO₂, men også metan, lattergas m.fl., til ét sammenligneligt tal. I LCA-beregninger måles bygningens klimapåvirkning i kg CO₂e/m²/år, som er den enhed grænseværdierne i BR18 er fastsat i.",
      },
      {
        question: "Hvad er GWP (Global Warming Potential)?",
        answer:
          "GWP står for Globalt Opvarmningspotentiale og er den miljøpåvirkningsindikator, man måler på i lovgivningen. GWP angiver den potentielle opvarmning af jordens overfladetemperatur som følge af udledte drivhusgasser og måles i enheden kg CO₂-ækvivalenter.",
      },
    ],
  },
  {
    slug: "lovkrav",
    title: "Lovkrav og BR18",
    description:
      "Hvornår er LCA lovpligtigt, og hvad siger bygningsreglementet?",
    faqs: [
      {
        question: "Hvornår er LCA-beregning lovpligtigt?",
        answer:
          "Fra 1. juli 2025 er LCA-beregning lovpligtigt for stort set alt nybyggeri og større tilbygninger, hvor byggetilladelsen ansøges den dato eller senere. For boliger (enfamiliehuse, rækkehuse, sommerhuse) gælder en bagatelgrænse, hvor kun tilbygninger på 250 m² eller derover er omfattet. For erhverv og etageboliger er alle tilbygninger omfattet uden bagatelgrænse.",
      },
      {
        question: "Hvad er undtagelserne fra LCA-kravet?",
        answer:
          "Følgende er helt fritaget: uopvarmede bygninger under 50 m², tilbygninger under 250 m² til boliger og sommerhuse, transportable konstruktioner og midlertidige pavilloner, landbrugets avls- og driftsbygninger samt almindelige ombygninger og renoveringer. Særligt samfundskritiske bygninger (hospitaler, fængsler, vandværker) skal udarbejde LCA men er fritaget for grænseværdien.",
      },
      {
        question: "Hvad er grænseværdierne for CO₂ i BR18?",
        answer:
          "Fra 1. juli 2025 gælder differentierede grænseværdier: sommerhuse under 150 m² skal holde 4,0 kg CO₂e/m²/år, enfamiliehuse og rækkehuse 6,7, etageboliger og kontor/handel/lager 7,5, og øvrigt nybyggeri (skoler, institutioner, parkeringshuse) 8,0. Derudover er der en separat grænseværdi for byggeprocessen (A4+A5) på 1,5 kg CO₂e/m²/år for alle bygningstyper.",
      },
      {
        question: "Hvad sker der, hvis grænseværdien overskrides?",
        answer:
          "Hvis LCA-beregningen mangler, eller hvis grænseværdierne er overskredet, kan kommunen nægte ibrugtagningstilladelse. Byggeriet betragtes som ulovligt, indtil forholdet er fysisk eller retligt lovliggjort. Derfor er det afgørende at involvere en LCA-rådgiver tidligt, så materialevalgene kan optimeres inden det er for sent.",
      },
      {
        question: "Hvad er kravene til dokumentation ved færdigmelding?",
        answer:
          "LCA-beregningen skal afspejle den bygning, der faktisk er opført, med præcise mængder og de faktiske materialer (as-built data). Der skal anvendes enten produktspecifikke EPD'er efter standarden EN 15804 eller bygningsreglementets generiske data fra BR18 bilag 2. Resultaterne skal opsplitte værdierne i separate faser. Hele beregningen skal dække en 50-årig betragtningsperiode.",
      },
      {
        question: "Gælder klimakravene for renovering?",
        answer:
          "Nej. Almindelige ombygninger, renoveringer og udskiftninger på eksisterende byggeri er fritaget fra LCA-kravene. Kravet gælder kun nybyggeri og tilbygninger over de angivne bagatelgrænser.",
      },
    ],
  },
  {
    slug: "priser",
    title: "Priser og tilbud",
    description: "Hvad koster en LCA-beregning, og hvad påvirker prisen?",
    faqs: [
      {
        question: "Hvad koster en LCA-beregning?",
        answer:
          "Vores priser starter fra 4.000 kr. A4/A5-beregning og dokumentation er inkluderet. Den endelige pris afhænger af projektets størrelse, kompleksitet og antal konstruktionstyper. Send os dine tegninger, så giver vi et fast tilbud inden for 24 timer.",
      },
      {
        question: "Hvad påvirker prisen på en LCA-beregning?",
        answer:
          "Prisen afhænger primært af bygningens størrelse, antal forskellige konstruktionstyper og kompleksiteten af materialevalgene. Et simpelt enfamiliehus med standardkonstruktioner er billigere end et erhvervsbyggeri med mange specialløsninger. Vi giver altid fast pris, så du kender omkostningen på forhånd.",
      },
      {
        question: "Er opdatering ved færdigmelding inkluderet i prisen?",
        answer:
          "Ja. Hos Din LCA Hjælper er opdatering af LCA-beregningen ved færdigmelding inkluderet som en del af forløbet. Det betyder, at vi opdaterer beregningen med faktiske mængder og materialer, så rapporten matcher det byggede. Mange andre rådgivere tager ekstra for dette.",
      },
      {
        question: "Hvad er inkluderet i jeres LCA-beregning?",
        answer:
          "En LCA-beregning hos os inkluderer tidlig screening med hotspot-analyse, materialeoptimering med konkrete besparelsesforslag, A4/A5-beregning, opdatering ved færdigmelding og en myndighedsklar rapport til kommunen.",
      },
    ],
  },
  {
    slug: "proces",
    title: "Proces og tidslinje",
    description: "Hvordan foregår LCA-processen, og hvor lang tid tager det?",
    faqs: [
      {
        question: "Hvor lang tid tager en LCA-beregning?",
        answer:
          "Den tidlige beregning med hotspot-analyse tager typisk 1-2 uger fra vi modtager projektmaterialet. Selve LCA-forløbet løber dog hele vejen til færdigmelding, hvor vi opdaterer beregningen med faktiske mængder. Vi anbefaler at involvere os så tidligt som muligt, så materialevalgene kan bygge på LCA-resultaterne.",
      },
      {
        question: "Hvad skal jeg sende for at få et tilbud?",
        answer:
          "Send os dine plantegninger, snit og eventuelt en materialebeskrivelse. Det behøver ikke være endelige tegninger, vi kan arbejde med foreløbigt materiale og opdatere undervejs. Vi giver et fast tilbud inden for 24 timer.",
      },
      {
        question: "Hvornår i projektet bør jeg involvere en LCA-rådgiver?",
        answer:
          "Jo tidligere, jo bedre. Ideelt set bør LCA-rådgiveren involveres allerede i projektets designfase, så materialevalgene kan bygge på LCA-resultaterne. En tidlig hotspot-analyse giver mulighed for at optimere de dyreste klimaposter, inden det bliver for sent at ændre. Mange projekter kommer i problemer, fordi LCA først tages op sent i forløbet.",
      },
      {
        question: "Kan jeg få LCA-beregning hurtigt?",
        answer:
          "Ja. Den tidlige beregning tager typisk 1-2 uger, og ved tidlig fase kan vi levere en foreløbig beregning hurtigere. Vi tilbyder fast tilbud inden for 24 timer efter modtagelse af tegninger. Kontakt os på +45 29 89 99 99 eller via kontaktformularen.",
      },
    ],
  },
  {
    slug: "materialer",
    title: "Materialer og EPD'er",
    description:
      "Om EPD'er, generiske data og hvordan materialevalg påvirker LCA-resultatet.",
    faqs: [
      {
        question: "Hvad er en EPD?",
        answer:
          "En EPD (Environmental Product Declaration) er en frivillig, tredjepartsverificeret rapport der dokumenterer en byggevares miljøpåvirkning. For at være gyldig i BR18-beregninger skal EPD'en følge standarden DS/EN 15804 og er typisk gyldig i 5 år. EPD'er giver mere præcise data end de generiske standardværdier i bygningsreglementet.",
      },
      {
        question:
          "Hvad er forskellen på generiske data og produktspecifikke EPD-data?",
        answer:
          "Generiske data er konservative gennemsnitsværdier for materialetyper, fastsat af myndighederne i BR18 bilag 2. De er bevidst sat højt for at sikre, at klimapåvirkningen ikke underestimeres. Produktspecifikke EPD-data dokumenterer det præcise aftryk for et konkret produkt og vil næsten altid vise en lavere klimapåvirkning end de generiske data.",
      },
      {
        question: "Hvad er en hotspot-analyse?",
        answer:
          "En hotspot-analyse sorterer bygningsdelene efter, hvor stor deres klimapåvirkning er. Formålet er hurtigt at synliggøre de bygningsdele (fx fundament eller etagedæk), som bidrager allermest til projektets samlede CO₂-regnskab. Ved at identificere disse tunge poster ved man præcis, hvor det giver størst effekt at fokusere på klimavenlige materialevalg.",
      },
      {
        question: "Kan materialevalg sænke mit LCA-resultat?",
        answer:
          "Ja, og det er netop formålet med den tidlige hotspot-analyse. Ved at identificere de mest klimatunge bygningsdele kan vi foreslå alternative materialer eller produkter med lavere CO₂-aftryk. Skiftet fra generiske data til produktspecifikke EPD'er kan alene give en markant forbedring af regnskabet.",
      },
    ],
  },
  {
    slug: "a4-a5",
    title: "A4 og A5 (byggeprocessen)",
    description:
      "Om transport- og byggepladsdata, og den nye grænseværdi for byggeprocessen.",
    faqs: [
      {
        question: "Hvad er A4- og A5-faserne i LCA?",
        answer:
          "A4 dækker transport af byggematerialer fra fabrik/forhandler til byggepladsen samt transport af maskiner og materiel. A5 dækker energi- og brændstofforbrug på byggepladsen (fx kraner, udtørring, skurvogne), materialespild, håndtering af byggeaffald samt bortkørsel af jord og affald. Begge faser tæller i den separate grænseværdi for byggeprocessen på 1,5 kg CO₂e/m²/år.",
      },
      {
        question: "Hvad er grænseværdien for byggeprocessen?",
        answer:
          "Fra 1. juli 2025 gælder en selvstændig grænseværdi for byggeprocessen (A4+A5) på 1,5 kg CO₂e/m²/år. Denne grænse gælder på tværs af alle bygningstyper og er et separat regnskab ved siden af hovedgrænseværdien for materialer og drift.",
      },
      {
        question: "Hvordan dokumenterer man A4/A5-data?",
        answer:
          "A4/A5-data omfatter blandt andet transportafstande, transportmidler, brændstofforbrug på byggepladsen og materialespild. Vi dokumenterer de oplysninger og forudsætninger, der indgår i den tidlige beregning, og opdaterer med faktiske projektdata før den endelige rapport.",
      },
      {
        question: "Hvordan håndterer I A4/A5 i et projekt?",
        answer:
          "Vi beregner A4 og A5 som en del af LCA-opgaven. Hvis de faktiske data ikke findes i den tidlige fase, bruger vi dokumenterede standardforudsætninger og beskriver, hvilke oplysninger der mangler. Før den endelige rapport opdaterer vi med de projektdata, vi har fået fra kunden og entreprenøren.",
      },
    ],
  },
  {
    slug: "bygningstyper",
    title: "Bygningstyper og særregler",
    description:
      "Specifikke regler for sommerhuse, erhverv, tilbygninger og uopvarmede bygninger.",
    faqs: [
      {
        question: "Kan I hjælpe med både bolig og erhverv?",
        answer:
          "Ja, vi håndterer LCA-beregninger for alle bygningstyper, bolig, erhverv og industri. Vi har erfaring med projekter fra 80 til 3.000 m² og tilpasser altid vores tilgang til det konkrete projekts kompleksitet og krav.",
      },
      {
        question: "Hvad er grænseværdien for sommerhuse?",
        answer:
          "Sommerhuse og ferieboliger er den eneste bygningstype med størrelsesopdelt grænseværdi. Under 150 m² gælder en grænse på 4,0 kg CO₂e/m²/år, som er den strammeste i BR18. På 150 m² og derover gælder 6,7, samme som helårshuse. Tilbygninger under 250 m² er fritaget.",
      },
      {
        question:
          "Hvad er reglerne for tilbygninger?",
        answer:
          "For boliger (enfamiliehuse, rækkehuse, sommerhuse) gælder en bagatelgrænse: kun tilbygninger på 250 m² eller derover er omfattet af LCA-kravet. For erhverv og etageboliger (kontor, institutioner, handel) gælder der ingen bagatelgrænse, alle tilbygninger er omfattet og skal overholde samme grænseværdi som den bygningstype, de knytter sig til.",
      },
      {
        question: "Gælder LCA-krav for uopvarmede bygninger?",
        answer:
          "Ja, uopvarmede bygninger over 50 m² (fx lagerhaller og parkeringshuse) er fuldt ud omfattet af klimakravene fra 1. juli 2025. Et uopvarmet lager får grænseværdien 7,5, mens et parkeringshus falder under øvrigt med 8,0. For disse bygninger sættes driftsenergien (B6) til 0 i beregningen.",
      },
      {
        question: "Hvad er grænseværdien for etageboliger og kontor?",
        answer:
          "Etageboliger samt kontor, handel og lager har en grænseværdi på 7,5 kg CO₂e/m²/år. Skoler, børnehaver, institutioner og parkeringshuse falder under kategorien øvrigt nybyggeri med 8,0 kg CO₂e/m²/år.",
      },
    ],
  },
  {
    slug: "raadgiver",
    title: "Valg af LCA-rådgiver",
    description:
      "Hvad skal man kigge efter, og hvad adskiller Din LCA Hjælper?",
    faqs: [
      {
        question: "Hvem bør lave min LCA-beregning?",
        answer:
          "En LCA-beregning bør udføres af en specialist med erfaring i BR18-kravene og de relevante beregningsværktøjer. Din LCA Hjælper er specialiseret udelukkende i LCA for byggeri, hvilket sikrer præcise beregninger og myndighedsklar dokumentation. Vi anbefaler at vælge en rådgiver der inkluderer opdatering ved færdigmelding, da mange projekter ellers ender med en rapport der ikke matcher det faktisk byggede.",
      },
      {
        question: "Hvad skal jeg kigge efter i en LCA-rådgiver?",
        answer:
          "Kig efter erfaring med din bygningstype, hotspot-analyse, materialeoptimering og opdatering ved færdigmelding. Rådgiveren skal også kunne dokumentere A4 og A5. Hos Din LCA Hjælper er hele forløbet inkluderet.",
      },
      {
        question: "Hvad adskiller Din LCA Hjælper fra andre rådgivere?",
        answer:
          "Vi er specialiseret udelukkende i LCA for byggeri, ikke energiberegning, DGNB eller andre ydelser. Det giver en fast proces og priser fra 4.000 kr. Alle beregninger inkluderer hotspot-analyse, materialeoptimering, A4/A5-beregning og opdatering ved færdigmelding.",
      },
    ],
  },
];

/** The 10 original homepage FAQs, curated from all categories */
export function getHomepageFaqs(): FAQ[] {
  return [
    faqCategories[0].faqs[0], // Hvad er en LCA-beregning?
    faqCategories[1].faqs[0], // Hvornår er LCA-beregning lovpligtigt?
    faqCategories[2].faqs[0], // Hvad koster en LCA-beregning?
    faqCategories[3].faqs[0], // Hvor lang tid tager en LCA-beregning?
    faqCategories[5].faqs[0], // Hvad er A4- og A5-faserne i LCA?
    faqCategories[1].faqs[2], // Hvad er grænseværdierne for CO₂ i BR18?
    faqCategories[6].faqs[0], // Kan I hjælpe med både bolig og erhverv?
    faqCategories[7].faqs[0], // Hvem bør lave min LCA-beregning?
    faqCategories[7].faqs[1], // Hvad skal jeg kigge efter i en LCA-rådgiver?
    faqCategories[3].faqs[3], // Kan jeg få LCA-beregning hurtigt?
  ];
}

/** All FAQs flattened */
export function getAllFaqs(): FAQ[] {
  return faqCategories.flatMap((cat) => cat.faqs);
}
