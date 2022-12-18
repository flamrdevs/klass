<p align="center">
  <h1 align="center">klass</h1>
</p>

<img src="https://hiiits.deta.dev/hit/flamrdevs/klass?" width="100%" heigth="10px" />

🚧 UNDER DEVELOPMENT 🚧

# klass

## Introduction

A class variant utility library.

## Packages

- [@klass/core](./packages/core) - core api
- [@klass/react](./packages/react) - react package
- [@klass/solid](./packages/solid) - solid package

## Roadmap

- [x] Variants - basic variant
- [x] Compounds variants - apply variant when multiple variant are match
- [ ] Conditions variants - apply variant when match with input condition

## Examples

### Core

```tsx
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
```

### React

```tsx
import { klassed } from "@klass/react";

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
```

### Solid

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
```

### More examples

- [React Router Tailwind CSS](./examples/react-router-tailwindcss/)
- [React Tailwind CSS](./examples/react-tailwindcss/)
- [React Tailwind CSS Daisy UI](./examples/react-tailwindcss-daisy-ui/)
- [Solid Router Tailwind CSS](./examples/solid-router-tailwindcss/)
- [Solid Tailwind CSS](./examples/solid-tailwindcss/)
- [Solid Tailwind CSS Daisy UI](./examples/solid-tailwindcss-daisy-ui/)

## Inspiration

Some of the core concepts and designs are inspired by

- [class-variance-authority](https://github.com/joe-bell/cva)
- [vanilla-extract](https://github.com/vanilla-extract-css/vanilla-extract)

## Authors

- [flamrdevs](https://github.com/flamrdevs)

## License

[MIT License](./LICENSE)
