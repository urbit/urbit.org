+++
title = "Brukergrensesnitt"
description = "Hvordan Urbit føles for en hverdagsbruker"
weight = 3
[extra]
flatten_pagination = "true"
hide_next_title = "true"
hide_previous_title = "true"
+++

Vi har bygd Urbit OS + Urbit ID til å være en software-stack for menneske-skala databehandling i skyen. Dette systemet ble ikke bygget utelukkende for å være ny infrastruktur – det ble bygget slik at vi kan bygge bedre grensesnitt på toppen og folk kan bruke Urbit uten å vite om teknologien i det hele tatt. For at Urbit faktisk skal ha betydning, må vi gå helt fra VM til UI.

Dette er grunnen til at vi bygde Landscape: et enkelt, rolig, nettleserbasert grensesnitt for å bygge digitale samfunn. Vi bruker Landscape for å samle våre egne måter å kommunisere og samarbeide på.

Landscape er ikke bare en idé – det er en ekte ting. Når du i dag har en Urbit OS-node oppe og kjører, kan du få tilgang til Landscape fra en datamaskin- eller mobil-nettleser for å pseudonymt chatte, skrive og dele lenker med en gruppe venner.

Vi ser Landscape som en ny form for sosial programvare som kan fortsette å vokse og utvikle seg i lang tid fremover. Vi bruker den første versjonen av Landscape, ‘OS 1’ hver dag. OS 1 er enkelt til det punktet at det er forenklende. Vi ser frem til å utvikle Landscape i lang tid.

Landscape er på ingen måte det eneste mulige grensesnittet for Urbit OS + Urbit ID, men det er det vi trenger mest. I fremtiden ser vi frem til at det finnes mange forskjellige Urbit-grensesnitt (og hvis du i det hele tatt er interessert i å eksperimentere med å bygge en, så gjør det.)

Men vi kommer nærmere inn på det senere. Først skal vi snakke om hvorfor vi bygde Landscape, hvor det er nå, og hvor det skal. Så dekker vi litt om andre grensesnittmuligheter.


<img class="" src="https://media.urbit.org/site/understanding-urbit/project-history/uu-osn-1.svg">

Hvilket problem løser Landscape? La oss starte med den nåværende situasjonen når det gjelder skytjenester.

I dagens verden av apper og tjenester er det ikke noe operativsystem i noen meningsfull forstand. Våre lokalsamfunn, kolleger og liv er spredt mellom disse tjenestene – og arbeidet med å kombinere dem overlates til brukeren. Det er helt opp til deg å huske alle passordene dine, hvem som sendte hvilken melding hvor, hvilke filer som er på hvilken plattform og så videre.

Fremfor alt mangler våre digitale liv i dag en følelse av sted, en følelse av hjem.

Det er irriterende og forvirrende å bytte mellom grensesnitt, du kan ikke utvide eller bygge på toppen, og personvern og sikkerhet er ut av dine hender. Denne fragmenterte, silede, nøye overvåket opplevelsen er rett og slett et biprodukt av å få andre til å kjøre og kontrollere programvaren din. For den vanlige brukeren er resultatet restriktivt, kjedelig og vondt å håndtere. Muligheten for hverdags kreativitet med verktøyene vi sitter fast med er nær null. Skulle ikke datamaskinen være en sykkel for sinnet?

Operativsystemer for PC-en tok skrivebordet på 1970-tallet og gjorde det digitalt. Papir, skuffer og konvolutter ble til 'filer' og 'mapper'. Det er en flott abstraksjon, men det er eldgammelt. Vi lever i en sammenhengende, flerspillerverden; vi trenger et operativsystem som anerkjenner denne verden.

Dagens 'skrivebord' er overfylt med apper og tjenester, datastrukturer og grensesnitt. Å forene denne usammenhengende brukeropplevelsen er det viktigste problemet en plattform som Urbit kan løse. Landscape er bygget for å bringe alt sammen til et enhetlig grensesnitt igjen. Uten Urbit ID + Urbit OS ville dette være umulig.

I mars 2020 publiserte vi den første offentlige versjonen av Landscape, OS 1, til nettverket og har brukt den siden den gang til å kommunisere, samarbeide og holde kontakten.

OS 1 er et minimalt flerbruksgrensesnitt for å bringe en gruppe sammen for å chatte, dele lenker, skrive og delta i diskusjoner. OS 1 er fri for annonser, sporing eller overvåking (som er normen for alt som er bygget på Urbit). OS 1 er et strippet ned sosialt verktøy designet for høy tillit, direkte kommunikasjon og samarbeid. OS 1 er stedet for små samfunn å føle seg hjemme.

