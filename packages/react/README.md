<p align="center">
  <h1 align="center">klass</h1>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@klass/react"><img src="https://badgen.net/npm/v/@klass/react"></a>
  <a href="https://bundlephobia.com/package/@klass/react"><img src="https://badgen.net/bundlephobia/minzip/@klass/react"></a>
  <a href="https://www.npmjs.com/package/@klass/react"><img src="https://badgen.net/npm/license/@klass/react"></a>
</p>

🚧 UNDER DEVELOPMENT 🚧

# Introduction

A class variant utility library for react.

# Quick Start

## Installation

```bash
npm install @klass/react
# or
yarn add @klass/react
# or
pnpm add @klass/react
```

## Usage

### Klassed

```tsx
import { klassed } from "@klass/react";

const Button = klassed("button", {
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

function App() {
  return (
    <div>
      <Button size="md" loading className="Extra classes">
        klassed button
      </Button>
    </div>
  );
}

Button.klass();
// "button--base"

Button.klass({ size: "sm", loading: true } /*, "Extra classes" */);
// "button--base button--size-sm button--loading-true"

Button.klass.variants.size("sm");
// button--size-sm
Button.klass.variants.loading(true);
// button--loading-true
```

# Authors

- [flamrdevs](https://github.com/flamrdevs)

# License

[MIT License](./../../LICENSE)
