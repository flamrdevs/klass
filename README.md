<img src="https://klass.pages.dev/cover.png" width="100%" />

# klass

## Introduction

A class variant utility library.

## Features

- Base and variants
- Compounds variants
- Conditions variants
- Framework agnostic
- Typescript support
- Styled component like API (React, Preact & Solid)
- Polymorphic component (React, Preact & Solid)

## Packages

- [@klass/core](./packages/core) - core api
- [@klass/react](./packages/react) - [react](https://reactjs.org) package
- [@klass/preact](./packages/preact) - [preact](https://preactjs.com) package
- [@klass/solid](./packages/solid) - [solid](https://www.solidjs.com) package

## Roadmap

- [x] Variants
- [x] Compounds variants
- [x] Conditions variants

## Examples

### Core

klass function is main api that support base class, variants class, default variants, compound variants. another function is reklass (re~~sponsive~~klass), which support condition class. if you're come from vanilla-extract, think that klass is [recipes](https://vanilla-extract.style/documentation/packages/recipes) and reklass is [sprinkles](https://vanilla-extract.style/documentation/packages/sprinkles).

#### Klass

- Base class
- Variant class (with default value)
- Compound variant class

```tsx
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
    // shouldn't use "class" key as variant
  },
});

// usage

// main
const result /* "block m-4 p-4 extra classes" */ = box(
  {
    m: "md",
    p: "md",
  },
  ["extra", { classes: true }]
);

// access variant
box.variant.m("md");
box.variant.p("md");
```

#### Reklass

- Condition (with default value)
- Variant class (without default value)

```tsx
import { reklass } from "@klass/core";

// assume custom screens is "sm", "md" and "lg"

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

// usage

// main
const result /* "m-4 p-0 sm:p-2 md:p-4 lg:p-8 extra classes" */ = box(
  {
    m: "md",
    p: { base: "none", sm: "sm", md: "md", lg: "lg" },
  },
  ["extra", { classes: true }]
);

// access revariant
box.revariant.m("md");
box.revariant.p({ base: "none", sm: "sm", md: "md", lg: "lg" });
```

#### Low-level API

```tsx
import { cxs, variant, revariant } from "@klass/core";

const result /* "f l a m r d e v s" */ = cxs("f", "l", "a", ["m", { r: true }], { d: true, e: 1 }, "v", "s");

const marginvariant = variant({
  variant: {
    none: "m-0",
    sm: "m-2",
    md: "m-4",
    lg: "m-8",
  },
  // defaultVariant: "md"
});

marginvariant();
marginvariant("sm");

const paddingrevariant = revariant({
  conditions: {
    base: "",
    sm: "sm:",
    md: "md:",
    lg: "lg:",
  },
  defaultCondition: "base",
  variant: {
    none: "p-0",
    sm: "p-2",
    md: "p-4",
    lg: "p-8",
  },
});

paddingrevariant();
paddingrevariant("sm");
paddingrevariant({ base: "sm", md: "lg" });
```

#### More options

return value wrapper. only for klass, reklass and it styled-like component

```tsx
import { klass, reklass } from "@klass/core";

// tailwind-merge
import { twMerge } from "tailwind-merge";

const boxklass = klass(
  {
    ...{
      /* options */
    },
  },
  {
    it: (value) => twMerge(value),
  }
);

const boxreklass = reklass(
  {
    ...{
      /* options */
    },
  },
  {
    it: (value) => twMerge(value),
  }
);
```

condition position. only for revariant, reklass and it styled-like component

```tsx
import { revariant, reklass } from "@klass/core";

// master.css

const boxrevariant = revariant(
  {
    conditions: {
      base: "",
      sm: "@sm",
      md: "@md",
      lg: "@lg",
    },
    ...{
      /* other */
    },
  },
  {
    as: "suffix",
  }
);

const boxreklass = reklass(
  {
    conditions: {
      base: "",
      sm: "@sm",
      md: "@md",
      lg: "@lg",
    },
    ...{
      /* other */
    },
  },
  {
    as: "suffix",
  }
);
```

### React

#### Klassed (React)

```tsx
import { klassed } from "@klass/react";

const Box = klassed("div", {
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
    // shouldn't use "class" and "className" key as variant
  },
});

function App() {
  return (
    <Box>
      <Box m="md" p="md" className={["extra", { classes: true }]}>
        Box
      </Box>

      {/* polymorph */}

      <Box as="a">Box Link</Box>
    </Box>
  );
}
```

#### Reklassed (React)

```tsx
import { reklassed } from "@klass/react";

const Box = reklassed("div", {
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

function App() {
  return (
    <Box>
      <Box m="md" p={{ base: "none", sm: "sm", md: "md", lg: "lg" }} className={["extra", { classes: true }]}>
        Box
      </Box>

      {/* polymorph */}

      <Box as="a">Box Link</Box>
    </Box>
  );
}
```

#### HOC (React)

```tsx
import { cxsed } from "@klass/react";

import UnstyledComponent from "example-unstyled-component";

const UnstyledComponentClassValue = cxsed(UnstyledComponent, "UnstyledComponentBaseClass", "extra", "classes");
```

### Preact

#### Klassed (Preact)

```tsx
import { klassed } from "@klass/preact";

const Box = klassed("div", {
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
    // shouldn't use "class" and "className" key as variant
  },
});

function App() {
  return (
    <Box>
      <Box m="md" p="md" class={["extra", { classes: true }]}>
        Box
      </Box>

      {/* polymorph */}

      <Box as="a">Box Link</Box>
    </Box>
  );
}
```

#### Reklassed (Preact)

```tsx
import { reklassed } from "@klass/preact";

const Box = reklassed("div", {
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

function App() {
  return (
    <Box>
      <Box m="md" p={{ base: "none", sm: "sm", md: "md", lg: "lg" }} class={["extra", { classes: true }]}>
        Box
      </Box>

      {/* polymorph */}

      <Box as="a">Box Link</Box>
    </Box>
  );
}
```

#### HOC (Preact)

```tsx
import { cxsed } from "@klass/preact";

import UnstyledComponent from "example-unstyled-component";

const UnstyledComponentClassValue = cxsed(UnstyledComponent, "UnstyledComponentBaseClass", "extra", "classes");
```

### Solid

#### Klassed (Solid)

```tsx
import { klassed } from "@klass/solid";

const Box = klassed("div", {
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
    // shouldn't use "class" and "classList" key as variant
  },
});

function App() {
  return (
    <Box>
      <Box m="md" p="md" class={["extra", { classes: true }]}>
        Box
      </Box>

      {/* polymorph */}

      <Box as="a">Box Link</Box>
    </Box>
  );
}
```

#### Reklassed (Solid)

```tsx
import { reklassed } from "@klass/solid";

const Box = reklassed("div", {
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

function App() {
  return (
    <Box>
      <Box m="md" p={{ base: "none", sm: "sm", md: "md", lg: "lg" }} class={["extra", { classes: true }]}>
        Box
      </Box>

      {/* polymorph */}

      <Box as="a">Box Link</Box>
    </Box>
  );
}
```

#### HOC (Solid)

```tsx
import { cxsed } from "@klass/solid";

import UnstyledComponent from "example-unstyled-component";

const UnstyledComponentClassValue = cxsed(UnstyledComponent, "UnstyledComponentBaseClass", "extra", "classes");
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
- [stitches](https://github.com/stitchesjs/stitches)

## Authors

- [flamrdevs](https://github.com/flamrdevs)

## License

[MIT License](./LICENSE)
