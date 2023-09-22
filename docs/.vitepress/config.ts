import type { UserConfig } from "vitepress";

export default {
  lang: "en-US",
  title: "klass",
  description: "Class variant utility",
  head: [
    ["meta", { property: "og:type", content: "website" }],
    ["meta", { property: "og:url", content: "https://klass.pages.dev" }],
    ["meta", { property: "og:title", content: "klass" }],
    ["meta", { property: "og:description", content: "Class variant utility" }],
    ["meta", { property: "og:image", content: "https://klass.pages.dev/cover.png" }],
    ["meta", { property: "twitter:card", content: "summary_large_image" }],
    ["meta", { property: "twitter:url", content: "https://klass.pages.dev" }],
    ["meta", { property: "twitter:title", content: "klass" }],
    ["meta", { property: "twitter:description", content: "Class variant utility" }],
    ["meta", { property: "twitter:image", content: "https://klass.pages.dev/cover.png" }],
  ],
  lastUpdated: true,
  sitemap: {
    hostname: "https://klass.pages.dev",
  },
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
            text: "Astro + Tailwind Daisy UI",
            link: "/examples/astro-tailwind-daisyui",
          },
          {
            text: "Astro + Tailwind Ripple UI",
            link: "/examples/astro-tailwind-rippleui",
          },
          {
            text: "Preact + Tailwind",
            link: "/examples/preact-tailwind",
          },
          {
            text: "Qwik + Tailwind",
            link: "/examples/qwik-tailwind",
          },
          {
            text: "React + Tailwind",
            link: "/examples/react-tailwind",
          },
          {
            text: "Solid + Tailwind",
            link: "/examples/solid-tailwind",
          },
          {
            text: "Svelte + Tailwind",
            link: "/examples/svelte-tailwind",
          },
          {
            text: "Vue + Tailwind",
            link: "/examples/vue-tailwind",
          },
          {
            text: "Astro + Uno",
            link: "/examples/astro-uno",
          },
          {
            text: "Astro + Master",
            link: "/examples/astro-master",
          },
          {
            text: "Preact + Master",
            link: "/examples/preact-master",
          },
          {
            text: "React + Master",
            link: "/examples/react-master",
          },
          {
            text: "Solid + Master",
            link: "/examples/solid-master",
          },
        ],
      },
    ],
    aside: true,
    outline: "deep",
    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2022-present",
    },
  },
} as UserConfig;
