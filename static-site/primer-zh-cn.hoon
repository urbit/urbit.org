/=  head  /partials-head/
/=  menu  /partials-menu/
/=  article  /partials-article/
/=  footer-contact   /partials-footer-contact/
/=  footer-signup   /partials-footer-signup/
;html(lang "zh-CN")
  ;+  (head "Urbit / Primer")
  ;link/"/css/primer.css"(rel "stylesheet");
  ;body
    ;div.bg-black.pt-30.mb-30
      ;div.container.white
        ;div.row
          ;div.col-sm-12.col-md-8.col-md-offset-2
            ;div.mb-20
              ;h1.h1-large: 2019了。你依然不过是别人数据库中的一行记录。
            ==
            ;div.mb-20
              ;img.col-sm-12@"/images/megacorp.svg";
            ==
            ;div.p--intro.pb-30
              ;>
              你的数字生活遍布各类账号、应用与服务。

              其中，每一个仅做一件事并且由别人控制。它们很好使，但它们的的确确是庞大、反乌托邦的玩具之作。

              这些不实、单一目的的计算机的局限性是显而易见的。人们理应获得更好的。

              你的Urbit是个个人云服务器。一个在加密点对点网络上简单、私有、泛功能的虚拟计算机。

              你的Urbit是你的数字护照、你的数字储藏库与你的数字助手。你对它的所有权基于以太坊之上 - 除你之外没有人可以控制它。
            ==
          ==
        ==
      ==
    == ::/bg-black

    :: Section 0.2

    ;div.mb-0
      ;div.container
        ;div.row
          ;div.col-sm-12.col-md-8.col-md-offset-2
            ;div.mb-20
              ;h1.h1-large: The future was actually just a technical problem.
            ==
            ;div.mb-20.stack-intro.animate-false
              ;svg(xmlns "http://www.w3.org/2000/svg", width "100%", viewbox "0 0 100 100")
                ;circle.inner-ring(cx "50", cy "50", r "38.5", fill "none", stroke "#fcc440", stroke-width "4");
                ;g.outer-ring(fill "none", stroke-width "6")
                  ;circle(cx "50", cy "50", r "43.9267642934", stroke "#96daea", stroke-dasharray "88 188", stroke-dashoffset "-178");
                  ;circle(cx "50", cy "50", r "43.9267642934", stroke "#abc0d9", stroke-dasharray "26 250", stroke-dashoffset "-152");
                  ;circle(cx "50", cy "50", r "43.9267642934", stroke "#3973c6", stroke-dasharray "26 250", stroke-dashoffset "-126");
                  ;circle(cx "50", cy "50", r "43.9267642934", stroke "#797384", stroke-dasharray "36 240", stroke-dashoffset "-90");
                  ;circle(cx "50", cy "50", r "43.9267642934", stroke "#1846b7", stroke-dasharray "100 176", stroke-dashoffset "-266");
                ==
                ;circle.hoon(cx "50", cy "50", r "27.5", fill "none", stroke "#6fdc74", stroke-width "17");
                ;g.nock
                  ;circle(cx "50", cy "50.00001", r "18.5", fill "#ee3124");
                  ;path(d "M68.35124,47.53066a18.14586,18.14586,0,0,1,0,4.93868", fill "#444");
                  ;path(d "M68.35124,47.53066H50a2.46934,2.46934,0,0,0-.00944,4.93868H68.35124A18.14586,18.14586,0,0,0,68.35124,47.53066Z", fill "#5e6367");
                  ;circle.event(cx "50", cy "50.00001", r "2.46934", fill "#1c1c1c");
                ==
              ==
            ==
            ;div.mb-20
              ;div.p--intro
                ;p.mb-4: 当今，你有两种糟糕的云计算选择：运行你自己的Unix服务器或者加入一堆应用与服务。
                ;p.mb-4: 我们不打算接受这样的交易。我们不想成为系统管理员并且我们不想被某个巨型公司主宰。
                ;p.mb-4: 所以我们建立了一个新平台。一套简单到普通人可以运行他们自己服务器的新技术栈。
                ;p.mb-4: Urbit是一套三层的栈：Azimuth、Arvo和Aegean。每一层可以作为其单独的产品使用，并且他们都是开源的。
              ==
            ==
          ==
        ==
        ;div.row.mb-20
          ;div.col-md-3.col-md-offset-0
            ;img.col-sm-12@"/images/azimuth.svg";
            ;h3.mb-4: Azimuth
            ;p: 是存在于以太坊上的虚拟的土地。一个Azimuth点是一个安全的数字身份与网络地址。
          ==
          ;div.col-md-3.col-md-offset-1
            ;img.col-sm-12@"/images/arvo-complete.svg";
            ;h3.mb-4: Arvo
            ;p: 是一个全新的操作系统与点对点网络。一个Arvo服务器使用一个Azimuth点作为其名称和地址。
          ==
          ;div.col-md-3.col-md-offset-1
            ;img.col-sm-12@"/images/aegean.svg";
            ;h3.mb-4: Aegean
            ;p: 是一个用于存在于Arvo网络之上独立、去中心化社会的模式。
          ==
        ==
        ;div.col-md-8.col-md-offset-2.mb-40
          ;div.p--intro
            ;p.mb-4: Urbit还很年轻。它尚未准备好为每个人所用。伟大的系统软件需要长时间成长。
            ;p.mb-4: 但Urbit不是个梦。它是真实的。它是个运行中、稳定的网络。并且一旦你开始了解它，会有更多去探索。
            ;p.mb-4: Urbit是最后的平台。个人计算革命甚至尚未开始。
          ==
        ==
      == ::/container

      ;div.pt-70.pb-70.bg-blue
        ;div.container
          ;div.row.mb-8
            ;div.col-md-9.col-md-offset-1.mb-10
              ;h1.h1-large.white: 目录
            ==
          ==
          ;div.row.mb-8
            ;div.col-md-12
              ;a.row.sm-h2.h1.h1-large.h-font.white.text-decoration-none/"#what-urbit-is-for"
                ;div.col-sm-1.col-md-1.col-md-offset-1.center.dlig: (1)
                ;div.col-sm-10.col-sm-offset-1.col-md-8.col-md-offset-0.underline.underline--skip: Aegean：Urbit的用途是什么
              ==
            ==
          ==
          ;div.row.mb-8
            ;div.col-md-12
              ;a.row.sm-h2.h1.h1-large.h-font.white.text-decoration-none/"#what-arvo-is"
                ;div.col-sm-1.col-md-1.col-md-offset-1.center.dlig: (2)
                ;div.col-sm-10.col-sm-offset-1.col-md-8.col-md-offset-0.underline.underline--skip: Arvo：Urbit是什么
              ==
            ==
          ==
          ;div.row.mb-8
            ;div.col-md-12
              ;a.row.sm-h2.h1.h1-large.h-font.white.text-decoration-none/"#what-azimuth-is"
                ;div.col-sm-1.col-md-1.col-md-offset-1.center.dlig: (3)
                ;div.col-sm-10.col-sm-offset-1.col-md-8.col-md-offset-0.underline.underline--skip: Azimuth：Urbit是什么
              ==
            ==
          ==
          ;div.row.mb-8
            ;div.col-md-12
              ;a.row.sm-h2.h1.h1-large.h-font.white.text-decoration-none/"#history"
                ;div.col-sm-1.col-md-1.col-md-offset-1.center.dlig: (4)
                ;div.col-sm-10.col-sm-offset-1.col-md-8.col-md-offset-0.underline.underline--skip: 沿革
              ==
            ==
          ==
          ;div.row.mb-8
            ;div.col-md-12
              ;a.row.sm-h2.h1.h1-large.h-font.white.text-decoration-none/"#azimuth-distribution"
                ;div.col-sm-1.col-md-1.col-md-offset-1.center.dlig: (5)
                ;div.col-sm-10.col-sm-offset-1.col-md-8.col-md-offset-0.underline.underline--skip: Azimuth分布
              ==
            ==
          ==
        == :: /container
      ==
    :: What Urbit is for
    ;nav.bg-black.pb-36.menu-hide.overflow-y
      ;div.container
        ;div.row.pt-10.mb-3
          ;div.col-sm-1.menu-toggle.fixed(style "top:10rem;left:4rem")
          ;img.w-8.h-8@"/assets/menu-close.svg";
          ==
          ;div.col-sm-8.col-md-8.col-lg-4.col-sm-offset-2.white
            ;+  %^  article
                  "Primer"
                  ""
                  "/primer"
          ==
        ==
        ;div.row.menu-toggle
          ;div.col-sm-9.col-md-8.col-lg-12.col-sm-offset-2.col-md-offset-1.col-lg-offset-0.white
            ;div.row.mb-8
              ;div.col-md-10.col-md-offset-1
                ;a.row.h2.h-font.white.text-decoration-none/"#what-urbit-is-for"
                  ;div.col-sm-1.col-md-1.col-md-offset-1.center.dlig: (1)
                  ;div.col-sm-10.col-sm-offset-1.col-md-8.col-md-offset-0.underline.underline--skip: Aegean：Urbit的用途是什么
                ==
              ==
            ==
            ;div.row.mb-8
              ;div.col-md-10.col-md-offset-1
                ;a.row.h2.h-font.white.text-decoration-none/"#what-arvo-is"
                  ;div.col-sm-1.col-md-1.col-md-offset-1.center.dlig: (2)
                  ;
                  ;div.col-sm-10.col-sm-offset-1.col-md-8.col-md-offset-0.underline.underline--skip: Arvo：Urbit是什么
                ==
              ==
            ==
            ;div.row.mb-8
              ;div.col-md-10.col-md-offset-1
                ;a.row.h2.h-font.white.text-decoration-none/"#what-azimuth-is"
                  ;div.col-sm-1.col-md-1.col-md-offset-1.center.dlig: (3)
                  ;div.col-sm-10.col-sm-offset-1.col-md-8.col-md-offset-0.underline.underline--skip: Azimuth：Urbit是什么
                ==
              ==
            ==
            ;div.row.mb-8
              ;div.col-md-10.col-md-offset-1
                ;a.row.h2.h-font.white.text-decoration-none/"#history"
                  ;div.col-sm-1.col-md-1.col-md-offset-1.center.dlig: (4)
                  ;div.col-sm-10.col-sm-offset-1.col-md-8.col-md-offset-0.underline.underline--skip：沿革
                ==
              ==
            ==
            ;div.row.mb-8
              ;div.col-md-10.col-md-offset-1
                ;a.row.h2.h-font.white.text-decoration-none/"#azimuth-distribution"
                  ;div.col-sm-1.col-md-1.col-md-offset-1.center.dlig: (5)
                  ;div.col-sm-10.col-sm-offset-1.col-md-8.col-md-offset-0.underline.underline--skip: Azimuth分发
                ==
              ==
            ==
          ==
        ==
        ;div.row
          ;div.col-sm-9.col-md-8.col-lg-4.col-sm-offset-2.white
            ;+  %^  article
                  "Posts"
                  ""
                  "/posts"
            ;+  %^  article
                  "Docs"
                  ""
                  "/docs"
          ==
        ==
        ;div.row.mt-36.mb-12.white
          ;div.col-sm-9.col-md-6.col-sm-offset-2(id "mc_embed_signup")
            ;h2.mb-2: Updates
            Every month we send an email with community events and what we're up to.
            ;form(id "mc-embedded-subscribe-form", class "validate", action "https://urbit.us11.list-manage.com/subscribe/post?u=972a03db9e0c6c25bb58de8c8&amp;id=be143888d2", method "post", name "mc-embedded-subscribe-form", target "_blank")
              ;div.input-group.text-mono(id "mc_embed_signup_scroll")
                ;div.mc-field-group
                  ;input.required.mb-2(type "email", name "EMAIL", id "mce-EMAIL", placeholder "your@email.com");
                ==
                ;div#mce-responses.clear
                  ;div#mce-error-response.response(style "display:none");
                  ;div#mce-success-response.response(style "display:none");
                ==
                ;div(style "position: absolute; left: -5000px;")
                  ;input(type "text", name "b_972a03db9e0c6c25bb58de8c8_be143888d2");
                ==
                ;div.clear
                  ;button#mc-embedded-subscribe.bg-white.black.h-font(type "submit", name "subscribe")
                    ;span.text-500: Subscribe
                  ==
                ==
              ==
            ==
          ==
        ==
      ==
      ;footer.container.mb-36.white
        ;div.row
          ;div.col-sm-6.col-sm-offset-2
            ;+  footer-contact
          ==
        ==
      ==
    ==
    ;div.container.mb-5
      ;div#what-urbit-is-for.row.sm-pt-20.sm-pb-20.pt-40.pb-40
        ;div.fixed(style "top:10rem;left:4rem")
          ;div.col-sm-1.menu-toggle
            ;img.w-8.h-8@"/assets/menu-open.svg";
          ==
        ==
        ;div.col-sm-12
          ;div.row.sm-h2.h1.h1-large.h-font
            ;div.col-sm-1.col-md-1.col-md-offset-1.center.dlig: (1)
            ;div.col-sm-10.col-sm-offset-1.col-md-8.col-md-offset-0: Aegean：Urbit的用途是什么
          ==
        ==
      ==
    ==
    :: Video
    ;div.mb-20
      ;div.video-container
        ;iframe@"https://www.youtube-nocookie.com/embed/M04AKTCDavc"(width "1920", height "1080", frameborder "0");
      ==
    ==
    ;div.container
      ;div.row
        ;div.col-sm-12.col-md-8.col-md-offset-2
          ;div.p--intro.pb-30
            ;>
            现今巨型企业运行我们的云软件、决定如何对其升级与存储我们的数据。当人们得以运行他们自己的服务器时世界会是什么样子？

            在真实的世界中，不同文化与社会共存于中性的物理基础设施之上。不同人、社区与文化共享着同一个道路与输电网络。

            在云上，我们好似在旅馆生活。

            Aegean是个用以建设城市的模式。一座城市是一群人在他们Arvo服务器上运行同一个**媒介**、一种程序。

            一座城市不是为一件事物而设计的“应用”。一座城市是一个社区拥有的工具的组合。每座城市独立且自治。城市控制其自身接口并通过无线网络对它们自己的代码升级。

            我们已经启动了一些城市，并且我们将谈谈我们即将迫近的。我们能想象到的仅仅是刚刚开始。

            我们能确定一件事：未来不是个单一的一元文化。全人类不愿居于同一座城市。大多数人住在几座城市并且在其间舒适地迁移。

            我们所见的是个巨大的超文化列岛。一个中性的Arvo和Azimuth基础设施之上的无中心网络网络。
          ==
        ==
      ==
    ==
    :: S2 - Archipelago
    ;div.container
      ;div.row
        ;div.col-md-8.col-md-offset-2
          ;h1.center.mb-20: 以新大陆为家园
        ==
      ==
    ==
      ;div.container.container-img
        ;div.row
          ;div.col-md-12.overflow-hidden
            ;img(src "/images/network-diagram.gif");
          ==
        ==
      ==
    ;div.container.sm-mb-0.mb-40
      ;div.row
        ;div.col-md-8.col-md-offset-2
          作为建设新平台的社区，我们需要聊聊并参与长篇讨论。不同平台及其不同的账户登陆与臃肿的接口使用起来很费劲。

          所以我们单独为自己建设了个新的媒介。称作Landscape，并且我们已经使用它开启了一些受邀制的城市。

          这些城市有些像一个新大陆上的殖民地。它们不健全。它们尚未准备好为每个人使用。它们尚不安全，它们不是永久性的。但我们喜欢它们已经胜过了对其它选择的。

          而且我们已经可以看到当其他人开始被允许开始以此为家园时它的样子。居于一个社区控制权握于你手的平台是个崭新的世界。

          我们不仅兴奋地欢迎其它社区，还将延展我们媒介的灵活性。以试验其它可能性。

          比如位置数据、心率、营养和一次考察中成员们各自的笔记。匿名的基因数据、可视化工具与研究者团队的文档。存在很多有待探索。
        ==
      ==
    ==
    ;div.container.mb-30
      ;div.row.align-vertical
        ;div.col-md-5
          ;h1.mb-10: 区块链是个I/O设备
          ;div
            ;div.md-hide.mb-4
              ;img@"/images/offchain.svg";
            ==
            区块链本为对人人都开放的金融系统而制。而我们尚止步不前于巨型企业的交易所或是通过我们的浏览器使用单薄的“dapps”。

            Urbit交易员组成的城市可以轻松地向另一个城市转发订单并且直接从一个交易员向链发送经签名加密后的交割。都是你在获得于安全已验证的网络之上快速、确定性的计算机的同时免费得到的。

            那么为什么不再更进一步？让你的Arvo服务器运行你的交易算法或参与预测市场。今天的“dapps”对永久储存的状态无权限并且它们的UI很有局限性。更糟的是，它们之间无法通讯。

            当安全的个人服务器连接到区块链时，区块链就更加有用。币的交割将只是共识计算过程中包括的一小部分。
          ==
        ==
        ;div.col-md-5.col-md-offset-1.sm-hide
          ;img@"/images/offchain.svg";
        ==
      ==
    ==
    ;div.container.mb-30
      ;div.row
        ;div.col-md-8.col-md-offset-2
          ;div.center
            ;h1.mb-10: 你的私有机器人城市
          ==
        ==
        ;div.col-md-6.col-md-offset-3
          ;img@"/images/iot.svg";
        ==
        ;div.col-md-8.col-md-offset-2
          ;>
            “物联网”一团糟。某些“物”是很不错的硬件。但它们都需要我使用一些来自巨型企业的服务。为什么我不能直接和我自己的恒温器通话？
        ==
        ;div.col-md-8.col-md-offset-2
            ;p
              ;span: 你的Azimuth身份，或
              ;i.ml-1: 行星
              ;span: ，可以启动2
              ;sup.mr-1: 32
              ;span: （40亿）子身份，或
              ;i.ml-1: 卫星
              ;span: 。那应该足够给你的照明、你的电冰箱、你的3D打印机和你的耕作机器人群。拥有座工厂？好，那个也可以。
            ==
            ;p
              一旦它们运行Arvo服务器，你的设备可以全部运行同一个媒介并加入你自己的私有城市。控制你的机器人军团很简单，只要他们共享同一个计算平台。
            ==
        ==
      ==
    ==
    ;div.container.mb-30
      ;div.row.align-vertical
        ;div.col-md-6
          ;div.mb-10
            ;h1: 你的生活存档
            ;div.center.sm-mt-10.sm-mb-10.md-hide
              ;img.col-md-6@"/images/face.svg";
            ==
          ==
          ;div
            你的生物性信息需要安全于云上。这个科技用起来没问题。巨型企业总是其薄弱之处。没有企业能保证永远存在 - 或永远在乎。

            那就是为什么你的Arvo服务器是正确的场所之于存储一切你想保存的数据 - 每一条你发送的消息、每一张你拍摄的照片、甚至你的财务与医疗记录。你的个人服务器维护一个存档、一个永久、值得信任的场所以保存你的数字生活。

            一旦你数据在你的个人服务器上安全，你现在管理它的方式将显得可怕与落后。
          ==
        ==
        ;div.col-md-4.col-md-offset-1.center.sm-hide
          ;img.col-md-12@"/images/face.svg";
        ==
      ==
    ==
    ;div#what-arvo-is.container.sm-pt-20.sm-pb-20.pt-40.pb-40
      ;div.row
        ;div.col-sm-12
          ;div.row.sm-h2.h1.h1-large.h-font
            ;div.col-sm-1.col-md-1.col-md-offset-1.center.dlig: (2)
            ;div.col-sm-10.col-sm-offset-1.col-md-8.col-md-offset-0: Arvo: Urbit是什么
          ==
        ==
      ==
    ==
    ;div.container.mb-30
      ;div.row.mb-30
        ;div.col-sm-12
          ;div.row.align-vertical
            ;div.col-sm-12.col-md-2
              ;div.row.align-vertical
                ;div.col-sm-4.col-sm-offset-4.col-md-8.col-md-offset-2
                  ;img@"/images/file.svg";
                ==
                ;div.col-sm-12.col-md-12.col-md-offset-0.center
                  ;h4.text-md: 一份文件
                ==

              ==
            ==
            ;div.col-sm-12.col-md-1.sm-mt-4.mt-12.center
              ;h3: +
            ==
            ;div.col-sm-12.col-md-2
              ;div.row.align-vertical
                ;div.col-sm-2.col-sm-offset-5.col-md-8.col-md-offset-2
                  ;img@"/images/passcode.svg";
                ==
                ;div.col-sm-12.col-md-12.col-md-offset-0.center
                  ;h4.text-md: 你的密码
                ==
              ==
            ==
            ;div.col-sm-12.col-md-1.sm-mt-4.mt-12.center
              ;h3: +
            ==
            ;div.col-sm-12.col-md-2
              ;div.row.align-vertical
                ;div.col-sm-4.col-sm-offset-4.col-md-8.col-md-offset-2
                  ;img@"/images/program.svg";
                ==
                ;div.col-sm-12.col-md-12.col-md-offset-0.center
                  ;h4.text-md: 一个程序
                ==
              ==
            ==
            ;div.col-sm-12.col-md-1.pv-12.mb-10.center
              ;h3: =
            ==
            ;div.col-sm-12.col-md-3
              ;div.row
                ;div.col-sm-8.col-sm-offset-2.col-md-10.col-md-offset-0(style "margin-top: -8rem")
                  ;img@"/images/urbit-complete.svg";
                ==
              ==
            ==
          ==
        ==
      ==
      ;div.row.mb-20
        ;div.col-md-8.col-md-offset-2
          ;>
            你的个人服务器，称作一艘飞船，被作为其接收、由密码加密的事件日志存储。要启动你的飞船时，用Arvo程序打开你的事件日志文件并输入你的密码。要停止它时，直接关闭程序；事件日志将耐心地等待下一次启动。

            要使用Arvo网络时，每艘飞船必须有一个Azimuth名称、或**点**。你拥有的点在以太坊上。它是个简短，能被读出声来的名称，类似于“~laptel-nilfur”或“~doplyx-halsev”（“~”不发音）。其他飞船通过你的Azimuth点发现及联系你的飞船，无论它在天涯海角。

            大多数人把他们的飞船置于云上。如果你想要自己运营，你的飞船可以存在于笔记本电脑、手机、甚至U盘上。它只是一个文件。它没必要一直运行。别把它弄丢了就行。

            无论你的飞船在哪里，只要用你的名称和密码登陆“urbit.org” - 像普通的互联网账户一样。

            你通过网页界面和/或本地命令行界面操作你的飞船。你可以用你的本地电脑同步到最新版本的文件。（Arvo永远记得每一个版本。）你的飞船也能作为网站服务器使用和代替你与已有的互联网服务互动。

            你的飞船被设计成彻底免维护的。通过网络进行升级。它从不变旧或过时。一个世纪不启动后打开它 - 可能会需要一周，但它会自动自我升级到2119年。
          ==
      ==
      ;div.row
        ;div.col-md-12.center
          ;h1.mb-10.mt-10: 好吧，宅们，下面是简明的技术概述
        ==
      ==
      ;div.row.sm-wrap-reverse.mb-20
        ;div.col-md-5
          ;>
            Arvo是个作为虚拟机运行的通用计算机。你可以把它想作是操作系统上的一层覆盖；它对待Unix好似Unix对待BIOS。

            它的行为完全被由“[event, current-state]”至“[effects, next-state]”的冻结变换函数（称为Nock）所定义。一个事件可能是按下了一个键盘按键、一个HTTP请求、或一个来自另一个Arvo的UDP消息。一个效应可能是一个Unix命令行工具中的命令、一个HTTP回复、或一个发送到另一个Arvo的UDP消息。

            Arvo自下而上由以下组件栈构成。

            Vere，我们基于C编写的解释器，是个基于将其状态存储为永久事件日志和/或内存节点的libuv之上的交割I/O处理器。Vere解释Nock。

            Nock，我们的机器语言，类似于无符号的pico-Lisp。它是同像性的纯函数机器代码，具有12个opcode与1个通用数据类型，noun：其分支可以是一个可以表示一个任意大byte流的数字，或是一个有一对noun的cons cell的循环二叉树。

            Hoon是纯函数式、静态、积极求值、编译至Nock的编程语言。

            Arvo内核是函数式、非可插队、通用的1000行Hoon写就的操作系统。

            我们的技术栈是怪异的。但你会习惯它。所有的东西都在MIT许可协议下开源 - [看看](https://github.com/urbit/urbit)。
          ==
        ;div.col-md-5.col-md-offset-1.sm-mb-10.stack-apart.animate-false
          ;svg(xmlns "http://www.w3.org/2000/svg", viewbox "0 0 512 760")
            ;g.text.h-font
              ;g.nock-label
                ;text.text-lg.text-600(x "296", y "116"): Nock
                ;text.text-lg(x "296", y "144"): 虚拟机
                ;rect(x "296", y "80", fill "#EE3124", width "10", height "10");
              ==
              ;g.hoon-label
                ;text.text-lg.text-600(x "296", y "349"): Hoon
                ;text.text-lg(x "296", y "378"): 编程
                ;text.text-lg(x "296", y "402"): 语言
              ==
              ;rect(x "296", y "313", fill "#4fe89c", width "10", height "10");
              ;g.arvo-label
                ;text.text-lg.text-600(x "296", y "645"): Arvo
                ;text.text-lg(x "296", y "674"): 操作系统
                ;rect(x "296", y "609", fill "#ffc440", width "10", height "10");
              ==
            ==
            ;g.arvo-2
              ;g.outer-ring-2
                ;path(d "M47.45972,87.70073l-10.928-3.69424a100.53566,100.53566,0,0,1,28.68643-43.08l7.62262,8.65827a89.00087,89.00087,0,0,0-25.381,38.116Z", fill "#abc0d9");
                ;path(d "M33.24638,135.65971a99.357,99.357,0,0,1,.05276-39.702,100.45981,100.45981,0,0,1,3.23247-11.951l10.92821,3.69387a88.89666,88.89666,0,0,0-2.86015,10.57383,87.88439,87.88439,0,0,0-.043,35.1169Z", fill "#3973c6");
                ;path(d "M229.29253,96.34011l-11.3103,2.26845a88.575,88.575,0,0,1-28.28393,83.80658l-.00006-.00006a88.89611,88.89611,0,0,1-8.6531,6.71653,88.75134,88.75134,0,0,1-67.50125,13.53826,88.85352,88.85352,0,0,1-10.57322-2.86013l-3.6948,10.92783a100.43434,100.43434,0,0,0,11.95122,3.23287A99.14009,99.14009,0,0,0,131.16462,216a100.39225,100.39225,0,0,0,19.76463-1.97712,99.35451,99.35451,0,0,0,36.61118-15.35814,100.49505,100.49505,0,0,0,9.78025-7.5912l-3.89205-4.42106,3.89217,4.421a99.8677,99.8677,0,0,0,31.97173-94.73338Z", fill "#1846b7");
                ;path(d "M99.276,210.73767a99.86729,99.86729,0,0,1-66.02954-75.07786l11.31029-2.26844a88.57495,88.57495,0,0,0,58.41368,66.41828Z", fill "#797384");
                ;path(d "M213.93415,59.729a100.39884,100.39884,0,0,0-50.67126-38.46665h0a100.47573,100.47573,0,0,0-11.95135-3.23275A100.28532,100.28532,0,0,0,74.99826,33.33521a100.4267,100.4267,0,0,0-9.78019,7.59138l7.62281,8.65805a88.86885,88.86885,0,0,1,8.65261-6.71622,88.74987,88.74987,0,0,1,67.50125-13.53826,88.7733,88.7733,0,0,1,55.40626,36.894,87.88294,87.88294,0,0,1,13.58123,32.38441l11.3103-2.26845A99.35573,99.35573,0,0,0,213.93415,59.729Z", fill "#96daea");
              ==
              ;circle.inner-ring-2(cx "131.26947", cy "116.00001", r "82", fill "none", stroke "#ffc440", stroke-miterlimit "10", stroke-width "10.02771");
            ==
            ;circle.hoon-2(cx "131.26947", cy "116.00001", r "57", fill "none", stroke "#4fe89c", stroke-miterlimit "10", stroke-width "36");
            ;g.nock
              ;circle(cx "131.26947", cy "116.00001", r "37.43842", fill "#ee3124");
              ;g#beam
                ;path(d "M168.36665,111.00822a36.68153,36.68153,0,0,1,0,9.98358", fill "#444");
                ;path(d "M168.36665,111.00822H131.26947a4.99179,4.99179,0,0,0,0,9.98358h37.09718a36.68153,36.68153,0,0,0,0-9.98358Z", fill "#5e6367");
              ==
              ;circle(cx "131.26947", cy "116.00001", r "4.99179", fill "#1c1c1c");
            ==
          ==
        ==
      ==
      ;div.row.align-vertical.mb-20
        ;div.col-md-4
          ;img@"/images/arvo-large.svg";
        ==
        ;div.col-md-7.col-md-offset-1
          ;div.row
            ;ul.list-reset.col-md-12.h-font
              ;div.square.square-sm.square-orange.mb-2;
              ;li.text-600.mb-0: Arvo内核
              ;li: 核心操作系统与事件管理器
            ==
            ;div.col-sm-6.col-md-4
              ;ul.list-reset.h-font
                ;div.square.square-sm.square-gray.mb-2;
                ;li.text-600.mb-0: Ames
                ;li: 点对点网络
              ==
            ==
            ;div.col-sm-6.col-md-4
              ;ul.list-reset.h-font
              ;div.square.square-sm.square-blue.mb-2;
              ;li.text-600.mb-0: Clay
              ;li.col-md-11: 全局文件系统
              ==
            ==
            ;div.col-sm-6.col-md-4
              ;ul.list-reset.h-font
                ;div.square.square-sm.square-green-light.mb-2;
                ;li.text-600.mb-0: Ford
                ;li: 构建系统
              ==
            ==
            ;div.col-sm-6.col-md-4
              ;ul.list-reset.h-font
                ;div.square.square-sm.square-cyan.mb-2;
                ;li.text-600.mb-0: Gall
                ;li: 应用程序沙盒
              ==
            ==
            ;div.col-sm-6.col-md-4
              ;ul.list-reset.h-font
                ;div.square.square-sm.square-navy.mb-2;
                ;li.text-600.mb-0: Jael
                ;li: 秘密存储库
              ==
            ==
            ;div.col-sm-6.col-md-4
              ;ul.list-reset.h-font
                ;div.square.square-sm.square-purple.mb-2;
                ;li.text-600.mb-0: Eyre
                ;li: Web服务器
              ==
            ==
            ;div.col-sm-6.col-md-4
              ;ul.list-reset.h-font
                ;div.square.square-sm.square-green.mb-2;
                ;li.text-600.mb-0: Landscape
                ;li: 聊天与讨论端
              ==
            ==
            ;div.col-sm-6.col-md-4
              ;ul.list-reset.h-font
                ;div.square.square-sm.square-orange-dark.mb-2;
                ;li.text-600.mb-0: API网关
                ;li: 至已有服务
              ==
            ==
            ;div.col-sm-6.col-md-4
              ;ul.list-reset.h-font
                ;div.square.square-sm.square-orange-dark.mb-2;
                ;li.text-600.mb-0: Dill
                ;li: 终端驱动
              ==
            ==
          ==
        ==
      ==
      ;div.row
        ;div.col-md-8.col-md-offset-2
          ;>
          你如何在一个函数里嵌入一个通用计算机？将程序和数据载入由变换函数基于每个事件而更新的状态。

          要启动一艘新飞船时，首要的几个事件由虚拟机（名为Vere，由C写就）在你飞船进入网络之前运行。这些初始事件载入于编译器Hoon、编译及安装Arvo内核，初始化用户域的应用与文件，并且分配作为你飞船身份的你的Azimuth点和私钥。现在你的飞船可以与世界沟通了。

          Arvo栈可以向其自身除Nock与Vere之外的任何部分推送任何升级。

          让我们历数Arvo内核的部分组件。这里开始有意思了。

          Ames，我们的网络协议覆盖于UDP之上。每一条飞船与飞船间的消息都经过签名与端到端加密。Ames是消息导向、命令查询职责分离、无连接、数据为中心与交割化的。

          Clay，我们的文件系统，是一个响应式、**有类型约束**、分布式版本控制、定义一个已验证全局不可变名称空间的存储。

          Ford，我们的函数式构建系统，当有人触发后台渲染库中的一个数学函数时能够自动升级一个你浏览器中的网页。

          编译器、库、Arvo和模块一道，整个操作系统有约30,000行代码。

          Urbit也是个其它功能与组件的不寻常列表。你可以阅读我们长篇、特有、些许过时的[白皮书](http://media.urbit.org/whitepaper.pdf)以了解更多。**提示**，它有点学术。

          今天，Urbit是一个稳定的测试网。Urbit寄存其自己的网站、论坛与联合制的聊天系统。它的最后一次计划外事故（全局硬分叉）是在2016年。

          Urbit现在有一个务实洁净的Vere替代品，Jaque，基于Graal/Truffle。Jaque可以启动一艘飞船并加入网络。它仍然有一些栈相关的问题。

          Urbit未完工。它需要优化、文档、大量打磨、甚至一些架构变化。但它确实正常运行着。
        ==
      ==
      ;div#what-azimuth-is.container.sm-pt-20.sm-pb-20.pt-40.pb-40
        ;div.row
          ;div.col-sm-12
            ;div.row.sm-h2.h1.h1-large.h-font
              ;div.col-sm-1.col-md-1.col-md-offset-1.center.dlig: (3)
              ;div.col-sm-10.col-sm-offset-1.col-md-8.col-md-offset-0: Azimuth：Urbit是什么
            ==
          ==
        ==
      ==
       ;div.container
        ;div.row.sm-wrap-reverse.mb-16
          ;div.col-md-5.col-md-offset-1
            ;>
            如果IP地址是密码式资产，互联网就可以通过其地址空间为其开发提供资金。

            具备了明晰的所有权，IP地址将发展出明确的声誉。捣乱者将损失基于声誉成本的真金白银并且互联网将是个友好的网络。

            我们无法矫正IP。所以我们建立了一个去中心化的地址空间系统并称其为Azimuth。Ames，作为UDP式的Arvo叠加网络，使用Azimuth地址作为身份与路由。

            任何声誉系统都需要身份的稀缺性。数值稀缺性比实名规则更优美。所以Azimuth限于“4,294,967,296”个独立行星。

            Azimuth地址空间像家庭那样成长。8位星系（如“~hal”）可以发行有能力发行32位行星（“~laptel-holfur”）的16位恒星“~sogtyv”。每一个这样的地址称为Azimuth**点**。
            ;div.row.mb-3
              ;div.col-sm-4.text-mono
                ;ul.list-reset
                  ;li.red.text-600: 1个星系
                  ;li.blue.text-600: 1颗恒星
                  ;li.green.text-600: 1颗行星
                ==
              ==
              ;div.col-sm-8.text-mono
                ;ul.list-reset
                  ;li.blue.text-600
                    ;span: = ~2
                    ;sup.mr-1: 8
                    ;span: 颗恒星
                  ==
                  ;li.green.text-600
                    ;span: = ~2
                    ;sup.mr-1: 16
                    ;span: 颗行星
                  ==
                  ;li.gray.text-600
                    ;span: = ~2
                    ;sup.mr-1: 32
                    ;span: 颗卫星
                  ==
                ==
              ==
            ==
            恒星与行星可以通过变更担保方自我解除约束，所以你永远不会被困住。卫星为设备而生，所以它们无法脱离他们的行星。（我们不希望一堆联网的灯泡四处游荡形成机器人网络，对吧？）

            大致想法是，你需要**某人**担保你在网络上的成员身份。一个无法找到担保方的地址很可能是个机器人或是个垃圾邮件发送者。在Arvo网络中，上一级提供点对点路由与分发软件升级。Azimuth中的担保是个非常简单的声誉系统。刚好足够决定向谁导向数据包并且易于在此基础上做构建。

            治理由星系完成。星系形成一个通过多数原则投票机制可对以太坊上土地注册逻辑升级的参议院。

            Azimuth基于使Arvo成为安全、友好的网络而设计。一旦正确实现，谁会想用传统互联网？
          ==
          ;div.col-sm-12.col-md-3.col-md-offset-1
            ;div.row
              ;div.col-sm-5.col-md-12
                ;img@"/images/galaxies.svg";
                ;div.mt-4.mb-12
                  ;p.mb-0.pb-0.text-mono.text-600
                    ;span: 2
                    ;sup: 8
                  ==
                  ;p.mb-0.pb-0.text-mono.text-600: 256
                  ;p.mb-0.pb-0.red.text-600: 星系
                ==
              ==
              ;div.col-sm-5.col-sm-offset-2.col-md-12.col-md-offset-0
                ;img@"/images/stars.svg";
                ;div.mt-4.mb-12
                  ;p.mb-0.pb-0.text-mono.text-600
                    ;span: 2
                    ;sup: 16
                  ==
                  ;p.mb-0.pb-0.text-mono.text-600: 65,280
                  ;p.mb-0.pb-0.blue.text-600: 恒星
                ==
              ==
              ;div.col-sm-5.col-md-12
                ;img@"/images/planets.svg";
                ;div.mt-4.mb-12
                  ;p.mb-0.pb-0.text-mono.text-600
                    ;span: 2
                    ;sup: 32
                  ==
                  ;p.mb-0.pb-0.text-mono.text-600: 4,294,902,016
                  ;p.mb-0.pb-0.green.text-600: 行星
                ==
              ==
            ==
          ==
        ==
      ==
    ==
    :: History
    ;div.bg-gray
      ;div#history.container.pt-40
        ;div.row
          ;div.col-sm-12
            ;div.row.sm-h2.h1.h1-large.h-font
              ;span.col-sm-1.col-md-1.col-md-offset-1.center.dlig: (4)
              ;span.col-sm-10.col-sm-offset-1.col-md-8.col-md-offset-0: 沿革
            ==
          ==
        ==
      ==
      ;div.container
        ;div.row.mb-20
          ;div.col-md-8.col-md-offset-2.p--intro
            ;p
              一开始，一个新平台依托想象、独立与时间。最后，它立于忙乱、组织与金钱。
            ==
          ==
        ==
        ;div.row.mb-10
          ;div.col-sm-2.col-md-1.text-mono.text-700.center: ~2002
          ;div.col-sm-2.col-md-1.center
            ;div.circle.circle-sm.mt-2.shape-red;
          ==
          ;div.col-sm-8.col-md-5
            ;p.text-lg.text-600: Curtis下到他的车库去重塑计算。或是一些事物。
          ==
        ==
        ;div.row.mb-10
          ;div.col-sm-2.col-md-1.text-mono.text-700.center: ~2008
          ;div.col-sm-2.col-md-1.center
            ;div.circle.circle-sm.mt-1.shape-red;
          ==
          ;div.col-sm-8.col-md-3
            Nock正常工作。一共32行代码，差不多每两个月一行代码。
          ==
          ;div.col-sm-2.col-sm-offset-2.col-md-1.col-md-offset-0.center
            ;div.circle.circle-sm.mt-1.square-green;
          ==
          ;div.col-sm-8.col-md-4
            虽然Nock很酷，它还需要一个编程语言。Hoon的工作开始了。
          ==
        ==
        ;div.row.mb-10
          ;div.col-sm-2.col-md-1.text-mono.text-700.center: ~2012
          ;div.col-sm-2.col-md-1.center
            ;div.circle.circle-sm.mt-1.square-green;
          ==
          ;div.col-sm-8.col-md-3
              Hoon工作得很不错。写Hoon比写Nock容易多了。
          ==
          ;div.col-sm-2.col-sm-offset-2.col-md-1.col-md-offset-0.center
            ;div.circle.circle-sm.mt-1.square-orange;
          ==
          ;div.col-sm-8.col-md-4
            一个编程语言本身能用来干什么？不太多。Arvo的工作开始了。
          ==
        ==
        ;div.row.mb-10
          ;div.col-sm-2.col-md-1.text-mono.text-700.center: ~2013
          ;div.col-sm-2.col-md-1.center
            ;div.circle.circle-sm.mt-1.square-orange;
          ==
          ;div.col-sm-8.col-md-3
              Arvo可以启动并且能做些小把戏。
          ==
        ==
        ;div.row.mb-10.sm-wrap-reverse
          ;div.col-sm-2.col-md-1.text-mono.text-700.center: ~2013
          ;div.col-sm-2.col-md-1.center
            ;div.circle.circle-sm.mt-2.square-blue;
          ==
          ;div.col-sm-8.col-md-5
            ;p.text-lg.text-600: 首个即时Urbit测试网由命令行聊天开始了。
          ==
          ;div.col-md-2.col-md-offset-1.sm-center.sm-mb-10
            ;img@"/images/sticker-1.svg"(alt "11年后");
          ==
        ==

        ;div.row.mb-10
          ;div.col-sm-2.col-md-1.text-mono.text-700.center: ~2014
          ;div.col-sm-2.col-md-1.center
            ;div.circle.circle-sm.mt-1.square-blue;
          ==
          ;div.col-sm-8.col-md-3
            Tlon作为Urbit的公司化存在而设立。
          ==
        ==
        ;div.row.mb-10
          ;div.col-sm-2.col-md-1.text-mono.text-700.center: ~2014
          ;div.col-sm-2.col-md-1.center
            ;div.circle.circle-sm.mt-1.square-blue;
          ==
          ;div.col-sm-8.col-md-3
              Urbit作为其自己网站和聊天服务的服务器了。
          ==
        ==

        ;div.row.mb-10
          ;div.col-sm-2.col-md-1.text-mono.text-700.center: ~2014.5
          ;div.col-sm-2.col-md-1.center
            ;div.circle.circle-sm.mt-2.square-blue;
          ==
          ;div.col-sm-8.col-md-5
            ;p.text-lg.text-600: 首次公开发售Urbit地址空间。于4小时内售罄。
          ==
        ==
        ;div.row.mb-10
          ;div.col-sm-2.col-md-1.text-mono.text-700.center: ~2017.5
          ;div.col-sm-2.col-md-1.center
            ;div.circle.circle-sm.mt-1.square-blue;
          ==
          ;div.col-sm-8.col-md-3
              我们的测试网在无重启下连续运行了10个月。
          ==
        ==
        ;div.row.mb-10.sm-wrap-reverse
          ;div.col-sm-2.col-md-1.text-mono.text-700.center: ~2017.6
          ;div.col-sm-2.col-md-1.center
            ;div.circle.circle-sm.mt-2.square-blue;
          ==
          ;div.col-sm-8.col-md-5
            ;p.text-lg.text-600: 我们的私密发售于6小时内售罄 - 每个人可以购买两个恒星。
          ==
        ==
        ;div.row.mb-10
          ;div.col-sm-2.col-md-1.text-mono.text-700.center: ~2017.7+
          ;div.col-sm-2.col-md-1.center
            ;div.circle.circle-sm.mt-1.shape-blue;
          ==
          ;div.col-sm-8.col-md-3
              开始开发新版本的网络、前台、启动序列、秘密存储、Arvo内核及Hoon语言。
          ==
          ;div.col-sm-2.col-md-1.text-mono.text-700.center: ~2017.11
          ;div.col-sm-2.col-md-1.center
            ;div.circle.circle-sm.mt-1.shape-blue;
          ==
          ;div.col-sm-8.col-md-3
              向以太坊的大迁徙开始。
          ==
        ==
        ;div.row.mb-10
          ;div.col-sm-2.col-md-1.text-mono.text-700.center: ~2018.6+
          ;div.col-sm-2.col-md-1.center
            ;div.circle.circle-sm.mt-1.shape-blue;
          ==
          ;div.col-sm-8.col-md-3
              Landscape细致地开始了、钱包设计、Bridge和Ford被重写。
          ==
          ;div.col-sm-2.col-md-1.text-mono.text-700.center: ~2018.10
          ;div.col-sm-2.col-md-1.center
            ;div.circle.circle-sm.mt-1.shape-blue;
          ==
          ;div.col-sm-8.col-md-3
              在Tlon向大家演示了Landscape。
          ==
        ==
        ;div.row.sm-wrap-reverse
          ;div.col-sm-2.col-md-1.text-mono.text-700.center: ~2019.1
          ;div.col-sm-2.col-md-1.center
            ;div.circle.circle-sm.mt-2.square-blue;
          ==
          ;div.col-sm-8.col-md-5
            ;p.text-lg.text-600: Azimuth在以太坊上运行中、Bridge和钱包生成器在运行中。Landscape在内测中。
          ==
        ==
      ==
    ==
    ;div.bg-gray
      ;div#azimuth-distribution.container.pt-40.mb-10
        ;div.row
          ;div.col-md-12
            ;div.row.sm-h2.h1.h1-large.h-font
              ;span.col-sm-1.col-md-1.col-md-offset-1.center.dlig: (5)
              ;span.col-sm-10.col-sm-offset-1.col-md-8.col-md-offset-0: Azimuth分布
            ==
          ==
        == :: /row
      == :: /adress space
      ;div.container
        ;div.row.mb-30
          ;div.col-md-8.col-md-offset-2.p--intro
            Azimuth，作为Urbit的地址空间，是数字资产。资产是现实而不是价值判断。拥有即是拥有。

            起初，其中的大多数是无偿给出的。类似于比特币，获得星系曾经很容易。2010年，在Nock里编写decrement就可以得到一个星系。

            2013年，我们设立了Tlon作为Urbit开发的载体。Tlon以现在值仅仅几个比特币的价格购买了一半的地址空间。不久之后，我们创建了“urbit.org” - 一个64星系的池子以为Urbit的基础设施开发提供资金。Tlon留任为urbit.org关联星系的守护者。

            我们始终希望地址空间得以广泛分布。当Urbit变得越来越有用，它会自然而然地发生。

            在Azimuth启动于以太坊之时（“约2019年一月”），恒星的分布如下：
          ==
        == :: /row
        ;div.row.pb-20
          ;div.col-md-4.col-md-offset-1.sm-mb-10
            ;img@"/images/business.svg";
          ==
          ;div.col-md-6.col-md-offset-1
            ;div.row.mb-6
              ;div.col-sm-5.col-md-12.mb-5
                ;div.row.items-center
                  ;div.col-sm-1.col-md-2.center
                    ;div.circle.circle-sm.shape-red;
                  ==
                  ;div.col-md-4.text-700: Tlon
                  ;div.col-md-2.text-mono: 26.75%
                == ::/row table value
              == :: /col-sm-5
              ;div.col-sm-5.col-sm-offset-1.col-md-12.col-md-offset-0.mb-5
                ;div.row.items-center
                  ;div.col-sm-1.col-md-2.center
                    ;div.circle.circle-sm.shape-blue;
                  ==
                  ;div.col-md-4.text-700: urbit.org
                  ;div.col-md-2.text-mono: 15.63%
                == :: /row
              ==  ::// col-sm-5
              ;div.col-sm-5.col-md-12.mb-5
                ;div.row.items-center
                  ;div.col-sm-1.col-md-2.center
                    ;div.circle.circle-sm.shape-blue-light;
                  ==
                  ;div.col-md-4.text-700: 贡献者 + 支持者
                  ;div.col-md-2.text-mono: 17.57%
                == ::/row
              == ::/ col-sm-5
              ;div.col-sm-5.col-sm-offset-1.col-md-12.col-md-offset-0.mb-5
                ;div.row.items-center
                  ;div.col-sm-1.col-md-2.center
                    ;div.circle.circle-sm.shape-orange;
                  ==
                  ;div.col-md-4.text-700: 创始人 + Tlon雇员
                  ;div.col-md-2.text-mono: 15.23%
                == :: /row
              ==  ::// col-sm-5
              ;div.col-sm-5.col-md-12.mb-5
                ;div.row.items-center
                  ;div.col-sm-1.col-md-2.center
                    ;div.circle.circle-sm.shape-green;
                  ==
                  ;div.col-md-3.text-700: Tlon投资方
                  ;div.col-md-2.col-md-offset-1.text-mono: 13.28%
                == ::/row
              == ::/ col-sm-5
              ;div.col-sm-5.col-sm-offset-1.col-md-offset-0.col-md-12.mb-5
                ;div.row.items-center
                  ;div.col-sm-1.col-md-2.center
                    ;div.circle.circle-sm.shape-black;
                  ==
                  ;div.col-md-3.text-700: 2018星系买家
                  ;div.col-md-2.col-md-offset-1.text-mono: 8.39%
                == ::/row
              == ::/ col-sm-5
              ;div.col-sm-5.col-md-12.mb-5
                ;div.row.items-center
                  ;div.col-sm-1.col-md-2.center
                    ;div.circle.circle-sm.shape-gray-dark;
                  ==
                  ;div.col-md-3.text-700: 2016 + 2017恒星买家
                  ;div.col-md-2.col-md-offset-1.text-mono: 3.13%
                == ::/row
              == ::/ col-sm-5
            == :: /row parent
          ==
        ==
        ;div.row.pb-20
          ;div.col-md-4.col-md-offset-1
            ;h1.h1-large.gray.text-mono.text-700: >1,000
            ;p.text-600: 恒星与星系所有者
          ==
          ;div.col-md-4.col-md-offset-1
            ;h1.h1-large.blue.text-mono.text-700: ~19%
            ;p.text-600: 通过urbit.org为开源开发提供资金而专设的部分在网络中的百分比。
          ==
        == :: /row 3-up
      == :: /container
      ;div.container.pv-20
        ;div.row
          ;div.col-md-8.col-md-offset-2.mb-12
            ;h1: Azimuth解锁
          ==
          ;div.col-md-8.col-md-offset-2.mb-24.p--intro
            ;p: 为避免网络暴增，Azimuth为恒星内建“解锁”功能。星系仍然可转让，但它们的恒星逐渐解锁。
            ;p: 每棵恒星同时在6年中逐渐解锁发放行星的功能。首年1024颗，之后逐年加倍。
            ;p: 前两次恒星发售（2016 + 2017）的买家与自2015年开始的私密买家所持有的恒星直接全部解锁。
            ;p: 自2018开始的星系买家所持有的恒星在1或3年中逐渐解锁。
            ;p: urbit.org在2年中线性逐渐解锁。
            ;p: 创始人、早期雇员 + 贡献者、支持者、奖励获得者和Tlon及其投资方的锁定期限是1年，其后在4年中线性解锁。
          ==
        ==
        ;div.flex.mb-6
          ;div.col-md-2;
          ;div.flex.flex-column.items-center.col-sm-2
            ;p.text-mono: 2019
            ;div.bl-1.h-4.border-gray-dark;
          ==
          ;div.flex.flex-column.items-center.col-sm-2
            ;p.text-mono: 2020
            ;div.bl-1.h-4.border-gray-dark;
          ==
          ;div.flex.flex-column.items-center.col-sm-2
            ;p.text-mono: 2021
            ;div.bl-1.h-4.border-gray-dark;
          ==
          ;div.flex.flex-column.items-center.col-sm-2
            ;p.text-mono: 2022
            ;div.bl-1.h-4.border-gray-dark;
          ==
          ;div.flex.flex-column.items-center.col-sm-2.col-md-1
            ;p.text-mono: 2023
            ;div.bl-1.h-4.border-gray-dark;
          ==
          ;div.flex.flex-column.items-end.col-sm-2.col-md-1
            ;p.text-mono.right: 2024
            ;div.br-1.h-4.border-gray-dark;
          ==
        ==
        ;div.flex.mb-6.items-center
          ;div.col-md-2
            ;div.mb-0.text-sm.text-600: 2017 / 2018恒星发售、2015 - 2017私密买家
          ==
          ;div.col-sm-1
            ;div.h-32.bg-blue;
          ==
        ==
        ;div.flex.mb-6.items-center
          ;div.col-md-2
            ;div.mb-0.text-sm.text-600: urbit.org + urbit.org奖励获得者
          ==
          ;div.col-sm-5
            ;div.h-32.bg-blue;
          ==
        ==
        ;div.flex.mb-6.items-center
          ;div.col-md-2
            ;div.mb-0.text-sm.text-600: 2018星系买家
          ==
          ;div.col-sm-7
            ;div.h-32.bg-blue;
          ==
        ==
        ;div.flex.mb-6.items-center
          ;div.col-md-2
            ;div.mb-0.text-sm.text-600: 创始人 + 早期雇员、 贡献者 + 支持者、 Tlon + Tlon投资方
          ==
          ;div.col-sm-2.col-md-3
            ;div.h-32.bg-blue-light;
          ==
          ;div.col-sm-10.col-md-7
            ;div.ml-2.h-32.bg-blue;
          ==
        ==
      ==
    == ::/bg-gray
    ;div
      ;img@"/images/aegean-1.png"(style "width:100%; object-fit: cover");
    ==
    ;footer.container
      ;div.row.mt-36.mb-6
        ;div.col-sm-10.col-sm-offset-1(id "mc_embed_signup")
          ;h1.mb-2: Updates
          Every month we send an email with community events and what we're up to.
          ;form(id "mc-embedded-subscribe-form", class "validate", action "https://urbit.us11.list-manage.com/subscribe/post?u=972a03db9e0c6c25bb58de8c8&amp;id=be143888d2", method "post", name "mc-embedded-subscribe-form", target "_blank")
            ;div.input-group.text-mono(id "mc_embed_signup_scroll")
              ;div.mc-field-group
                ;input.required.mb-2(type "email", name "EMAIL", id "mce-EMAIL", placeholder "your@email.com");
              ==
              ;div#mce-responses.clear
                ;div#mce-error-response.response(style "display:none");
                ;div#mce-success-response.response(style "display:none");
              ==
              ;div(style "position: absolute; left: -5000px;")
                ;input(type "text", name "b_972a03db9e0c6c25bb58de8c8_be143888d2");
              ==
              ;div.clear
                ;button#mc-embedded-subscribe.bg-black.white.h-font(type "submit", name "subscribe")
                  ;span.text-500: Subscribe
                ==
              ==
            ==
          ==
        ==
      ==
      ;div.row.pb-20
        ;div.col-sm-10.col-md-3.col-sm-offset-1
          ;div.mb-6
            ;h4.mb-1: Follow
            ;div
              ;a.text-mono/"https://twitter.com/@urbit"(target "_blank"): twitter.com/@urbit
            ==
            ;div
              ;a.text-mono/"https://github.com/urbit"(target "_blank"): github.com/@urbit
            ==
          ==
        ==
        ;div.col-sm-10.col-md-3.col-sm-offset-1
          ;div.mb-6
            ;h4.mb-1: Contact
            ;div.text-mono.text-400: ~zod
            ;div
              ;a.text-mono/"mailto:urbit@urbit.org": support@urbit.org
            ==
          ==
        ==
        ;div.col-sm-10.col-md-3.col-sm-offset-1
          ;div.mb-6
            ;h4.mb-1: Company
            ;div
              ;a/"/privacy": Privacy Policy
            ==
            ;div
              ;a/"/tos": Terms of Service
            ==
            ;div
              ;a/"/bounty": Bug bounty + security
            ==
          ==
        ==
      ==

    ==
    ==
    ;script@"https://code.jquery.com/jquery-3.3.1.slim.min.js";
    ;script@"/js/main.js";
    ;script@"/js/primer.js";
  == ::/body
== ::/html
