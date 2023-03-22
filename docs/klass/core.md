<p>
  <a href="https://www.npmjs.com/package/@klass/core" style="display: inline-block; margin: 0px 4px;"><img src="https://badgen.net/npm/v/@klass/core"></a>
  <a href="https://bundlephobia.com/package/@klass/core" style="display: inline-block; margin: 0px 4px;"><img src="https://badgen.net/bundlephobia/minzip/@klass/core"></a>
  <a href="https://www.npmjs.com/package/@klass/core" style="display: inline-block; margin: 0px 4px;"><img src="https://badgen.net/npm/license/@klass/core"></a>
</p>

# klass core

A class variant utility library.

## Installation

```bash
npm install @klass/core
# or
yarn add @klass/core
# or
pnpm add @klass/core
```

## Klass

```typescript
import { klass } from "@klass/core";

const box = klass({
  base: "block",
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

box(); // => "block"
box({ m: "md" }); // => "block m-4"
```

## Klass with default variant

```typescript
import { klass } from "@klass/core";

const button = klass({
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
  },
  defaultVariants: {
    color: "primary",
    size: "md",
  },
});

box(); // => "button__base button__color-primary button__size-md"
box({ color: "neutral" }); // => "button__base button__color-neutral button__size-md"
```

## Klass with compound variant

```typescript
import { klass } from "@klass/core";

const button = klass({
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
});

box(); // => "button__base button__color-primary button__size-md"
box({ outline: true }); // => "button__base button__color-primary button__size-md button__primary-primary__outline-true"
box({ color: "neutral", outline: true }); // => "button__base button__color-neutral button__size-md button__neutral-neutral__outline-true"
```

## Reklass

```typescript
import { reklass } from "@klass/core";

const box = reklass({
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

box(); // => ""
box({ m: "md", p: { base: "none", md: "md" } }); // => "m-4 p-0 md:p-4"
```

## Variant

_variant used internally in klass_

```typescript
import { variant } from "@klass/core";

const margin = variant({
  variant: {
    none: "m-0",
    sm: "m-2",
    md: "m-4",
    lg: "m-8",
  },
});

margin(); // => undefined
margin("none"); // => "m-0"

const size = variant({
  variant: {
    sm: "size-sm",
    md: "size-md",
    lg: "size-lg",
  },
  defaultVariant: "md",
});

size(); // => "size-md"
size("sm"); // => "size-sm"
```

## Revariant

_revariant used internally in reklass_

```typescript
import { revariant } from "@klass/core";

const margin = revariant({
  conditions: {
    base: "",
    sm: "sm:",
    md: "md:",
    lg: "lg:",
  },
  defaultCondition: "base",
  variants: {
    none: "m-0",
    sm: "m-2",
    md: "m-4",
    lg: "m-8",
  },
});

margin(); // => undefined
margin("none"); // => "m-0"
margin({ base: "none", md: "md" }); // => "m-0 md:m-4"
```
