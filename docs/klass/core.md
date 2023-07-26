# klass core

<p>
  <a title="license" href="https://github.com/flamrdevs/klass/blob/main/LICENSE" target="_blank" style="display: inline-block; margin: 0px 4px;">
    <img alt="license" src="https://flamrdevs.cyclic.app/core/badge?v=MIT" hspace="1">
  </a>
  <a title="version" href="https://www.npmjs.com/package/@klass/core" target="_blank" style="display: inline-block; margin: 0px 4px;">
    <img alt="version" src="https://flamrdevs.cyclic.app/npm/version?n=@klass/core" hspace="1">
  </a>
  <a title="size" href="https://bundlejs.com/?q=@klass/core" target="_blank" style="display: inline-block; margin: 0px 4px;">
    <img alt="size" src="https://flamrdevs.cyclic.app/bundlejs/size?n=@klass/core" hspace="1">
  </a>
</p>

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
