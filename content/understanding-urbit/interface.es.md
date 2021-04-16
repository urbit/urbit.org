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

Creamos OS 1 para nosotros. Estábamos hartos de usar software convencional y centralizado. No queríamos quedarnos estancados cambiando entre servicios monolíticos e inflados para mantenernos en contacto y hacer avanzar nuestro trabajo. Dejamos de depender de un tercero para cuidar de nuestra comunidad, así que salimos a Urbit y se siente bien.

Si tiene curiosidad por obtener una descripción general completa de OS 1, consulte [esta publicación](https://urbit.org/blog/introducing-os1/), vea el [evento de lanzamiento](https://www.youtube.com/watch?v=71ViyftPkGk&feature=youtu.be&t=3963) o no dudes en [iniciar un nodo](@getting-started/_index.md#comet) para hablar con nosotros.

(Ejecutar Urbit aún requiere un poco de manipulación en la línea de comandos, por lo que no es para todos, pero tenemos [planes para que eso mejore](https://urbit.org/blog/providers/)).

Nuestro objetivo con OS 1 era producir el [Nokia 3310](https://en.wikipedia.org/wiki/Nokia_3310) de computadoras en la nube. Algo que raya en lo simplista, pero aún así es agradable de usar. Logramos ese objetivo, pero es solo el primer hito. Hablemos un poco sobre cómo el paisaje crece y madura a un alto nivel (para obtener más detalles sobre el corto y mediano plazo, consulte [la hoja de ruta](https://urbit.org/understanding-urbit/roadmap/)).

<img class="ba" src="https://storage.googleapis.com/media.urbit.org/site/understanding-urbit/uu-interface-4.png">

El paisaje tiene dos bloques de construcción básicos: grupos y módulos. Un grupo es exactamente lo que parece: una o más personas. Un módulo es como una aplicación sin el bloqueo de datos. Un módulo es solo una herramienta para hacer algo, como "tareas", "enlaces" o "votos" que comparte un grupo.

Para dar algunos ejemplos simples, un grupo de miembros de la familia puede simplemente charlar y compartir fotos. Un grupo de comerciantes puede compartir investigaciones anotadas, observar los mercados y administrar pagos en una cadena de bloques.

Hoy, Landscape solo tiene algunos módulos que vienen de fábrica: chat, enlaces y publicación. Nuestro plan es seguir expandiendo esta suite de tal manera que la suite predeterminada de módulos se sienta como un conjunto de herramientas bien equilibrado para construir una comunidad y mantenerse conectado. También nos gustaría facilitar que cualquiera pueda crear su propio módulo y compartirlo con otros directamente a través de la red de Urbit.

La idea es la siguiente: cualquier comunidad debería poder personalizar libremente su entorno digital. Para la mayoría de los usuarios, se trata solo de elegir los módulos adecuados. Para cualquier persona con un poco de tiempo libre, agregar sus propios módulos debería ser tan difícil como crear una aplicación web simple.

Cuando esperamos lo que podemos hacer con Landscape en el futuro, es difícil volver a las herramientas que usamos hoy. Los servicios centralizados que tenemos ahora son como medios de difusión: sirven para distribuir contenido de un productor a un grupo de seguidores.

El paisaje es para todo lo demás. El paisaje es para una comunicación bidireccional real.

<img class="ba" src="https://media.urbit.org/site/understanding-urbit/your-last-computer/your-last-computer-waves%402x.png">

Nuestro deseo de construir un solo lugar para trabajar juntos no se basa solo en la conveniencia
(aunque es bastante conveniente). A nuestro modo de ver, [las comunidades reales deben tener una propiedad real sobre los espacios que habitan](https://urbit.org/blog/urbit-is-for-communities/). Cuando las comunidades utilizan software de calidad industrial y de talla única, se sienten tan estériles como el software que utilizan. Ese mundo siempre se sintió un poco como vivir en una comunidad planificada. Preferimos vivir en el campo.

Creemos que Landscape puede evolucionar hasta convertirse en algo incluso * más * potente, más limpio y más satisfactorio de usar. Landscape no es una red social ni un software de productividad. El paisaje no se controla de forma centralizada ni se vigila de forma pasiva. El paisaje es algo completamente nuevo. Es un software que se adapta a las personas que lo usan, por las personas que lo usan.
