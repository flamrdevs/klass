# Typescript

## Core

```tsx
import { klass, reklass } from "@klass/core";
import type { VariantsOf } from "@klass/core";

const ButtonKlass = klass({
  // options
});

type ButtonKlassVariants = VariantsOf<typeof ButtonKlass>;

const BoxReklass = reklass({
  // options
});

type BoxReklassVariants = VariantsOf<typeof BoxReklass>;
```

## Components

```tsx
import { klassed, reklassed } from "@klass/(react|preact|solid)";
import type { VariantsOf } from "@klass/core";

const ButtonKlassed = klassed("button", {
  // options
});

type ButtonKlassedVariants = VariantsOf<(typeof ButtonKlassed)["klass"]>;

const BoxReklassed = reklassed("div", {
  // options
});

type BoxReklassedVariants = VariantsOf<(typeof BoxReklassed)["reklass"]>;
```
