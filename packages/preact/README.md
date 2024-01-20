<img src="https://klass.pages.dev/cover.png" width="100%" />

<p>
  <h1 align="center">klass</h1>
</p>

<p align="center">
  <a title="license" href="https://github.com/flamrdevs/klass/blob/main/LICENSE">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://none.deno.dev/npm/l/@klass/preact?t=dark">
      <img alt="license" src="https://none.deno.dev/npm/l/@klass/preact?t=light" hspace="1">
    </picture>
  </a>
  <a title="version" href="https://www.npmjs.com/package/@klass/preact">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://none.deno.dev/npm/v/@klass/preact?t=dark">
      <img alt="version" src="https://none.deno.dev/npm/v/@klass/preact?t=light" hspace="1">
    </picture>
  </a>
  <a title="size" href="https://bundlejs.com/?q=@klass/preact">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://none.deno.dev/bundlejs/mz/@klass/preact?t=dark">
      <img alt="size" src="https://none.deno.dev/bundlejs/mz/@klass/preact?t=light" hspace="1">
    </picture>
  </a>
  <picture title="npm monthly downloads">
    <source media="(prefers-color-scheme: dark)" srcset="https://none.deno.dev/npm/dm/@klass/preact?t=dark">
    <img alt="size" src="https://none.deno.dev/npm/dm/@klass/preact?t=light" hspace="1">
  </picture>
</p>

# klass preact

## Introduction

Class variant utility for Preact.

## Installation

```sh
npm install @klass/core @klass/preact
# or
yarn add @klass/core @klass/preact
# or
pnpm add @klass/core @klass/preact
# or
bun add @klass/core @klass/preact
```

## Usage

```tsx
import { klassed, reklassed } from "@klass/preact";

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
      // "class" variant are not allowed
      // "className" variant are not allowed
    },
    defaults: {
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

## Documentation

<p>
  <a title="docs" href="https://klass.pages.dev/klass/preact.html">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://none.deno.dev/ui/button/lucide?t=dark&i=external-link&e=Docs">
      <img alt="docs" src="https://none.deno.dev/ui/button/lucide?t=light&i=external-link&e=Docs" hspace="1">
    </picture>
  </a>
</p>

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
