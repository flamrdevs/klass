export const options = {
  variants: {
    foo: {
      a: "a",
      b: "b",
      c: "c",
    },
    bar: {
      d: "d",
      e: "e",
      f: "f",
    },
    baz: {
      g: "g",
      h: "h",
      i: "i",
    },
  },
} as {
  variants: {
    foo: {
      a: string;
      b: string;
      c: string;
    };
    bar: {
      d: string;
      e: string;
      f: string;
    };
    baz: {
      g: string;
      h: string;
      i: string;
    };
  };
};
