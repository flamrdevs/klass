export const options = {
  conditions: [
    {
      c0: "",
      c1: "c1",
      c2: "c2",
      c3: "c3",
    },
    "c0",
  ],
  variants: {
    foo: {
      a: "a",
      b: "b",
      c: "c",
    },
    bar: {
      a: "a",
      b: "b",
      c: "c",
    },
    baz: {
      a: "a",
      b: "b",
      c: "c",
    },
  },
} as {
  conditions: [
    {
      c0: string;
      c1: string;
      c2: string;
      c3: string;
    },
    "c0",
  ];
  variants: {
    foo: {
      a: string;
      b: string;
      c: string;
    };
    bar: {
      a: string;
      b: string;
      c: string;
    };
    baz: {
      a: string;
      b: string;
      c: string;
    };
  };
};
