<p>
  <a href="https://www.npmjs.com/package/@klass/solid" style="display: inline-block; margin: 0px 4px;"><img src="https://badgen.net/npm/v/@klass/solid"></a>
  <a href="https://bundlephobia.com/package/@klass/solid" style="display: inline-block; margin: 0px 4px;"><img src="https://badgen.net/bundlephobia/minzip/@klass/solid"></a>
  <a href="https://www.npmjs.com/package/@klass/solid" style="display: inline-block; margin: 0px 4px;"><img src="https://badgen.net/npm/license/@klass/solid"></a>
</p>

# klass solid

A class variant utility library for solid.

## Installation

```bash
npm install @klass/core @klass/solid
# or
yarn add @klass/core @klass/solid
# or
pnpm add @klass/core @klass/solid
```

## Klassed and Reklassed

```tsx
import { klassed, reklassed } from "@klass/solid";

const Button = klassed(
  "button",
  {
    base: "button--base",
    variants: {
      color: {
        primary: "button--color-primary",
        neutral: "button--color-neutral",
      },
      size: {
        sm: "button--size-sm",
        md: "button--size-md",
        lg: "button--size-lg",
      },
      outline: {
        true: "",
      },
    },
    defaultVariants: {
      color: "primary",
      size: "md",
    },
    compoundVariants: [
      {
        color: "primary",
        outline: true,
        class: "button--primary-primary-&-outline-true",
      },
      {
        color: "neutral",
        outline: true,
        class: "button--primary-neutral-&-outline-true",
      },
    ],
  },
  {
    defaultProps: {
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
      none: "m-0",
      sm: "m-2",
      md: "m-4",
      lg: "m-8",
    },
    p: {
      none: "p-0",
      sm: "p-2",
      md: "p-4",
      lg: "p-8",
    },
  },
});

// Re-use klass options
const ButtonAnchor = klassed("a", Button.klass.options);

function App() {
  return (
    <div>
      <Button color="neutral" class={["extra", { classes: true }]}>
        Button
      </Button>

      <Box m="md" p="md" class={["extra", { classes: true }]}>
        Box
      </Box>

      <ButtonAnchor color="neutral" class={["extra", { classes: true }]}>
        ButtonAnchor
      </ButtonAnchor>

      <Button as="a" class={["extra", { classes: true }]}>
        Button as Anchor
      </Button>
    </div>
  );
}
```

## VariantsOf

```tsx
import type { VariantsOf } from "@klass/core";
import { klassed, reklassed } from "@klass/solid";

type ButtonVariants = VariantsOf<(typeof Button)["klass"]>;

const Button = klassed("button", {
  ...{
    /* options */
  },
});

type BoxVariants = VariantsOf<(typeof Box)["reklass"]>;

const Box = reklassed("div", {
  ...{
    /* options */
  },
});
```

## Polymorphic

```tsx
import KlassedButton from "./KlassedButton";
import ReklassedBox from "./ReklassedBox";

import Link from "some-link-component-library";

function App() {
  return (
    <ReklassedBox as="nav">
      <KlassedButton as={Link} href="/">
        Home
      </KlassedButton>
      <KlassedButton as={Link} href="/about">
        About
      </KlassedButton>
      <KlassedButton as={Link} href="/contact">
        Contact
      </KlassedButton>
    </ReklassedBox>
  );
}
```
