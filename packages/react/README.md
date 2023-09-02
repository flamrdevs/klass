<img src="https://klass.pages.dev/cover.png" width="100%" />

<p align="center">
  <h1 align="center">klass</h1>
</p>

<p align="center">
  <a title="license" href="https://github.com/flamrdevs/klass/blob/main/LICENSE">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://none.deno.dev/npm/l?t=dark&n=@klass/react">
      <img alt="license" src="https://none.deno.dev/npm/l?t=light&n=@klass/react" hspace="1">
    </picture>
  </a>
  <a title="version" href="https://www.npmjs.com/package/@klass/react">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://none.deno.dev/npm/v?t=dark&n=@klass/react">
      <img alt="version" src="https://none.deno.dev/npm/v?t=light&n=@klass/react" hspace="1">
    </picture>
  </a>
  <a title="size" href="https://bundlejs.com/?q=@klass/react">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://none.deno.dev/bundlejs/mz?t=dark&n=@klass/react">
      <img alt="size" src="https://none.deno.dev/bundlejs/mz?t=light&n=@klass/react" hspace="1">
    </picture>
  </a>
</p>

# klass react

## Introduction

Class variant utility for React.

## Installation

```bash
npm install @klass/core @klass/react
# or
yarn add @klass/core @klass/react
# or
pnpm add @klass/core @klass/react
```

## Usage

```tsx
import { klassed, reklassed } from "@klass/react";

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

See [docs](https://klass.pages.dev/klass/react.html)

## Authors

- [flamrdevs](https://github.com/flamrdevs)

## License

MIT License
