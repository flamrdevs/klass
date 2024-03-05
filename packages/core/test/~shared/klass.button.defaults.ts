import type { Test } from "./@";

export const options = {
  base: "base",
  variants: {
    color: {
      red: "color-red",
      green: "color-green",
      blue: "color-blue",
    },
    size: {
      sm: "size-sm",
      md: "size-md",
      lg: "size-lg",
    },
  },
  defaults: {
    color: "green",
    size: "md",
  } as {
    color: "green";
    size: "md";
  },
};

export const test: Test<keyof typeof options.variants>[] = [
  {
    props: {},
    equal: "base color-green size-md",
  },
  {
    props: {
      color: "red",
    },
    equal: "base color-red size-md",
  },
  {
    props: {
      size: "lg",
    },
    equal: "base color-green size-lg",
  },
  {
    props: {
      color: "red",
      size: "lg",
    },
    equal: "base color-red size-lg",
  },
];
