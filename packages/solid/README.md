<img src="https://klass.pages.dev/cover.png" width="100%" />

<p align="center">
  <h1 align="center">klass</h1>
</p>

<p align="center">
  <a title="license" href="https://github.com/flamrdevs/klass/blob/main/LICENSE">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://none.deno.dev/npm/l/@klass/solid?t=dark">
      <img alt="license" src="https://none.deno.dev/npm/l/@klass/solid?t=light" hspace="1">
    </picture>
  </a>
  <a title="version" href="https://www.npmjs.com/package/@klass/solid">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://none.deno.dev/npm/v/@klass/solid?t=dark">
      <img alt="version" src="https://none.deno.dev/npm/v/@klass/solid?t=light" hspace="1">
    </picture>
  </a>
  <a title="size" href="https://bundlejs.com/?q=@klass/solid">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://none.deno.dev/bundlejs/mz/@klass/solid?t=dark">
      <img alt="size" src="https://none.deno.dev/bundlejs/mz/@klass/solid?t=light" hspace="1">
    </picture>
  </a>
  <picture title="npm monthly downloads">
    <source media="(prefers-color-scheme: dark)" srcset="https://none.deno.dev/npm/dm/@klass/solid?t=dark">
    <img alt="size" src="https://none.deno.dev/npm/dm/@klass/solid?t=light" hspace="1">
  </picture>
</p>

# klass solid

## Introduction

Class variant utility for Solid.

## Installation

```bash
npm install @klass/core @klass/solid
# or
yarn add @klass/core @klass/solid
# or
pnpm add @klass/core @klass/solid
```

## Usage

```tsx
import { klassed, reklassed } from "@klass/solid";

const Button = klassed(
  "button",
  {
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

export const Example = () => {
  return (
    <Box m={{ base: "xs", md: "xl" }} p="md">
      <Box as="section">
        <Button color="red" fullWidth>
          Red Full Width Button
        </Button>
      </Box>

      <Box as="section">
        <Button as="a" color="green">
          Green Anchor Button
        </Button>
      </Box>
    </Box>
  );
};
```

## Documentation

See [docs](https://klass.pages.dev/klass/solid.html)

## Authors

- [flamrdevs](https://github.com/flamrdevs)

## License

MIT License
