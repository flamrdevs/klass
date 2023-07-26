<img src="https://klass.pages.dev/cover.png" width="100%" />

<p align="center">
  <h1 align="center">klass</h1>
</p>

<p align="center">
  <a title="license" href="https://github.com/flamrdevs/klass/blob/main/LICENSE">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://flamrdevs.cyclic.app/core/badge?t=dark&v=MIT">
      <img alt="license" src="https://flamrdevs.cyclic.app/core/badge?t=light&v=MIT" hspace="1">
    </picture>
  </a>
  <a title="version" href="https://www.npmjs.com/package/@klass/preact">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://flamrdevs.cyclic.app/npm/version?t=dark&n=@klass/preact">
      <img alt="version" src="https://flamrdevs.cyclic.app/npm/version?t=light&n=@klass/preact" hspace="1">
    </picture>
  </a>
  <a title="size" href="https://bundlejs.com/?q=@klass/preact">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://flamrdevs.cyclic.app/bundlejs/size?t=dark&n=@klass/preact">
      <img alt="size" src="https://flamrdevs.cyclic.app/bundlejs/size?t=light&n=@klass/preact" hspace="1">
    </picture>
  </a>
</p>

# klass preact

## Introduction

Class variant utility library for preact.

## Installation

```bash
npm install @klass/core @klass/preact
# or
yarn add @klass/core @klass/preact
# or
pnpm add @klass/core @klass/preact
```

## Usage

```tsx
import { klassed, reklassed } from "@klass/preact";

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

See [docs](httpshttps://klass.pages.dev/klass/preact.html)

## Authors

- [flamrdevs](https://github.com/flamrdevs)

## License

MIT License
