+++
title = "Veikart: OS 1 -> OS N"
description = "Kjerneideene som Urbit er bygget rundt"
weight = 4
[extra]
flatten_pagination = "true"
hide_next_title = "true"
hide_previous_title = "true"
+++

# Veikart: Landscape 1 → 3

La oss snakke om hvor vi vil at Urbit skal gå, og hvordan vi kommer dit.

Vi jobber med å bygge Urbit ID + Urbit OS til en erstatning på menneskelig skala for den industrielle programvarestakken som driver våre sentraliserte apper og tjenester i dag. Med tiden vil vi at Urbit skal være like robust som Unix og internettprotokollpakken som dagens stack hviler på. Vi ser frem til en fremtid der Urbit er et standardisert, lite bemerkelsesverdig, allestedsnærværende databehandlings grunnlag som brukes og eies av alle.

Vi startet med å bygge en prototype for hvordan dette fremtidige fundamentet skulle se ut. Vi brukte de første årene hovedsakelig på systemets arkitektur – men en ny plattform trenger en klar use-case, en måte å få den i bruk. Dette er det vi har bygget det siste året eller så. Det heter Landscape.

Landscape er et fleksibelt verktøy for å kommunisere og samarbeide med venner som kjører på toppen av Urbit OS.

Landscape lar deg bringe en gruppe mennesker sammen for å kommunisere, samarbeide og gjøre forretninger. Tenk på det som en kombinasjon av 'produktivitetsprogramvare' og 'sosiale nettverk'. Landscape er å samle en gruppe mennesker for å dele et sett med ‘moduler’, eller ting å gjøre, og tilpasse et miljø for at gruppen skal holde kontakten. For en fullstendig oversikt, se [grensesnittdelen](https://urbit.org/understanding-urbit/interface/).

Å samle mange forskjellige ting på ett sted er noe bare en generell plattform som Urbit kan gjøre, og det er akkurat det vi ønsker som et alternativ til sentralisert programvare.

Når Urbit modnes, vil nok andre fullverdige digitale miljøer dukke opp – men Landscape er appen vi trenger hvis vi ønsker å bevege oss bort fra verdenen av MEGACORP-programvaren og inn i et sikkert, distraksjonsfritt nettverk.

<br>

![Landscape](https://storage.googleapis.com/media.urbit.org/tlon/landscape.jpg)

I dag legger vi hele vårt fokus i å gjøre Landscape til et komfortabelt sted for digitale samfunn å høre hjemme, med utgangspunkt i vårt eget miljø. Denne innsatsen tvinger oss til å modne hele programvare-stacken, fra 'interpreter' til brukergrensesnitt.

La oss gå gjennom de neste fasene av Landscape for å få en følelse av hvor vi er og hvor vi er på vei.

<br>

![Nåværende tilstand av Landscape/OS1](https://storage.googleapis.com/media.urbit.org/site/understanding-urbit/uu-interface-3.png)

### I dag: Landscape OS 1.N

Vi bygde OS 1 for oss selv, fordi vi ønsket å bruke et kommunikasjonsverktøy som vi kan stole på og sette systemet vårt i arbeid på ekte.

I dag bruker vi OS 1 hver dag for å chatte, skrive og dele lenker. Det er et rolig, minimalistisk verktøy som får oss et skritt unna annonsene, sporing, distraksjon og forstyrrelse av vanlig programvare. (Vi kommer ikke inn på detaljene i OS 1 her, men du kan sjekke ut [dette innlegget](https://urbit.org/blog/introducing-os1/) for en gjennomgang. Du er også velkommen til å prøve å [starte en node selv](https://urbit.org/getting-started/).)

Den første versjonen av OS 1 ble sendt i mars, og vi har forbedret den kontinuerlig siden den gang. OS 1 kjører nå på en mye raskere, mer pålitelig Urbit OS-kjerne og nettverk. Grensesnittet i seg selv er ryddet opp og gjort mye mer effektivt. Hvis vi ikke hadde det så travelt, hadde vi kalt det OS 1.12 nå.

Vårt første mål var bare å få oss selv til å bruke Urbit hver dag. Vi oppnådde det, og så mange andre samfunn dukke opp underveis. Vi gjorde enorme fremskritt, men systemet vårt er ikke raffinert eller pålitelig nok enda. Det trengs også fortsatt en grundig sikkerhetsrevisjon (som vi allerede jobber med).

OS 1 var et stort skritt fremover. La oss snakke om hva som er neste.

<br>

![Et spekulativt grensesnitt for Landscape S2](https://storage.googleapis.com/media.urbit.org/site/understanding-urbit/uu-interface-4.png)

## Sent i 2020: Landscape S2

**Det er rart å ha både 'Urbit OS' og en klient som heter 'OS 1'. Etter OS 1 skal vi gå over til et annet navneskjema for Landscape – som starter med Landscape S2.**

OS 1 er fint, men det kan bare brukes av utforskere, tinkere og hobbyister. Det er grovt rundt kantene. Du må *ønske* å bruke Urbit like mye som vi gjør.

Landscape S2 er mye mer behagelig. Landscape S2 har et polert, gruppeorientert grensesnitt, et mye mer robust datalagringsformat, betydelige gevinster i ytelse og minnehåndtering, og en mye mer pålitelig måte å migrere dataene dine på.

Viktigst, Landscape S2 har en fullstendig redesignet invitasjons- og onboarding-prosess som vil lanseres sammen med en [hostingtjeneste](https://tlon.io) fra Tlon. (Sist vi hørte er detogså noen andre som jobber med Urbit-hosting - vi vil koble dem til så snart de er klare.)

Dette betyr at du enkelt kan invitere en venn fra Landscape og ha dem i gang på Urbit i løpet av noen minutter uten å forlate nettleseren. Hver konvensjonell app gjør selvfølgelig dette allerede, men ingen av dem kan tilby enkelheten og klarheten ved å kjøre på Urbit OS.

Vi vet at det å komme inn på nettverket kan være vanskelig for mindre tekniske brukere. Alle må for tiden kjøre og ta vare på sin egen node. Med enkel onboarding kan vi bruke Landscape til å begynne å bygge samfunnene som aldri følte seg hjemme på disse konvensjonelle en-størrelse-passer-alle plattformene: det moderne klosteret, musikken i COVID-alderen og så videre.

Vi planlegger å dele den hostede versjonen av S2 med noen få små grupper for å teste den og legge den gjennom trinnene. [Gi oss beskjed](https://tlon.io) hvis du er nysgjerrig.

<br>

![Et spekulativt betalingsgrensesnitt](https://storage.googleapis.com/media.urbit.org/site/understanding-urbit/uu-roadmap-4.jpg)

## Tidlig 2021: Landscape S3

Landscape S3 vil være et verktøy for å kommunisere og samarbeide som vi entusiastisk kan invitere andre til å bruke.

En innebygd datamaskin- og mobilapp, Landscape S3, vil bli støttet av minst en vert (Tlon) for enkel invitasjon og ombordstigning som kan støtte urbit-til-urbit-kryptobetalinger. Med tillegg av grunnleggende handel, vil Landscape S3 være et omfattende miljø for samfunn å lage sine egne.

Kanskje viktigst, Landscape 3 vil bli støttet av en fullstendig revidert nettverksprotokoll. Vi er i ferd med å revidere nettverket vårt nå, og når vi er ferdige, kan vi være sikre på at kommunikasjon via Urbit er sikker.

Landscape arver fordelene med selve Urbit: enkelhet, holdbarhet og en reell følelse av eierskap. Disse kommer ut av esken, fra begynnelsen, men det å støtte et fullverdig grensesnitt stiller mange krav til en ny programvare-stack. Ved Landscape 3 vil grensesnittet og infrastrukturen ha modnet til det punktet at det trygt kan holdes oppe mot alternativer.

<br>

![Landscape](https://storage.googleapis.com/media.urbit.org/site/understanding-urbit/uu-roadmap-5.jpg)

## 2021 og utover

Målet vårt med Landscape er å gi lokalsamfunn verktøyene de fortjener for å tilpasse sine digitale miljøer. Fra Landscape S3 og utover vil vårt grensesnitt og infrastruktur virkelig støtte dette.

Men Landscape i begynnelsen av 2021 vil trolig fortsatt bare komme med noen få moduler ut av esken. Vårt største neste trinn i 2021 er å gjøre det enkelt for alle å legge til sine egne moduler og for utviklere å bygge og publisere sine egne. Aktivering av tredjepartsutvikling vil virkelig gjøre det mulig for Urbit-sentriske samfunn å skreddersy sin egen programvare.


Vi kan ikke dekke alt om landskap i et kort innlegg, og heller ikke om hvordan samfunnet fungerer eller utvikler det vi gjør. Hvis du er nysgjerrig på å lære mer, kan du prøve å [starte en node](https://urbit.org/getting-started/) og bli med i Urbit Community-gruppen der de fleste av oss henger sammen. Det er der vi henger mesteparten av tiden, men du kan også finne oss som jobber offentlig på [GitHub](https://github.com/urbit) og på [urbit-dev-epostlisten](https://groups.google.com/a/urbit.org/g/dev).

For nå, la oss gå videre til hvem som bygger denne tingen og hvor den kom fra.
