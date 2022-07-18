export const contact = {
  name: "Urbit",
  email: "support@urbit.org",
  twitter: "https://twitter.com/urbit",
  github: "https://github.com/urbit/urbit",
  urbitCommunity: "~bitbet-bolbel/urbit-community",
  newsletter:
    "https://urbit.us11.list-manage.com/subscribe/post?u=972a03db9e0c6c25bb58de8c8&amp;id=be143888d2",
};

export const eventKeys = [
  "title",
  "ends",
  "location",
  "image",
  "registration_url",
  "youtube",
  "description",
  "starts",
  "hosts",
  "slug",
  "guests",
  "content",
  "dark",
  "timezone",
  "darken_image",
];

export const postKeys = [
  "title",
  "slug",
  "date",
  "description",
  "content",
  "extra",
];

export const grantsKeys = [
  "title",
  "slug",
  "date",
  "description",
  "content",
  "extra",
  "taxonomies",
];

export const mediaKeys = [
  "title",
  "slug",
  "date",
  "description",
  "content",
  "extra",
];

export const updatesKeys = [
  "title",
  "slug",
  "date",
  "description",
  "content",
  "author",
  "ship",
];

export const footerData = [
  [
    {
      title: "Urbit",
      links: [
        {
          title: "Home",
          href: "/",
        },
        { title: "Get Started", href: "/getting-started" },
        {
          title: "Manual",
          href: "/using",
        },
        {
          title: "FAQ",
          href: "/faq",
        },
        {
          title: "Events",
          href: "/events",
        },
        {
          title: "Blog",
          href: "/blog",
        },
        {
          title: "Grants",
          href: "/grants",
        },
      ],
    },
    {
      title: " ",
      links: [
        { title: "GitHub", href: "https://github.com/urbit" },
        {
          title: "Airlock APIs",
          href: "https://github.com/urbit/awesome-urbit#http-apis-airlock",
        },
        {
          title: "Urbit Binaries",
          href: "https://github.com/urbit/urbit/releases",
        },
        {
          title: "Urbit Client",
          href: "https://github.com/urbit/port/releases",
        },
        {
          title: "Issue Tracker",
          href: "https://github.com/urbit/urbit/issues",
        },
        { title: "Whitepaper", href: "https://urbit.org/audits" },
      ],
    },
  ],
  [
    { title: "Privacy Policy", href: "/privacy" },
    { title: "Terms of Service", href: "/terms-of-service" },
    { title: `${contact.email}`, href: `mailto:${contact.email}` },
  ],
];