<img class="ba" src="https://storage.googleapis.com/media.urbit.org/site/understanding-urbit/uu-interface-3.png">

Vi bygde OS 1 for oss selv. Vi var lei av å bruke sentralisert, standard programvare. Vi ønsket ikke å bli sittende fast ved å bytte mellom oppblåste, monolitiske tjenester for å holde kontakten og flytte arbeidet vårt fremover. Vi var ferdige med å stole på at en tredjepart skulle ta vare på samfunnet vårt – så vi dro til Urbit, og det føles bra.

Hvis du er nysgjerrig på å få en fullstendig oversikt over OS 1, kan du sjekke ut [dette innlegget](https://urbit.org/blog/introducing-os1/), se [denne videoen](https://www.youtube.com/watch?v=71ViyftPkGk&feature=youtu.be&t=3963) eller gjerne [starte en node](@/getting-started/_index.md#comet) og kom å snakk med oss.

(Å kjøre Urbit krever fortsatt litt fikling i kommandolinjen, så det er ikke for alle – men vi har [planer om å forbedre](https://urbit.org/blog/providers/).)

Målet vårt med OS 1 var å produsere skymaskinenes versjon av [Nokia 3310](https://en.wikipedia.org/wiki/Nokia_3310). Noe som grenser til forenklet, men likevel hyggelig å bruke. Vi nådde det målet, men det er bare den første milepælen. La oss snakke litt om hvordan Landscape vokser og modnes på høyt nivå (for mer informasjon på nær-til-middels sikt, sjekk ut [veikartet](https://urbit.org/understanding-urbit/roadmap/)).

<img class="ba" src="https://storage.googleapis.com/media.urbit.org/site/understanding-urbit/uu-interface-4.png">

Landscape har to grunnleggende byggesteiner: grupper og moduler. En gruppe er akkurat det det høres ut som: en eller flere personer. En modul er omtrent som en app uten datalåsing. En modul er bare et verktøy for å få gjort noe, som 'oppgaver', 'lenker' eller 'stemmer' som deles av en gruppe.

For å gi noen enkle eksempler, kan en gruppe familiemedlemmer gjerne kun chatte og dele bilder. En gruppe meglere kan gjerne kun dele kommentert markedsundersøkelser, se på markedene og administrere betalinger på en blockchain.

I dag har Landscape bare noen få medfølgende moduler: chat, lenker og publisering. Vår plan er å fortsette å utvide denne suiten slik at standardpakken med moduler føles som et pent balansert verktøysett for å bygge fellesskap og holde kontakten. Vi vil også gjøre det enkelt for andre å bygge sine egne moduler og dele dem med andre direkte over Urbits nettverk.

Ideen er denne: ethvert samfunn skal kunne tilpasse sitt digitale miljø fritt. For de fleste brukere handler dette bare om å velge de riktige modulene. For de som har litt fritid, bør det ikke være noe vanskeligere å legge til sine egne moduler enn å bygge en enkel web-app.

Når vi ser frem til hva vi kan gjøre med Landscape i fremtiden, er det vanskelig å se oss gå tilbake til verktøyene vi bruker i dag. De sentraliserte tjenestene vi har nå er som kringkastingsmedier: de er til for å distribuere innhold fra en produsent til en rekke følgere.

Landscape er for alt annet. Landscape er for faktisk toveiskommunikasjon.

<img class="ba" src="https://media.urbit.org/site/understanding-urbit/your-last-computer/your-last-computer-waves%402x.png">

Vårt ønske om å bygge et enkelt sted å jobbe sammen er ikke bare drevet av bekvemmelighet (selv om det er ganske praktisk). Slik vi ser det, må [ekte samfunn ha reelt eierskap over områdene de bor](https://urbit.org/blog/urbit-is-for-communities/). Når lokalsamfunn bruker industriell, en-størrelse-passer-alt programvaren føles de like steril som programvaren de bruker. Den verden føltes alltid litt som å bo i et planlagt samfunn. Vi vil heller bo på landsbygda.

Vi tror Landscape kan utvikle seg til noe *enda* kraftigere, renere og mer tilfredsstillende å bruke. Landscape er verken et sosialt nettverk eller produktivitetsprogramvare. Landscape er ikke sentralt kontrollert eller passivt overvåket. Landscape er noe helt nytt. Det er programvare som er skreddersydd for folk som bruker den, av folk som bruker den.
