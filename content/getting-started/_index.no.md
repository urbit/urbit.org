+++
title = "Kom i gang"
weight = 1
description = "Hvordan installere Urbit"
page_template = "page_indiced.html"
template = "getting-started/index.html"
+++

Prisen for å bruke andre plattformer er dine data og deres sikkerhet. Det er en grunn til at de er gratis å bruke.

Prisen for å bruke Urbit er ditt eget ansvar - du må kjøre det selv (eller betale noen for å kjøre det for deg).

Det er enkelt, og det blir stadig enklere.

Det er for tiden to måter å kjøre Urbit på:

Hvis du bruker Mac eller Linux og ikke er redd for noen få terminalkommandoer, anbefaler vi at du kjører den selv. Det er målet med denne guiden.

Hvis du kjører Windows eller bare vil gi det et forsøk uten å bekymre deg for de tekniske delene, kan det være lurt å vurdere en [hosting-leverandør](@/getting-started/planet.md#hosting-providers).

## Installer Urbit {#macos-and-linux}

Velg koden for operativsystemet og kjør kommandoene i terminalen.

<div id="os">
  <input type="radio" id="macos" name="os" checked>
  <label for="macos">MacOS</label>
  <div class="tab">

```sh
mkdir ~/urbit
cd ~/urbit
curl -JLO https://urbit.org/install/mac/latest
tar zxvf ./darwin.tgz --strip=1
~/urbit/urbit
```
  </div>

  <input type="radio" id="linux" name="os">
  <label for="linux">Linux</label>
  <div class="tab">

```sh
mkdir ~/urbit
cd ~/urbit
wget --content-disposition https://urbit.org/install/linux64/latest
tar zxvf ./linux64.tgz --strip=1
~/urbit/urbit
```

Linux-brukere kan trenge å kjøre denne kommandoen i et annet terminalvindu for å få tilgang til Urbit på port 80:

```sh
sudo apt-get install libcap2-bin
sudo setcap 'cap_net_bind_service=+ep' ~/urbit/urbit
```
</div>

  <input type="radio" id="windows" name="os">
  <label for="windows">Windows</label>
  <div class="tab">

> Vær oppmerksom på at denne metoden for å installere Urbit er eksperimentell, og det kan hende at vi ikke kan hjelpe deg hvis du støter på problemer relatert til WSL 2.

Urbit kan ikke kjøres på Windows selv, men det er en praktisk måte å kjøre Linux ved å bruke [Windows Subsystem for Linux 2](https://docs.microsoft.com/en-us/windows/wsl/wsl2-install) på Windows 10. Installer Windows Subsystem for Linux 2 og åpne en Linux-terminal i Windows, og følg deretter installasjonsinstruksjonene for Linux nedenfor. Disse instruksjonene er testet og verifisert for WSL 2 + Ubuntu 18.04 LTS, som vist i `~sitful-hatred`'s trinn-for-trinn oppsettveiledning [her](https://subject.network/posts/urbit-wsl2/).

Av ytelsesgrunner må du ikke installere Urbit i det monterte Windows-volumet, men installere det i Linux-filsystemet. For eksempel i hjemmekatalogen din, som kan navigeres til ved å skrive inn `cd ~`.
</div>
</div>

<style>
  #os {
    display: flex;
    flex-wrap: wrap;
  }
  #os label {
    order: -1;
    padding: .5rem;
    border-width: 1px 0px 0px 1px;
    border-style: solid;
    cursor: pointer;
  }
  #os label[for=windows] {
    border-right-width: 1px;
  }
  #os input[type="radio"] {
    display: none;
  }
  #os .tab {
    display: none;
    border: 1px solid;
    padding: 1rem;
    max-width: 100%;
  }
  #os input[type='radio']:checked + label {
    font-weight: bold;
  }
  #os input[type='radio']:checked + label + .tab {
    display: block;
}
</style>

Hvis det lykkes, vil du se en utgangsblokk som begynner med linjen:

```
Urbit: a personal server operating function
```

## Oppstart av en Gratis Identitet {#comet}

Det er to deler til Urbit: en **ID** og et **Operativsystem**.

Du har nettopp installert operativsystemet på datamaskinen din.

**ID**en ligner på et brukernavn og passord på et annet nettsted. Forskjellen er at den offentlige delen (brukernavnet) blir bekreftet av tusenvis av mennesker over hele verden, mens bare du holder nøkkelen (passordet) til den IDen.

Det er fem typer Urbit ID-er, men for å komme i gang trenger du bare å vite om to: vi kaller dem **planeter** og **kometer**.

***

**Planeter** er knappe (dette forhindrer blant annet spamming) og krever vanligvis en pris å anskaffe. Dette er den anbefalte måten å kjøre Urbit på, men det er litt mer involvert.

Et planetnavn ser ut som `~sampel-planet`.

[Følg denne guiden](@/getting-started/planet.md) hvis du allerede har skaffet deg en planet.

