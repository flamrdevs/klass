# klass

## Introduction <Badge type="warning" text="beta" />

A class variant utility library.

## Packages

- [@klass/core](./klass/core) - core api
- [@klass/react](./klass/react) - react package
- [@klass/solid](./klass/solid) - solid package

## Roadmap

- :heavy_check_mark: Variants - basic variant
- :heavy_check_mark: Compounds variants - apply variant when multiple variant are match
- :construction: Conditions variants - apply variant when match with input condition

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

- [React Router Tailwind CSS](https://github.com/flamrdevs/klass/tree/main/examples/react-router-tailwindcss/)
- [React Tailwind CSS](https://github.com/flamrdevs/klass/tree/main/examples/react-tailwindcss/)
- [React Tailwind CSS Daisy UI](https://github.com/flamrdevs/klass/tree/main/examples/react-tailwindcss-daisy-ui/)
- [Solid Router Tailwind CSS](https://github.com/flamrdevs/klass/tree/main/examples/solid-router-tailwindcss/)
- [Solid Tailwind CSS](https://github.com/flamrdevs/klass/tree/main/examples/solid-tailwindcss/)
- [Solid Tailwind CSS Daisy UI](https://github.com/flamrdevs/klass/tree/main/examples/solid-tailwindcss-daisy-ui/)

## Inspiration

Some of the core concepts and designs are inspired by

- [class-variance-authority](https://github.com/joe-bell/cva)
- [vanilla-extract](https://github.com/vanilla-extract-css/vanilla-extract)

## Authors

- [flamrdevs](https://github.com/flamrdevs)

## License

MIT License
