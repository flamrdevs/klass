<p align="center">
  <h1 align="center">klass</h1>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@klass/core"><img src="https://badgen.net/npm/v/@klass/core"></a>
  <a href="https://bundlephobia.com/package/@klass/core"><img src="https://badgen.net/bundlephobia/minzip/@klass/core"></a>
  <a href="https://www.npmjs.com/package/@klass/core"><img src="https://badgen.net/npm/license/@klass/core"></a>
</p>

🚧 UNDER DEVELOPMENT 🚧

# Introduction

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

button.variants.size("sm");
// button--size-sm
button.variants.loading(true);
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
```

# Authors

- [flamrdevs](https://github.com/flamrdevs)

# License

[MIT License](./../../LICENSE)
