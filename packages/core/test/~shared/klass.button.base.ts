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
};

export const test: Test<keyof typeof options.variants>[] = [
  {
    props: {},
    equal: "base",
  },
  {
    props: {
      color: "red",
    },
    equal: "base color-red",
  },
  {
    props: {
      size: "md",
    },
    equal: "base size-md",
  },
  {
    props: {
      color: "red",
      size: "lg",
    },
    equal: "base color-red size-lg",
  },
];
