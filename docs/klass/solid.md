<p>
  <a href="https://www.npmjs.com/package/@klass/solid" style="display: inline-block; margin: 0px 4px;"><img src="https://badgen.net/npm/v/@klass/solid"></a>
  <a href="https://bundlephobia.com/package/@klass/solid" style="display: inline-block; margin: 0px 4px;"><img src="https://badgen.net/bundlephobia/minzip/@klass/solid"></a>
  <a href="https://www.npmjs.com/package/@klass/solid" style="display: inline-block; margin: 0px 4px;"><img src="https://badgen.net/npm/license/@klass/solid"></a>
</p>

# klass solid

## Introduction <Badge type="warning" text="beta" />

A class variant utility library for solid.

## Quick Start

### Installation

```bash
npm install @klass/core @klass/solid
# or
yarn add @klass/core @klass/solid
# or
pnpm add @klass/core @klass/solid
```

### Usage

#### Klassed

```tsx
import { klassed } from "@klass/solid";

const Box = klassed("div", {
  base: "block",
  variants: {
    m: {
      sm: "m-2",
      md: "m-4",
      lg: "m-8",
    },
    p: {
      sm: "p-2",
      md: "p-4",
      lg: "p-8",
    },
  },
});

const Button = klassed(
  "button",
  {
    base: "button--base",
    variants: {
      size: {
        sm: "button--size-sm",
        md: "button--size-md",
        lg: "button--size-lg",
      },
      outline: {
        true: "button--outline-true",
      },
      loading: {
        true: "button--loading-true",
      },
      // this variant will not work
      class: {
        will: "not-work",
      },
    },
    defaultVariants: {
      // size: "md",
      // loading: false,
    },
    compoundVariants: [
      {
        variant: { size: "sm", outline: true },
        classes: "button--size-sm-&-outline-true",
      },
      {
        variant: { size: "md", outline: true },
        classes: "button--size-md-&-outline-true",
      },
      {
        variant: { size: "lg", outline: true },
        classes: "button--size-lg-&-outline-true",
      },
    ],
  },
  {
    defaultProps: {
      type: "button",
    },
  }
);

// Re-use klass options
const ButtonAnchor = klassed("a", Button.klass.options);

function App() {
  return (
    <div>
      <Box m="md" p="md" class="extra classes">
        klassed div
      </Box>

      <Button size="md" outline loading class="extra classes">
        klassed button
      </Button>

      {/* Polymorph */}
      <Button as="a" size="md" outline loading class="extra classes">
        klassed button
      </Button>
    </div>
  );
}

Box.klass();
// "block"

Box.klass({ m: "md", p: "md" });
// "block block m-4 p-4"

Button.klass();
// "button--base"

Button.klass({ size: "sm", outline: true, loading: true } /*, "extra classes" */);
// "button--base button--size-sm button--outline-true button--loading-true button--size-sm-&-outline-true"

Button.klass.options;
// klass options param

Button.klass.variant.size("sm");
// "button--size-sm"
Button.klass.variant.outline(true);
// "button--outline-true"
Button.klass.variant.loading(true);
// "button--loading-true"
```

#### VariantsOf

```tsx
import type { VariantsOf } from "@klass/core";
import { klassed } from "@klass/solid";

type ButtonVariants = VariantsOf<typeof Button["klass"]>;

const Button = klassed("button", {
  ...{
    /* options */
  },
});
```

#### Polymorphic

##### use 'as' prop

```tsx
import YourKlassedButton from "./YourKlassedButton";

import Link from "some-link-component-library";

function App() {
  return (
    <nav>
      <YourKlassedButton as={Link} href="/">
        Home
      </YourKlassedButton>
      <YourKlassedButton as={Link} href="/about">
        About
      </YourKlassedButton>
      <YourKlassedButton as={Link} href="/contact">
        Contact
      </YourKlassedButton>
    </nav>
  );
}
```

##### use klassed

```tsx
import { klassed } from "@klass/solid";

import YourKlassedButton from "./YourKlassedButton";

import Link from "some-link-component-library";

const YourKlassedButtonLink = klassed(Link, YourKlassedButton.klass.options);

function App() {
  return (
    <nav>
      <YourKlassedButtonLink href="/">Home</YourKlassedButtonLink>
      <YourKlassedButtonLink href="/about">About</YourKlassedButtonLink>
      <YourKlassedButtonLink href="/contact">Contact</YourKlassedButtonLink>
    </nav>
  );
}
```
