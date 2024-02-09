import type { Test } from "./@.ts";

export const options = {
  base: "base",
  variants: {
    color: {
      red: "",
      green: "",
      blue: "",
    },
    size: {
      sm: "size-sm",
      md: "size-md",
      lg: "size-lg",
    },
    variant: {
      default: "variant-default",
      outline: "variant-outline",
    },
  },
  defaults: {
    color: "green",
    size: "md",
    variant: "default",
  } as {
    color: "green";
    size: "md";
    variant: "default";
  },
  compounds: [
    [
      {
        color: "red",
        variant: "default",
      },
      "color-red-variant-default",
    ],
    [
      {
        color: "green",
        variant: "default",
      },
      "color-green-variant-default",
    ],
    [
      {
        color: "blue",
        variant: "default",
      },
      "color-blue-variant-default",
    ],
    [
      {
        color: "red",
        variant: "outline",
      },
      "color-red-variant-outline",
    ],
    [
      {
        color: "green",
        variant: "outline",
      },
      "color-green-variant-outline",
    ],
    [
      {
        color: "blue",
        variant: "outline",
      },
      "color-blue-variant-outline",
    ],
  ] as [
    [
      {
        color: "red";
        variant: "default";
      },
      "color-red-variant-default"
    ],
    [
      {
        color: "green";
        variant: "default";
      },
      "color-green-variant-default"
    ],
    [
      {
        color: "blue";
        variant: "default";
      },
      "color-blue-variant-default"
    ],
    [
      {
        color: "red";
        variant: "outline";
      },
      "color-red-variant-outline"
    ],
    [
      {
        color: "green";
        variant: "outline";
      },
      "color-green-variant-outline"
    ],
    [
      {
        color: "blue";
        variant: "outline";
      },
      "color-blue-variant-outline"
    ]
  ],
};

export const test: Test<keyof typeof options.variants>[] = [
  {
    props: {},
    equal: "base size-md variant-default color-green-variant-default",
  },
  {
    props: {
      variant: "outline",
    },
    equal: "base size-md variant-outline color-green-variant-outline",
  },
  {
    props: {
      color: "red",
      variant: "default",
    },
    equal: "base size-md variant-default color-red-variant-default",
  },
  {
    props: {
      color: "red",
      variant: "outline",
    },
    equal: "base size-md variant-outline color-red-variant-outline",
  },
];
