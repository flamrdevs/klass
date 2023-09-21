# klass preact

<p style="display: flex; gap: 0.2rem;"> 
  <a title="license" href="https://github.com/flamrdevs/klass/blob/main/LICENSE">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://none.deno.dev/npm/l/@klass/preact?t=dark">
      <img alt="license" src="https://none.deno.dev/npm/l/@klass/preact?t=light">
    </picture>
  </a>
  <a title="version" href="https://www.npmjs.com/package/@klass/preact">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://none.deno.dev/npm/v/@klass/preact?t=dark">
      <img alt="version" src="https://none.deno.dev/npm/v/@klass/preact?t=light">
    </picture>
  </a>
  <a title="size" href="https://bundlejs.com/?q=@klass/preact">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://none.deno.dev/bundlejs/mz/@klass/preact?t=dark">
      <img alt="size" src="https://none.deno.dev/bundlejs/mz/@klass/preact?t=light">
    </picture>
  </a>
  <picture title="npm monthly downloads">
    <source media="(prefers-color-scheme: dark)" srcset="https://none.deno.dev/npm/dm/@klass/preact?t=dark">
    <img alt="size" src="https://none.deno.dev/npm/dm/@klass/preact?t=light">
  </picture>
</p>

Class variant utility for preact.

## Installation

```bash
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
