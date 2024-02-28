import type { Test } from "./@";

export const options = {
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
    equal: "",
  },
  {
    props: {
      color: "red",
    },
    equal: "color-red",
  },
  {
    props: {
      size: "md",
    },
    equal: "size-md",
  },
  {
    props: {
      color: "red",
      size: "lg",
    },
    equal: "color-red size-lg",
  },
];
