# klass react

<p>
  <a title="license" href="https://github.com/flamrdevs/klass/blob/main/LICENSE" target="_blank" style="display: inline-block; margin: 0px 4px;">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://flamrdevs.cyclic.app/core/badge?t=dark&v=MIT">
      <img alt="license" src="https://flamrdevs.cyclic.app/core/badge?t=light&v=MIT" hspace="1">
    </picture>
  </a>
  <a title="version" href="https://www.npmjs.com/package/@klass/react" target="_blank" style="display: inline-block; margin: 0px 4px;">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://flamrdevs.cyclic.app/npm/version?t=dark&n=@klass/react">
      <img alt="version" src="https://flamrdevs.cyclic.app/npm/version?t=light&n=@klass/react" hspace="1">
    </picture>
  </a>
  <a title="size" href="https://bundlejs.com/?q=@klass/react" target="_blank" style="display: inline-block; margin: 0px 4px;">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://flamrdevs.cyclic.app/bundlejs/size?t=dark&n=@klass/react">
      <img alt="size" src="https://flamrdevs.cyclic.app/bundlejs/size?t=light&n=@klass/react" hspace="1">
    </picture>
  </a>
</p>

Class variant utility library for react.

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
