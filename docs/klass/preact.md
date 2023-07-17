<p>
  <a href="https://www.npmjs.com/package/@klass/preact" style="display: inline-block; margin: 0px 4px;"><img src="https://badgen.net/npm/v/@klass/preact"></a>
  <a href="https://bundlephobia.com/package/@klass/preact" style="display: inline-block; margin: 0px 4px;"><img src="https://badgen.net/bundlephobia/minzip/@klass/preact"></a>
  <a href="https://www.npmjs.com/package/@klass/preact" style="display: inline-block; margin: 0px 4px;"><img src="https://badgen.net/npm/license/@klass/preact"></a>
</p>

# klass preact

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
