# Contributor Spotlight: ~ricsul-bilwyt

A conversation with ~ricsul-bilwyt on identity, forever computers, Talon, Lattice, and computing for the household

- Date: 2026-11-10
- Author: ~sarlev-sarsen

![~ricsul-bilwyt Contributor Spotlight Art](https://s3.us-east-1.amazonaws.com/urbit.orgcontent/Blog/Blog+QA+ricsul-bilwyt/Blog_QA+ricsul-bilwyt_Hero.jpg)

> **\~sarlev:** What first drew you into the idea that we needed to throw away and rewrite the entire networked computing stack?

**\~ricsul-bilwyt:** I professionally maintain what `~ravmel-ropdyl` calls industrial software, which I think is a fantastic term. It is a full-time job—in many cases, a full-time job for multiple people—to maintain any software of any consequence for any meaningful number of people. There's just no way we can operate like that forever. There can't be a professional class dedicated entirely to maintaining the infrastructure and data control for everybody else. It just can't operate that way.

I understand how we got here. A lot of the Urbit argument is that we got here organically, and we need to stop growing organically and reconsider the entire project from the perspective we have now. If I was going to implement a computer today, why would I implement it without networking? I wouldn't.

Where did this come from? It came from over a decade of professional experience maintaining complex software systems. There has to be a better way.

> **\~sarlev:** You're the first person who answered that question directly. Everyone else says, “I wandered into it this way,” or whatever.

**\~ricsul-bilwyt:** I'm very intentional.

> **\~sarlev:** Not a true Urbiter. You were not contrarian enough.

**\~ricsul-bilwyt:** That's right. I wasn't hit on the head hard enough as a child.

> **\~sarlev:** What is your favorite part of the system, and how do you think it will change the way people interact with their computers—or the way computers impact their lives?

**\~ricsul-bilwyt:** The best part of the system is the built-in authentication and authorization that comes from the identity on the OS. There's nothing like it. Usually, you have to build it yourself every single time. On every other app you make, you have to build authentication and authorization over and over again. You build it, or you engage some sort of SaaS company that does it for you, and then you don't control your users' accounts. You don't control the security and privacy of their keys. It's just a mess.

My favorite part is that you have one identity, one time, and then you never need it again. One of the main things I want to succeed is to be able to log into my bank, my utility company, and all the places where I pay my bills, and literally just use one identity to log into everything. I hate so much, as a user and as an engineer, building and using authentication and authorization systems. It's just terrible.

If we had Urbit—if Nock was the only legal form of computing, as it should be—we would never deal with this again. People don't realize how painful this is. If you talk to them, they will eventually complain about remembering their passwords and doing all this stuff. You will get there. Once they start talking about it, they realize how much they hate it, and then they get so upset they stop talking about it because there's no solution.

If people knew how nice it could be, adoption would be much quicker.

> **\~sarlev:** It's that fish-in-water experience.

**\~ricsul-bilwyt:** Or boil the frog, right? It's fish in lava. Fish bones in lava. I don't know. They just don't understand how much pain they're feeling day to day. I bet it would probably increase global happiness by 10% if we could just get rid of it.

> **\~sarlev:** Instead of “you will own nothing and be happy,” how about “you will not have to authenticate into infinitely more services and be happy”?

**\~ricsul-bilwyt:** You won't have to have a password manager. I don't understand why we didn't realize what we were doing when we got to the password-manager level—once we started developing software to maintain and manage unique passwords across hundreds of thousands of applications. I have a password manager. I think I have literally thousands of logins.

> **\~sarlev:** Last night I was going through forms with my wife, and they made me create a new account and password. I was demonstrating my elevated software-user status by having my password manager create it automatically. The fact that this is good in any sense is an abomination.

**\~ricsul-bilwyt:** It's ludicrous. You have a single point of failure. Because I want to own all my data, I don't use something like 1Password. I have a password-manager file that I sync myself across all my machines. One time I had a scare where I thought I deleted it, and I was like, man, this is so bad.

> **\~sarlev:** You want these pieces of your digital life to last. What does having a forever computer mean to you?

**\~ricsul-bilwyt:** I've been loading information into some of my Urbit apps for the last six months, and I probably have the biggest repository of self-generated content that I've ever had. If I stick around for 40 more years and continue to do this, the amount of information in this machine is going to be significant. Probably 90% of it is useless to anybody but me. But that 10% could potentially be useful to a kid, a grandkid—someone down the line could get value out of it.

If you imagine six generations, ten generations doing this, and getting about 10% of it worth anything, the amount of value—wisdom, monetary value, various types of value—that could be transmitted through a computer that lasted multiple generations is really significant.

I don't think there's ever been anything like it. The closest thing you have is journals and libraries, people passing down libraries. But passing down a library is a much more complicated process than passing down a hard drive. I would say the biggest value of the forever computer is intergenerational wealth, in all senses of the word.

> **\~sarlev:** The digitization of our lives seems correlated with a falling apart of intergenerational wealth in that sense. I wonder how causal it has been in accelerating that.

**\~ricsul-bilwyt:** Digital stuff has been ephemeral basically since it started. We weren't great at keeping data at the beginning. I guess magnetic tapes are still the state of the art. One of the technologies was really good, but the rest of them are pretty terrible. Spinning rust is terrible. Solid state is moderately better, but as far as long-term data storage is concerned, it's still a developing science.

The ephemerality of computing as we've had it for the last 40 years probably contributes to that. The cost of data storage, people producing massive amounts of meaningless data—there was a stretch where every single year produced more content than all of human history before it.

The absolute volume being produced also adds to the ephemerality, because why would you keep all that? You see it all over the web with link rot and things like this. A computer that actually isn't ephemeral, a computer that sticks around, that has the referential transparency and long-term accessibility of the data—I think it does change things. It probably changes the way people think about computers, and maybe even the way they think about themselves.

> **\~sarlev:** As you've started making Urbit tooling for yourself, what do you want to be able to do with your personal server? How has that evolved from something aspirational into something you're actively doing?

**\~ricsul-bilwyt:** It needs to do everything. It needs to contain all content, record all available data, make all content and available data available to me at all times. It needs to monitor and secure my data and my home network dynamically, actively, at all times. With AI stuff developing the way it is, it's becoming even more important that we have this stuff.

It needs to be the single source of truth for all digital information that it or I have encountered. That's what it has to do. It has to consume everything. I need to be able to put everything into it. Anything that doesn't go into it doesn't exist, because it's in the ephemeral, non-forever computers.

It needs to do everything that my computer does today and everything that my personal server does today, and I have multiple of those. It's a high bar. There's a lot of stuff it has to do. Short term, it needs to replace all my messaging and note-taking, and hopefully soon replace all my prompting, programming, and source control. But we'll get there.

> **\~sarlev:** Where in the legacy computing world did you struggle with fundamental or systemic issues that are wholly not a concern in Urbit?

**\~ricsul-bilwyt:** I have run a lot of group chats for a long time on everything you've ever heard of: IRC, Mattermost, Matrix, everything that's ever existed. I have tried to run group chats and organize people locally and non-locally, and all of them have enormous downsides. The biggest downside being me, in practice—but some guy has to own everything. Has to own everybody's data. Has to maintain all the systems. Has to make sure they're never down.

If you're going to build a local community that uses some piece of infrastructure you own and control, it being down is a really big problem. I have been woken up in the middle of the night by people texting me telling me my Matrix server is down. Matrix purports to fix this by federating it, but operating a Matrix server is a freaking nightmare. If you haven't done it, don't do it. But if you think Matrix is good, you should try running one sometime. If you're a Matrix user, try running a Matrix server and see what it's like.

Urbit is so stupid simple. Anyone can run it trivially and maintain it compared to other things. It's like 1% of the effort required. My node being down does not matter. Everybody else's nodes are still up. They can still talk to each other. They can still DM. In some cases they can even still talk in group chats. The only reason they can't talk in group chats when I'm down is not architectural. It's just an application failure. Eventually we'll fix that too.

My node being down or up doesn't matter, and that's a huge deal. Every user being able to easily run their own node and communicate. Was that the one? Did I hit the one you were thinking of?

> **\~sarlev:** You're surprising me. I thought you were going to rant about exactly-once messaging.

**\~ricsul-bilwyt:** Exactly-once messaging is really cool. It's very important and very powerful for financial applications, but it's not a quality-of-life thing for most people. Anybody who's run a group chat has felt the pain of the chat being down, unless they're on Signal or Telegram or something, in which case there are whole teams dedicated to keeping your shit up.

Exactly-once messaging is an enormous leg up for a lot of applications. I feel like it's more of a cool engineering feature that enables us to build things we otherwise couldn't build, or that would otherwise be very complicated to build. But I wouldn't say it's the biggest experiential upside.

> **\~sarlev:** There have been alternative userspace models theorized and prototyped over the years, including a new proposal from the Urbit Tiger guys. You've played around in Gall and in the world of 'Grubbery', from the Groundwire guys. What threads are you pulling in userspace or the Urbit application model that are working or excite you?

**\~ricsul-bilwyt:** I've been rethinking Gall a lot. I think Gall is pretty good, but I actually question how opinionated the operating system needs to be about Gall-shaped problems.

Grubbery has been really interesting. Shrubs are a good idea. It's not an especially novel idea to do a fully tree-based data structure. I would say the Gall state model doesn't really lend itself to a lot of the cross-compatibility promises we were making a few years back.

It's not quite as easy as it ought to be to find and access other applications' data for your application. You kind of have to integrate directly. The shrub-based or shrub-shaped solutions are a little better at that, because you have predictable tree architectures. As long as you support the appropriate data types, the content is going to be in the same location on everybody's ship, and it'll be addressable in the same way on everybody's ship and across multiple applications. You can expect consistency in a way that Gall agent structure doesn't necessarily give you.

I think it's probably the most interesting area of development in the system right now, as far as Urbit engineering is concerned. Figuring out a good userspace application and data-storage model is really good. I don't know if you watched [a recent Hell Money interview with Curtis](https://youtu.be/DUsqgwUXIis), but when he's talking about AI, he mentions something similar: your applications are small executable bits of code operating against your dataset.

If you think about separating these two things—even though one of the things we've done in Urbit is put them together, the code and the data sit right next to each other—you can simplify the relationship. There's a lot of exciting stuff to be done there. I don't know if I have an answer, but it's definitely the most interesting place to be experimenting.

> **\~sarlev:** What projects are you working on currently, and where are they headed?

**\~ricsul-bilwyt:** Too many projects. I'm thinking about the future of [Talon](https://talon.nisfeb.com), where it should live. I feel like it's getting really close to done. It's the chat app that has all the calendar and mail and that sort of stuff. It has AI in it, which is probably worth talking about at some point, but the actual UI application itself feels like it's getting close to where it could sit for a year or two and not get too much work.

That being the case, I put a lot of my energy recently into [Lattice](https://lattice.nisfeb.com), which is probably the most exciting application I have. It's one that actually has a backend. Talon runs on Tlon's existing backend. Lattice is my agent-memory and world-knowledge datastore, as well as my human note-taking app, as well as an Ames web browser.

I'm very excited about it. I want mass adoption, and I want to browse Ames and not browse the web anymore. I could talk about it for hours, because it has way too many features and only has half the features I want it to have. That's what's next, I think: getting Lattice into a consumer-grade user interface and weapons-grade data storage.

> **\~sarlev:** I've been heavily using Lattice and am a big fan. What's your three-sentence description of what it is? I fall into “it's a little bit Obsidian, it's a little bit web publishing,” and all these other things. What's your line?

**\~ricsul-bilwyt:** People talk about second brains. It's not exactly that. What I want it to be is a complete repository of your intelligible thoughts, and the way you access everybody else's repository of their own intelligible thoughts. That's what I want it to be. I want every interesting idea you ever have to go into it. And I want you to be able to browse everybody else's interesting ideas.

> **\~sarlev:** Talon is getting those last bits of polish. What's the trajectory for Lattice, between making it useful for yourself, useful for the next tranche of users, and reaching mass consumer adoption?

**\~ricsul-bilwyt:** It has to be something that can be virally adopted. That's why I recently added the libmesa integration to let you just download the app and run it without actually running your own ship. You get a comet key, so you can operate over Ames—it's “real Ames.”

There are a couple more features I want to add and some more quality-of-life features that can be added to Lattice, but that's the direction: getting it into a condition where it could be reasonably viral if there were an opportunity for it to have a moment like that. It would need to be able to handle it.

We also need to deal with some of the comet-spam stuff, which I'm hoping we'll get to in Kelvin 407, with being able to identify Groundwire comets as distinct from other comets. I'm adding spam-prevention features to Lattice for comets. Each published page will only take ten comet comments an hour, whether that's one comet or ten. We have some moderation and Sybil resistance that we're probably going to need to add to deal with some of the potential consequences of libmesa.

Directionally, everything needs to become—right now it's a power-user application—more of a consumer application. I redid the UI recently for this exact reason.

> **\~sarlev:** That suggests two types of Lattice users: the power user or creator having the intelligible thoughts, and the drive-by comet enjoyer coming in to consume. How have you been thinking about content discovery? You've done some cool stuff with `urb://` links.

**\~ricsul-bilwyt:** Right now I'm just doing the same stuff we did in the '90s with old-school web pages, with backlinks and hyperlinks. In the old days, you would find other people who linked to you, and then link back to them. You'd find it by reading the server logs of who's clicking to you from where, and manually put it into your page.

That's where we're at right now as far as linking is concerned, although I can do it dynamically now. We'll have public backlinking as well.

Content discovery for now is probably going to be much like the old internet, where you have ship names you know, you navigate to their homepage, and hope they have links to cool stuff. Over time you build a library. Maybe you link to all the cool stuff you know about on your homepage, so people come to your homepage and route that way.

I built this whole big search engine in month three of working on Lattice. I was like, “It's not just going to be a datastore. It's going to be your own search engine and your own Ames web crawler, and it's going to go through your entire contacts list of 6,000 ships, find every page they publish, index them all, and make them searchable for you.” I built this whole thing completely. It's built. It sucks. The user experience is depersonalized.

> **\~sarlev:** Does it suck because it's slow, or because it turns out you don't actually want to see everything everyone you know published?

**\~ricsul-bilwyt:** You don't want to know everything. You don't care about 80%, 90% of what's out there. The right way to find it is by walking through the field. The random walk is the correct way to identify the information.

There's a little bit of: "search results are unearned, so they're low value because you didn't earn them." Anybody who was around back when—MySpace was probably near the end of this time—you'd click a link and click a link and follow multiple links down to some really obscure, weird web page, find something, and bookmark it. Now you're one of 20 people in the world who know about this web page, right? You can tell you're one of 20 people, and you tell people about it and they think it's weird. They don't care.

I want to recapture that more than I want to recapture having your own view into the entire web network. It would be slow eventually. It's not slow now because there aren't a ton of users. Eventually it would be slow, and you'd have to centralize it and make a search service, and all the stuff that wound up happening on the web. But if you don't have a financial incentive to make a search engine, I actually don't think search engines appear. I think the search engine might actually be an accident. It might actually have been a mistake.

> **\~sarlev:** That money printer Google built—a blip in our computing history.

**\~ricsul-bilwyt:** Plus, we're still early in AI world, but I feel like we're far enough along the path that we know you'll go to bed and your agent will crawl the network for you. It knows what you're interested in and might bring you interesting new stuff without you having to click through it yourself.

In order for it to do that, it doesn't require automated software that does this on a regular basis. It can just do it when it's told to. It can probably do it moderately faster than anything I would build that tried to cover the entire network.

Lattice already has tons of MCP stuff for knowledge management, but maybe I should be adding agent browsability into it as well. That's probably a more interesting direction to go than trying to build a search engine.

> **\~sarlev:** Content discovery is going to massively change. You could say the application most people are using agents for today is search. It's glorified search.

**\~ricsul-bilwyt:** It's search incidentally. The human asking the question wants an answer. They don't want search results. They don't want ten links to go and read. They just want an answer to the question. That's why the search engines are putting the front matter up there and all that stuff.

How do you incentivize people to continue producing content online that's useful to feed these things and answer these questions? I don't know the answer to that. But I really do think people don't want search engines. They just want answers. Maybe that was always true and we just figured it out accidentally.

> **\~sarlev:** If Lattice and Talon were some definition of done, what would be on your radar next?

**\~ricsul-bilwyt:** The next thing is administration. You need to be able to spin up ten ships in your house, one for each person and a couple of others for various activities or use cases. You need to be able to put various types of parental controls on child machines. You need to manage access to different types of data for different people. Maybe you want to buy your wife a present, and you don't want that plan in the place she can also look in.

Kids need to be doing schoolwork at certain times of day. Maybe different applications are unavailable at different times of day. Household computer management. It really doesn't exist even in the Linux world. In the normal computer world, Mac kind of has it, but it's not very good. Anybody who's used it would agree it's pretty trash. It's better than nothing, but it's pretty trash.

We need an answer for this on Urbit, and there's no reason we can't have it. It really is just a matter of effort over time and having a nice interface over it. That's probably what I'm going to do next: build multi-ship control. Not in the sense of managing fleets for your friends who are grown adults and freely access whatever they want, but more like operating a home, or even a broader family, maybe a hundred people. Some way to do ship management at moderate scale.

I'm just building what I want, and my kids are young. My oldest is almost ready to use a computer, so by the time the oldest is ready, I need to have a solution.

> **\~sarlev:** You need to have a computer. It's already true in your household that Nock is the only legal form of computing.

**\~ricsul-bilwyt:** It is the only legal form of computing. That's right.

> **\~sarlev:** Those administration tools have always seemed operationally out of reach. You end up being a sysadmin for your family, even if the tools are there. But if I've got my digital life and agents in Lattice, and I've directed my intent into my computer, that layer can assist me with the sysadmin task.

**\~ricsul-bilwyt:** This is going to be so easy. I've been doing smart-home stuff very lightly for a long time, and when we got the new house I did much more significant integrations than before. The biggest pain point is solved with AI. All this configuration crap is just a matter of expressing intent, and it just happens.

When we moved in, the house had an old security system: a little magnetic sensor on every door and window, all reporting back to a panel in a closet. I opened it up and realized each sensor is just a magnet closing a circuit, and the panel talks over radio, not Wi-Fi.

So I bought a cheap radio receiver, plugged it into my computer, opened Claude, and said, "Here's the receiver. Find the sensors and watch them. I'm going to walk around the house opening and closing every door and window, and I'll tell you the order I did it in. Map the house."

It took about five minutes. Doing it myself would have taken days. I came back, told Claude the sequence, and it added every sensor to Home Assistant. Then I said, "Set up a sane security schedule and sane automations. Configure it yourself. I don't even want to tell you the specifics."

The whole thing was done in minutes.

That's going to be everything. All configuration is over. All I need to do to achieve my control plane for the home computers is create the affordances for the configurations to apply and be respected by each device, and then allow the configuration to be done using an agent. I think we'll be done.

That windows-and-doors thing was the first time I put my hands on my head and was like, “Oh my God, everything is different. This changes everything.”

> **\~sarlev:** I've got a little soundbar remote that's a weird shape, and I don't have anywhere to put it. I took three pictures next to a ruler and said, “Astra, design me a 3D-printable wall mount for this.” Then I gave it a picture of a weird, organic-shaped bowl and said, “Make it look like this.” Maybe I had two other comments along the way, but now I've got an STL file to put in my printer. Everything is going to work exactly the way I want it to.

**\~ricsul-bilwyt:** That's really what it is. We're getting to the point where an expression of intention is all you need to get most of this stuff done.

> **\~sarlev:** Last question: if you weren't working on Urbit, what would you be doing instead?

**\~ricsul-bilwyt:** So much of my life would have to be different for that to be the case. If I had a family and wasn't working on Urbit, I would be working on some other technological solution to common household problems. I can't imagine doing anything else. I don't even know what else I would be doing.

I have a bunch of hobbies I'd probably spend more time on, like amateur radio and sailing. Those would probably be more of my life than they are now. But it seems like the most important technology we have. I can't imagine spending my time on anything else. Maybe I'd be working on cryptography. I spent some time in the early 2010s working on group cryptography, but we solved that. Signal, and later MLS, largely solved that, which is great.

I can't imagine anything else. I would probably build Urbit if I didn't have Urbit to work on.
