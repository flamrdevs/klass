# klass solid

<p style="display: flex; gap: 0.2rem;"> 
  <a title="license" href="https://github.com/flamrdevs/klass/blob/main/LICENSE">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://none.deno.dev/npm/l/@klass/solid?t=dark">
      <img alt="license" src="https://none.deno.dev/npm/l/@klass/solid?t=light">
    </picture>
  </a>
  <a title="version" href="https://www.npmjs.com/package/@klass/solid">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://none.deno.dev/npm/v/@klass/solid?t=dark">
      <img alt="version" src="https://none.deno.dev/npm/v/@klass/solid?t=light">
    </picture>
  </a>
  <a title="size" href="https://bundlejs.com/?q=@klass/solid">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://none.deno.dev/bundlejs/mz/@klass/solid?t=dark">
      <img alt="size" src="https://none.deno.dev/bundlejs/mz/@klass/solid?t=light">
    </picture>
  </a>
  <picture title="npm monthly downloads">
    <source media="(prefers-color-scheme: dark)" srcset="https://none.deno.dev/npm/dm/@klass/solid?t=dark">
    <img alt="size" src="https://none.deno.dev/npm/dm/@klass/solid?t=light">
  </picture>
</p>

Class variant utility for solid.

## Installation

::: code-group

```sh [npm]
npm install @klass/core @klass/solid
```

```sh [yarn]
yarn add @klass/core @klass/solid
```

```sh [pnpm]
pnpm add @klass/core @klass/solid
```

```sh [bun]
bun add @klass/core @klass/solid
```

:::

## Usage

```tsx
import { klassed, reklassed } from "@klass/solid";

const Button = klassed(
  "button",
  {
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
      // "class" variants are not allowed // [!code error]
      // "classList" variants are not allowed // [!code error]
    },
    defaultVariants: {
      color: "default",
      size: "md",
    },
  },
  {
    // default props
    dp: {
      type: "button",
    },
  }
);

const Box = reklassed("div", {
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

const App = () => {
  return (
    <Box m={{ base: "1", md: "2" }} p="2">
      <Box as="section">
        <Button color="primary" block>
          Primary Block Button
        </Button>
      </Box>

      <Box as="section">
        <Button as="a" color="secondary">
          Secondary Anchor Button
        </Button>
      </Box>
    </Box>
  );
};

export default App;
```

### with tailwind-merge

```tsx
import { klassed, reklassed } from "@klass/solid";

import { twMerge } from "tailwind-merge";

const Button = klassed(
  "button",
  {
    /* options */
  },
  {
    it: twMerge, // or it: (result) => twMerge(result)
  }
);

const Box = reklassed(
  "div",
  {
    /* options */
  },
  {
    it: twMerge, // or it: (result) => twMerge(result)
  }
);
```