[Finn en planet å kjøpe](@/getting-started/planet.md#purchase)

***

**Kometer** er praktisk talt ubegrenset og gratis å anskaffe. For øyeblikket er dette en fin måte å prøve ut nettverket gratis.

Et kometnavn ser ut som `~dasres-ragnep-lislyt-ribpyl--mosnyx-bisdem-nidful-marzod`.

[Les mer om Urbit ID her](/understanding-urbit/urbit-id)


***

For å starte en komet, gå inn i kommandolinjen og kjør følgende kommando fra `urbit`-katalogen du opprettet under [Urbit-installasjon](#installing-urbit):

```sh
~/urbit/urbit -c mycomet
```

Det kan ta litt tid å laste kometen (tar sannsynligvis bare noen få minutter, men det kan ta lengre tid). Dette følger med at det er gratis. Når det er gjort, vil du få noen meldinger som slutter slik:

```
ames: on localhost, UDP 31337.
http: live (insecure, public) on 8080
http: live ("secure", public) on 8443
http: live (insecure, loopback) on 12321
~sampel_marzod:dojo>
```

Når kometen din er ferdig å start opp, vil du se `~sampel_marzod:dojo>` (Dojo: Urbit kommandolinjen).

For å gå ut av Urbit, bruk `Ctrl-D` eller skriv `|exit` i Dojo.

For å starte kometen din igjen, kjør følgende fra `urbit`-katalogen (merk mangelen på `-c` argument):

```sh
~/urbit/urbit mycomet
```

## Å bruke Landscape

Urbit er en helt ny datamaskin, så som standard ender man opp i "dojo", som er terminalen. Som din nåværende datamaskin, kan den brukes til å gjøre omtrent hva som helst hvis du vet de riktige kommandoene. Du trenger bare å vite om en kommando for nå.

For øyeblikket er den vanligste måten å bruke Urbit på via en nettapp som heter [Landscape](@/docs/glossary/landscape.md), som følger med Urbit. Den kjører i nettleseren din og gir et grensesnitt til Urbit uten å bruke terminalen. Du må få passordet, eller `code`.

1. Mens Urbit kjører, se etter en linje som ligner på `http: live (insecure, public) on 80`. Nummeret er porten som skipet ditt bruker. Det vil sannsynligvis være port 80. (Ikke bekymre deg for den "insecure, public" delen – det betyr bare at du kan få tilgang til den fra din egen nettleser. Det gir ingen andre tilgang.)
2. Hvis den gitte porten er `80`, skriver du bare `localhost` i nettleserens adressefelt. Hvis den gitte porten er et annet nummer, for eksempel `8080`, skriver du `localhost:8080`. Du blir møtt med en påloggingsprompt.
3. I vinduet der du fant portnummeret, skriv `+code` og trykk på retur. Kopier og lim inn koden som vises i "Access Key"-feltet i nettleseren, og trykk på fortsett.
4. Når du er inne, kan du se deg rundt og lese instruksjonene på skjermen. Hvis du noen gang blir logget av, følg disse instruksjonene igjen.

## Neste skritt

### Å oppdatere kometen din {#updating}

Urbit-applikasjonen kommer med en ny utgivelse av Urbit OS, men automatiske oppdateringer ("over the air") kan aktiveres, slik at nye binære filer ikke er nødvendige for hver oppdatering. Planeter har automatiske oppdateringer aktivert som standard, men dette er ikke tilfelle for kometer. Mange kometer brukes bare en gang og kastes, så det ville være bortkastet å oppdatere hver eneste komet så snart den starter. Hvis du planlegger å bruke kometen din i mer enn en rask test, vil du sannsynligvis forsikre deg om at du kjører den nyeste versjonen av operativsystemet.

Du kan aktivere oppdateringer for kometen din ved å skrive `|ota (sein:title our now our) %kids` i Dojo og trykke Enter.

```
> |ota (sein:title our now our) %kids
>=
```

Hvis du vil være sikker på at du får oppdateringer, kan du sjekke ved å skrive `|ota` uten argumenter:

```
~sampel_marzod:dojo> |ota
OTAs enabled from %kids on ~marzod
use |ota %disable or |ota ~sponsor %kids to reset it
> |ota
>=
```

### Les mer om Dojo {#the-dojo}

Dojo er Urbits kommandolinje. Du kan bruke den til å kontrollere skipet ditt, eller til å utføre vilkårlig kode. Sjekk ut lenkene nedenfor for mer informasjon.

- [Grunnleggende operasjoner](@/using/os/getting-started.md)
- [Grunnleggende Hoon](/docs/tutorials/hoon/hoon-school/setup)
- [Ordlisteoppføring](/docs/glossary/dojo)

### Kjøp en Permanent Identitet {#boot-your-planet}

Du kan fortsette å bruke denne kometen på ubestemt tid. Det er for tiden få forskjeller mellom å bruke en kometnivåidentitet og en planetnivå. Noen grupper tillater imidlertid ikke kometer for å opprettholde et visst kvalitetsnivå, og det kan gjøres endringer i fremtiden som ytterligere devaluerer kometer. De vil imidlertid alltid ha tilgang til de grunnleggende funksjonene i nettverket.

En komet kommer også med et langt og ganske uminnelig navn, mens en planet har et kort navn og en "sigil" (avatar) knyttet til seg som gjør den mer identifiserbar i nettverket. Du vil kanskje legge merke til alt dette i løpet av de første minuttene etter bruk av Urbit.

[For å lese instruksjoner om hvordan du kjøper og bruker en planet, besøk denne siden](@/getting-started/planet.md).
