import type { Test } from "./@.ts";

export const options = {
  conditions: [
    {
      base: "",
      sm: "sm:",
      md: "md:",
      lg: "lg:",
    },
    "base",
  ] as [
    {
      base: "";
      sm: "sm:";
      md: "md:";
      lg: "lg:";
    },
    "base"
  ],
  variants: {
    x: {
      "1": "x-1",
      "2": "x-2",
      "3": "x-3",
      "4": "x-4",
      "5": "x-5",
    },
    y: {
      "1": "y-1",
      "2": "y-2",
      "3": "y-3",
      "4": "y-4",
      "5": "y-5",
    },
    z: {
      "1": "z-1",
      "2": "z-2",
      "3": "z-3",
      "4": "z-4",
      "5": "z-5",
    },
  },
};

type C = "base" | "sm" | "md" | "lg";
type V = "1" | "2" | "3" | "4" | "5";

export const test: Test<keyof typeof options.variants, V | { [key in C]?: V }>[] = [
  {
    props: {},
    equal: "",
  },
  {
    props: {
      x: "1",
    },
    equal: "x-1",
  },
  {
    props: {
      x: "2",
      y: "3",
      z: "4",
    },
    equal: "x-2 y-3 z-4",
  },
  {
    props: {
      x: {
        base: "1",
      },
      y: "5",
    },
    equal: "x-1 y-5",
  },
  {
    props: {
      x: {
        base: "1",
        sm: "2",
      },
      y: {
        md: "3",
        lg: "4",
      },
    },
    equal: "x-1 sm:x-2 md:y-3 lg:y-4",
  },
];
