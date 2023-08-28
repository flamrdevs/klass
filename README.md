<img src="https://klass.pages.dev/cover.png" width="100%" />

# klass

## Introduction

Class variant utility

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
          <span style="font-size: 1rem; font-weight: 500;">@klass/core</span>
          <img alt="npm" src="https://none.deno.dev/npm/l?n=@klass/core" />
          <img alt="npm" src="https://none.deno.dev/npm/v?n=@klass/core" />
        </div>
      </td>
      <td>
        <p align="center">
          <a title="github" href="https://github.com/flamrdevs/klass/tree/main/packages/core" target="_blank" style="display: inline-block; margin: 0px 4px;">
            <img alt="github" src="https://none.deno.dev/ui/icon-button/simple?i=github" />
          </a>
          <a title="npm" href="https://www.npmjs.com/package/@klass/core" target="_blank" style="display: inline-block; margin: 0px 4px;">
            <img alt="npm" src="https://none.deno.dev/ui/icon-button/simple?c=orange&i=npm" />
          </a>
        </p>
      </td>
    </tr>
    <tr>
      <td>
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <span style="font-size: 1rem; font-weight: 500;">@klass/preact</span>
          <img alt="npm" src="https://none.deno.dev/npm/l?n=@klass/preact" />
          <img alt="npm" src="https://none.deno.dev/npm/v?n=@klass/preact" />
        </div>
      </td>
      <td>
        <p align="center">
          <a title="github" href="https://github.com/flamrdevs/klass/tree/main/packages/preact" target="_blank" style="display: inline-block; margin: 0px 4px;">
            <img alt="github" src="https://none.deno.dev/ui/icon-button/simple?i=github" />
          </a>
          <a title="npm" href="https://www.npmjs.com/package/@klass/preact" target="_blank" style="display: inline-block; margin: 0px 4px;">
            <img alt="npm" src="https://none.deno.dev/ui/icon-button/simple?c=orange&i=npm" />
          </a>
        </p>
      </td>
    </tr>
    <tr>
      <td>
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <span style="font-size: 1rem; font-weight: 500;">@klass/react</span>
          <img alt="npm" src="https://none.deno.dev/npm/l?n=@klass/react" />
          <img alt="npm" src="https://none.deno.dev/npm/v?n=@klass/react" />
        </div>
      </td>
      <td>
        <p align="center">
          <a title="github" href="https://github.com/flamrdevs/klass/tree/main/packages/react" target="_blank" style="display: inline-block; margin: 0px 4px;">
            <img alt="github" src="https://none.deno.dev/ui/icon-button/simple?i=github" />
          </a>
          <a title="npm" href="https://www.npmjs.com/package/@klass/react" target="_blank" style="display: inline-block; margin: 0px 4px;">
            <img alt="npm" src="https://none.deno.dev/ui/icon-button/simple?c=orange&i=npm" />
          </a>
        </p>
      </td>
    </tr>
    <tr>
      <td>
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <span style="font-size: 1rem; font-weight: 500;">@klass/solid</span>
          <img alt="npm" src="https://none.deno.dev/npm/l?n=@klass/solid" />
          <img alt="npm" src="https://none.deno.dev/npm/v?n=@klass/solid" />
        </div>
      </td>
      <td>
        <p align="center">
          <a title="github" href="https://github.com/flamrdevs/klass/tree/main/packages/solid" target="_blank" style="display: inline-block; margin: 0px 4px;">
            <img alt="github" src="https://none.deno.dev/ui/icon-button/simple?i=github" />
          </a>
          <a title="npm" href="https://www.npmjs.com/package/@klass/solid" target="_blank" style="display: inline-block; margin: 0px 4px;">
            <img alt="npm" src="https://none.deno.dev/ui/icon-button/simple?c=orange&i=npm" />
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
button.v.color("green");

