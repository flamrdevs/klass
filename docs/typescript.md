# Typescript

## Core

```tsx
import { klass, reklass } from "@klass/core";
import type { VariantsOf } from "@klass/core";

type ButtonKlassVariants = VariantsOf<typeof ButtonKlass>;

const ButtonKlass = klass({
  // options
});

type BoxReklassVariants = VariantsOf<typeof BoxReklass>;

const BoxReklass = reklass({
  // options
});
```

## Components

```tsx
import { klassed, reklassed } from "@klass/(react|preact|solid)";
import type { VariantsOf } from "@klass/core";

type ButtonKlassedVariants = VariantsOf<typeof ButtonKlassed["klass"]>;

const ButtonKlassed = klassed("button", {
  // options
});

type BoxReklassedVariants = VariantsOf<typeof BoxReklassed["reklass"]>;

const BoxReklassed = reklassed("div", {
  // options
});
```
