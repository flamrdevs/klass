<p>
  <a href="https://www.npmjs.com/package/@klass/core" style="display: inline-block; margin: 0px 4px;"><img src="https://badgen.net/npm/v/@klass/core"></a>
  <a href="https://bundlephobia.com/package/@klass/core" style="display: inline-block; margin: 0px 4px;"><img src="https://badgen.net/bundlephobia/minzip/@klass/core"></a>
  <a href="https://www.npmjs.com/package/@klass/core" style="display: inline-block; margin: 0px 4px;"><img src="https://badgen.net/npm/license/@klass/core"></a>
</p>

# Introduction <Badge type="warning" text="beta" />

A class variant utility library.

# Quick Start

## Installation

```bash
npm install @klass/core
# or
yarn add @klass/core
# or
pnpm add @klass/core
```

## Usage

### Klass

```typescript
import { klass } from "@klass/core";

const button = klass({
  base: "button--base",
  variants: {
    size: {
      sm: "button--size-sm",
      md: "button--size-md",
      lg: "button--size-lg",
    },
    loading: {
      true: "button--loading-true",
      false: "button--loading-false",
    },
  },
  defaultVariants: {
    // size: "md",
    // loading: false,
  },
});

button();
// "button--base"

button({ size: "sm", loading: true } /*, "Extra classes" */);
// "button--base button--size-sm button--loading-true"

button.options;
// klass options param

button.variant.size("sm");
// button--size-sm
button.variant.loading(true);
// button--loading-true
```

### Variant

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
