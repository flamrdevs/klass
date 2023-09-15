# klass core

<p>
  <a title="license" href="https://github.com/flamrdevs/klass/blob/main/LICENSE" target="_blank" style="display: inline-block; margin: 0px 4px;">
    <img alt="license" src="https://none.deno.dev/npm/l/@klass/core" hspace="1">
  </a>
  <a title="version" href="https://www.npmjs.com/package/@klass/core" target="_blank" style="display: inline-block; margin: 0px 4px;">
    <img alt="version" src="https://none.deno.dev/npm/v/@klass/core" hspace="1">
  </a>
  <a title="size" href="https://bundlejs.com/?q=@klass/core" target="_blank" style="display: inline-block; margin: 0px 4px;">
    <img alt="size" src="https://none.deno.dev/bundlejs/mz/@klass/core" hspace="1">
  </a>
</p>

Class variant utility

## Installation

```bash
npm install @klass/core
# or
yarn add @klass/core
# or
pnpm add @klass/core
```

## Usage

### klass

```tsx
import { klass } from "@klass/core";

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

button({ color: "red", fullWidth: true });
// access variant
button.v.color("green");
```

### reklass

```tsx
import { reklass } from "@klass/core";

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

box({ m: "sm", p: "lg" });
box({ m: { base: "sm", md: "lg" }, p: { base: "xs", md: "xl" } });
// access revariant
box.rv.m("sm");
box.rv.p({ base: "xs", md: "xl" });
```

### variant

```tsx
import { variant } from "@klass/core";

const ColorVariant = variant({
  variant: {
    red: "bg-red-700",
    green: "bg-green-700",
    blue: "bg-blue-700",
  },
});

ColorVariant();
ColorVariant("red");
```

### revariant

```tsx
import { revariant } from "@klass/core";

const MarginRevariant = revariant({
  conditions: {
    base: "",
    sm: "sm:",
    md: "md:",
    lg: "lg:",
  },
  defaultCondition: "base",
  variant: {
    xs: "m-1",
    sm: "m-2",
    md: "m-3",
    lg: "m-4",
    xl: "m-5",
  },
});

const PaddingRevariant = revariant({
  conditions: {
    base: "",
    sm: "sm:",
    md: "md:",
    lg: "lg:",
  },
  defaultCondition: "base",
  variant: {
    xs: "p-1",
    sm: "p-2",
    md: "p-3",
    lg: "p-4",
    xl: "p-5",
  },
});

MarginRevariant();
MarginRevariant("sm");

PaddingRevariant();
PaddingRevariant("sm");
```

### with tailwind-merge

```tsx
import { klass, reklass } from "@klass/core";

import { twMerge } from "tailwind-merge";

const button = klass(
  {
    /* your options */
  },
  {
    it: twMerge,
  }
);

const box = reklass(
  {
    /* your options */
  },
  {
    it: twMerge,
  }
);
```
