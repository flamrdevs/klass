<img src="https://klass.pages.dev/cover.png" width="100%" style="margin: 0px 0px 50px 0px;" />

# Getting Started

## Introduction

Class variant utility library.

## Features

- Base and variants
- Compound variants
- Conditional variants
- Framework-agnostic
- TypeScript support
- Styled-component-like API (React, Preact & Solid)
- Polymorphic components (React, Preact & Solid)

## Packages

<table>
  <thead>
    <tr>
      <th>Package</th>
      <th>Links</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <a href="/klass/core" style="font-size: 1rem; font-weight: 500;">@klass/core</a>
          <img alt="npm" src="https://flamrdevs.cyclic.app/core/badge?v=MIT" />
          <img alt="npm" src="https://flamrdevs.cyclic.app/npm/version?n=@klass/core" />
        </div>
      </td>
      <td>
        <p align="center">
          <a title="github" href="https://github.com/flamrdevs/klass/tree/main/packages/core" target="_blank" style="display: inline-block; margin: 0px 4px;">
            <img alt="github" src="https://flamrdevs.cyclic.app/core/icon-button/simple?i=github" />
          </a>
          <a title="npm" href="https://www.npmjs.com/package/@klass/core" target="_blank" style="display: inline-block; margin: 0px 4px;">
            <img alt="npm" src="https://flamrdevs.cyclic.app/core/icon-button/simple?i=npm" />
          </a>
        </p>
      </td>
    </tr>
    <tr>
      <td>
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <a href="/klass/preact" style="font-size: 1rem; font-weight: 500;">@klass/preact</a>
          <img alt="npm" src="https://flamrdevs.cyclic.app/core/badge?v=MIT" />
          <img alt="npm" src="https://flamrdevs.cyclic.app/npm/version?n=@klass/preact" />
        </div>
      </td>
      <td>
        <p align="center">
          <a title="github" href="https://github.com/flamrdevs/klass/tree/main/packages/preact" target="_blank" style="display: inline-block; margin: 0px 4px;">
            <img alt="github" src="https://flamrdevs.cyclic.app/core/icon-button/simple?i=github" />
          </a>
          <a title="npm" href="https://www.npmjs.com/package/@klass/preact" target="_blank" style="display: inline-block; margin: 0px 4px;">
            <img alt="npm" src="https://flamrdevs.cyclic.app/core/icon-button/simple?i=npm" />
          </a>
        </p>
      </td>
    </tr>
    <tr>
      <td>
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <a href="/klass/react" style="font-size: 1rem; font-weight: 500;">@klass/react</a>
          <img alt="npm" src="https://flamrdevs.cyclic.app/core/badge?v=MIT" />
          <img alt="npm" src="https://flamrdevs.cyclic.app/npm/version?n=@klass/react" />
        </div>
      </td>
      <td>
        <p align="center">
          <a title="github" href="https://github.com/flamrdevs/klass/tree/main/packages/react" target="_blank" style="display: inline-block; margin: 0px 4px;">
            <img alt="github" src="https://flamrdevs.cyclic.app/core/icon-button/simple?i=github" />
          </a>
          <a title="npm" href="https://www.npmjs.com/package/@klass/react" target="_blank" style="display: inline-block; margin: 0px 4px;">
            <img alt="npm" src="https://flamrdevs.cyclic.app/core/icon-button/simple?i=npm" />
          </a>
        </p>
      </td>
    </tr>
    <tr>
      <td>
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <a href="/klass/solid" style="font-size: 1rem; font-weight: 500;">@klass/solid</a>
          <img alt="npm" src="https://flamrdevs.cyclic.app/core/badge?v=MIT" />
          <img alt="npm" src="https://flamrdevs.cyclic.app/npm/version?n=@klass/solid" />
        </div>
      </td>
      <td>
        <p align="center">
          <a title="github" href="https://github.com/flamrdevs/klass/tree/main/packages/solid" target="_blank" style="display: inline-block; margin: 0px 4px;">
            <img alt="github" src="https://flamrdevs.cyclic.app/core/icon-button/simple?i=github" />
          </a>
          <a title="npm" href="https://www.npmjs.com/package/@klass/solid" target="_blank" style="display: inline-block; margin: 0px 4px;">
            <img alt="npm" src="https://flamrdevs.cyclic.app/core/icon-button/simple?i=npm" />
          </a>
        </p>
      </td>
    </tr>
  </tbody>
