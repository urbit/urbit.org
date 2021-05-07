+++
title = "Stemmeanvisning"
template = "page_indiced.html"
[extra]
hidetitle = "true"
+++

## Urbit Kontinuitet & Sikkerhetsstemme

Som galakseier har du muligheten til å delta i en av de første stemmene som ble utført på Azimuth-nettverket – en avstemning om Tlon har utpekt Urbit-nettverket som kontinuerlig og bekreftet å være sikkert av en tredjepartsrevisor, den tredje komponenten i [veikart](https://github.com/urbit/azimuth/blob/master/proposals/0xcb1f81e42b5e75f000f94fc71a3ea70cab4bfc6f236b91e717f1b9516e5596b5.txt) innebygd i Azimuth.

Du kan lese mer om denne milepælen [her](/blog/security-and-continuity/).

Nedenfor finner du instruksjoner om hvordan du støtter dette dokumentforslaget.

## Stem med Bridge

- Logg inn på [Bridge](https://bridge.urbit.org) med Stemmeproxyen din (du kan også bruke eiernøkkelen din, men det er sannsynligvis vanskeligere å få tilgang til)
- Hvis du får en liste over eiendeler, klikker du på galaksen din.
- Klikk på Senatet på oversiktsskjermbildet til eiendelen.
- Siden vil vise en liste over dokumentene som tidligere har oppnådd flertall, samt for øyeblikket åpne meningsmålinger. Tlons siste forslag har hash på `0x0000000000000000000000000000000000000000000000000000000000000000000000e0`.
- For mer informasjon om teksten til dette forslaget, se [her](https://github.com/urbit/azimuth/pull/34).
- Klikk på "støtt" eller "avvis" under hashen, deretter "generer & signer transaksjon", deretter "send transaksjon" for å stemme på forslaget.
- Hvis dette forslaget oppnår flertallsstøtte, kan du se resultatet ved å komme tilbake til denne siden.

## Stem med Etherscan (eller andre utforskere)

- Les dokumentet som foreslås [her](https://github.com/urbit/azimuth/pull/34).
- Hvis du skal bruke Etherscan, må du ha Metamask installert og autentisere med enten din Stemmeproxy eller din eiernøkkel.
- Opprett og signer en transaksjon ved hjelp av Galaxy Ownership eller Voting Proxy på [Polls contract](https://etherscan.io/address/0x7fecab617c868bb5996d99d95200d2fa708218e4#writeContract) i castDocumentVote med ditt galaksenummer, dokumentet hash fra dokumentet ovenfor (` 0x00000000000000000000000000000000000000000000000000000000000000e0`) og stem som "sant" for ja og "falsk" for nei.
- Send inn transaksjonen.

## Bekreft at dette forslaget er vedtatt

- Avstemningskontrakten er [her](https://etherscan.io/dapp/0x7fecab617c868bb5996d99d95200d2fa708218e4#readContract). Skriv inn hashen (`0x00000000000000000000000000000000000000000000000000000000000000e0`) i" documentHasAchievedMajority. " Hvis dette blir "sant", betyr det at forslaget ble vedtatt av det galaktiske senatet.
- Hvis ønskelig, kan du bekrefte at ovennevnte faktisk er den virkelige avstemningskontrakten ved å sjekke "avstemninger" [her](https://etherscan.io/dapp/ecliptic.eth#readContract).
