/=  head  /partials-head/
/=  menu  /partials-menu/
/=  article  /partials-article/
/=  footer-contact   /partials-footer-contact/
/=  footer-signup   /partials-footer-signup/
;html(lang "en")
  ;+  (head "Urbit / Primer")
  ;link/"/css/primer.css"(rel "stylesheet");
  ;body
    ;div.bg-black.pt-30.mb-30
      ;div.container.white
        ;div.row
          ;div.col-sm-12.col-md-8.col-md-offset-2
            ;div.mb-20
              ;h1.h1-large: It's 2019. You're still just a row in someone's database.
            ==
            ;div.mb-20
              ;img.col-sm-12@"/images/megacorp.svg";
            ==
            ;div.p--intro.pb-30
              ;>
              Your digital life is spread across all kinds of accounts, apps and services.

              Every one of them does only one thing and is controlled by someone else. They work great, but they're really just big, dystopian toys.

              The limits of these fake, single-purpose computers are clear. People deserve better.

              Your Urbit is a personal cloud server. A simple, private, general-purpose virtual computer on an encrypted P2P network.

              Your Urbit is your digital passport, your digital vault, and your digital assistant. You own it on Ethereum – no one controls it but you.
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
                ;p.mb-4: Today, you have two bad options for cloud computing: run your own Unix server or join a bunch of apps and services.
                ;p.mb-4: We aren't going to take this deal. We don't want to be system administrators and we don't want to be ruled by some MEGACORP.
                ;p.mb-4: So we built a new platform. A clean-slate stack simple enough that ordinary people can run their own servers.
                ;p.mb-4: Urbit is a stack of three layers: Azimuth, Arvo and Aegean. Each layer could be used as a product on its own, and they're all open source.
              ==
            ==
          ==
        ==
        ;div.row.mb-20
          ;div.col-md-3.col-md-offset-0
            ;img.col-sm-12@"/images/azimuth.svg";
            ;h3.mb-4: Azimuth
            ;p: is virtual land on Ethereum. An Azimuth point is a secure digital identity and network address.
          ==
          ;div.col-md-3.col-md-offset-1
            ;img.col-sm-12@"/images/arvo-complete.svg";
            ;h3.mb-4: Arvo
            ;p: is a clean-slate OS and P2P network. An Arvo server uses an Azimuth point as its name and address.
          ==
          ;div.col-md-3.col-md-offset-1
            ;img.col-sm-12@"/images/aegean.svg";
            ;h3.mb-4: Aegean
            ;p: is a pattern of independent, decentralized societies on top of the Arvo network.
          ==
        ==
        ;div.col-md-8.col-md-offset-2.mb-40
          ;div.p--intro
            ;p.mb-4: Urbit is still young. It's not quite ready for everyone. Great system software takes a long time to grow.
            ;p.mb-4: But Urbit isn't a dream. It's real. It's a running, stable network. And once you find your way in, there's a lot to explore.
            ;p.mb-4: Urbit is the last platform. The personal-computing revolution hasn't even happened yet.
          ==
        ==
      == ::/container

      ;div.pt-70.pb-70.bg-blue
        ;div.container
          ;div.row.mb-8
            ;div.col-md-9.col-md-offset-1.mb-10
              ;h1.h1-large.white: Table of Contents
            ==
          ==
          ;div.row.mb-8
            ;div.col-md-12
              ;a.row.sm-h2.h1.h1-large.h-font.white.text-decoration-none/"#what-urbit-is-for"
                ;div.col-sm-1.col-md-1.col-md-offset-1.center.dlig: (1)
                ;div.col-sm-10.col-sm-offset-1.col-md-8.col-md-offset-0.underline.underline--skip: Aegean: What Urbit is For
              ==
            ==
          ==
          ;div.row.mb-8
            ;div.col-md-12
              ;a.row.sm-h2.h1.h1-large.h-font.white.text-decoration-none/"#what-arvo-is"
                ;div.col-sm-1.col-md-1.col-md-offset-1.center.dlig: (2)
                ;div.col-sm-10.col-sm-offset-1.col-md-8.col-md-offset-0.underline.underline--skip: Arvo: What Urbit is
              ==
            ==
          ==
          ;div.row.mb-8
            ;div.col-md-12
              ;a.row.sm-h2.h1.h1-large.h-font.white.text-decoration-none/"#what-azimuth-is"
                ;div.col-sm-1.col-md-1.col-md-offset-1.center.dlig: (3)
                ;div.col-sm-10.col-sm-offset-1.col-md-8.col-md-offset-0.underline.underline--skip: Azimuth: What Urbit is
              ==
            ==
          ==
          ;div.row.mb-8
            ;div.col-md-12
              ;a.row.sm-h2.h1.h1-large.h-font.white.text-decoration-none/"#history"
                ;div.col-sm-1.col-md-1.col-md-offset-1.center.dlig: (4)
                ;div.col-sm-10.col-sm-offset-1.col-md-8.col-md-offset-0.underline.underline--skip: History
              ==
            ==
          ==
          ;div.row.mb-8
            ;div.col-md-12
              ;a.row.sm-h2.h1.h1-large.h-font.white.text-decoration-none/"#azimuth-distribution"
                ;div.col-sm-1.col-md-1.col-md-offset-1.center.dlig: (5)
                ;div.col-sm-10.col-sm-offset-1.col-md-8.col-md-offset-0.underline.underline--skip: Azimuth distribution
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
                  ;div.col-sm-10.col-sm-offset-1.col-md-8.col-md-offset-0.underline.underline--skip: Aegean: What Urbit is For
                ==
              ==
            ==
            ;div.row.mb-8
              ;div.col-md-10.col-md-offset-1
                ;a.row.h2.h-font.white.text-decoration-none/"#what-arvo-is"
                  ;div.col-sm-1.col-md-1.col-md-offset-1.center.dlig: (2)
                  ;div.col-sm-10.col-sm-offset-1.col-md-8.col-md-offset-0.underline.underline--skip: Arvo: What Urbit is
                ==
              ==
            ==
            ;div.row.mb-8
              ;div.col-md-10.col-md-offset-1
                ;a.row.h2.h-font.white.text-decoration-none/"#what-azimuth-is"
                  ;div.col-sm-1.col-md-1.col-md-offset-1.center.dlig: (3)
                  ;div.col-sm-10.col-sm-offset-1.col-md-8.col-md-offset-0.underline.underline--skip: Azimuth: What Urbit is
                ==
              ==
            ==
            ;div.row.mb-8
              ;div.col-md-10.col-md-offset-1
                ;a.row.h2.h-font.white.text-decoration-none/"#history"
                  ;div.col-sm-1.col-md-1.col-md-offset-1.center.dlig: (4)
                  ;div.col-sm-10.col-sm-offset-1.col-md-8.col-md-offset-0.underline.underline--skip: History
                ==
              ==
            ==
            ;div.row.mb-8
              ;div.col-md-10.col-md-offset-1
                ;a.row.h2.h-font.white.text-decoration-none/"#azimuth-distribution"
                  ;div.col-sm-1.col-md-1.col-md-offset-1.center.dlig: (5)
                  ;div.col-sm-10.col-sm-offset-1.col-md-8.col-md-offset-0.underline.underline--skip: Azimuth distribution
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
            ;div.col-sm-10.col-sm-offset-1.col-md-8.col-md-offset-0: Aegean: What Urbit is For
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
            Today MEGACORP runs our cloud software, decides how to update it and stores our data. What will the world look like when people can run their own servers?

            In the real world, different cultures and societies coexist on top of neutral physical infrastructure. Different people, communities and cultures share the same roads and electrical grid.

            In the cloud, it's as if we spend our lives in hotels.

            Aegean is a pattern for building _cities_. A city is a group of people running the same _agent_, a kind of program, on their Arvo servers.

            A city is not an 'app' designed for one thing. A city is a combination of tools for a community. Each city is independent and self-governing. Cities control their own interfaces and update their own code over the air.

            We've started a few cities already, and we'll talk a bit about what we see on the horizon. What we can imagine is only the beginning.

            One thing we know for sure: the future isn't a single monoculture. All of humanity doesn't want to live in the same city. Most people live in many and move comfortably between them.

            We see a vast archipelago of hypercultures. A centerless network of networks on top of the neutral Arvo and Azimuth infrastructure.
          ==
        ==
      ==
    ==
    :: S2 - Archipelago
    ;div.container
      ;div.row
        ;div.col-md-8.col-md-offset-2
          ;h1.center.mb-20: Homesteading this new continent
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
          As a community building a new platform we need to chat and engage in longform discussion. Separate platforms with separate logins and bloated interfaces are a drag to use.

          So we built an agent to work just for us. It's called Landscape, and we've used it to start a few invite-only cities.

          These cities are sort of like colonies on a new continent. They're rough. They aren't ready for everyone. They aren't secure yet, they won't last forever. But we already like them better than the alternative.

          And we can already see what it will look like to let others start homesteading with us. Living on a platform where your community is in control is a whole new world.

          We're excited to not only welcome other communities, but to extend the flexiblity of our agents. To experiment with what's possible.

          Location data, heart rate, nutrition and note taking between members of an expedition, for example. Anonymized genetic data, visualization tools and documents for a group of researchers. There's so much to explore.
        ==
      ==
    ==
    ;div.container.mb-30
      ;div.row.align-vertical
        ;div.col-md-5
          ;h1.mb-10: The blockchain is an I/O device
          ;div
            ;div.md-hide.mb-4
              ;img@"/images/offchain.svg";
            ==
            The blockchain was supposed to make the financial system open to anyone. But we're still stuck on MEGACORP exchanges or using flimsy 'dapps' in our browser.

            A city of traders on Urbit could easily relay orders to one another and send signed transactions directly to the chain from a single agent. That's what you get for free with a fast, deterministic computer on a secure authenticated network.

            And why not go a step further? Let your Arvo server run your trading algorithms or participate in prediction markets. Today's 'dapps' don't have access to persistent state and their UI is limited. Worse, they can't communicate with one another.

            Blockchains are so much more useful when connected to a secure personal server. Consensus computation can be much more than just trading coins.
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
            ;h1.mb-10: Your private city of robots
          ==
        ==
        ;div.col-md-6.col-md-offset-3
          ;img@"/images/iot.svg";
        ==
        ;div.col-md-8.col-md-offset-2
          ;>
            The 'internet of things' is a mess. Some of the 'things' are pretty nice pieces of hardware. But they all require that I use some MEGACORP service. Why can't I just talk directly to my own thermostat?
        ==
        ;div.col-md-8.col-md-offset-2
            ;p
              ;span: Your Azimuth identity, or
              ;i.ml-1: planet
              ;span: , can launch 2
              ;sup.mr-1: 32
              ;span: (4 billion) child identities, or
              ;i.ml-1: moons
              ;span: . That should be enough for your lights, your fridge, your 3D printer, and your swarm of farm robots. Own a factory? Sure, that too.
            ==
            ;p
              Once they run Arvo servers, your devices can all run the same agent and join your own private city. Taking control of your robot army is simple once they share the same computing platform.
            ==
        ==
      ==
    ==
    ;div.container.mb-30
      ;div.row.align-vertical
        ;div.col-md-6
          ;div.mb-10
            ;h1: The archive of your life
            ;div.center.sm-mt-10.sm-mb-10.md-hide
              ;img.col-md-6@"/images/face.svg";
            ==
          ==
          ;div
            Your human record needs to be safe in the cloud. The technology works. MEGACORP is always the weak link. No corporation can promise to live forever — or care forever.

            That's why your Arvo server is the right place to store all the data you want to keep — every message you've ever sent, every photo you've taken, even your financial and medical records. Your personal server maintains an archive, a permanent, trusted place to keep your digital life.

            Once your data is safe on your personal server, the way you managed it now will seem scary and backward.
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
            ;div.col-sm-10.col-sm-offset-1.col-md-8.col-md-offset-0: Arvo: What Urbit is
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
                  ;h4.text-md: One file
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
                  ;h4.text-md: Your passcode
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
                  ;h4.text-md: A program
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
            Your personal server, called a ship, is stored as a log of the events it's received, encrypted with a passcode. To start your ship, open your event log file with the Arvo program and type in your passcode. To stop it, just close the program; the event log will wait patiently for next boot.

            To use the Arvo network each ship must have an Azimuth name, or _point_. You own your point on Ethereum. It's a short, pronouncable name like `~laptel-nilfur` or `~doplyx-halsev` (the '~' is silent). Other ships use your Azimuth point to find and talk to your ship, no matter where it is in the world.

            Most people park their ship in the cloud. If you prefer to host yourself, your ship can live on a laptop, a phone, even a USB stick. It's just a file. It doesn't have to be on all the time. Just don't lose it.

            Wherever your ship is, just log on at `urbit.org` with your name and passcode — like a normal web account.

            You operate your ship through a web UI and/or a local console. You can sync the current version its files with your local computer. (Arvo remembers every version, forever.) Your ship can also host its own webpages and interact with existing webservices on your behalf.

            Your ship is designed to need no maintenance at all. Upgrades come in over the network. It never gets old or out of date. Leave one off for a century, then turn it on — it might take a week, but it will automatically upgrade itself to 2119.
          ==
      ==
      ;div.row
        ;div.col-md-12.center
          ;h1.mb-10.mt-10: Okay nerds, here's a quick technical overview
        ==
      ==
      ;div.row.sm-wrap-reverse.mb-20
        ;div.col-md-5
          ;>
            Arvo is a general-purpose computer that runs as a virtual machine. You can think of it as an overlay OS; it treats Unix the way Unix treats the BIOS.

            Its behavior is completely defined by a frozen transition function called Nock that goes from `[event, current-state]` to `[effects, next-state]`. An event might be a keypress, an HTTP request, or a UDP message from another Arvo. An effect might be a command to the Unix terminal, an HTTP response, or another UDP message to another Arvo.

            Arvo consists of the following stack of components, from the bottom up.

            Vere, our interpreter, written in C, is a transactional I/O processor over libuv, which stores its state as a persistent event log and/or memory checkpoint. Vere interprets Nock.

            Nock, our machine language, is like a pico-Lisp with no symbols. It's a homoiconic purely functional machine code with 12 opcodes and one universal datatype, the noun: an acyclic binary tree that is either a number (which can also represent an arbitrarily large bytestream) or a cell, which is a pair of nouns.

            Hoon is a purely functional, statically typed, strictly evaluated programming language that compiles to Nock.

            The Arvo kernel is a functional, nonpreemptive, general-purpose OS written in 1000 lines of Hoon.

            Our stack is weird. But you'll get used to it. The whole thing is open source under the MIT license – [take a look](https://github.com/urbit/urbit).
          ==
        ;div.col-md-5.col-md-offset-1.sm-mb-10.stack-apart.animate-false
          ;svg(xmlns "http://www.w3.org/2000/svg", viewbox "0 0 512 760")
            ;g.text.h-font
              ;g.nock-label
                ;text.text-lg.text-600(x "296", y "116"): Nock
                ;text.text-lg(x "296", y "144"): Virtual machine
                ;rect(x "296", y "80", fill "#EE3124", width "10", height "10");
              ==
              ;g.hoon-label
                ;text.text-lg.text-600(x "296", y "349"): Hoon
                ;text.text-lg(x "296", y "378"): Programming
                ;text.text-lg(x "296", y "402"): language
              ==
              ;rect(x "296", y "313", fill "#4fe89c", width "10", height "10");
              ;g.arvo-label
                ;text.text-lg.text-600(x "296", y "645"): Arvo
                ;text.text-lg(x "296", y "674"): Operating system
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
              ;li.text-600.mb-0: Arvo kernel
              ;li: Core OS and event manager
            ==
            ;div.col-sm-6.col-md-4
              ;ul.list-reset.h-font
                ;div.square.square-sm.square-gray.mb-2;
                ;li.text-600.mb-0: Ames
                ;li: Peer-to-peer network
              ==
            ==
            ;div.col-sm-6.col-md-4
              ;ul.list-reset.h-font
              ;div.square.square-sm.square-blue.mb-2;
              ;li.text-600.mb-0: Clay
              ;li.col-md-11: Global filesystem
              ==
            ==
            ;div.col-sm-6.col-md-4
              ;ul.list-reset.h-font
                ;div.square.square-sm.square-green-light.mb-2;
                ;li.text-600.mb-0: Ford
                ;li: Build system
              ==
            ==
            ;div.col-sm-6.col-md-4
              ;ul.list-reset.h-font
                ;div.square.square-sm.square-cyan.mb-2;
                ;li.text-600.mb-0: Gall
                ;li: Application sandbox
              ==
            ==
            ;div.col-sm-6.col-md-4
              ;ul.list-reset.h-font
                ;div.square.square-sm.square-navy.mb-2;
                ;li.text-600.mb-0: Jael
                ;li: Vault for secrets
              ==
            ==
            ;div.col-sm-6.col-md-4
              ;ul.list-reset.h-font
                ;div.square.square-sm.square-purple.mb-2;
                ;li.text-600.mb-0: Eyre
                ;li: Web server
              ==
            ==
            ;div.col-sm-6.col-md-4
              ;ul.list-reset.h-font
                ;div.square.square-sm.square-green.mb-2;
                ;li.text-600.mb-0: Landscape
                ;li: Chat and discussion agent
              ==
            ==
            ;div.col-sm-6.col-md-4
              ;ul.list-reset.h-font
                ;div.square.square-sm.square-orange-dark.mb-2;
                ;li.text-600.mb-0: API gateways
                ;li: To existing services
              ==
            ==
            ;div.col-sm-6.col-md-4
              ;ul.list-reset.h-font
                ;div.square.square-sm.square-orange-dark.mb-2;
                ;li.text-600.mb-0: Dill
                ;li: Terminal driver
              ==
            ==
          ==
        ==
      ==
      ;div.row
        ;div.col-md-8.col-md-offset-2
          ;>
          How do you embed a general-purpose computer into a function? You load programs and data into the state, which the transition function can update on each event.

          To boot a new ship, the first several events are run by the VM (named Vere, written in C) before your ship enters the network. These initial events load in a Hoon compiler, compile and install the Arvo kernel, initialize userland apps and files, and assign your Azimuth point and private keys as your ship's identity. Now your ship is ready to talk to the the world.

          The Arvo stack can push any update to any part of itself, except Nock and Vere.

          Let's walk through some of the components of the Arvo kernel. This is where it gets interesting.

          Ames, our network protocol is overlayed over UDP. Every message between ships is signed and end-to-end encrypted. Ames is message-oriented, CQRS, connectionless, data-centric, and transactional.

          Clay, our filesystem, is a reactive, _typed_, distributed revision-control store that defines an authenticated global immutable namespace.

          Ford, our functional build system, can auto-update a page in your browser when someone checks in a change to a math function in a back-end rendering library.

          With compiler, libraries, Arvo and modules, the whole OS is ~30,000 lines of code.

          Urbit is also a nontrivial list of other features and components. You can read more in our long, peculiar, mildly outdated [whitepaper](http://media.urbit.org/whitepaper.pdf). _Caveat lector_, it's a tad academic.

          Today, Urbit is a stable testnet. Urbit hosts its own site, forum, and federated chat. Its last unplanned breach (global hard fork) was in 2016.

          Urbit now has a practical clean-room Vere alternative, Jaque, built on Graal/Truffle. Jaque can boot a ship and join the network. It still has some stack issues.

          Urbit is not done. It needs optimization, documentation, a lot of polish and even a bit of architecture. But it certainly does work!
        ==
      ==
      ;div#what-azimuth-is.container.sm-pt-20.sm-pb-20.pt-40.pb-40
        ;div.row
          ;div.col-sm-12
            ;div.row.sm-h2.h1.h1-large.h-font
              ;div.col-sm-1.col-md-1.col-md-offset-1.center.dlig: (3)
              ;div.col-sm-10.col-sm-offset-1.col-md-8.col-md-offset-0: Azimuth: What Urbit is
            ==
          ==
        ==
      ==
       ;div.container
        ;div.row.sm-wrap-reverse.mb-16
          ;div.col-md-5.col-md-offset-1
            ;>
            If IP addresses were cryptographic property, the Internet could have funded its own development with its own address space.

            With clear ownership, IP addresses would develop clear reputations. Abusers would lose real money in reputation cost and the internet would be a friendly network.

            We can't fix IP. So we built a system of decentralized address space and called it Azimuth. Ames, the Arvo UDP overlay network, uses Azimuth addresses for identity and routing.

            Any reputation system needs scarcity of identity. Numerical scarcity is more elegant than a real-name policy. So Azimuth is limited to `4,294,967,296` independent planets.

            The Azimuth address space grows like a family. 8-bit galaxies (like `~hal`) can issue 16-bit stars `~sogtyv`, which issue 32-bit planets (`~laptel-holfur`). Each of these addresses is called an Azimuth _point_.
            ;div.row.mb-3
              ;div.col-sm-4.text-mono
                ;ul.list-reset
                  ;li.red.text-600: 1 Galaxy
                  ;li.blue.text-600: 1 Star
                  ;li.green.text-600: 1 Planet
                ==
              ==
              ;div.col-sm-8.text-mono
                ;ul.list-reset
                  ;li.blue.text-600
                    ;span: = ~2
                    ;sup.mr-1: 8
                    ;span: Stars
                  ==
                  ;li.green.text-600
                    ;span: = ~2
                    ;sup.mr-1: 16
                    ;span: Planets
                  ==
                  ;li.gray.text-600
                    ;span: = ~2
                    ;sup.mr-1: 32
                    ;span: Moons
                  ==
                ==
              ==
            ==
            Stars and planets can emancipate themselves by changing sponsors, so you're never trapped. Moons are meant for devices, so they can't escape from their planets. (We don't want a bunch of connected lightbulbs wandering around forming botnets, do we?)

            The basic idea is, you need _someone_ to sponsor your membership on the network. An address that can't find a sponsor is probably a bot or a spammer. In the Arvo network parents provide P2P routing and distribute software updates. Azimuth sponsorship is a very simple reputation system. Just enough to decide who to route packets to, and easy to build on top of.

            Governance is performed by the galaxies. The galaxies form a senate which updates the logic of the Ethereum land registry by majority vote.

            Azimuth is designed to make Arvo a safe, friendly network. Once that's true, who wants to keep using the Internet?
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
                  ;p.mb-0.pb-0.red.text-600: Galaxies
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
                  ;p.mb-0.pb-0.blue.text-600: Stars
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
                  ;p.mb-0.pb-0.green.text-600: Planets
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
              ;span.col-sm-10.col-sm-offset-1.col-md-8.col-md-offset-0: History
            ==
          ==
        ==
      ==
      ;div.container
        ;div.row.mb-20
          ;div.col-md-8.col-md-offset-2.p--intro
            ;p
              At the start, a new platform takes imagination, independence, and time. At the end, it takes hustle, organization, and money.
            ==
          ==
        ==
        ;div.row.mb-10
          ;div.col-sm-2.col-md-1.text-mono.text-700.center: ~2002
          ;div.col-sm-2.col-md-1.center
            ;div.circle.circle-sm.mt-2.shape-red;
          ==
          ;div.col-sm-8.col-md-5
            ;p.text-lg.text-600: Curtis goes down to his garage to reinvent computing. Or something.
          ==
        ==
        ;div.row.mb-10
          ;div.col-sm-2.col-md-1.text-mono.text-700.center: ~2008
          ;div.col-sm-2.col-md-1.center
            ;div.circle.circle-sm.mt-1.shape-red;
          ==
          ;div.col-sm-8.col-md-3
            Nock works. Coming in at 32 lines of code, that's about 1 line of code every two months.
          ==
          ;div.col-sm-2.col-sm-offset-2.col-md-1.col-md-offset-0.center
            ;div.circle.circle-sm.mt-1.square-green;
          ==
          ;div.col-sm-8.col-md-4
            While Nock is cool, it needs a language. Work on Hoon begins.
          ==
        ==
        ;div.row.mb-10
          ;div.col-sm-2.col-md-1.text-mono.text-700.center: ~2012
          ;div.col-sm-2.col-md-1.center
            ;div.circle.circle-sm.mt-1.square-green;
          ==
          ;div.col-sm-8.col-md-3
              Hoon works pretty well. It's much easier to write Hoon than Nock.
          ==
          ;div.col-sm-2.col-sm-offset-2.col-md-1.col-md-offset-0.center
            ;div.circle.circle-sm.mt-1.square-orange;
          ==
          ;div.col-sm-8.col-md-4
            But what do you do with a language on its own? Not much. Work on Arvo begins.
          ==
        ==
        ;div.row.mb-10
          ;div.col-sm-2.col-md-1.text-mono.text-700.center: ~2013
          ;div.col-sm-2.col-md-1.center
            ;div.circle.circle-sm.mt-1.square-orange;
          ==
          ;div.col-sm-8.col-md-3
              Arvo boots and can do a few tricks.
          ==
        ==
        ;div.row.mb-10.sm-wrap-reverse
          ;div.col-sm-2.col-md-1.text-mono.text-700.center: ~2013
          ;div.col-sm-2.col-md-1.center
            ;div.circle.circle-sm.mt-2.square-blue;
          ==
          ;div.col-sm-8.col-md-5
            ;p.text-lg.text-600: The first live Urbit test network is started with a command-line chat.
          ==
          ;div.col-md-2.col-md-offset-1.sm-center.sm-mb-10
            ;img@"/images/sticker-1.svg"(alt "11 years later");
          ==
        ==

        ;div.row.mb-10
          ;div.col-sm-2.col-md-1.text-mono.text-700.center: ~2014
          ;div.col-sm-2.col-md-1.center
            ;div.circle.circle-sm.mt-1.square-blue;
          ==
          ;div.col-sm-8.col-md-3
            Tlon is founded as the corporate vehicle for Urbit.
          ==
        ==
        ;div.row.mb-10
          ;div.col-sm-2.col-md-1.text-mono.text-700.center: ~2014
          ;div.col-sm-2.col-md-1.center
            ;div.circle.circle-sm.mt-1.square-blue;
          ==
          ;div.col-sm-8.col-md-3
              Urbit serves its own website and chat.
          ==
        ==

        ;div.row.mb-10
          ;div.col-sm-2.col-md-1.text-mono.text-700.center: ~2014.5
          ;div.col-sm-2.col-md-1.center
            ;div.circle.circle-sm.mt-2.square-blue;
          ==
          ;div.col-sm-8.col-md-5
            ;p.text-lg.text-600: The first public sale of Urbit address space. Finishes in four hours.
          ==
        ==
        ;div.row.mb-10
          ;div.col-sm-2.col-md-1.text-mono.text-700.center: ~2017.5
          ;div.col-sm-2.col-md-1.center
            ;div.circle.circle-sm.mt-1.square-blue;
          ==
          ;div.col-sm-8.col-md-3
              Our test network runs for ten months without a reboot.
          ==
        ==
        ;div.row.mb-10.sm-wrap-reverse
          ;div.col-sm-2.col-md-1.text-mono.text-700.center: ~2017.6
          ;div.col-sm-2.col-md-1.center
            ;div.circle.circle-sm.mt-2.square-blue;
          ==
          ;div.col-sm-8.col-md-5
            ;p.text-lg.text-600: Our private sale sells out in six hours — limit 2 per person.
          ==
        ==
        ;div.row.mb-10
          ;div.col-sm-2.col-md-1.text-mono.text-700.center: ~2017.7+
          ;div.col-sm-2.col-md-1.center
            ;div.circle.circle-sm.mt-1.shape-blue;
          ==
          ;div.col-sm-8.col-md-3
              Work on new versions of networking, frontend, boot sequence, secret storage, Arvo kernel, and Hoon language begins.
          ==
          ;div.col-sm-2.col-md-1.text-mono.text-700.center: ~2017.11
          ;div.col-sm-2.col-md-1.center
            ;div.circle.circle-sm.mt-1.shape-blue;
          ==
          ;div.col-sm-8.col-md-3
              The great migration to Ethereum starts.
          ==
        ==
        ;div.row.mb-10
          ;div.col-sm-2.col-md-1.text-mono.text-700.center: ~2018.6+
          ;div.col-sm-2.col-md-1.center
            ;div.circle.circle-sm.mt-1.shape-blue;
          ==
          ;div.col-sm-8.col-md-3
              Landscape begins in earnest, wallet design, Bridge, Ford is rewritten.
          ==
          ;div.col-sm-2.col-md-1.text-mono.text-700.center: ~2018.10
          ;div.col-sm-2.col-md-1.center
            ;div.circle.circle-sm.mt-1.shape-blue;
          ==
          ;div.col-sm-8.col-md-3
              Landscape is demoed to all of Tlon.
          ==
        ==
        ;div.row.sm-wrap-reverse
          ;div.col-sm-2.col-md-1.text-mono.text-700.center: ~2019.1
          ;div.col-sm-2.col-md-1.center
            ;div.circle.circle-sm.mt-2.square-blue;
          ==
          ;div.col-sm-8.col-md-5
            ;p.text-lg.text-600: Azimuth is live on Ethereum, Bridge and Wallet Generator are live. Landscape is in a private beta.
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
              ;span.col-sm-10.col-sm-offset-1.col-md-8.col-md-offset-0: Azimuth distribution
            ==
          ==
        == :: /row
      == :: /adress space
      ;div.container
        ;div.row.mb-30
          ;div.col-md-8.col-md-offset-2.p--intro
            Azimuth, the Urbit address space, is digital property. Property is a fact, not a value judgment. Who owns it is who owns it.

            At first, most of it was just given away. Like bitcoins, galaxies used to be easy to get. In 2010, you could earn a galaxy by writing decrement in Nock.

            In 2013 we started Tlon as the vehicle for Urbit development. Tlon bought half the address space for what is now just a few BTC. Soon after, we created 'urbit.org' — a pool of 64 galaxies meant to fund development of Urbit infrastructure. Tlon remains the guardian of the urbit.org galaxies.

            We have always wanted the address space to be widely distributed. As urbit becomes more useful, this happens on its own.

            At the launch of Azimuth to Ethereum (`~2019.1`), this is the distribution of stars:
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
                  ;div.col-md-4.text-700: Contributors + supporters
                  ;div.col-md-2.text-mono: 17.57%
                == ::/row
              == ::/ col-sm-5
              ;div.col-sm-5.col-sm-offset-1.col-md-12.col-md-offset-0.mb-5
                ;div.row.items-center
                  ;div.col-sm-1.col-md-2.center
                    ;div.circle.circle-sm.shape-orange;
                  ==
                  ;div.col-md-4.text-700: Founders + Tlon employees
                  ;div.col-md-2.text-mono: 15.23%
                == :: /row
              ==  ::// col-sm-5
              ;div.col-sm-5.col-md-12.mb-5
                ;div.row.items-center
                  ;div.col-sm-1.col-md-2.center
                    ;div.circle.circle-sm.shape-green;
                  ==
                  ;div.col-md-3.text-700: Tlon investors
                  ;div.col-md-2.col-md-offset-1.text-mono: 13.28%
                == ::/row
              == ::/ col-sm-5
              ;div.col-sm-5.col-sm-offset-1.col-md-offset-0.col-md-12.mb-5
                ;div.row.items-center
                  ;div.col-sm-1.col-md-2.center
                    ;div.circle.circle-sm.shape-black;
                  ==
                  ;div.col-md-3.text-700: 2018 Galaxy Buyers
                  ;div.col-md-2.col-md-offset-1.text-mono: 8.39%
                == ::/row
              == ::/ col-sm-5
              ;div.col-sm-5.col-md-12.mb-5
                ;div.row.items-center
                  ;div.col-sm-1.col-md-2.center
                    ;div.circle.circle-sm.shape-gray-dark;
                  ==
                  ;div.col-md-3.text-700: 2016 + 2017 Star Buyers
                  ;div.col-md-2.col-md-offset-1.text-mono: 3.13%
                == ::/row
              == ::/ col-sm-5
            == :: /row parent
          ==
        ==
        ;div.row.pb-20
          ;div.col-md-4.col-md-offset-1
            ;h1.h1-large.gray.text-mono.text-700: >1,000
            ;p.text-600: Star and galaxy owners
          ==
          ;div.col-md-4.col-md-offset-1
            ;h1.h1-large.blue.text-mono.text-700: ~19%
            ;p.text-600: Of the network dedicated to funding open source development through urbit.org.
          ==
        == :: /row 3-up
      == :: /container
      ;div.container.pv-20
        ;div.row
          ;div.col-md-8.col-md-offset-2.mb-12
            ;h1: Azimuth unlocking
          ==
          ;div.col-md-8.col-md-offset-2.mb-24.p--intro
            ;p: To prevent the network from growing too quickly, Azimuth has built in 'unlocking' for stars. Galaxies remain transferrable, but their stars unlock over time.
            ;p: Each star also unlocks its ability to issue planets over six years. 1024 in the first year, which doubles each year thereafter.
            ;p: Star buyers in the first two sales (2016 + 2017) and private buyers since 2015 are unlocked right away.
            ;p: Galaxy buyers from 2018 unlock over either one or three years.
            ;p: urbit.org unlocks linearly over two years.
            ;p: Founders, early employees + contributors, supporters, prizewinners and Tlon and its investors are locked for a year, then unlock linearly over four years.
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
            ;div.mb-0.text-sm.text-600: 2017 / 2018 Star Sales, Private Buyers 2015 - 2017
          ==
          ;div.col-sm-1
            ;div.h-32.bg-blue;
          ==
        ==
        ;div.flex.mb-6.items-center
          ;div.col-md-2
            ;div.mb-0.text-sm.text-600: urbit.org + urbit.org Prize Winners
          ==
          ;div.col-sm-5
            ;div.h-32.bg-blue;
          ==
        ==
        ;div.flex.mb-6.items-center
          ;div.col-md-2
            ;div.mb-0.text-sm.text-600: 2018 Galaxy Buyers
          ==
          ;div.col-sm-7
            ;div.h-32.bg-blue;
          ==
        ==
        ;div.flex.mb-6.items-center
          ;div.col-md-2
            ;div.mb-0.text-sm.text-600: Founders + Early Employees, Contributors + Supporters, Tlon + Tlon Investors
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