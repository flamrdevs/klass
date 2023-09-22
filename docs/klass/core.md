# klass core

<p style="display: flex; gap: 0.2rem;"> 
  <a title="license" href="https://github.com/flamrdevs/klass/blob/main/LICENSE">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://none.deno.dev/npm/l/@klass/core?t=dark">
      <img alt="license" src="https://none.deno.dev/npm/l/@klass/core?t=light">
    </picture>
  </a>
  <a title="version" href="https://www.npmjs.com/package/@klass/core">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://none.deno.dev/npm/v/@klass/core?t=dark">
      <img alt="version" src="https://none.deno.dev/npm/v/@klass/core?t=light">
    </picture>
  </a>
  <a title="size" href="https://bundlejs.com/?q=@klass/core">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://none.deno.dev/bundlejs/mz/@klass/core?t=dark">
      <img alt="size" src="https://none.deno.dev/bundlejs/mz/@klass/core?t=light">
    </picture>
  </a>
  <picture title="npm monthly downloads">
    <source media="(prefers-color-scheme: dark)" srcset="https://none.deno.dev/npm/dm/@klass/core?t=dark">
    <img alt="size" src="https://none.deno.dev/npm/dm/@klass/core?t=light">
  </picture>
</p>

Class variant utility

## Installation

::: code-group

```sh [npm]
npm install @klass/core
```

```sh [yarn]
yarn add @klass/core
```

```sh [pnpm]
pnpm add @klass/core
```

```sh [bun]
bun add @klass/core
```

:::

## Usage

### klass

klass allows you to create a variants based component.

```tsx
import { klass } from "@klass/core";

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
    // "class" variant are not allowed // [!code error]
  },
  defaultVariants: {
    color: "default",
    size: "md",
  },
});

button({ color: "primary", block: true }); // "inline-flex items-center justify-center rounded-md outline-none bg-indigo-700 text-white px-4 py-1 h-8 text-base font-medium w-full"
// access variant
button.v.color("primary"); // "bg-indigo-700 text-white"
button.v.size("lg"); // "px-5 py-1.5 h-9 text-lg font-semibold"
button.v.block(true); // "w-full"
// access options
button.o; // klass(/* options */)
// access variants keys
button.vk; // ["color", "size", "block"]
```

#### compound variants

```tsx
import { klass } from "@klass/core";

const button = klass({
  base: "...",
  variants: {
    color: {
      default: "...",
      primary: "...",
      secondary: "...",
    },
    size: {
      sm: "...",
      md: "...",
      lg: "...",
    },
    block: {
      true: "...",
    },
    variant: {
      filled: "...",
      outlined: "...",
    },
  },
  defaultVariants: {
    color: "default",
    size: "md",
  },
  compoundVariants: [
    {
      color: "default",
      variant: "filled",
      class: "...",
    },
    {
      color: "primary",
      variant: "filled",
      class: "...",
    },
    {
      color: "secondary",
      variant: "filled",
      class: "...",
    },
    {
      color: "default",
      variant: "outlined",
      class: "...",
    },
    {
      color: "primary",
      variant: "outlined",
      class: "...",
    },
    {
      color: "secondary",
      variant: "outlined",
      class: "...",
    },
  ],
});
```

#### with tailwind-merge

```tsx
import { klass } from "@klass/core";

import { twMerge } from "tailwind-merge";

const button = klass(
  {
    /* options */
  },
  {
    it: twMerge, // or it: (result) => twMerge(result)
  }
);
```

### reklass

`reklass` -> `re-klass`, stands for Responsive Klass, allows you to create a styled-system-like variants, so there will be no `defaultProps` and `compoundVariants`.

::: info
There is no transformer tool available for responsive variants, so if you are using TailwindCSS, you will need to manually include all possible class names in the safelist.
:::

```tsx
import { reklass } from "@klass/core";

const box = reklass({
  conditions: {
    base: "",
    sm: "sm:",
    md: "md:",
    lg: "lg:",
    xl: "xl:",
    "2xl": "2xl:",
  },
  defaultCondition: "base",
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

box({ m: "1", p: "2" }); // "m-1 p-1"
box({ m: { base: "1", md: "2" }, p: { base: "1", md: "2" } }); // "m-1 md:m-2 p-1 md:p-2"
// access revariant
box.rv.m("1"); // "m-1";
box.rv.p({ base: "1", md: "2" }); // "p-1 md:p-2"
// access options
box.o; // reklass(/* options */)
// access variants keys
box.rvk; // ["m", "p"]
```

#### with tailwind-merge

```tsx
import { reklass } from "@klass/core";

import { twMerge } from "tailwind-merge";

const box = reklass(
  {
    /* options */
  },
  {
    it: twMerge, // or it: (result) => twMerge(result)
  }
);
```

### group

Group allows you to create `KlassFn` grouply, which means it will be the same in typing(TypeScript)

