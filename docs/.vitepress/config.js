export default {
  title: "klass",
  description: "class variant utility.",
  head: [
    ["meta", { property: "og:type", content: "website" }],
    ["meta", { property: "og:url", content: "https://https://klass.pages.dev" }],
    ["meta", { property: "og:title", content: "klass | klass" }],
    ["meta", { property: "og:description", content: "class variant utility." }],
    ["meta", { property: "og:image", content: "https://https://klass.pages.dev/cover.png" }],
    ["meta", { property: "twitter:card", content: "summary_large_image" }],
    ["meta", { property: "twitter:url", content: "https://https://klass.pages.dev" }],
    ["meta", { property: "twitter:title", content: "klass | klass" }],
    ["meta", { property: "twitter:description", content: "class variant utility." }],
    ["meta", { property: "twitter:image", content: "https://https://klass.pages.dev/cover.png" }],
  ],
  lastUpdated: true,
  themeConfig: {
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/flamrdevs/klass",
      },
    ],
    editLink: {
      pattern: "https://github.com/flamrdevs/klass/edit/main/docs/:path",
      text: "Edit this page on GitHub",
    },
    sidebar: [
      {
        text: "Guide",
        items: [
          {
            text: "Getting Started",
            link: "/getting-started",
          },
        ],
      },
      {
        text: "Packages",
        items: [
          {
            text: "@klass/core",
            link: "/klass/core",
          },
          {
            text: "@klass/react",
            link: "/klass/react",
          },
          {
            text: "@klass/preact",
            link: "/klass/preact",
          },
          {
            text: "@klass/solid",
            link: "/klass/solid",
          },
        ],
      },
    ],
    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2022-present",
    },
  },
};
