<p>
  <a href="https://www.npmjs.com/package/@klass/core" style="display: inline-block; margin: 0px 4px;"><img src="https://badgen.net/npm/v/@klass/core"></a>
  <a href="https://bundlephobia.com/package/@klass/core" style="display: inline-block; margin: 0px 4px;"><img src="https://badgen.net/bundlephobia/minzip/@klass/core"></a>
  <a href="https://www.npmjs.com/package/@klass/core" style="display: inline-block; margin: 0px 4px;"><img src="https://badgen.net/npm/license/@klass/core"></a>
</p>

# klass core

## Introduction <Badge type="warning" text="beta" />

A class variant utility library.

## Quick Start

### Installation

```bash
npm install @klass/core
# or
yarn add @klass/core
# or
pnpm add @klass/core
```

### Usage

#### Klass

```typescript
import { klass } from "@klass/core";

const box = klass({
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

const button = klass({
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
  },
  defaultVariants: {
    // size: "md",
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
});

box();
// "block"

box({ m: "md", p: "md" });
// "block m-4 p-4"

button();
// "button--base"

button({ size: "sm", outline: true, loading: true } /*, "extra classes" */);
// "button--base button--size-sm button--outline-true button--loading-true button--size-sm-&-outline-true"

button.options;
// klass options param

button.variant.size("sm");
// "button--size-sm"
button.variant.outline(true);
// "button--outline-true"
button.variant.loading(true);
// "button--loading-true"
```

#### Variant

```typescript
import { variant } from "@klass/core";

const size = klass({
  variant: {
    sm: "size-sm",
    md: "size-md",
    lg: "size-lg",
  },
  // defaultVariant: "md",
});

size();
// undefined

size("sm");
// "size-sm"

size.options;
// variant options param
```
