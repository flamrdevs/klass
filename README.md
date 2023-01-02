<img src="./public/cover.png" />

<img src="https://hiiits.deta.dev/hit/flamrdevs/klass?" width="100%" heigth="10px" />

🚧 UNDER DEVELOPMENT 🚧

# klass

## Introduction

A class variant utility library.

## Features

- Typescript support
- Styled component like API (React, Preact & Solid)
- Polymorphic component (React, Preact & Solid)

## Packages

- [@klass/core](./packages/core) - core api
- [@klass/react](./packages/react) - react package
- [@klass/preact](./packages/preact) - preact package
- [@klass/solid](./packages/solid) - solid package

## Roadmap

- [x] Variants
- [x] Compounds variants
- [ ] Conditions variants

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

box({ m: "md", p: "md" }, ["extra", { classes: true }]); // "block m-4 p-4 extra classes"
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

function App() {
  return (
    <Box>
      <Box m="md" p="md" className={["extra", { classes: true }]}>
        Box
      </Box>

      <Box as="a">Box Link</Box>
    </Box>
  );
}
```

### Preact

```tsx
import { klassed } from "@klass/preact";

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

function App() {
  return (
    <Box>
      <Box m="md" p="md" class={["extra", { classes: true }]}>
        Box
      </Box>

      <Box as="a">Box Link</Box>
    </Box>
  );
}
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

function App() {
  return (
    <Box>
      <Box m="md" p="md" class={["extra", { classes: true }]}>
        Box
      </Box>

      <Box as="a">Box Link</Box>
    </Box>
  );
}
```

### More examples

- [React Router TailwindCSS](https://github.com/flamrdevs/klass/tree/main/examples/react-router-tailwindcss/)
- [React TailwindCSS](https://github.com/flamrdevs/klass/tree/main/examples/react-tailwindcss/)
- [React TailwindCSS DaisyUI](https://github.com/flamrdevs/klass/tree/main/examples/react-tailwindcss-daisy-ui/)
- [React TailwindCSS RippleUI](https://github.com/flamrdevs/klass/tree/main/examples/react-tailwindcss-ripple-ui/)
- [Preact Router TailwindCSS](https://github.com/flamrdevs/klass/tree/main/examples/preact-router-tailwindcss/)
- [Preact TailwindCSS](https://github.com/flamrdevs/klass/tree/main/examples/preact-tailwindcss/)
- [Preact TailwindCSS DaisyUI](https://github.com/flamrdevs/klass/tree/main/examples/preact-tailwindcss-daisy-ui/)
- [Preact TailwindCSS RippleUI](https://github.com/flamrdevs/klass/tree/main/examples/preact-tailwindcss-ripple-ui/)
- [Solid Router TailwindCSS](https://github.com/flamrdevs/klass/tree/main/examples/solid-router-tailwindcss/)
- [Solid TailwindCSS](https://github.com/flamrdevs/klass/tree/main/examples/solid-tailwindcss/)
- [Solid TailwindCSS DaisyUI](https://github.com/flamrdevs/klass/tree/main/examples/solid-tailwindcss-daisy-ui/)
- [Solid TailwindCSS RippleUI](https://github.com/flamrdevs/klass/tree/main/examples/solid-tailwindcss-ripple-ui/)

- [React UnoCSS](https://github.com/flamrdevs/klass/tree/main/examples/react-unocss/)
- [Preact UnoCSS](https://github.com/flamrdevs/klass/tree/main/examples/preact-unocss/)
- [Solid UnoCSS](https://github.com/flamrdevs/klass/tree/main/examples/solid-unocss/)

- [React WindiCSS](https://github.com/flamrdevs/klass/tree/main/examples/react-windicss/)
- [Preact WindiCSS](https://github.com/flamrdevs/klass/tree/main/examples/preact-windicss/)
- [Solid WindiCSS](https://github.com/flamrdevs/klass/tree/main/examples/solid-windicss/)

## Inspiration

Some of the core concepts and designs are inspired by

- [class-variance-authority](https://github.com/joe-bell/cva)
- [vanilla-extract](https://github.com/vanilla-extract-css/vanilla-extract)

## Authors

- [flamrdevs](https://github.com/flamrdevs)

## License

[MIT License](./LICENSE)
