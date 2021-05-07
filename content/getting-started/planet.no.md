+++
title = "Sette opp planeten din"
weight = 1
description = "Kom i gang med en permanent Urbit-identitet."
+++

En planet er en permanent Urbit-identitet. Som alle Urbit-identiteter, kan de aldri tas fra deg. I motsetning til kometer som er gratis, er planeter designet for bruk langt inn i fremtiden. Hvis du ennå ikke er kjent med Urbit-nettverket, kan du følge [Komme i gang-guiden](@/getting-started/_index.md), som vil forklare det grunnleggende og lede deg gjennom å bruke en gratis identitet. Denne guiden forklarer de neste trinnene.

### Kjøp en planet {#purchase}

Det er flere måter å få din egen planet på:

- Å få en invitasjon fra en venn (eller fremmed).
- Å kjøpe en planet, inkludert hosting, fra en [hosting-leverandør](#hosting-providers) som [kanbitid.com](https://www.geturbitid.com/).
- Manuell oppsett og hosting av en planet kjøpt fra en tredjepart som [urbit.live](https://urbit.live), [OpenSea](https://opensea.io), [planet.market](https://planet.market/), [urbit.me](https://urbit.me), [urth systems](https://urth.systems/), eller [Urbit Marketplace](https://urbitmarketplace.com/).

Vær oppmerksom på at når du kjøper en planet, bør du forsikre deg om at foreldrestjernen din fungerer sammen med leverandøren. Hvis du trenger å unnslippe en ikke-operativ stjerne, se [Unnslipp en Sponsor](@/using/id/using-bridge.md#escaping-your-sponsor).

### Hosting Leverandører {#hosting-providers}

Hostingleverandører vil ofte selge deg en planet og kjøre den for deg. Dette alternativet er veldig enkelt, men vil sannsynligvis koste en vanlig avgift.

Urbit er designet for å være bærbar. Dette betyr at hvis du registrerer deg for hosting nå, men senere vil forlate hostingleverandøren din og kjøre Urbit selv, bør du kunne jobbe med dem for å få tak i alle dataene dine og starte opp planeten din uten å miste noe.

Å bruke hosting betyr at du stoler på leverandøren din med dataene dine, men så lenge du har planeten din, vil du alltid eie identiteten din.

Nåværende hostingleverandører er:

- [Tlon Corporation](https://tlon.io): Tlon er skaperen av Landscape og er primært ansvarlig for opprettelsen og vedlikeholdet av selve Urbit-prosjektet.
- [Get an Urbit ID](https://www.geturbitid.com/): Get an Urbit ID var den første vertsleverandøren og drives av et medlem av Urbit-samfunnet.


### Velg å kjøre planeten din på datamaskinen eller på en skytjeneste

Urbit må kjøre på en eksisterende datamaskin et sted. De fleste brukere kjører planeten sin på sin personlige datamaskin, men vi anbefaler til slutt å bruke en skytjeneste (Digital Ocean, Linode, etc) fordi det gjør det mulig å få tilgang til planeten din hvor som helst på flere enheter. Å være vert for planeten din i skyen gjør at den alltid kan være online og klar for automatiske oppdateringer. Du er velkommen til å kjøre fra din personlige datamaskin og bytte til skyen senere ... alt uten å miste data!

Det er en guide for [hosting av din planet på DigitalOcean](@/using/running/hosting.md) og [hosting av din planet på Linode](https://jeremytunnell.com/2021/01/09/how-to-install-urbit-on-a-linode-vps), men enhver skyhostingtjeneste skal fungere.

### Få din keyfile {#keyfile}

Hvis du mottok en e-postinvitasjon til Urbit, bør hovedbilletten være en .pdf-fil i passmappen inne i arkivet du lastet ned. **Hvis du kjøpte planeten din eller noen sendte deg en, har du sannsynligvis ikke en hovedbillett, og du trenger sannsynligvis ikke en. Ikke utsted en ny hovedbillett med mindre du er sikker på at du trenger det.**

1. Koble til [Bridge](https://bridge.urbit.org). (Bridge er som en Urbit lommebok)
2. Skriv inn navnet på planeten din og den tilhørende masterbilletten hvis du har en. Klikk på knappen "Metamask, Mnemonic, Hardware Wallet ..." hvis du ikke har en hovedbillett.
3. Når du er logget inn, klikker du på "OS" -alternativet.
4. Klikk på "Last ned Arvo Keyfile" -knappen. Hvis dette er nedtonet, klikker du på "Tilbakestill nettverksnøkler", og deretter klikker du på "Tilbakestill nettverksnøkler" på neste side, validerer transaksjonen ved hjelp av lommeboken, og deretter klikker du "Send traksjon". Når transaksjonen er fullført, bør "Last ned Arvo Keyfile" -knappen være tilgjengelig for deg å trykke. Du bør motta en .key-fil som inneholder hemmeligheten som trengs for å starte planeten din. Pass på denne filen.

### Kjør oppstartskommandoen {#the-dojo}

For at andre skip i nettverket skal kommunisere med skipet ditt, er datamaskinen det kjører på må kunne motta innkommende UDP-trafikk. Derfor er det viktig når du kjører skipet lokalt for å bruke flagget `-p ames_port` (erstatt `ames_port` med et offentlig portnummer fra 49152 til 65535) for å spesifisere hvilken port vil du motta UDP-trafikk, og videresende inngående UDP-trafikk som ankommer ruteren din på den porten til datamaskinen.

Naviger til `urbit`-mappen. Åpne nøkkelfilen din (det er bare en tekstfil)
og kopier nøkkelen inni. Lim den inn i følgende kommando, bortsett fra med
`ames_port` erstattet med et offentlig portnummer, og `sampel-palnet` erstattet av
navnet på planeten din. **Ikke ta med tilden i planetnavnet ditt.**

```sh
./urbit -p ames_port -w sampel-palnet -G rAnDoMkEy 
```

Eller du kan kopiere nøkkelfilen til gjeldende mappe og kjøre:

```sh
./urbit -p ames_port -w sampel-palnet -k ./my-planet.key 
```

Begge kommandoene vil opprette en katalog som heter `sampel-palnet/` og begynne å starte planeten din. Det kan ta noen minutter.

Når planeten din er startet opp, vil du se `~sampel-palnet:dojo>` (Dojo: Urbit-kommandolinjen).

For å logge inn på [Landscape](@/docs/glossary/landscape.md), sjekk instruksjonene [her](/getting-started/#using-landscape).

For å stenge planeten din, bruk `Ctrl-D`.

For å starte planeten din opp igjen, kjør følgende fra `urbit`-katalogen, med `ames_port` erstattet med det offentlige portnummeret du brukte da du startet opp skipet ditt.

```sh
./urbit -p ames_port sampel-palnet
```

Merk at `sample-planet/` er banen til en mappe, som vi nettopp opprettet i `urbit`-katalogen. Denne mappen kalles planetens **brygge**, og den inneholder alle dataene dine.

Start aldri flere forekomster av planeten din samtidig. Du kan forhindre at dette skjer ved et uhell ved bare å beholde en enkelt kopi av bryggen din.

**Viktig:** Når en nøkkel har blitt brukt til å starte en planet på nettverket, kan den ikke brukes til å starte den planeten igjen senere - det vil føre til kommunikasjonsproblemer med andre planeter. Av denne grunn bør du **slette nøkkelfilen fra maskinen din når planeten din er ferdig p starte opp**. Hvis du bruker den samme nøkkelen to ganger, må du tilbakestille planeten din for å gjenopprette funksjonaliteten.

Slett nøkkelfilen med kommandoen nedenfor:

```sh
rm ./my-planet.key
```

## Oppsett {#setup}

Det første du vanligvis vil gjøre med en ny planet er å **montere** den. En planet som monteres betyr at den kan sees av Linux, slik at filer kan deles mellom den og planeten din. For å montere planeten din, skriv `|mount %` ved Dojo-ledeteksten.

```
|mount %
>=
```

`> =` betyr at kommandoen var vellykket. Nå kan du se planetens filer i katalogen.

For å forstå hva som skjedde med denne kommandoen, les mer om Urbits filsystem (kalt "“clay”") [her](@/docs/arvo/clay/clay.md).

## Oppdatering {#updating}

Som standard har planeter en sponsor - en stjerne som gir oppdateringer og rutetjenester. For å se hvem du mottar oppdateringer fra, skriv inn `|ota` i dojo. Du vil se noe slikt:

```
~sampel-palnet:dojo> |ota
OTAs enabled from %kids on ~dopzod
use |ota %disable or |ota ~sponsor %kids to reset it
> |ota
>=
```

Hvis sponsoren din (i dette tilfellet, `~dopzod`) av en eller annen grunn ikke svarer, kan du lese instruksjonene om [unnslippe sponsoren din](@/using/id/using-bridge.md#escaping-your-sponsor).


## Neste Skritt

Nå som du er i gang, kan du ta deg tid til å utdype forståelsen din ved å sjekke ut noen av våre andre guider:

- [Host Skipet ditt i Skyen](@/using/running/hosting.md): Følg denne veiledningen for å sette skipet ditt i drift som en skyserver, tilgjengelig hvor som helst.
- [Les Driftshåndboken](@/using/os/getting-started.md): Bli ekspertpilot ved å lære å bruke skipet ditt.
- [Lær å Utvikle på Urbit](@/docs/development/develop.md): Lær hvordan du kan bidra til eller utvikle på Urbit.
