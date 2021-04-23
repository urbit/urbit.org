# urbit.org

[![Netlify Status](https://api.netlify.com/api/v1/badges/71f99a93-7b2e-4e10-b74d-7cbbb2e6dacd/deploy-status)](https://app.netlify.com/sites/urbit-org/deploys)

The website for the Urbit project.

## Build

1. git clone this repository
2. Install [zola@0.13.0](https://github.com/getzola/zola/releases/tag/v0.13.0) (see [Installation](https://www.getzola.org/documentation/getting-started/installation/))
3. `git submodule init`
4. `git submodule update`
5. In the root directory of `urbit.org`, run `zola serve`

## Deploy

Commits to master are automatically deployed with Netlify.

## Post Template and Settings

If you're adding content to the site, add a `.md` file to the /content/ directory. Predictably, Updates go in /updates/, Blog posts into /blog/, and Media in /media/.

Different templates have different optional configuration settings. All the options used on the site, used in a post template, looks like this:

```
+++
<!-- Title: Post title. Mandatory. -->
title = "Title for Post"

<!-- Date: Used in Updates, Media, Blog posts only. -->
date = 2020-01-01

<!-- Weight: Used when your post directories are being sorted in manual order, not by date. Understanding Urbit and the Docs use weight. -->
weight = 0

<!-- Description: A snippet used in post directory pages. -->
description = "A post."

<!-- Aliases are used when a post was at another location, and redirects that location to the current post location. If you're moving a page, create an alias. -->
aliases = ["/updates/2020.01.01"]

<!-- template: Only really needed if you're creating a non-post page with sidebar navigation of its content, in which case you want "page_indiced.html". -->
template = "page_indiced.html"

<!-- This [extra] is needed above any of the configuration options that follow. -->
[extra]

<!-- Author: For updates, blog, media. -->
author = "Matilde Park"

<!-- Ship: The author's ship. Used on post directory pages. -->
ship = "~haddef-sigwen"

<!-- Image: The URL to the article's main image. Used on Twitter cards and link previews to the site. -->
image = "https://media.urbit.org/site/posts/updates/~2019.11.06-update.jpg"

<!-- hidetitle: For non-post pages on the site, the title is automatically inserted as an <h1> at the top. If the title of the page is already displayed in the nav (this occurs in root content pages, like /governance, /privacy), then this just removes that <h1>. -->
hidetitle = "true"

<!-- soundcloud: Used in /media to embed its link on the post directory page. -->
soundcloud = "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/318017856&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"

<!-- youtube: Used in /media to embed its link on the post directory page. Uses just the ID. -->
youtube = "5ZAFEylHdiU"

<!-- Pagination settings: Flatten pagination makes all the text regular body size. hideprevious removes the "previous" pagination nav entirely, and hidenext removes the "next" pagination nav entirely. hide_previous_title removes the "Previous Post:" title above the previous post's title, and hide_next_title removes the "Next Post:" title above the next post's title.
flatten_pagination = "true"
hide_next_title = "true"
hide_previous_title = "true"
hideprevious = "true"
hidenext = "true"

<!-- classes: Blog posts can add any Indigo class to the template. For example, bg-red4 and yellow0 would make the background deep red and the text light yellow. -->
classes = "bg-red4 yellow0"
+++
```

An average blog post just looks like this:

```
+++
title = "~2019.10 Roadmap"
date = 2019-10-03
description = "Galen Wolfe-Pauly on the road ahead for the identity/OS/interface/community stack."
[extra]
author = "Galen Wolfe-Pauly"
ship = "~ravmel-ropdyl"
+++

The daily work of building a new OS from scratch is so engaging and exciting that we habitually forget to even take stock of what we’ve accomplished. We’re fixated on the prospect of moving the world on to Urbit, starting with ourselves.

[...]
```

## Localization

Zola supports [multilingual content](https://www.getzola.org/documentation/content/multilingual/).

To translate a page:

1. Fork the repo
2. Add a new entry to the `languages` array in `config.toml` (if it's not already there)
```toml
# 'en' is defined implicitly by the default_language setting
languages = [
  {code = "es", feed = false, search = true},
  {code = "ko", feed = false, search = false},
  # ... add the new language here
]
```
3. Copy and rename an existing file with the corresponding language code like so:
```sh
cp content/faq.md content/faq.[language code].md
```
For example, to translate the FAQ into Korean:
```sh
cp content/faq.md content/faq.ko.md
```
4. Open the new file in an editor and translate the body copy and front matter. When it's ready, push it to your fork and open a PR against this repo.

