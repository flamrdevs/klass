<img src="https://klass.pages.dev/cover.svg" width="100%" />

<p>
  <h1 align="center">klass</h1>
</p>

<p align="center">
  <a title="license" href="https://github.com/flamrdevs/klass/blob/main/LICENSE">
    <img title="license" alt="license" src="https://klass.deno.dev/pkg/l/core" hspace="1">
  </a>
  <a title="version" href="https://www.npmjs.com/package/@klass/core">
    <img title="version" alt="version" src="https://klass.deno.dev/pkg/v/core" hspace="1">
  </a>
  <a title="size" href="https://bundlejs.com/?q=@klass/core">
    <img title="size" alt="size" src="https://klass.deno.dev/pkg/mz/core" hspace="1">
  </a>
  <img title="npm monthly downloads" alt="downloads" src="https://klass.deno.dev/pkg/dm/core" hspace="1">
</p>

# @klass/core

## Introduction

Class variant utility

## Documentation

<a title="getting-started" href="https://klass.pages.dev">
  <img title="getting-started" alt="license" src="https://klass.deno.dev/ui/button/lucide/rocket?text=Getting%20started" hspace="1">
</a>

## Installation

```sh
npm install @klass/core
# or
yarn add @klass/core
# or
pnpm add @klass/core
# or
bun add @klass/core
```

## Usage

```tsx
import { klass, reklass } from "@klass/core";

const button = klass({
  base: "inline-flex items-center justify-center rounded-md outline-none",
  variants: {
    color: {
      default: "bg-neutral-700 text-white",
      primary: "bg-indigo-700 text-white",
      secondary: "bg-orange-700 text-white",
    },
    size: {
      sm: "px-3 py-0.5 h-7 text-sm font-medium",
      md: "px-4 py-1 h-8 text-base font-medium",
      lg: "px-5 py-1.5 h-9 text-lg font-semibold",
    },
    block: {
      true: "w-full",
    },
  },
  defaults: {
    color: "default",
    size: "md",
  },
});

const box = reklass({
  conditions: [
    {
      base: "",
      sm: "sm:",
      md: "md:",
      lg: "lg:",
      xl: "xl:",
      "2xl": "2xl:",
    },
    "base",
  ],
  variants: {
    m: {
      "0": "m-0",
      "1": "m-1",
      "2": "m-2",
      "3": "m-3",
      "4": "m-4",
      "5": "m-5",
      "6": "m-6",
      "7": "m-7",
      "8": "m-8",
    },
    p: {
      "0": "p-0",
      "1": "p-1",
      "2": "p-2",
      "3": "p-3",
      "4": "p-4",
      "5": "p-5",
      "6": "p-6",
      "7": "p-7",
      "8": "p-8",
    },
  },
});

button({ color: "primary", block: true }); // "inline-flex items-center justify-center rounded-md outline-none bg-indigo-700 text-white px-4 py-1 h-8 text-base font-medium w-full"
// access variant
button.g.color("primary"); // "bg-indigo-700 text-white"

box({ m: "1", p: "2" }); // "m-1 p-1"
box({ m: { base: "1", md: "2" }, p: { base: "1", md: "2" } }); // "m-1 md:m-2 p-1 md:p-2"
// access revariant
box.g.m("1"); // "m-1";
box.g.p({ base: "1", md: "2" }); // "p-1 md:p-2"
```

## Authors

<p>
  <a title="github" href="https://github.com/flamrdevs">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://flamrdevs.pages.dev/badge/dark.svg">
      <img alt="github" src="https://flamrdevs.pages.dev/badge/light.svg" hspace="1">
    </picture>
  </a>
</p>

## License

[MIT License](https://github.com/flamrdevs/klass/blob/main/LICENSE)
