<img src="https://klass.pages.dev/cover.png" width="100%" />

<p align="center">
  <h1 align="center">klass</h1>
</p>

<p align="center">
  <a title="license" href="https://github.com/flamrdevs/klass/blob/main/LICENSE">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://none.deno.dev/npm/l?t=dark&n=@klass/core">
      <img alt="license" src="https://none.deno.dev/npm/l?t=light&n=@klass/core" hspace="1">
    </picture>
  </a>
  <a title="version" href="https://www.npmjs.com/package/@klass/core">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://none.deno.dev/npm/v?t=dark&n=@klass/core">
      <img alt="version" src="https://none.deno.dev/npm/v?t=light&n=@klass/core" hspace="1">
    </picture>
  </a>
  <a title="size" href="https://bundlejs.com/?q=@klass/core">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://none.deno.dev/bundlejs/mz?t=dark&n=@klass/core">
      <img alt="size" src="https://none.deno.dev/bundlejs/mz?t=light&n=@klass/core" hspace="1">
    </picture>
  </a>
</p>

# klass core

## Introduction

Class variant utility library.

## Installation

```bash
npm install @klass/core
# or
yarn add @klass/core
# or
pnpm add @klass/core
```

## Usage

```tsx
import { klass, reklass } from "@klass/core";

const button = klass({
  base: "inline-flex px-4 py-1 rounded-md outline-none text-white",
  variants: {
    color: {
      red: "bg-red-700",
      green: "bg-green-700",
      blue: "bg-blue-700",
    },
    fullWidth: {
      true: "w-full",
    },
  },
  defaultVariants: {
    color: "blue",
  },
});

const box = reklass({
  conditions: {
    base: "",
    sm: "sm:",
    md: "md:",
    lg: "lg:",
  },
  defaultCondition: "base",
  variants: {
    m: {
      xs: "m-1",
      sm: "m-2",
      md: "m-3",
      lg: "m-4",
      xl: "m-5",
    },
    p: {
      xs: "p-1",
      sm: "p-2",
      md: "p-3",
      lg: "p-4",
      xl: "p-5",
    },
  },
});

button({ color: "red", fullWidth: true });
button.variant.color("green");

box({ m: "sm", p: "lg" });
box({ m: { base: "sm", md: "lg" }, p: { base: "xs", md: "xl" } });
box.revariant.m("sm");
box.revariant.p({ base: "xs", md: "xl" });
```

## Documentation

See [docs](https://klass.pages.dev/klass/core.html)

## Authors

- [flamrdevs](https://github.com/flamrdevs)

## License

MIT License
