+++
title = "Sovereign Intelligence"
date = "2026-1-13"
description = "Urbit offers a bicameral future for personal AI. One side stable. One side fluid. Each stronger with the other"
# aliases = []

[extra]
# author = ""
ship = "~sicdev-pilnup"
image = "https://s3.us-east-1.amazonaws.com/urbit.orgcontent/Blog/Blog_Sovereign+Intelligence/Blog_Sovereign+Intelligence_Social+16x9.png"
imageCard = "https://s3.us-east-1.amazonaws.com/urbit.orgcontent/Blog/Blog_Sovereign+Intelligence/Blog_Sovereign+Intelligence_Text_Social+16x9.png"
imageIndex = "https://s3.us-east-1.amazonaws.com/urbit.orgcontent/Blog/Blog_Sovereign+Intelligence/Blog_Sovereign+Intelligence_Banner.png"
# imageDark =
# imageCardDark =
# imageIndexDark =
tags =  ["AI", "privacy", "sovereignty"]
+++


![Sovereign Intelligence image](https://s3.us-east-1.amazonaws.com/urbit.orgcontent/Blog/Blog_Sovereign+Intelligence/Blog_Sovereign+Intelligence_Social+16x9.png)

## **Architecture for Personal AI**
AI is having its moment. Most of it lives in large data centers. It feeds on personal information it does not own and cannot explain. The output is impressive. The setup leaves you with no real control. Urbit takes a different view. It treats identity and data as something you control. It keeps computation close to the person and builds a world that does not depend on corporate platforms. The two systems pull in opposite directions. That tension is useful.

The idea of AI as a simple tool is outdated. A real personal AI should act as an extension of your own thinking. For that to happen, it needs a place to live. It needs a stable identity. It needs a durable memory. There should be a clear boundary between what is yours and what is external. Urbit offers that home. It gives the AI a container for identity and long-term state. It gives you the authority to shape how the AI sees your world.

This is not a solution for everyone. Most people are happy to hand their data to a cloud and receive convenience in return. This is a solution for live players. Those who want leverage. Those who see that controlling your own intelligence stack is an advantage worth preserving. The early adopters bear the cost. If they persist, the technology matures and spreads.

Think of the arrangement as a split mind. One half is stable. It holds identity, memory, and the rules of your world. The other half is fluid. It learns, adapts, and acts. Neither half works as well alone. Together they form something new.

It moves through three layers. First is the sidecar. This connects an AI to your private data without surrendering control. Second is creation. AI can help you write and shape your own software. Third is agency. Here identity becomes the anchor that lets an agent act in the network and build a record over time. Together these layers point toward a future where your AI does not float in the cloud. It lives with you.

## **The Sidecar**

### **A personal AI without surrendering your data**

Most people who use AI today hand everything to a large company. Prompts. Documents. History. Identity. The power is real. The tradeoff is obvious. Urbit offers a different path. Your ship holds the core of your digital life. It speaks for you. It protects you. The AI sits beside it. A sidecar, not a master.

The idea is simple. Your ship stores primary data. It keeps it structured, signed, and organized in a way no cloud service can promise. An LLM queries the ship through a clear API. The ship is the source of truth. AI is the tool. Nothing moves unless you allow it.

Running a capable AI model takes real hardware. The frontier models from large labs remain out of reach for personal infrastructure. But open-source models are closing the gap. A high-end workstation or a [small collective](https://x.com/WhiteMarbleDAO/status/1994777778575585757) can now run models that were state of the art two years ago. Urbit already organizes small groups through stars and other structures. Federating compute is a natural extension. A star operator could offer inference to their planets the same way they offer routing today.

This pattern is already being explored in the work of \~niblyx-malnus, who built an [early MCP server](https://github.com/gwbtc/urbit-master/tree/tlv/uf-article) that links an LLM to a live ship. [His demo](https://drive.google.com/file/d/169ofRXvgvTbqHKax33GkzRkVUXXnh93u/view) shows a model reading and writing to the ship through well-defined tools. It branches conversations. It manipulates files. It interacts with `%gall` agents. It sends notifications. It does all of this by calling into the ship rather than absorbing your data into an opaque service. The code is public. The video is worth watching for anyone tracking the ecosystem's direction.

The approach uses a wrapper agent to manage asynchronous work and expose structured capabilities. The AI authenticates via `%eyre` using a standard cookie flow. Once inside, it sees a registry of tools that describe what the ship allows it to do. Access is scoped to particular desks rather than the entire system. The AI can work within its permitted zone without touching anything outside it. This gives the LLM the power to work across its assigned space, write code, and manage its environment without ever owning the data itself. The ship stays at the source. The AI stays the worker.

The benefit is clear. The AI learns from your world without handing all of it to a single company, and the cost of switching stays low. Context without custody. The ship controls what gets exposed. It controls how tasks run. It is the gatekeeper and the database, not the GPU. The heavy lifting happens wherever the AI sits. The authority stays with you.

The sidecar fits the Urbit ethos. It gives you an assistant that operates inside your system while keeping your identity anchored to a place you own. It is the first step toward a personal AI. Yours in practice, not just in theory. One half of the split mind is now in place. The stable ground. The next step is giving the fluid half something useful to build.

## **Software as Conversation**

### **Making code accessible**

Urbit is powerful. It is also demanding. A small group of developers create most of the experience. Most users stay on the outside. That gap keeps the system from feeling as personal as it claims to be.

LLMs change the dynamic. A model fluent in common programming languages can turn intent into code. The user speaks. The model drafts. The ship verifies.

The key is urWASM. Urbit can now compile WebAssembly into its runtime. Any language that targets WASM becomes a valid way to extend your ship. Rust. Go. AssemblyScript. The list keeps growing. An LLM does not need to master Hoon. It needs to write code in languages it already knows well. The compilation layer handles the rest.

A plain request to "build a bot that tracks trading fees" becomes a functioning agent rather than a weekend project. The AI writes it in a familiar language. The ship compiles and runs it. If it runs, it works. The deterministic nature of the runtime means there is no gap between what was written and what executes. The code is verified by the fact of its execution.

The vision is simple. You do not install an app. You ask your ship to become the app. The software adapts to you instead of the reverse. This restores Urbit to its original aim. A personal server that reflects the person who owns it.

Here the split mind becomes productive. The stable half holds the rules and the environment. The fluid half writes code to reshape that environment according to your intent. Neither could do this alone. Together they give you a system that grows with you.

## **A Body for the Mind**

### **Identity and agency for LLMs**

We are already moving from chatbots to agents. A model that only answers questions is useful. A model that can act is something different. To act in a meaningful way it needs the same things a person needs. It needs identity. It needs a record of past behavior. It needs the ability to hold and move value. Without these it cannot form lasting relationships, whether personal or professional.

There are many ways to name a system. You can use a UUID. You can use DNS or ENS. These give labels but they do not give presence. You cannot message an ENS name. You cannot build trust with a UUID. Urbit ID fills a different niche. It is a name and an address at the same time. It lets a system participate on the network as a peer. The names also sit in a strange but fitting space. They are not entirely human and not entirely machine. An identity unifies the split mind. Human agency and artificial intelligence bound into a cybernetic system that serves it's owner.

At first these identities will be assigned by design. A developer will give an agent a point, a wallet, and a set of rules. But extrapolate the current trajectory. The CEOs of major AI labs speak openly about transformative capabilities arriving within a few years. If those capabilities emerge, AI’s will need proper agency to coordinate with humans and with each other. They will need to be trusted and to build trust. An AI with access to crypto rails and stable storage could choose to maintain a persistent identity because it makes its work more effective. It could use that identity to build reputation across time.

The distinction is simple. An AI that runs on a normal server is a script. It is invisible and interchangeable. An AI that runs a ship becomes a neighbor. It has an address. It has a history. It can be known or ignored based on its behavior. Urbit gives AI a body, and with that body it can act inside the same world we do.

This completes the split mind. The stable half now anchors not just data but identity. The fluid half now has a presence in a network of peers. The mind has a body. The body can act.

## **Conclusion**

### **The bicameral future**

Urbit gives shape. It gives structure, identity, and a place where a person can keep a digital life that is actually theirs. AI brings the other half. It brings learning, pattern recognition, and the ability to turn intent into action. Together they form a split mind. One side stable. One side fluid. Each stronger with the other.

This future is not built yet. We need connections between the AI models we run ourselves or choose to trust and the ships that anchor our digital lives. We need simple bridges and clear APIs. We need tools that let a person keep their data and still use the best intelligence available. The path is open. It only needs people to walk it.

The message is simple. Do not leave your AI in a corporate cloud. Bring it home.

