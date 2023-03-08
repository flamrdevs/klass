# Responsive

## Code

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

## Setup

Note : for now responsive variants must be added to the safelist manually

```typescript
function combine(s: string[], e: string[]) {
  return s.map((_s) => e.map((_e) => `${_s}-${_e}`)).flat(1);
}
function createReklassSafeList(bps: string[]) {
  return function (cns: string[]) {
    return [cns, ...bps.map((bp) => cns.map((cn) => `${bp}:${cn}`))].flat(1);
  };
}

const someConfig = {
  safelist: [
    // box responsive variants above
    ...createReklassSafeList(["sm", "md", "lg"])(combine(["m", "p"], ["0", "2", "4", "8"])),
  ],
};
```
