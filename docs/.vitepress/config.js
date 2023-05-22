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
          {
            text: "Responsive",
            link: "/responsive",
          },
          {
            text: "Typescript",
            link: "/typescript",
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
      {
        text: "Examples",
        items: [
          {
            text: "React",
            items: [
              {
                text: "Router + TailwindCSS",
                link: "/example/react-router-tailwindcss",
              },
              {
                text: "TailwindCSS",
                link: "/example/react-tailwindcss",
              },
              {
                text: "TailwindCSS + DaisyUI",
                link: "/example/react-tailwindcss-daisy-ui",
              },
              {
                text: "TailwindCSS + RippleUI",
                link: "/example/react-tailwindcss-ripple-ui",
              },
              {
                text: "UnoCSS",
                link: "/example/react-unocss",
              },
              {
                text: "WindiCSS",
                link: "/example/react-windicss",
              },
            ],
          },
          {
            text: "Preact",
            items: [
              {
                text: "Router + TailwindCSS",
                link: "/example/preact-router-tailwindcss",
              },
              {
                text: "TailwindCSS",
                link: "/example/preact-tailwindcss",
              },
              {
                text: "TailwindCSS + DaisyUI",
                link: "/example/preact-tailwindcss-daisy-ui",
              },
              {
                text: "TailwindCSS + RippleUI",
                link: "/example/preact-tailwindcss-ripple-ui",
              },
              {
                text: "UnoCSS",
                link: "/example/preact-unocss",
              },
              {
                text: "WindiCSS",
                link: "/example/preact-windicss",
              },
            ],
          },
          {
            text: "Solid",
            items: [
              {
                text: "Router + TailwindCSS",
                link: "/example/solid-router-tailwindcss",
              },
              {
                text: "TailwindCSS",
                link: "/example/solid-tailwindcss",
              },
              {
                text: "TailwindCSS + DaisyUI",
                link: "/example/solid-tailwindcss-daisy-ui",
              },
              {
                text: "TailwindCSS + RippleUI",
                link: "/example/solid-tailwindcss-ripple-ui",
              },
              {
                text: "UnoCSS",
                link: "/example/solid-unocss",
              },
              {
                text: "WindiCSS",
                link: "/example/solid-windicss",
              },
            ],
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