box({ m: "sm", p: "lg" });
box({ m: { base: "sm", md: "lg" }, p: { base: "xs", md: "xl" } });
box.rv.m("sm");
box.rv.p({ base: "xs", md: "xl" });
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
        <span style="font-size: 1rem; font-weight: 500;">Astro + Tailwind</span>
      </td>
      <td>
        <p align="center">
          <a title="github" href="https://github.com/flamrdevs/klass-examples/tree/main/astro-tailwind" target="_blank" style="display: inline-block; margin: 0px 4px;">
            <img alt="github" src="https://none.deno.dev/ui/icon-button/simple?i=github" />
          </a>
          <a title="stackblitz" href="https://stackblitz.com/fork/github/flamrdevs/klass-examples/tree/main/astro-tailwind?title=Klass%20Astro%20Tailwind" target="_blank" style="display: inline-block; margin: 0px 4px;">
            <img alt="stackblitz" src="https://none.deno.dev/ui/icon-button/simple?c=blue&i=stackblitz" />
          </a>
          <a title="codesandbox" href="https://codesandbox.io/p/sandbox/github/flamrdevs/klass-examples/tree/main/astro-tailwind" target="_blank" style="display: inline-block; margin: 0px 4px;">
            <img alt="codesandbox" src="https://none.deno.dev/ui/icon-button/simple?i=codesandbox" />
          </a>
        </p>
      </td>
    </tr>
    <tr>
      <td>
        <span style="font-size: 1rem; font-weight: 500;">Preact + Tailwind</span>
      </td>
      <td>
        <p align="center">
          <a title="github" href="https://github.com/flamrdevs/klass-examples/tree/main/preact-tailwind" target="_blank" style="display: inline-block; margin: 0px 4px;">
            <img alt="github" src="https://none.deno.dev/ui/icon-button/simple?i=github" />
          </a>
          <a title="stackblitz" href="https://stackblitz.com/fork/github/flamrdevs/klass-examples/tree/main/preact-tailwind?title=Klass%20Preact%20Tailwind" target="_blank" style="display: inline-block; margin: 0px 4px;">
            <img alt="stackblitz" src="https://none.deno.dev/ui/icon-button/simple?c=blue&i=stackblitz" />
          </a>
          <a title="codesandbox" href="https://codesandbox.io/p/sandbox/github/flamrdevs/klass-examples/tree/main/preact-tailwind" target="_blank" style="display: inline-block; margin: 0px 4px;">
            <img alt="codesandbox" src="https://none.deno.dev/ui/icon-button/simple?i=codesandbox" />
          </a>
        </p>
      </td>
    </tr>
    <tr>
      <td>
        <span style="font-size: 1rem; font-weight: 500;">Qwik + Tailwind</span>
      </td>
      <td>
        <p align="center">
          <a title="github" href="https://github.com/flamrdevs/klass-examples/tree/main/qwik-tailwind" target="_blank" style="display: inline-block; margin: 0px 4px;">
            <img alt="github" src="https://none.deno.dev/ui/icon-button/simple?i=github" />
          </a>
          <a title="stackblitz" href="https://stackblitz.com/fork/github/flamrdevs/klass-examples/tree/main/qwik-tailwind?title=Klass%20Qwik%20Tailwind" target="_blank" style="display: inline-block; margin: 0px 4px;">
            <img alt="stackblitz" src="https://none.deno.dev/ui/icon-button/simple?c=blue&i=stackblitz" />
          </a>
          <a title="codesandbox" href="https://codesandbox.io/p/sandbox/github/flamrdevs/klass-examples/tree/main/qwik-tailwind" target="_blank" style="display: inline-block; margin: 0px 4px;">
            <img alt="codesandbox" src="https://none.deno.dev/ui/icon-button/simple?i=codesandbox" />
          </a>
        </p>
      </td>
    </tr>
    <tr>
      <td>
        <span style="font-size: 1rem; font-weight: 500;">React + Tailwind</span>
      </td>
      <td>
        <p align="center">
          <a title="github" href="https://github.com/flamrdevs/klass-examples/tree/main/react-tailwind" target="_blank" style="display: inline-block; margin: 0px 4px;">
            <img alt="github" src="https://none.deno.dev/ui/icon-button/simple?i=github" />
          </a>
          <a title="stackblitz" href="https://stackblitz.com/fork/github/flamrdevs/klass-examples/tree/main/react-tailwind?title=Klass%20React%20Tailwind" target="_blank" style="display: inline-block; margin: 0px 4px;">
            <img alt="stackblitz" src="https://none.deno.dev/ui/icon-button/simple?c=blue&i=stackblitz" />
          </a>
          <a title="codesandbox" href="https://codesandbox.io/p/sandbox/github/flamrdevs/klass-examples/tree/main/react-tailwind" target="_blank" style="display: inline-block; margin: 0px 4px;">
            <img alt="codesandbox" src="https://none.deno.dev/ui/icon-button/simple?i=codesandbox" />
          </a>
        </p>
      </td>
    </tr>
    <tr>
      <td>
        <span style="font-size: 1rem; font-weight: 500;">Solid + Tailwind</span>
      </td>
      <td>
        <p align="center">
          <a title="github" href="https://github.com/flamrdevs/klass-examples/tree/main/solid-tailwind" target="_blank" style="display: inline-block; margin: 0px 4px;">
            <img alt="github" src="https://none.deno.dev/ui/icon-button/simple?i=github" />
          </a>
          <a title="stackblitz" href="https://stackblitz.com/fork/github/flamrdevs/klass-examples/tree/main/solid-tailwind?title=Klass%20Solid%20Tailwind" target="_blank" style="display: inline-block; margin: 0px 4px;">
            <img alt="stackblitz" src="https://none.deno.dev/ui/icon-button/simple?c=blue&i=stackblitz" />
          </a>
          <a title="codesandbox" href="https://codesandbox.io/p/sandbox/github/flamrdevs/klass-examples/tree/main/solid-tailwind" target="_blank" style="display: inline-block; margin: 0px 4px;">
            <img alt="codesandbox" src="https://none.deno.dev/ui/icon-button/simple?i=codesandbox" />
          </a>
        </p>
      </td>
    </tr>
    <tr>
      <td>
        <span style="font-size: 1rem; font-weight: 500;">Svelte + Tailwind</span>
      </td>
      <td>
        <p align="center">
          <a title="github" href="https://github.com/flamrdevs/klass-examples/tree/main/svelte-tailwind" target="_blank" style="display: inline-block; margin: 0px 4px;">
            <img alt="github" src="https://none.deno.dev/ui/icon-button/simple?i=github" />
          </a>
          <a title="stackblitz" href="https://stackblitz.com/fork/github/flamrdevs/klass-examples/tree/main/svelte-tailwind?title=Klass%20Svelte%20Tailwind" target="_blank" style="display: inline-block; margin: 0px 4px;">
            <img alt="stackblitz" src="https://none.deno.dev/ui/icon-button/simple?c=blue&i=stackblitz" />
          </a>
          <a title="codesandbox" href="https://codesandbox.io/p/sandbox/github/flamrdevs/klass-examples/tree/main/svelte-tailwind" target="_blank" style="display: inline-block; margin: 0px 4px;">
            <img alt="codesandbox" src="https://none.deno.dev/ui/icon-button/simple?i=codesandbox" />
          </a>
        </p>
      </td>
    </tr>
    <tr>
      <td>
        <span style="font-size: 1rem; font-weight: 500;">Vue + Tailwind</span>
      </td>
      <td>
        <p align="center">
          <a title="github" href="https://github.com/flamrdevs/klass-examples/tree/main/vue-tailwind" target="_blank" style="display: inline-block; margin: 0px 4px;">
            <img alt="github" src="https://none.deno.dev/ui/icon-button/simple?i=github" />
          </a>
          <a title="stackblitz" href="https://stackblitz.com/fork/github/flamrdevs/klass-examples/tree/main/vue-tailwind?title=Klass%20Vue%20Tailwind" target="_blank" style="display: inline-block; margin: 0px 4px;">
            <img alt="stackblitz" src="https://none.deno.dev/ui/icon-button/simple?c=blue&i=stackblitz" />
          </a>
          <a title="codesandbox" href="https://codesandbox.io/p/sandbox/github/flamrdevs/klass-examples/tree/main/vue-tailwind" target="_blank" style="display: inline-block; margin: 0px 4px;">
            <img alt="codesandbox" src="https://none.deno.dev/ui/icon-button/simple?i=codesandbox" />
          </a>
        </p>
      </td>
    </tr>
  </tbody>
</table>

## Inspiration

Some of the core concepts and designs are inspired by

- [cva](https://github.com/joe-bell/cva)
- [vanilla-extract](https://github.com/vanilla-extract-css/vanilla-extract)
- [stitches](https://github.com/stitchesjs/stitches)

## Benchmark

<p align="left">
  <a title="github" href="https://github.com/flamrdevs/klass-benchmark">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://none.deno.dev/ui/button/simple?t=dark&i=github&e=Open%20in%20GitHub">
      <img alt="github" src="https://none.deno.dev/ui/button/simple?t=light&i=github&e=Open%20in%20GitHub" hspace="1">
    </picture>
  </a>
</p>

## Authors

- [flamrdevs](https://github.com/flamrdevs)

## License

[MIT License](./LICENSE)
