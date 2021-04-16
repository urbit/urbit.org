+++
title = "Interfaz"
description = "Cómo se siente Urbit para un usuario cotidiano"
weight = 3
[extra]
flatten_pagination = "true"
hide_next_title = "true"
hide_previous_title = "true"
+++

Creamos Urbit OS + Urbit ID para que sea la pila de software para la computación a escala humana en la nube. Este sistema no se creó únicamente para ser una nueva infraestructura, sino que se creó para que podamos construir mejores interfaces en la parte superior y las personas puedan usar Urbit sin tener que conocer la tecnología en absoluto. Para que Urbit realmente importe, tenemos que ir desde la VM hasta la UI.

Por eso creamos Landscape: una interfaz sencilla, tranquila y basada en navegador para crear comunidades digitales. Usamos Landscape para unir nuestras formas separadas de comunicarnos y colaborar.

El paisaje no es solo una idea, es algo real. Hoy en día, una vez que tenga un nodo del sistema operativo Urbit en funcionamiento, puede acceder a Landscape desde un navegador de escritorio o móvil para chatear, escribir y compartir enlaces de forma seudónima con un grupo de amigos.

Vemos Landscape como una nueva forma de software social que puede seguir creciendo y evolucionando durante bastante tiempo. Usamos la primera versión de Landscape, "OS 1" todos los días. OS 1 es simple hasta el punto de ser simplista. Esperamos que el paisaje evolucione durante mucho tiempo.

Landscape no es de ninguna manera la única interfaz posible para Urbit OS + Urbit ID, pero es la que más necesitamos. En el futuro, esperamos que haya muchas interfaces de Urbit diferentes (y si está interesado en experimentar con la construcción de una, hágalo).

Pero hablaremos de eso más tarde. Primero, hablaremos sobre por qué creamos Landscape, dónde está ahora y hacia dónde se dirige. Luego, cubriremos un poco sobre otras posibilidades de interfaz.


<img class="" src="https://media.urbit.org/site/understanding-urbit/project-history/uu-osn-1.svg">

¿Qué problema está resolviendo Landscape? Comencemos con la situación actual en lo que respecta a los servicios en la nube.

En el mundo actual de aplicaciones y servicios, no existe un sistema operativo en ningún sentido significativo. Nuestras comunidades, compañeros de trabajo y vidas se reparten entre estos servicios, y el trabajo de combinarlos se deja al usuario. Depende completamente de usted recordar todas sus contraseñas, quién envió qué mensaje dónde, qué archivos están en qué plataforma, etc.

Por encima de todo, a nuestra vida digital actual le falta un sentido de lugar, un sentido de hogar.

Es molesto y confuso cambiar entre interfaces, no se puede extender o construir en la parte superior, y la privacidad y la seguridad están fuera de sus manos. Esta experiencia fragmentada, en silos y estrechamente vigilada es simplemente un subproducto de que otras personas ejecuten y controlen su software. Para el usuario común, el resultado es restrictivo, aburrido y doloroso de manejar. La posibilidad de la creatividad diaria con las herramientas con las que estamos atrapados es casi nula. ¿No se suponía que la computadora era una bicicleta para la mente?

Los sistemas operativos para PC tomaron el escritorio de la década de 1970 y lo hicieron digital. El papel, los cajones y los sobres se convirtieron en "archivos" y "carpetas". Es una gran abstracción, pero es antigua. Vivimos en un mundo multijugador conectado; necesitamos un sistema operativo que reconozca este mundo.

El "escritorio" de hoy está repleto de aplicaciones y servicios, estructuras de datos e interfaces. Unificar esta experiencia de usuario inconexa es el problema más importante que puede resolver una plataforma como Urbit. Landscape está diseñado para reunir todo en una interfaz unificada nuevamente. Sin Urbit ID + Urbit OS, esto sería imposible.

En marzo de 2020 enviamos la primera versión pública de Landscape, OS 1, a la red y la hemos estado usando desde entonces para comunicarnos, colaborar y mantenernos en contacto.

OS 1 es una interfaz mínima y multipropósito para reunir a un grupo para charlar, compartir enlaces, escribir y participar en debates. OS 1 está libre de anuncios, seguimiento o vigilancia (como es la norma para todo lo creado en Urbit). OS 1 es una utilidad social simplificada diseñada para una comunicación y colaboración directas y de alta confianza. OS 1 es el lugar para que las comunidades pequeñas se sientan como en casa.

<img class="ba" src="https://storage.googleapis.com/media.urbit.org/site/understanding-urbit/uu-interface-3.png">

We built OS 1 for ourselves. We were sick of using centralized, mainstream software. We didn’t want to be stuck switching between bloated, monolithic services in order to keep in touch and move our work forward. We were done relying on some third party to take care of our community—so we exited to Urbit, and it feels good.

If you’re curious to get a complete overview of OS 1, check out [this post](https://urbit.org/blog/introducing-os1/), watch the [release event](https://www.youtube.com/watch?v=71ViyftPkGk&feature=youtu.be&t=3963) or feel free to [boot a node](@/getting-started/_index.md#comet) to come talk to us. 

(Running Urbit still requires a little fiddling around in the command-line, so it’s not for everyone—but we do have [plans for that to improve](https://urbit.org/blog/providers/).)

Our target with OS 1 was to produce the [Nokia 3310](https://en.wikipedia.org/wiki/Nokia_3310) of cloud computers. Something bordering on simplistic, but still nice to use. We hit that target, but it’s just the first milestone. Let’s talk a bit about how Landscape grows and matures at a high level (for more specifics on the near-to-medium term, check out [the roadmap](https://urbit.org/understanding-urbit/roadmap/)).

<img class="ba" src="https://storage.googleapis.com/media.urbit.org/site/understanding-urbit/uu-interface-4.png">

Landscape has two basic building blocks: groups and modules. A group is exactly what it sounds like: one or more people. A module is sort of like an app without the data lock-in. A module is just a tool for getting something done, like ‘tasks’, ‘links’ or ‘votes’ that’s shared by a group. 

To give a few simple examples, a group of family members may just chat and share photos. A group of traders might share annotated research, watch the markets, and manage payments on a blockchain. 

Today, Landscape only has a few modules that come out of the box: chat, links, and publish. Our plan is to keep expanding this suite such that the default suite of modules feels like a nicely balanced toolkit for building community and staying connected. We’d also like to make it easy for anyone to build their own module and share it with others directly over Urbit’s network. 

The idea is this: any community should be able to customize their digital environment freely. For most users, this is just about choosing the right modules. For anyone with a bit of free time, adding your own modules should only be as difficult as building a simple webapp.

When we look forward to what we can do with Landscape in the future, it’s hard to see ourselves going back to the tools we use today. The centralized services we have now are like broadcast media: they’re for distributing content from a producer to a bunch of followers. 

Landscape is for everything else. Landscape is for actual two-way communication.

<img class="ba" src="https://media.urbit.org/site/understanding-urbit/your-last-computer/your-last-computer-waves%402x.png">

Our desire to build a single place to work together isn’t driven just by convenience 
(although it is quite convenient). The way we see it, [real communities need to have real ownership over the spaces they inhabit](https://urbit.org/blog/urbit-is-for-communities/). When communities use industrial-grade, one-size-fits-all software they feel as sterile as the software they use. That world always felt a bit like living in a planned community. We’d rather live in the countryside.

We think Landscape can evolve into something even *more* powerful, cleaner, and more satisfying to use. Landscape is neither a social network nor productivity software. Landscape isn’t centrally controlled or passively surveilled. Landscape is something entirely new. It’s software that’s tailored to the people who use it, by the people who use it.
