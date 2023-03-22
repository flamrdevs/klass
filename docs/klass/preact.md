<p>
  <a href="https://www.npmjs.com/package/@klass/preact" style="display: inline-block; margin: 0px 4px;"><img src="https://badgen.net/npm/v/@klass/preact"></a>
  <a href="https://bundlephobia.com/package/@klass/preact" style="display: inline-block; margin: 0px 4px;"><img src="https://badgen.net/bundlephobia/minzip/@klass/preact"></a>
  <a href="https://www.npmjs.com/package/@klass/preact" style="display: inline-block; margin: 0px 4px;"><img src="https://badgen.net/npm/license/@klass/preact"></a>
</p>

# klass preact

A class variant utility library for preact.

## Installation

```bash
npm install @klass/core @klass/preact
# or
yarn add @klass/core @klass/preact
# or
pnpm add @klass/core @klass/preact
```

## Klassed and Reklassed

```tsx
import { klassed, reklassed } from "@klass/preact";

const Button = klassed(
  "button",
  {
    base: "button__base",
    variants: {
      color: {
        primary: "button__color-primary",
        neutral: "button__color-neutral",
      },
      size: {
        sm: "button__size-sm",
        md: "button__size-md",
        lg: "button__size-lg",
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
        class: "button__primary-primary__outline-true",
      },
      {
        color: "neutral",
        outline: true,
        class: "button__primary-neutral__outline-true",
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
import { klassed, reklassed } from "@klass/preact";

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