</table>

## Roadmap

- [x] Variants
- [x] Compound variants
- [x] Conditional variants

## Examples

### Core

```tsx
import { klass, reklass } from "@klass/core";

const button = klass({
  base: "inline-flex px-4 py-1 rounded-md outline-none text-white",
  variants: {
    color: {
      red: "bg-red-700",
      green: "bg-green-700",
      blue: "bg-blue-700",
    },
    fullWidth: {
      true: "w-full",
    },
  },
  defaultVariants: {
    color: "blue",
  },
});

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
      xs: "m-1",
      sm: "m-2",
      md: "m-3",
      lg: "m-4",
      xl: "m-5",
    },
    p: {
      xs: "p-1",
      sm: "p-2",
      md: "p-3",
      lg: "p-4",
      xl: "p-5",
    },
  },
});

button({ color: "red", fullWidth: true });
button.variant.color("green");

box({ m: "sm", p: "lg" });
box({ m: { base: "sm", md: "lg" }, p: { base: "xs", md: "xl" } });
box.revariant.m("sm");
box.revariant.p({ base: "xs", md: "xl" });
```

### Preact / React / Solid

```tsx
import { klassed, reklassed } from "@klass/{preact,react,solid}";

const Button = klassed(
  "button",
  {
    base: "inline-flex px-4 py-1 rounded-md outline-none text-white",
    variants: {
      color: {
        red: "bg-red-700",
        green: "bg-green-700",
        blue: "bg-blue-700",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      color: "blue",
    },
  },
  {
    dp: {
      type: "button",
    },
  }
);

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
      xs: "m-1",
      sm: "m-2",
      md: "m-3",
      lg: "m-4",
      xl: "m-5",
    },
    p: {
      xs: "p-1",
      sm: "p-2",
      md: "p-3",
      lg: "p-4",
      xl: "p-5",
    },
  },
});

export const Example = () => {
  return (
    <Box m={{ base: "xs", md: "xl" }} p="md">
      <Box as="section">
        <Button color="red" fullWidth>
          Red Full Width Button
        </Button>
      </Box>

      <Box as="section">
        <Button as="a" color="green">
          Green Anchor Button
        </Button>
      </Box>
    </Box>
  );
};
```

### More Examples

