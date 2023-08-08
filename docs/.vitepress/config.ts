import { defineConfig } from "vitepress";

export default defineConfig({
  title: "klass",
  description: "Class variant utility",
  head: [
    ["meta", { property: "og:type", content: "website" }],
    ["meta", { property: "og:url", content: "https://https://klass.pages.dev" }],
    ["meta", { property: "og:title", content: "klass" }],
    ["meta", { property: "og:description", content: "Class variant utility" }],
    ["meta", { property: "og:image", content: "https://https://klass.pages.dev/cover.png" }],
    ["meta", { property: "twitter:card", content: "summary_large_image" }],
    ["meta", { property: "twitter:url", content: "https://https://klass.pages.dev" }],
    ["meta", { property: "twitter:title", content: "klass" }],
    ["meta", { property: "twitter:description", content: "Class variant utility" }],
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
    search: {
      provider: "local",
    },
    sidebar: [
      {
        text: "Getting Started",
        link: "/getting-started",
      },
      {
        text: "Benchmark",
        link: "/benchmark",
      },
      {
        text: "Packages",
        link: "/packages",
        items: [
          {
            text: "@klass/core",
            link: "/klass/core",
          },
          {
            text: "@klass/preact",
            link: "/klass/preact",
          },
          {
            text: "@klass/react",
            link: "/klass/react",
          },
          {
            text: "@klass/solid",
            link: "/klass/solid",
          },
        ],
      },
      {
        text: "Examples",
        link: "/examples",
        items: [
          {
            text: "Astro + Tailwind",
            link: "/examples/astro-tailwind",
          },
          {
            text: "Preact + Tailwind",
            link: "/examples/preact-tailwind",
          },
          {
            text: "React + Tailwind",
            link: "/examples/react-tailwind",
          },
          {
            text: "Solid + Tailwind",
            link: "/examples/solid-tailwind",
          },
        ],
      },
    ],
    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2022-present",
    },
  },
});
