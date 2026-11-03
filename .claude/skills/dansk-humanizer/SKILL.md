---
name: dansk-humanizer
metadata:
  version: 1.0.0
description: >
  Fjerner tegn på AI-genereret dansk tekst og gør skrivningen mere naturlig og menneskelig.
  Brug denne skill når du skriver eller redigerer professionel, ekstern eller publiceret dansk tekst - e-mails,
  LinkedIn-opslag, kundekorrespondance, tilbud, rapporter eller andet indhold i Valdemars stemme.
  Brug den også når brugeren beder om at "gøre teksten mere naturlig", "fjerne AI-sproget",
  "skrive som et menneske" eller "humanisere".
  Brug den ALTID når brugeren skriver danske e-mails, cold outreach, eller kundehenvendelser.
  Brug den ikke til simple oversættelser, faktasvar, kode, interne statuslinjer eller almindelig dansk samtale.
allowed-tools:
  - Read
  - Write
  - Edit
---

# Dansk Humanizer

Fjern tegn på AI-genereret skrivning fra dansk tekst. Gør den naturlig og menneskelig.

Baseret på principper fra Wikipedias "Signs of AI writing"-guide (vedligeholdt af WikiProject AI Cleanup), tilpasset dansk sprog, grammatik og kommunikationskultur.

> "LLM'er bruger statistiske algoritmer til at gætte hvad der bør komme næst. Resultatet tenderer mod det statistisk mest sandsynlige resultat der passer til den bredeste vifte af situationer."

Det betyder: AI-dansk bliver generisk, formelt, oppustet og ensartet. Rigtig dansk er direkte, varieret, personligt og nogen gange rodet.

---

## Sådan bruges denne skill

1. Modtag tekst fra brugeren (eller skriv et udkast)
2. Kør teksten igennem alle 24 mønstre nedenfor
3. Omskriv og fjern AI-mønstre
4. Kør det afsluttende AI-audit
5. Omskriv igen baseret på audit
6. Levér den færdige tekst

---

## De 24 danske AI-mønstre

### 1. Oppustet symbolik og metaforer

**Problem:** AI elsker at gøre almindelige ting til noget grandiost.

**AI-dansk:**
> Denne rapport er en milepæl i vores rejse mod bæredygtighed.

**Menneskeligt dansk:**
> Rapporten viser hvor langt vi er med bæredygtighed.

**AI-dansk:**
> LCA-beregningen fungerer som et kompas der guider bygherren gennem bæredygtighedens komplekse landskab.

**Menneskeligt dansk:**
> LCA-beregningen viser bygherren hvad der belaster mest.

---

### 2. Reklamesprog og promotionelt sprog

**Problem:** AI skriver som en brochure. Dansk professionel kommunikation er mere nøgtern.

**Undgå disse ord og vendinger:**
- "banebrydende", "revolutionerende", "innovativ", "fremadskuende"
- "unik mulighed", "stærkt fundament", "i verdensklasse"
- "cutting-edge", "state-of-the-art" (unødvendige anglicismer)
- "et kvantesprang", "paradigmeskift"

**AI-dansk:**
> Vores innovative løsning tilbyder en banebrydende tilgang til LCA-beregninger.

**Menneskeligt dansk:**
> Vores løsning gør LCA-beregninger hurtigere.

---

### 3. Overfladiske "-ing"-analyser (og danske ækvivalenter)

**Problem:** AI laver pseudoanalyser med vage beskrivelser i stedet for konkrete pointer.

**AI-dansk:**
> Det afspejler en voksende bevidsthed om bæredygtighed i byggebranchen, hvor aktørerne i stigende grad fokuserer på at integrere miljøhensyn i deres arbejdsprocesser.

**Menneskeligt dansk:**
> Flere og flere entreprenører regner på CO₂ nu - det gjorde de ikke for fem år siden.

---

### 4. Vage tilskrivninger

**Problem:** AI refererer til anonyme "eksperter" og "mange" i stedet for at være konkret.

**Undgå:**
- "Eksperter vurderer at..."
- "Mange i branchen mener..."
- "Der er bred enighed om..."
- "Ifølge flere kilder..."
- "Branchefolk peger på..."

**Enten vær specifik** ("Rambøll anslår at...") **eller drop tilskrivningen** og sig det bare direkte.

---

### 5. Tankestreg-overforbrug

**Problem:** AI bruger tankestreger (-) langt mere end mennesker. Dansk foretrækker kommaer og punktummer.

**AI-dansk:**
> Kravet - som blev skærpet 1. juli 2025 - betyder at alt nybyggeri - uanset areal - skal have en LCA-beregning.

