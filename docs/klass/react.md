<p>
  <a href="https://www.npmjs.com/package/@klass/react" style="display: inline-block; margin: 0px 4px;"><img src="https://badgen.net/npm/v/@klass/react"></a>
  <a href="https://bundlephobia.com/package/@klass/react" style="display: inline-block; margin: 0px 4px;"><img src="https://badgen.net/bundlephobia/minzip/@klass/react"></a>
  <a href="https://www.npmjs.com/package/@klass/react" style="display: inline-block; margin: 0px 4px;"><img src="https://badgen.net/npm/license/@klass/react"></a>
</p>

# Introduction <Badge type="warning" text="beta" />

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
    className: {
      will: "not-work",
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

Button.klass.variant.size("sm");
// button--size-sm
Button.klass.variant.loading(true);
// button--loading-true
```
