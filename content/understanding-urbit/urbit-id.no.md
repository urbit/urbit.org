+++
title = "Urbit ID"
description = "En oversikt over Urbit ID-systemet"
weight = 2
[extra]
flatten_pagination = "true"
hide_next_title = "true"
hide_previous_title = "true"
image = "https://media.urbit.org/site/understanding-urbit/urbit-id/urbit-id-cards%402x.png"
+++

Forutsatt at Urbit OS er enkelt nok til at en vanlig bruker kan eie og operere, hvordan logger de seg på? Hvordan identifiserer folk hverandre i dette nye nettverket? Når folk ønsker å få data, filer og meldinger til hverandre, hvordan gjør de det? Og hvordan forhindrer vi spam?

Urbit ID er svaret på alle disse spørsmålene. Urbit ID er en desentralisert infrastruktur for adressering og offentlig-nøkkel designet for Urbit OS.

Let’s talk first about what an Urbit ID is and what it does. Then we’ll cover our design goals and how the system works overall.

<img class="ba" src="https://media.urbit.org/site/understanding-urbit/urbit-id/urbit-id-cards%402x.png">

Urbit ID-en din er et kort navn på fire stavelser som `~ravmel-ropdyl` som du eier med en åtte stavelses hovednøkkel som `~palfun-foslup-fallyn-balfus`. Dette navnet og nøkkelen lar deg logge på Urbit OS, og den brukes til å kryptere pakker du sender over Urbit-nettverket. Snart vil det også være en hovednøkkel som gjør det mulig å holde og sende Bitcoin og andre kryptovalutaer. Urbit ID og passkey tilhører deg som alle andre kryptografiske eiendeler. Ingen kan ta dem fra deg (bare sørg for å oppbevare nøkkelen trygt).

Urbit ID-registeret er live og deploy-et til Ethereum blockchain. Urbit ID er ikke spesielt bundet med Ethereum – en dag vil vi at den skal være vert for selve Urbit OS. Urbit ID er også den eneste komponenten i stakken som bruker Ethereum – Urbit OS-noden din er host-et uansett hvor du velger plassere den. Den primære funksjonen til Urbit ID-registeret er å holde oversikt over hvem som eier hva, å spesifisere hvilke nøkler som er tilknyttet hvilke navn, og å håndheve reglene for adressefordeling. Vi kommer nærmere inn på detaljene nedenfor.

La oss først snakke om implementerings- og designmålene til Urbit ID, deretter om hvor vi ser for oss at det skal ende opp i fremtiden.

