export default {
  title: "klass",
  description: "class variant utility.",
  head: [
    ["meta", { property: "og:type", content: "website" }],
    ["meta", { property: "og:url", content: "https://klass-style.vercel.app/" }],
    ["meta", { property: "og:title", content: "klass | klass" }],
    ["meta", { property: "og:description", content: "class variant utility." }],
    ["meta", { property: "og:image", content: "https://github.com/flamrdevs/klass/tree/main/public/cover.png" }],
    ["meta", { property: "twitter:card", content: "summary_large_image" }],
    ["meta", { property: "twitter:url", content: "https://klass-style.vercel.app/" }],
    ["meta", { property: "twitter:title", content: "klass | klass" }],
    ["meta", { property: "twitter:description", content: "class variant utility." }],
    ["meta", { property: "twitter:image", content: "https://github.com/flamrdevs/klass/tree/main/public/cover.png" }],
  ],
  themeConfig: {
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/flamrdevs/klass",
      },
    ],
    sidebar: [
      {
        text: "Guide",
        items: [
          {
            text: "intro",
            link: "/intro",
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
            text: "React Router + TailwindCSS",
            link: "/example/react-router-tailwindcss",
          },
          {
            text: "React TailwindCSS",
            link: "/example/react-tailwindcss",
          },
          {
            text: "React TailwindCSS + DaisyUI",
            link: "/example/react-tailwindcss-daisy-ui",
          },
          {
            text: "React TailwindCSS + RippleUI",
            link: "/example/react-tailwindcss-ripple-ui",
          },
          {
            text: "Preact Router + TailwindCSS",
            link: "/example/preact-router-tailwindcss",
          },
          {
            text: "Preact TailwindCSS",
            link: "/example/preact-tailwindcss",
          },
          {
            text: "Preact TailwindCSS + DaisyUI",
            link: "/example/preact-tailwindcss-daisy-ui",
          },
          {
            text: "Preact TailwindCSS + RippleUI",
            link: "/example/preact-tailwindcss-ripple-ui",
          },
          {
            text: "Solid Router + TailwindCSS",
            link: "/example/solid-router-tailwindcss",
          },
          {
            text: "Solid TailwindCSS",
            link: "/example/solid-tailwindcss",
          },
          {
            text: "Solid TailwindCSS + DaisyUI",
            link: "/example/solid-tailwindcss-daisy-ui",
          },
          {
            text: "Solid TailwindCSS + RippleUI",
            link: "/example/solid-tailwindcss-ripple-ui",
          },
          {
            text: "React UnoCSS",
            link: "/example/react-unocss",
          },
          {
            text: "Preact UnoCSS",
            link: "/example/preact-unocss",
          },
          {
            text: "Solid UnoCSS",
            link: "/example/solid-unocss",
          },
          {
            text: "React WindiCSS",
            link: "/example/react-windicss",
          },
          {
            text: "Preact WindiCSS",
            link: "/example/preact-windicss",
          },
          {
            text: "Solid WindiCSS",
            link: "/example/solid-windicss",
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