<table>
  <thead>
    <tr>
      <th>Example</th>
      <th>Links</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <a href="/examples/astro-tailwind" style="font-size: 1rem; font-weight: 500;">Astro + Tailwind</a>
      </td>
      <td>
        <p align="center">
          <a title="github" href="https://github.com/flamrdevs/klass-examples/tree/main/astro-tailwind" target="_blank" style="display: inline-block; margin: 0px 4px;">
            <img alt="github" src="https://flamrdevs.cyclic.app/core/icon-button/simple?i=github" />
          </a>
          <a title="stackblitz" href="https://stackblitz.com/fork/github/flamrdevs/klass-examples/tree/main/astro-tailwind?title=Klass%20Astro%20Tailwind" target="_blank" style="display: inline-block; margin: 0px 4px;">
            <img alt="stackblitz" src="https://flamrdevs.cyclic.app/core/icon-button/simple?i=stackblitz" />
          </a>
          <a title="codesandbox" href="https://codesandbox.io/p/sandbox/github/flamrdevs/klass-examples/tree/main/astro-tailwind" target="_blank" style="display: inline-block; margin: 0px 4px;">
            <img alt="codesandbox" src="https://flamrdevs.cyclic.app/core/icon-button/simple?i=codesandbox" />
          </a>
        </p>
      </td>
    </tr>
    <tr>
      <td>
        <a href="/examples/preact-tailwind" style="font-size: 1rem; font-weight: 500;">Preact + Tailwind</a>
      </td>
      <td>
        <p align="center">
          <a title="github" href="https://github.com/flamrdevs/klass-examples/tree/main/preact-tailwind" target="_blank" style="display: inline-block; margin: 0px 4px;">
            <img alt="github" src="https://flamrdevs.cyclic.app/core/icon-button/simple?i=github" />
          </a>
          <a title="stackblitz" href="https://stackblitz.com/fork/github/flamrdevs/klass-examples/tree/main/preact-tailwind?title=Klass%20Preact%20Tailwind" target="_blank" style="display: inline-block; margin: 0px 4px;">
            <img alt="stackblitz" src="https://flamrdevs.cyclic.app/core/icon-button/simple?i=stackblitz" />
          </a>
          <a title="codesandbox" href="https://codesandbox.io/p/sandbox/github/flamrdevs/klass-examples/tree/main/preact-tailwind" target="_blank" style="display: inline-block; margin: 0px 4px;">
            <img alt="codesandbox" src="https://flamrdevs.cyclic.app/core/icon-button/simple?i=codesandbox" />
          </a>
        </p>
      </td>
    </tr>
    <tr>
      <td>
        <a href="/examples/react-tailwind" style="font-size: 1rem; font-weight: 500;">React + Tailwind</a>
      </td>
      <td>
        <p align="center">
          <a title="github" href="https://github.com/flamrdevs/klass-examples/tree/main/react-tailwind" target="_blank" style="display: inline-block; margin: 0px 4px;">
            <img alt="github" src="https://flamrdevs.cyclic.app/core/icon-button/simple?i=github" />
          </a>
          <a title="stackblitz" href="https://stackblitz.com/fork/github/flamrdevs/klass-examples/tree/main/react-tailwind?title=Klass%20React%20Tailwind" target="_blank" style="display: inline-block; margin: 0px 4px;">
            <img alt="stackblitz" src="https://flamrdevs.cyclic.app/core/icon-button/simple?i=stackblitz" />
          </a>
          <a title="codesandbox" href="https://codesandbox.io/p/sandbox/github/flamrdevs/klass-examples/tree/main/react-tailwind" target="_blank" style="display: inline-block; margin: 0px 4px;">
            <img alt="codesandbox" src="https://flamrdevs.cyclic.app/core/icon-button/simple?i=codesandbox" />
          </a>
        </p>
      </td>
    </tr>
    <tr>
      <td>
        <a href="/examples/solid-tailwind" style="font-size: 1rem; font-weight: 500;">Solid + Tailwind</a>
      </td>
      <td>
        <p align="center">
          <a title="github" href="https://github.com/flamrdevs/klass-examples/tree/main/solid-tailwind" target="_blank" style="display: inline-block; margin: 0px 4px;">
            <img alt="github" src="https://flamrdevs.cyclic.app/core/icon-button/simple?i=github" />
          </a>
          <a title="stackblitz" href="https://stackblitz.com/fork/github/flamrdevs/klass-examples/tree/main/solid-tailwind?title=Klass%20Solid%20Tailwind" target="_blank" style="display: inline-block; margin: 0px 4px;">
            <img alt="stackblitz" src="https://flamrdevs.cyclic.app/core/icon-button/simple?i=stackblitz" />
          </a>
          <a title="codesandbox" href="https://codesandbox.io/p/sandbox/github/flamrdevs/klass-examples/tree/main/solid-tailwind" target="_blank" style="display: inline-block; margin: 0px 4px;">
            <img alt="codesandbox" src="https://flamrdevs.cyclic.app/core/icon-button/simple?i=codesandbox" />
          </a>
        </p>
      </td>
    </tr>
  </tbody>
</table>

## Inspiration

Some of the core concepts and designs are inspired by

- [class-variance-authority](https://github.com/joe-bell/cva)
- [vanilla-extract](https://github.com/vanilla-extract-css/vanilla-extract)
- [stitches](https://github.com/stitchesjs/stitches)

## Authors

- [flamrdevs](https://github.com/flamrdevs)

## License

MIT License
