+++
title = "시작하기"
weight = 2
description = "Installation instructions for power users."
+++

### 시작하기

다른 플랫폼을 사용할 때 그 대가로 사용자는 데이터와 보안을 반납합니다. 무료로 사용할 수 있는 데는 다 이유가 있습니다.

어빗을 사용할 때 사용자가 지불해야 할 대가는 책임감입니다. 사용자나 사용자가 대가를 지불한 사람이 어빗을 직접 실행해야 합니다.

어빗은 쉬우며 갈수록 더 쉬워질 것입니다.

현재 어빗을 실행하는 방법은 두 가지가 있습니다:

Mac OS나 리눅스를 사용하고 있으며 몇 가지 터미널 명령을 실행하는 것에 거부감이 없다면 직접 실행하는 것을 추천합니다. 여러분이 직접 실행하도록 하는 것이 이 안내글의 목적입니다.

윈도우를 사용하고 있거나 기술적 부분에 대한 아무런 부담없이 실행하고 싶으면 [호스팅 제공자](https://urbit.org/getting-started/planet/#hosting-providers)를 고려하세요.

### Urbit 설치

사용자의 운영체제의 코드를 선택하고 터미널에서 이 명령을 실행하세요.

<div id="os" class="os">
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

리눅스 사용자의 경우 포트 80에서 어빗에 접근하려면 다른 터미널에서 이 명령줄을 실행해야만 가능합니다:

```sh
sudo apt-get install libcap2-bin
sudo setcap 'cap_net_bind_service=+ep' ~/urbit/urbit
```
</div>

  <input type="radio" id="windows" name="os">
  <label for="windows">Windows</label>
  <div class="tab">

이 어빗 설치법은 실험적인 것이라는 것을 알아두십시오. WSL2 문제가 생기면 도움을 받지 못할지도 모릅니다.
    
어빗은 윈도우 자체에서 실행할 수 없지만 윈도우 10에서는 리눅스용 윈도우 하위 시스템 2를통해 편리하게 리눅스 배포판을 실행할 수 있습니다. 리눅스용 윈도우 하위 시스템 2를 설치한 후 윈도우에서 리눅스 터미널을 열고 상단에 있는 리눅스 설치 지침을 따르면 됩니다. WSL 2 + Ubuntu 18.04 LTS에 대해 확인 및 검증된 사항은 ~sitful-hatred의 단계별 설정 가이드 의 단계별 셋업 가이드(여기)에 명시되어 있습니다.
    
성능상의 이유로 탑재된 윈도우 볼륨 대신 리눅스 파일 시스템에 설치하십시오. 예를 들면, cd ~를 입력하면 나오는 홈 디렉토리에 설치하십시오.    
</div>
</div>
아래와 같은 출력 블록이 나오면 성공적으로 설치된 것입니다.

```
Urbit: a personal server operating function
```

### 무료 ID를 부팅하기

어빗은 두 부분으로 나눌 수 있는데, **ID** 그리고 **운영 체제**입니다.

방금 사용자의 컴퓨터에 운영체제를 설치했습니다.

**어빗 ID**는 다른 사이트의 사용자 이름 및 비밀번호와 비슷합니다. 사용자 이름과 비밀번호의 차이점은 공유된 부분(사용자 이름)을 전 세계 수천명의 사람이 확인할 수 있는 반면 사용자만 키(비밀번호)를 알고 있다는 점입니다.

어빗 ID 에는 다섯 종류가 있는데, 시작하기 위해서는 두 가지 정도만 알면 됩니다. 그것은 바로 **planets**과 **comets**입니다.

***

**Planets**는 귀해서(다른 무엇보다도 스팸을 방지합니다) 보통 유료로 얻습니다. Planets는 어빗을 실행할 때 권장되는 방법인데, 조금 복잡합니다.

Planets의 이름은 이런 식으로 보여집니다: ~sampel-palnet.

이미 planet을 획득했으면 [이 지침을 따르십시오](@/getting-started/planet.md).

[구입할 Planets 찾기](@/getting-started/planet.md#purchase)

***

**Comets**는 사실상 무한하고 무료로 얻을 수 있는 것입니다. 따라서, 지금으로서는 네트워크를 시험해 보기에 아주 좋은 방법입니다.

Comets의 이름은 이런 식으로 보여집니다: ~dasres-ragnep-lislyt-ribpyl—mosnyx-bisdem-nidful-marzod.

[Urbit ID에 대한 자세한 내용은 여기를 참조하세요](/understanding-urbit/urbit-id)

***

Comets을 부팅하려면 명령줄로 이동하여 [Urbit 설치](https://urbit.org/getting-started/#installing-urbit)시 생성된 어빗 디렉토리에서 다음 명령을 실행해야 합니다:

```sh
~/urbit/urbit -c mycomet
```

Comets를 로딩하는 데 시간이 좀 걸릴 수도 있습니다. (보통 몇 분정도 걸리지만 조금 더 걸릴 수 있습니다). 무료로 받은 것이기 때문에 그렇습니다. 로딩이 완료되면 메시지가 뜨는데, 마지막 부분이 이렇게 끝납니다.

```
ames: on localhost, UDP 31337.
http: live (insecure, public) on 8080
http: live ("secure", public) on 8443
http: live (insecure, loopback) on 12321
~sampel_marzod:dojo>
```

Comets 부팅이 끝나면 다음과 같은 것을 볼 수 있습니다. ~sampel_marzod:dojo> (Dojo: Urbit 명령줄).

어빗을 종료하려면 Ctrl-D를 누르거나 dojo에 |exit를 입력하면 됩니다.

Comets을 다시 시작하려면 urbit 디렉토리에서 다음 명령을 실행하십시오: (-c 인수 없음 유의)

```sh
~/urbit/urbit mycomet
```

### Landscape 사용하는 법

어빗은 완전히 새로운 컴퓨터이기 때문에 자동으로 터미널인 "dojo"로 사용자를 이동시킵니다. 알맞은 명령을 알면 현재 사용하는 컴퓨터와 마찬가지로 모든 작업에 어빗을 사용할 수 있습니다. 지금은 명령을 한 개만 알면 됩니다.

현재 어빗을 사용하는 가장 일반적인 방법은 어빗과 함께 제공되는 웹앱인 Landscape를 사용하는 것입니다. Landscape는 브라우저에서 실행되고 터미널을 사용할 필요없이 어빗 인터페이스를 제공합니다. 여기서 비밀번호나 (code) 필요합니다.

1. 어빗을 실행한 상태에서 다음과 같은 줄을 찾으십시오. http: live (insecure, public) on 80 숫자 부분은 ship이 사용하는 포트를 의미합니다. 대부분의 경우 80인데 맞는지 확인해 보십시오. ("insecure, public"이라고 적힌 부분에 대해서는 걱정하지 마십시오. 사용자 본인의 웹 브라우저에서 접근할 수 있다는 뜻입니다. 다른 사람은 접근할 수 없습니다.)
2. 주어진 포트가 80이라면 간단하게 웹 브라우저 주소창에 localhost라고 입력하십시오. 주어진 포트가 80이 아닌 경우(예:8080), 다음과 같이 입력하면 됩니다.localhost:8080. 다음으로 로그인 프롬프트가 나올 것입니다.
3. 포트 번호를 찾은 창에 +code를 입력하고 return을 누르십시오. 브라우저에서 "Access Key"라는 필드에 복사한 코드를 붙여넣기한 다음 continue를 클릭하세요.
4. 다음으로 이동하면, 화면에 뜬 지침을 읽으세요. 로그아웃한 경우 이 지침을 처음부터 다시 따라하십시오.

## 다음 단계

### comet 업데이트하기

어빗 애플리케이션은 최근 출시된 Urbit OS 버전과 함께 제공되지만 자동 업데이트("over the air" (OTA))가 가능해서 업데이트 될 때마다 새로운 이진 파일은 필요없습니다. Planets는 자동으로 업데이트가 되는데 comet은 그렇지 않습니다. 많은 경우 comet은 일회용으로 사용되고 버려지므로 부팅 즉시 모든 comet을 업데이트 하는 것은 낭비라고 할 수 있습니다. comet을 그냥 시험적으로 사용하는 것이 아니라면 자신이 최신 버전의 OS를 사용하고 있는지 확인하는 것이 좋습니다.

comet 업데이트를 활성화하고 싶으면 다음을 Dojo에 입력한 다음 enter를 누르세요. |ota (sein:title our now our) %kids

```
> |ota (sein:title our now our) %kids
>=
```

자동 업데이트 여부를 확인하려면 인수 없이 |ota를 입력하세요:

```
~sampel_marzod:dojo> |ota
OTAs enabled from %kids on ~marzod
use |ota %disable or |ota ~sponsor %kids to reset it
> |ota
>=
```

### Dojo에 대한 자세한 내용 보기

Dojo는 어빗의 명령줄입니다. Ship을 제어하거나 임의 코드를 실행할 수 있습니다. 자세한 내용은 아래의 링크를 참조하세요.

- [기본 작업](@/using/os/getting-started.md)
- [기본 Hoon(훈)](/docs/tutorials/hoon/hoon-school/setup)
- [용어집 항목](/docs/glossary/dojo)

### 영구적 ID 구매하기

Comet은 무기한 사용할 수 있습니다. 현재로서는 planet급 ID와 comet급 ID의 차이가 적습니다. 하지만 어떤 planets 그룹이 양질을 유지하기 위해 comet을 차단한다거나 발전이 지속되어 미래에는 comet의 가치가 지금보다 낮아질지도 모릅니다. 그렇다 하더라도 영구적으로 네트워크의 기본 기능은 계속 사용할 수 있을 것입니다.
Comet의 이름은 길고 쉽게 외울 수 없는 반면 planet의 이름은 짧은데다 이름과 연관된 "sigil" (아바타)이 있어서 네트워크에서 쉽게 식별됩니다. 어빗을 사용해 보면 처음 몇 분 이내에 이 모든 것을 알 수 있습니다.
[Planet구매법과 사용법에 대한 지침을 읽으려면 여기를 클릭하세요](https://urbit.org/getting-started/planet/).


<style>
  .os {
    display: flex;
    flex-wrap: wrap;
  }
  .os label {
    order: -1;
    padding: .5rem;
    min-width: 70px;
    text-align: center;
    border-width: 1px 0px 0px 1px;
    border-style: solid;
    cursor: pointer;
  }
  .os label:last-of-type {
    border-right-width: 1px;
  }
  .os input[type="radio"] {
    display: none;
  }
  .os .tab {
    display: none;
    border: 1px solid;
    padding: 1rem;
    width: 100%;
    max-width: 100%;
  }
  .os .tab p:first-child {
    margin-top: 0;
  }
  .os .tab p:last-child {
    margin-bottom: 0;
  }
  .os input[type='radio']:checked + label {
    font-weight: bold;
  }
  .os input[type='radio']:checked + label + .tab {
    display: block;
}
</style>

