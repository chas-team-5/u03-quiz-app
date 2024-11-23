# u03 - Projektarbete - Quiz App (VG)

Gruppdeltagare:
[Cristian Pencheff](https://github.com/cribepencheff), [Kristoffer Benckert](https://github.com/Benckert), [Mary Pope](https://github.com/marypope19), [Saif Shamasha](https://github.com/Saif-SS)

[🔗 Quiz-applikationen – live](https://chas-team-5.github.io/u03-quiz-app/)  
[🛠️ Github Project (Kanban)](https://github.com/orgs/chas-team-5/projects/1/views/1)  
[📐 Wireframe (Figma)](https://www.figma.com/design/wZHXczEl7trLPQ58HyIRZO/Quiz?node-id=0-1)  
[🎨 Design (Figma)](https://www.figma.com/design/wZHXczEl7trLPQ58HyIRZO/Quiz?node-id=27-19)  
[🖥️ Prototyp Desktop (Figma)](https://www.figma.com/proto/wZHXczEl7trLPQ58HyIRZO/Quiz?page-id=27%3A19&node-id=45-74&node-type=frame&viewport=-725%2C-2960%2C0.5&t=BfsnBb93gcsZeMAo-9&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=45%3A74&show-proto-sidebar=1)  
[📱 Prototyp Mobil (Figma)](https://www.figma.com/proto/wZHXczEl7trLPQ58HyIRZO/Quiz?page-id=27%3A19&node-id=28-68&node-type=frame&viewport=-725%2C-2960%2C0.5&t=BfsnBb93gcsZeMAo-9&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=28%3A68&show-proto-sidebar=1)  
[📄 Dokument för SEO](https://docs.google.com/document/d/1_N80w5Bp-CwJbMmvIWX1nRCGlMbhDapmFF8c7U6Opp0/)  

## Projektbeskrivning
Vårt projekt är en quiz-applikation som inte bara erbjuder en rolig och interaktiv upplevelse för användaren, utan även har ett utbildande syfte. Genom quizet får användare svara på frågor inom olika kategorier, där resultatet baseras på antalet rätta svar. Applikationen är byggd i HTML, CSS och vanilla JavaScript och använder JSON-filer för att lagra frågor och resultat.

Quizet är utformat för att både testa och utbilda användaren. Detta gör vi genom de karaktärer som användaren kan bli baserat på sina svar och genom relevanta länkar på resultatsidan och Om quizet-sidan. Varje kategori innehåller karaktärer som Ada Lovelace inom teknik och David Attenborough för natur och djur, vilka inspirerar och uppmuntrar till vidare lärande.

### Funktioner
* Användaren väljer mellan två kategorier: *Djur och Natur* eller *Teknik*.

* Varje kategori innehåller frågor som slumpas och visas för användaren. Svarsalternativen för varje fråga slumpas också, men vi håller koll på ID för att kunna matcha rätt svar.

* Användaren får 20 sekunder på varje fråga och kan inte återställa tidtagaren genom att ladda om sidan.

* När användaren svarar på en fråga markeras rätt eller fel svar och resultatet visas i en lista med korrekt/felaktigt svar.

* När quizet är klart visas en sammanfattning av poängen och en karaktär kopplad till resultatet.

* Vi hanterar olika scenarier såsom sidladdning under nedräkningen: om besökaren laddar om sidan sparas tiden, och nedräkningen fortsätter där den slutade. När tiden är ute skickas användaren automatiskt till nästa fråga för att förhindra fusk.

### Skalbarhet
Applikationen är skalbar genom att nya quiz kan läggas till genom att skapa en ny JSON-fil för en viss kategori. Detta gör det enkelt att lägga till fler frågor eller kategorier utan att behöva ändra applikationens struktur.

## Teknisk Implementering
* **Utvecklingsmetod:** Vi använde en hybridmetod inspirerad av Kanban och Scrum. Vi arbetade med ett gemensamt GitHub-repo och använde feature-branches för utveckling. Varje förändring granskades genom code reviews och sammanslogs till main via pull requests.

* **Deployment:** Applikationen deployades automatiskt till GitHub Pages när förändringar slogs ihop till main.

* **Datahantering:** Vi använde fetch för att hämta data (frågor, resultat och bilder) från JSON-filer och sparade användarens status i localStorage för att förhindra dataförlust vid sidladdning eller timeout.

* **SEO:** Vi har optimerat applikationen med relevanta meta-taggar som innehåller våra huvudnyckelord. Vi har även implementerat Open Graph-taggar med en tydlig och relevant bild samt en beskrivning, vilket gör att vår applikation är väl optimerad för sociala medier och sökmotorer. Vi skapade också en "Om Quizet"-sida där vi beskriver quizet i detalj, med externa länkar till ytterligare resurser för varje kategori. Denna sida innehåller också knappar för att starta quizet för respektive kategori.

* **Prestanda:** För att förbättra prestandan genomförde vi tester med Lighthouse och optimerade applikationen genom att:
  * Konvertera alla bilder till WebP-format för bättre komprimering och snabbare laddningstider.

  * Byta ut Google Fonts mot inbäddade webfonter för att minska externa beroenden och optimera sidans laddning.

  * Säkerställa en semantisk struktur i HTML-koden, som att använda radioknappar för svarsalternativ istället för vanliga knappar.

## Styrkor och Utmaningar
### Styrkor:
* **Samarbete:** Vårt samarbete har varit starkt tack vare en tydlig uppdelning av ansvarsområden och ett strukturerat arbetsflöde genom Kanban/ Scrum-metoden. Vi har även haft ett bra samarbete genom GitHub Projects och dagliga standups, vilket har hållit oss på rätt spår.

* **Teknisk lösning:** Quiz-applikationen är enkel att underhålla och utöka genom den skalbara strukturen med JSON-filer. Detta gör att vi lätt kan lägga till fler quiz eller ändra existerande utan att ändra kodens struktur. Vi är också nöjda med hur vi hanterar scenarier där användare laddar om sidan under quizet och hur vi förhindrar fusk vid timeout.

### Styrkor:
* En utmaning var att skapa en användarvänlig och effektiv lösning för att hantera tidsbegränsade frågor och svar. Vi jobbar fortfarande på att förbättra användarupplevelsen och förhindra eventuella tekniska problem vid tidsövergångar.

* Under projektet upptäckte vi att vi inte hade tillräckligt med tid att lägga till extra funktioner som vi hade planerat, såsom en "settings"-knapp på startsidan, bonuspoäng för snabba svar, fler frågor för variation, och en dela-knapp på resultatsidan.

### Framtida förbättringar:
* **Inställningar på startsidan:** Vi skulle vilja lägga till en knapp för inställningar där användare kan justera tidsgränser och svarsalternativ.

* **Bonuspoäng:** För att uppmuntra snabba och korrekta svar skulle vi vilja införa bonuspoäng.

* **Fler frågor:** Vi planerar att lägga till fler frågor för variation och för att öka svårigheten.

* **Dela-knapp:** Vi vill också lägga till en funktion som gör det möjligt för användare att dela sina resultat på sociala medier.
  

# Designskiss och design
![Quiz](https://github.com/chas-team-5/u03-quiz-app/raw/main/sketch-and-design.webp)