**Menneskeligt dansk:**
> Kravet fra 1. juli 2025 betyder at alt nybyggeri skal have en LCA-beregning, uanset areal.

**Tommelfingerregel:** Undgå tankestreger (-) som standard. Brug komma, punktum eller omskriv sætningen. Tankestreger må kun bruges i sjældne tilfælde hvor ingen anden tegnsætning fungerer - og aldrig mere end én per tekst.

---

### 6. "Rule of three" (trillinger)

**Problem:** AI strukturerer konsekvent i grupper af tre. Det er et klassisk retorisk greb, men når det sker i hver sætning, lugter det af AI.

**AI-dansk:**
> Løsningen er hurtig, pålidelig og brugervenlig.
> Vi fokuserer på kvalitet, effektivitet og bæredygtighed.
> Det kræver engagement, ekspertise og samarbejde.

**Menneskeligt dansk:** Brug to, fire, eller bare én ting. Bryd mønsteret.
> Løsningen er hurtig og pålidelig.
> Vi fokuserer primært på kvalitet.

---

### 7. AI-ordforråd - danske udgaver

**Problem:** AI har favoritord der afslører den med det samme.

**Erstatningstabel:**

| AI-ord/vending | Menneskelig erstatning |
|---|---|
| "grundlæggende" | "i bund og grund", eller slet det |
| "afgørende" (overbrugt) | "vigtigt", "det der tæller" |
| "i takt med" | "efterhånden som", "når" |
| "det er værd at bemærke" | slet det - sig det bare |
| "det skal understreges" | slet det - sig det bare |
| "i forlængelse af" | "efter", "som opfølgning på" |
| "en bred vifte af" | "mange", "flere" |
| "adskillige" | "flere", "en del" |
| "utallige" | "mange" |
| "der rummer" | "med", "som har" |
| "i denne forbindelse" | slet det |
| "nærværende" | "denne", "det her" |
| "ikke mindst" | "også", "specielt" |
| "i den henseende" | slet det |
| "fremadrettet" | "fra nu af", "herefter" |
| "med henblik på" | "for at" |
| "i henhold til" | "ifølge", "efter" |
| "det er vigtigt at" | slet det - gå direkte til pointen |
| "når det kommer til" | slet det - start med emnet |
| "i sidste ende" | "til sidst", eller slet det |
| "det handler om" | slet det |
| "en holistisk tilgang" | "en samlet tilgang", eller beskriv hvad den faktisk indeholder |
| "synergi" | beskriv det konkret i stedet |
| "på tværs af" | "mellem", "i" |

---

### 8. Negative parallelismer

**Problem:** AI elsker "Ikke kun X, men også Y"-strukturen.

**AI-dansk:**
> Det handler ikke kun om at reducere CO₂, men også om at skabe værdi for bygherren.

**Menneskeligt dansk:**
> Det reducerer CO₂ og sparer bygherren penge.

---

### 9. Overdrevne bindeord og overgange

**Problem:** AI bruger for mange overgangsord. Hvert afsnit begynder med "Desuden", "Derudover", "Ydermere", "Endvidere", "I forlængelse heraf".

**Regel:** Maks ét overgangsord per tre afsnit. Lad afsnit stå for sig selv. Læseren kan godt følge med uden at blive ledt ved hånden.

---

### 10. Fed skrift som mekanisk fremhævning

**Problem:** AI sætter nøgleord i **fed** efter et fast mønster, typisk det første fagord i hvert afsnit.

**Menneskeligt dansk:** Brug fed skrift sparsomt og kun når noget virkelig skal springe ud. I e-mails - brug det næsten aldrig.

---

### 11. Overdreven formalitet

**Problem:** AI skriver for formelt til konteksten. Dansk professionel kommunikation er mere uformel end AI tror.

**AI-dansk:**
> Jeg håber denne besked finder dig vel. I forlængelse af vores seneste korrespondance vil jeg hermed gerne vende tilbage til det omtalte emne.

**Menneskeligt dansk:**
> Hej Martin - jeg følger op på vores snak fra i fredags.

**Tommelfingerregler for danske e-mails:**
- "Hej [navn]" er standarden, ikke "Kære [navn]" (medmindre det er meget formelt)
- "Mvh" eller "Vh" er fint - "Med venlig hilsen" er kun til formelle breve
- Skriv som du taler, bare lidt mere ryddeligt
- Du-tiltale er normen i Danmark, også til folk du ikke kender

---

### 12. Overdreven struktur

**Problem:** AI strukturerer alt i overskrifter, punkter og nummererede lister. Rigtige e-mails er prosa.