```tsx
import group from "@klass/core/group";

const { root, header, body, footer } = group({
  base: {
    root: "relative overflow-hidden",
    header: "flex justify-between",
    body: "relative overflow-hidden",
    footer: "flex justify-between",
  },
  variants: {
    color: {
      red: {
        root: "bg-red-200",
        body: "bg-red-100",
      },
      green: {
        root: "bg-green-200",
        body: "bg-green-100",
      },
      blue: {
        root: "bg-blue-200",
        body: "bg-blue-100",
      },
    },
    size: {
      sm: {
        root: "px-2 py-0.5",
        header: "px-0.5",
        body: "px-1 py-0.5",
        footer: "px-0.5",
      },
      md: {
        root: "px-3 py-1",
        header: "px-1",
        body: "px-2 py-1",
        footer: "px-1",
      },
      lg: {
        root: "px-6 py-2",
        header: "px-2",
        body: "px-4 py-2",
        footer: "px-2",
      },
    },
    disabled: {
      true: {
        root: "opacity-80",
      },
    },
  },
  defaultVariants: {
    color: "blue",
    size: "md",
  },
  compoundVariants: [
    {
      color: "red",
      disabled: true,
      class: {
        root: "bg-red-100",
      },
    },
    {
      color: "green",
      disabled: true,
      class: {
        root: "bg-green-100",
      },
    },
    {
      color: "blue",
      disabled: true,
      class: {
        root: "bg-blue-100",
      },
    },
  ],
});

root({ disabled: true }); // "relative overflow-hidden bg-blue-200 px-3 py-1 opacity-80 bg-blue-100"
header({ disabled: true }); // "flex justify-between px-1"
body({ disabled: true }); // "relative overflow-hidden bg-blue-100 px-2 py-1"
footer({ disabled: true }); // "flex justify-between px-1"
```

#### with tailwind-merge

```tsx
import group from "@klass/core/group";

import { twMerge } from "tailwind-merge";

const { root, header, body, footer } = group(
  {
    /* options */
  },
  {
    it: twMerge, // or it: (result) => twMerge(result)
  }
);
```

### slots

Slots also allows you to create `KlassFn` grouply, but return `SlotsFn` instead of `Record<string, KlassFn>`

```tsx
import slots from "@klass/core/slots";

const card = slots({
  base: {
    root: "relative overflow-hidden",
    header: "flex justify-between",
    body: "relative overflow-hidden",
    footer: "flex justify-between",
  },
  variants: {
    color: {
      red: {
        root: "bg-red-200",
        body: "bg-red-100",
      },
      green: {
        root: "bg-green-200",
        body: "bg-green-100",
      },
      blue: {
        root: "bg-blue-200",
        body: "bg-blue-100",
      },
    },
    size: {
      sm: {
        root: "px-2 py-0.5",
        header: "px-0.5",
        body: "px-1 py-0.5",
        footer: "px-0.5",
      },
      md: {
        root: "px-3 py-1",
        header: "px-1",
        body: "px-2 py-1",
        footer: "px-1",
      },
      lg: {
        root: "px-6 py-2",
        header: "px-2",
        body: "px-4 py-2",
        footer: "px-2",
      },
    },
    disabled: {
      true: {
        root: "opacity-80",
      },
    },
  },
  defaultVariants: {
    color: "blue",
    size: "md",
  },
  compoundVariants: [
    {
      color: "red",
      disabled: true,
      class: {
        root: "bg-red-100",
      },
    },
    {
      color: "green",
      disabled: true,
      class: {
        root: "bg-green-100",
      },
    },
    {
      color: "blue",
      disabled: true,
      class: {
        root: "bg-blue-100",
      },
    },
  ],
});

const { root, header, body, footer } = card({ color: "green" });

root({ disabled: true }); // "relative overflow-hidden bg-green-200 px-3 py-1 opacity-80 bg-green-100"
header({ disabled: true }); // "flex justify-between px-1"
body({ disabled: true }); // "relative overflow-hidden bg-green-100 px-2 py-1"
footer({ disabled: true }); // "flex justify-between px-1"
```

#### with tailwind-merge

```tsx
import slots from "@klass/core/slots";

import { twMerge } from "tailwind-merge";

const card = slots(
  {
    /* options */
  },
  {
    it: twMerge, // or it: (result) => twMerge(result)
  }
);
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

ColorVariant(); // undefined
ColorVariant("red"); // ""
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
    xl: "xl:",
    "2xl": "2xl:",
  },
  defaultCondition: "base",
  variant: {
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
});

const PaddingRevariant = revariant({
  conditions: {
    base: "",
    sm: "sm:",
    md: "md:",
    lg: "lg:",
    xl: "xl:",
    "2xl": "2xl:",
  },
  defaultCondition: "base",
  variant: {
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
});

MarginRevariant(); // ""
MarginRevariant("2"); // "m-1"

PaddingRevariant(); // ""
PaddingRevariant("2"); // "p-1"
```
