<img src="https://klass.pages.dev/cover.png" width="100%" />

# klass

## Introduction

Class variant utility library.

## Features

- Base and variants
- Compound variants
- Conditional variants
- Framework-agnostic
- TypeScript support
- Styled-component-like API (React, Preact & Solid)
- Polymorphic components (React, Preact & Solid)

## Packages

- [@klass/core](./packages/core) - Core API
- [@klass/react](./packages/react) - [React](https://reactjs.org) package
- [@klass/preact](./packages/preact) - [Preact](https://preactjs.com) package
- [@klass/solid](./packages/solid) - [Solid](https://www.solidjs.com) package

## Roadmap

- [x] Variants
- [x] Compound variants
- [x] Conditional variants

## Examples

### Core

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

### Preact / React / Solid

```tsx
import { klassed, reklassed } from "@klass/{preact,react,solid}";

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

## Inspiration

Some of the core concepts and designs are inspired by

- [class-variance-authority](https://github.com/joe-bell/cva)
- [vanilla-extract](https://github.com/vanilla-extract-css/vanilla-extract)
- [stitches](https://github.com/stitchesjs/stitches)

## Authors

- [flamrdevs](https://github.com/flamrdevs)

## License

[MIT License](./LICENSE)