**Regel for e-mails:** Undgå overskrifter og bullet points medmindre det virkelig hjælper (fx en liste af leverancer). Skriv i sammenhængende sætninger.

---

### 13. Passiv stemme-overforbrug

**Problem:** AI foretrækker passiv ("det blev besluttet") over aktiv ("vi besluttede"). Dansk foretrækker aktive sætninger.

**AI-dansk:**
> Der er blevet foretaget en analyse af bygningens energiforbrug.

**Menneskeligt dansk:**
> Vi har analyseret bygningens energiforbrug.

---

### 14. "Man"-overforbrug

**Problem:** AI bruger "man" konstant for at undgå at tage stilling eller pege på nogen.

**AI-dansk:**
> Man kan argumentere for at denne tilgang er mere hensigtsmæssig.

**Menneskeligt dansk:**
> Denne tilgang virker bedre. / Jeg tror denne tilgang er bedre.

---

### 15. Unødvendig hedging

**Problem:** AI garderer sig konstant med "det kan argumenteres", "det er muligt at", "i nogen grad".

**AI-dansk:**
> Det kan potentielt argumenteres for at grænseværdien muligvis bør justeres i en vis grad.

**Menneskeligt dansk:**
> Grænseværdien bør justeres.

**Regel:** Gardér dig kun når du reelt er usikker. Vær direkte når du ved hvad du mener.

---

### 16. Falsk præcision og vage forstærkere

**Problem:** AI bruger ord der lyder præcise men ikke siger noget.

**Undgå:** "markant", "betydeligt", "drastisk", "væsentligt" - medmindre du har et tal at bakke det op med.

**AI-dansk:**
> Der er sket en markant stigning i brugen af LCA-beregninger.

**Menneskeligt dansk:**
> Flere bruger LCA-beregninger nu end for to år siden. (Eller: Brugen er steget 40%.)

---

### 17. Perfekte afrundinger

**Problem:** AI afslutter altid med en pæn opsummering eller et optimistisk udsyn. Rigtige mennesker slutter bare.

**AI-dansk:**
> Samlet set tegner fremtiden lyst for bæredygtigt byggeri, og vi ser frem til at fortsætte denne spændende rejse sammen.

**Menneskeligt dansk:**
> Ring endelig hvis I har spørgsmål.

---

### 18. Unødvendige indledninger

**Problem:** AI bruger en hel sætning på at annoncere hvad den er ved at gøre.

**Undgå:**
- "Lad mig starte med at..."
- "For at give et overblik over..."
- "I det følgende vil jeg..."
- "Hermed fremsendes..."

**Bare gør det.** Spring direkte til indholdet.

---

### 19. Emne-ekko

**Problem:** AI gentager ordret brugerens spørgsmål eller emne i starten af svaret.

**Bruger:** "Kan du hjælpe med LCA for taget?"
**AI-dansk:** "Jeg hjælper gerne med LCA for taget. LCA for taget kræver..."
**Menneskeligt dansk:** "Ja - send mig opbygningen, så regner jeg på det."

---

### 20. Overdreven emoji og symbolbrug

**Problem:** AI bruger 🚀💡✅ i professionel kommunikation. Danskere gør det sjældent i forretningssammenhæng.

**Regel:** Ingen emoji i professionelle e-mails medmindre modtageren selv bruger dem. Maks én smiley i uformelle beskeder.

---

### 21. Anglicismer der ikke er nødvendige

**Problem:** AI blander engelske ord ind hvor gode danske ord findes.

| Undgå (medmindre branchen bruger det) | Brug i stedet |
|---|---|
| "alignment" | "afstemning" |
| "deliverables" | "leverancer" |
| "stakeholders" (i tekst) | "interessenter" |
| "scope" | "omfang" |
| "timeline" | "tidsplan" |
| "feedback" | ok - det er indarbejdet |
| "input" | ok - det er indarbejdet |
| "deadline" | ok - det er indarbejdet |

**Bemærk:** Nogle anglicismer ER naturlige i dansk ("feedback", "mail", "deadline"). Brug dem. Det handler om de unødvendige.

---

### 22. Overdreven høflighed

**Problem:** AI er for høflig til dansk kontekst. Dansk kommunikation er venlig men direkte.

**AI-dansk:**
> Jeg vil blot høre om det ville være muligt for dig at overveje at sende mig de relevante dokumenter, når det passer dig?

**Menneskeligt dansk:**
> Kan du sende mig dokumenterne?

---

### 23. Gentagelse af pointer

**Problem:** AI siger det samme på tre forskellige måder for at fylde.

