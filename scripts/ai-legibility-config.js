const llmsConfig = {
  title: "urbit.org",
  description: "Curated entry points for AI agents, crawlers, and other automated readers.",
  sections: [
    {
      title: "Start here",
      entries: [
        { url: "https://urbit.org/", required: true },
        { url: "https://urbit.org/overview", required: true },
        { url: "https://urbit.org/overview/urbit-explained", required: true },
        { url: "https://urbit.org/overview/running-urbit", required: true },
        { url: "https://urbit.org/get-on-the-network", required: true },
        { url: "https://urbit.org/ecosystem" },
        { url: "https://urbit.org/blog" },
      ],
    },
    {
      title: "Running Urbit",
      entries: [
        { url: "https://urbit.org/overview/running-urbit/get-urbit-id", required: true },
        { url: "https://urbit.org/overview/running-urbit/run-urbit-os", required: true },
        { url: "https://urbit.org/overview/running-urbit/hosting-providers" },
        { url: "https://urbit.org/overview/running-urbit/common-commands" },
        { url: "https://urbit.org/overview/running-urbit/resources" },
        { url: "https://urbit.org/overview/running-urbit/support" },
      ],
    },
    {
      title: "Understanding Urbit",
      entries: [
        { url: "https://urbit.org/overview/urbit-explained/urbit-id" },
        { url: "https://urbit.org/overview/urbit-explained/urbit-os" },
        { url: "https://urbit.org/overview/urbit-explained/beyond" },
      ],
    },
    {
      title: "Building on Urbit (docs.urbit.org)",
      entries: [
        {
          url: "https://docs.urbit.org/",
          summary: "Start here for official Urbit documentation and orientation material.",
        },
        {
          url: "https://docs.urbit.org/tutorials/",
          summary: "Step-by-step tutorials for building and configuring Urbit systems.",
        },
        {
          url: "https://docs.urbit.org/glossary/",
          summary: "Definitions for Urbit terms, components, and system concepts.",
        },
        {
          url: "https://docs.urbit.org/reference/hoon/",
          summary: "Reference documentation for the Hoon programming language.",
        },
        {
          url: "https://docs.urbit.org/reference/nock/",
          summary: "Reference documentation for the Nock combinator language.",
        },
        {
          url: "https://docs.urbit.org/reference/arvo/",
          summary: "Reference documentation for Arvo, the Urbit kernel.",
        },
      ],
    },
  ],
};

module.exports = { llmsConfig };
