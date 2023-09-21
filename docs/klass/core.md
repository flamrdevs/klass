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

```bash
npm install @klass/core
# or
yarn add @klass/core
# or
pnpm add @klass/core
# or
bun add @klass/core
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

### group

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

root({ disabled: true });
header({ disabled: true });
body({ disabled: true });
footer({ disabled: true });
```

### slots

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

root({ disabled: true });
header({ disabled: true });
body({ disabled: true });
footer({ disabled: true });
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