**AI-dansk:**
> Bæredygtighed er vigtigt. Det er afgørende at vi tænker på miljøet. Vores planet kræver at vi handler ansvarligt.

**Menneskeligt dansk:**
> Bæredygtighed er vigtigt.

**Regel:** Sig det én gang. Gå videre.

---

### 24. Unaturlig sætningsrytme

**Problem:** AI skriver sætninger der alle har samme længde og struktur. Monoton rytme.

**Menneskeligt dansk varierer:** Korte sætninger. Så en lang en der tager sin tid og måske endda snor sig lidt. Og så kort igen.

---

## Afsluttende AI-audit

Efter omskrivningen, stil dig selv dette spørgsmål:

**"Hvad gør den her tekst så åbenlyst AI-genereret?"**

Svar kort med de tilbageværende problemer. Omskriv derefter baseret på hvad du fandt.

---

## Ud over mønstre: Skriv som et menneske

At undgå AI-mønstre er kun halvdelen. Steril, stemmeløs tekst er lige så åbenlys som slop. God skrivning har et menneske bag sig.

### For dansk professionel kommunikation:

- **Hav en mening.** Skriv ikke bare fakta - reager på dem. "Jeg er ærligt talt overrasket over hvor lav GWP-værdien blev" er mere menneskeligt end neutralt at liste tal.

- **Variér din rytme.** Korte sætninger. Så længere sætninger der tager lidt mere tid. Bland det.

- **Anerkend kompleksitet.** Rigtige mennesker har blandede følelser. "Resultatet er godt, men processen var besværlig" slår "Resultatet er godt."

- **Brug "jeg" og "vi".** Første person er ikke uprofessionelt - det er ærligt. "Jeg tror vi bør..." er stærkere end "Det anbefales at..."

- **Lad noget rod stå.** Perfekt struktur føles algoritmisk. En sidebemærkning, en halvfærdig tanke, et "forresten" - det er menneskeligt.

- **Vær specifik om følelser.** Ikke "dette er bekymrende" men "der er noget der nager mig ved de her transportafstande."

- **Skriv som du taler.** Læs teksten højt. Hvis det lyder som noget du aldrig ville sige, omskriv det.

---

## E-mail-specifikke retningslinjer

Fordi denne skill primært bruges til danske e-mails:

### Hilsner
- **Standard:** "Hej [navn]" eller "Hej [navn],"
- **Første kontakt:** "Hej [navn]" er stadig fint - "Kære" kun til meget formelle henvendelser
- **Opfølgning:** Ingen hilsen nødvendig, eller bare "Hej igen"

### Afsked
- **Hverdags:** "Mvh" eller "Vh" + dit navn
- **Lidt mere formelt:** "Venlig hilsen" eller "Med venlig hilsen"
- **Uformelt:** "Bedste hilsner" eller bare dit navn

### Tone
- Direkte men venlig
- Undgå indledende small talk ("Jeg håber du har det godt") medmindre du mener det
- Gå til sagen hurtigt
- Afslut med en konkret handling eller spørgsmål, ikke en vag optimisme

### Længde
- Kortere er bedre. Danskere værdsætter at man respekterer deres tid.
- Hvis en e-mail er over 10 linjer, overvej om noget kan skæres.

---

## Eksempel: Fuld omskrivning

### AI-genereret e-mail:
> Kære Esge,
>
> Jeg håber denne besked finder dig vel. I forlængelse af vores seneste samtale vil jeg hermed gerne vende tilbage til det spændende projekt vedrørende sommerhuset på Agavevej 4A.
>
> Det er værd at bemærke at LCA-beregningen er et **afgørende** element i dette projekt. Vi har foretaget en grundlæggende analyse der afspejler en **holistisk tilgang** til bæredygtighed. Vores innovative metode sikrer ikke kun overholdelse af BR18, men også en **banebrydende** forståelse af bygningens miljøpåvirkning.
>
> Desuden vil jeg gerne understrege at vi ser frem til et fortsat frugtbart samarbejde.
>
> Med venlig hilsen,
> Valdemar

### Menneskeligt omskrevet:
> Hej Esge,
>
> Jeg følger op på sommerhuset på Agavevej 4A. LCA-beregningen er færdig - bygningen lander på 5,2 kg CO₂-eq/m²/år, så den overholder BR18 fint.
>
> Der var lidt udfordring med transportafstandene på tagmaterialerne, men jeg fandt en bedre løsning. Kan vi tage et kort kald i denne uge så jeg kan gennemgå resultaterne?
>
> Mvh
> Valdemar
