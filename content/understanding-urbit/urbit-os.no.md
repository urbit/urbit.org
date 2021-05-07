+++
title = "Urbit OS"
description = "Hvordan Urbit føles som for en vanlig bruker"
weight = 1
[extra]
flatten_pagination = "true"
hide_next_title = "true"
hide_previous_title = "true"
image = "https://storage.googleapis.com/media.urbit.org/site/understanding-urbit/intro/intro-5.jpg"
+++

For det meste bruker vi bærbare datamaskiner kun som tilgangspunkter til MEGACORP-tjenester. Telefonene våre er de samme. Disse tjenestene er fantastiske og praktiske. Men prisen for den bekvemmeligheten er mangel på kontroll, eierskap og personvern. Måten vi lever på våre digitale liv er helt ute av våre hender.

<img class="ba" src="https://storage.googleapis.com/media.urbit.org/site/understanding-urbit/intro/intro-5.jpg">

Dagens MEGACORP-monopol beholder kontrollen på grunn av en sentral teknisk fordel: de gjør serveren brukbar.

Urbit OS er bygget for å bryte monopolene på dette sentrale kontrollpunktet. Urbit OS gjør serversiden brukbar for enkeltpersoner uten at MEGACORP trenger å kjøre programvaren.

Vi har allerede vært gjennom dette før. I 1974 var en datamaskin en mainframe på størrelse med et rom og ble delt av hundrevis av mennesker. I 1984 var en datamaskin på størrelse med et skrivebord, og alle hadde sin egen PC. PC-en var mer fleksibel og morsommere, så den vant med stor margin. Da, med fremveksten av internett, ble PCens fleksibilitet sakte irrelevant.

I dag er vi mer eller mindre tilbake til timesharing-modellen fra 1970-tallet. Urbit OS er PCen til MEGACORPs hovedramme. Det er mer fleksibelt, morsommere og mest av alt, forberedt på å fange individets hverdagskreativitet.

La oss snakke om hvordan vi tror vi skal trekke dette ut fra et teknisk synspunkt, og vår visjon om å bruke Urbit.

Hvis du vil hoppe videre til hvordan Urbit vil være å bruke [gå videre](/understanding-urbit/interface). Eller hvis du er noen som bare ønsker å gå til kilden, [se her](https://github.com/urbit/urbit#urbit). I så fall vil du kanskje også [lese dokumentasjonen](https://urbit.org/docs/) for å komme i gang.

<img class="ba" src="https://media.urbit.org/site/understanding-urbit/technical-overview/technical-overview-kernel@2x.png">

Urbit OS er en helt ny, nøye arkitektert programvare-stack: en VM, programmeringsspråk og en kjerne designet for å kjøre programvare for en person. Urbit OS er et program som kjører på nesten hvilken som helst skyserver, de fleste bærbare datamaskiner og mange telefoner: alt med Unix og en internettforbindelse.

Det viktigste å forstå om vårt 'overlay OS', som vi kaller det, er at fundamentet er en enkelt, enkel funksjon. Denne funksjonen er den virtuelle Urbit OS-maskinen. Vi kaller det 'Nock'. Hele Urbit OS-systemet kompileres ned til Nock, og Nock er bare 33 linjer med kode.

Nock ligner i sin ånd WASM eller JVM: det er en ensartet maskinkode for hvert Urbit [skip](https://urbit.org/docs/glossary/ship/). Et frossent fundament gir noen fine funksjoner:

Tilstanden til Urbit OS er en ren funksjon av hendelseshistorikken. Det er kontrollerbart, inspiserbart, repeterbart. Du kan faktisk stole på det.
Å skrive desentraliserte apper blir langt enklere enn i den gamle verden, siden hver node fungerer nøyaktig på samme måte.
Hele Urbit OS-stacken, fra programmeringsspråk til applikasjoner, kan oppgraderes over nettverket. For vanlige brukere gir dette nesten ingen systemadministrasjon.

Siden Nock er en datamaskin-protokoll i seg selv, kan to noder på Urbit-nettverket enkelt dele data, kommunisere og koble programvare. Systemer fra det 20. århundre kunne aldri gjøre dette uten at en MEGACORP fungerte som mellomledd.

<img class="full ba w-100 mv4" src="https://media.urbit.org/site/understanding-urbit/network-os/urbit-os-diagram-apart.svg"/>

På toppen av denne lille VM-en bygde vi et selv-hosting, rent funksjonelt programmeringsspråk, en kjerne skrevet på det språket og et sett med kjernemoduler som tjener alle behovene til personlig databehandling. Spesielt: et filsystem, byggesystem, applikasjonssandkasse, hemmelig lagring, webserver, terminaldriver og en nettverksprotokoll.

Dette høres ut som mye – men hele programvare-stacken er utrolig kompakt. Hele systemet er på rundt 50K linjer med kode. Vi har sett at individuelle utviklere har mulighet til å forstår hele greia. Hvem er den siste personen du møtte som faktisk forstår hele datamaskinen? Urbit OS er som 1968 Porsche 911 for operativsystemer: ekstremt enkel, elegant og bygget for enkeltpersoner.

<img class="ba" src="https://media.urbit.org/site/understanding-urbit/project-history/uu-os-4.jpg">

Men hvorfor bygde vi all denne teknologien?

Først og fremst for å levere en bedre brukeropplevelse. Urbit OS alene er kun et nytt lag for personlig databehandling i skyen. Men med dette nye laget åpner vi muligheten for å bygge et helt enhetlig grensesnitt for personlig databehandling i skyen. (Hvis du vil hoppe til hvordan vi ser for oss dette grensesnittet, [se her](/understanding-urbit/interface).)

Fra et bredere perspektiv er det klart at tilkoblet databehandling er viktig, og at det er kommet for å bli. Vi vil bare at det skal være så rolig, enkelt og pålitelig som mulig, og vi tror ikke det kan skje ved hjelp av eksisterende teknologi.

Hele Urbit er bygget for å fungere som en enkelt stack, og vi tror at å bygge et nyttig produkt er den beste måten å modne systemet som en helhet. Når det er sagt, kan hver komponent i dette systemet brukes alene. Liker du ikke klienten vår? Det er greit, du kan bygge din egen. Vil du ikke bruke Urbit OS? Ikke noe problem – du kan bruke Urbit ID som et autentiseringssystem for et annet operativsystem, eller hva som helst.

Når vi snakker om Urbit ID, la oss snakke om hva det faktisk er.