Hvis du er nysgjerrig på å se nøyaktig hvordan dette systemet fungerer, er koden selvfølgelig [åpen kildekode](https://github.com/urbit/urbit). Inkludert kilden til [fonemisk navngivningssystem](https://github.com/urbit/urbit-ob/blob/master/src/internal/co.js) og [visuelle representasjoner](https://github.com/urbit/sigil-js). Det finnes til og med en [Figma-plugin](https://github.com/urbit/sigil-figma-plugin) for bruk av dem. Det finnes også et grensesnitt for interaksjon med Urbit ID, som har [åpen kildekode](https://github.com/urbit/bridge).

Siden Urbit ID-registeret er live og deploy-et, kan du til og med [se på kjeden](https://github.com/urbit/azimuth#live-contracts).

<img class="ba" src="https://media.urbit.org/site/understanding-urbit/urbit-id/urbit-id-paperwallet%402x.png">

Each Urbit ID is really just a number. From that number we generate a pronounceable name and a visually identifiable sigil. `~dalwel-fadrun` is `3,509,632,436`, for example.

Urbit ID-er distribueres av et sponsortre. På toppen av treet er det 2<sup>8</sup> (256) galakser. Hver galakse utsteder 2<sup>8</sup> stjerner, og utgjør totalt 2<sup>16</sup> (65K). Stjerner kan deretter utstede 2<sup>16</sup> planeter, noe som gir 2<sup>32</sup> (~ 4B). Som du kanskje forventer, utsteder hver planet 2<sup>32</sup> måner.

Du kan også kalle stjerner 'infrastrukturnoder' og galakser 'styringsnoder', siden det er mer beskrivende navn for deres roller. Stjerner hjelper med å rute pakker, som en ISP. Og galakser er litt som DNS-rotservere eller ICANN-medlemmer. Forskjellen er selvfølgelig at Urbit ID-er eies kryptografisk av mange forskjellige mennesker og påløper omdømme uavhengig.

Og det er det. Det er et enkelt system. Det som er viktig er hvorfor det er slik det er. La oss ta en titt på det.

<img class="full ba w-100 mv4" src="https://media.urbit.org/site/understanding-urbit/urbit-id/urbit-id-address-space-1.svg"/>

På et høyt nivå er det tre viktige ting å forstå om den generelle Urbit ID-systemdesignen.

For det første knapphet: det er bare 2<sup>32</sup> (~ 4B) Urbit ID-er, så de koster noe. Siden de koster noe, bruker folk mindre sannsynlighet for å spam eller misbruke nettverket. Når du møter en fremmed med en Urbit ID, vet du at de har litt 'skin in the game' (selv uten å lekke personlige data i begge retninger). Når det er sagt, er hver Urbit-ID rent pseudonym, så for eksempel er `~dalwel-fadrun` et bevis på en viss andel i nettverket, men ikke mye mer.

For det andre, desentralisering: Urbit-ID-er distribueres av et sponsortre. Hver sponsor utsteder et fast antall adresser. Siden det er mange sponsorer, er det mange måter å få en Urbit ID – ikke bare en sentral myndighet. Når du har fått en, er den din for alltid.

Et poeng som er nyttig å forstå om sponsorer, er at mens Urbit-ID-er alltid trenger en sponsor, eller en foreldrenode på nettverket (primært for peer discovery), er det alltid mulig å bytte sponsor, og sponsorer kan alltid avvise barn. Dette betyr at dårlige skuespillere kan forbys og voldelige sponsorer kan ignoreres. Vi synes dette har en fin balanse mellom ansvarlighet og frihet.

For det tredje, styring: galakser (toppen av sponsortreet) danner et senat som kan oppgradere logikken til Urbit ID-systemet ved flertall. Vi tror Urbit ID vil vare ganske lenge, men hvis det noen gang må oppdateres, kan galaksene stemme for å godkjenne, avvise eller foreslå endringer i kontraktene. Kode kan være lov, men til slutt erkjenner vi at menneskelig dom ikke kan avvikles.

Urbit ID-sponsortreet er ikke ment å være et sosialt system på noen måte. Interaksjoner mellom mennesker og lokalsamfunn på Urbit-nettverket er peer-to-peer, helt organisk og helt ukontrollert av adressehierarkiet. Urbit ID er ganske enkelt et autentiseringssubstrat som omdømme og kommunikasjonssystemer kan bygges på. (Vi har til og med vurdert å omdøpe henholdsvis stjerner og galakser som 'infrastruktur' og 'styringsnoder'.)

Forholdet ditt med sponsoren din skal være omtrent som din ISP eller en leverandør av verktøy: et passivt, ikke-invasivt forhold. Hvis det ikke er din smak, er det veldig enkelt å flytte til en ny sponsor.

<img class="ba" src="https://media.urbit.org/site/understanding-urbit/urbit-id/urbit-id-sigils%402x.png">

Urbit-ID-er er eiendom, og vi tenker på hele registeret over Urbit-ID-er som et stort territorium med digitalt land.

Knappheten på Urbit ID-adresseplass gir den verdi, og som igjen hjelper å kickstarte desentraliseringen selv om prosjektet er ungt. Bred distribusjon er viktig – hvis Urbit skal vare lenge og lykkes som nøytral infrastruktur, må den eies og kontrolleres av et bredt utvalg av mennesker.

Da vi lanserte Urbit ID-systemet, i januar 2019, var det et par tusen forskjellige stjerne- og galakseholdere som fungerte som forvaltere av dette digitale landet. Siden da har tallet økt stadig.

<img class="ba" src="https://media.urbit.org/site/understanding-urbit/project-history/uu-id-5.jpg">

Til slutt vil vi at Urbit ID-en din skal føles som en sivilisasjonsnøkkel. Hvis Urbit ID-en din var et stykke maskinvare, kan du trykke på den for å låse opp en dør, sveipe den for å kjøpe en kaffe og koble den til en hvilken som helst datamaskin for å logge på. Urbit-ID-en din bør være et unikt, vakkert objekt som både er en adresse og en lommebok. Det er en nøkkel til en hemmelig klubb og billetten til ditt digitale liv.

La oss snakke videre om hva vi vil at hele denne programvarestack-en skal føles som for brukeren.
