import { describe, it, expect } from "vitest";

import { variant, klass } from "./index";

describe("@klass/core", async () => {
  it("work", async () => {
    expect(true).toBeTruthy();
  });
});

describe("variant", async () => {
  it("type of", async () => {
    expect(variant).toBeTypeOf("function");
    expect(variant({ variant: {} })).toBeTypeOf("function");
  });

  it("compund", async () => {
    const size = variant({
      variant: {
        sm: "size-sm",
        md: "size-md",
        lg: "size-lg",
      },
    });

    expect(size.options).toEqual({
      variant: {
        sm: "size-sm",
        md: "size-md",
        lg: "size-lg",
      },
    });
  });

  it("basic string", async () => {
    const size = variant({
      variant: {
        sm: "size-sm",
        md: "size-md",
        lg: "size-lg",
      },
    });

    expect(size()).toBeUndefined();
    expect(size("unknown" as any)).toBeUndefined();
    expect(size("md")).toEqual("size-md");
  });

  it("basic string with default variant", async () => {
    const size = variant({
      variant: {
        sm: "size-sm",
        md: "size-md",
        lg: "size-lg",
      },
      defaultVariant: "md",
    });

    expect(size()).toEqual("size-md");
    expect(size("unknown" as any)).toEqual("size-md");
    expect(size("md")).toEqual("size-md");
  });

  it("basic boolean", async () => {
    const disable = variant({
      variant: {
        true: "disable-true",
        false: "disable-false",
      },
    });

    expect(disable()).toBeUndefined();
    expect(disable("unknown" as any)).toBeUndefined();
    expect(disable(true)).toEqual("disable-true");
  });

  it("basic boolean with default variant", async () => {
    const disable = variant({
      variant: {
        true: "disable-true",
        false: "disable-false",
      },
      defaultVariant: false,
    });

    expect(disable()).toEqual("disable-false");
    expect(disable("unknown" as any)).toEqual("disable-false");
    expect(disable(true)).toEqual("disable-true");
  });

  it("mix practice", async () => {
    const A = Symbol("hahaha");

    const mix = variant({
      variant: {
        "": "mix-",
        true: "mix-true",
        1: "mix-1",
        [A]: "mix-symbol(A)",
      },
    });

    expect(mix()).toBeUndefined();
    expect(mix("unknown" as any)).toBeUndefined();
    expect(mix("")).toEqual("mix-");
    expect(mix(true)).toEqual("mix-true");
    expect(mix(1)).toEqual("mix-1");
    expect(mix(A)).toEqual("mix-symbol(A)");
  });
});

describe("klass", async () => {
  it("type of", async () => {
    expect(klass).toBeTypeOf("function");
    expect(klass({ variants: {} })).toBeTypeOf("function");
  });

  it("compund", async () => {
    const klassy = klass({
      base: "base",
      variants: {
        size: {
          sm: "size-sm",
          md: "size-md",
          lg: "size-lg",
        },
        disable: {
          true: "disable-true",
          false: "disable-false",
        },
      },
    });

    expect(klassy.options).toEqual({
      base: "base",
      variants: {
        size: {
          sm: "size-sm",
          md: "size-md",
          lg: "size-lg",
        },
        disable: {
          true: "disable-true",
          false: "disable-false",
        },
      },
    });
    expect(klassy.variant).toBeTypeOf("object");
    expect(klassy.variant.size).toBeTypeOf("function");
    expect(klassy.variant.disable).toBeTypeOf("function");
    expect(klassy.variant.size()).toBeUndefined();
    expect(klassy.variant.size.options).toEqual({
      variant: {
        sm: "size-sm",
        md: "size-md",
        lg: "size-lg",
      },
    });
    expect(klassy.variant.disable()).toBeUndefined();
    expect(klassy.variant.disable.options).toEqual({
      variant: {
        true: "disable-true",
        false: "disable-false",
      },
    });
    expect(klassy.variant.size("md")).toEqual("size-md");
    expect(klassy.variant.disable(true)).toEqual("disable-true");
  });

  it("basic", async () => {
    const klassy = klass({
      base: "base",
      variants: {
        size: {
          sm: "size-sm",
          md: "size-md",
          lg: "size-lg",
        },
        disable: {
          true: "disable-true",
          false: "disable-false",
        },
      },
    });

    expect(klassy()).toEqual("base");
    expect(klassy({ size: "unknown" as any })).toEqual("base");
    expect(klassy({ size: "md" })).toEqual("base size-md");
    expect(klassy({ size: "unknown" as any, disable: true })).toEqual("base disable-true");
    expect(klassy({ size: "md", disable: false })).toEqual("base size-md disable-false");
    expect(klassy({ disable: "unknown" as any })).toEqual("base");
    expect(klassy({ disable: false })).toEqual("base disable-false");
    expect(klassy({ disable: "unknown" as any, size: "sm" })).toEqual("base size-sm");
    expect(klassy({ disable: false, size: "lg" })).toEqual("base size-lg disable-false");
  });

  it("basic with default variants", async () => {
    const klassy = klass({
      base: "base",
      variants: {
        size: {
          sm: "size-sm",
          md: "size-md",
          lg: "size-lg",
        },
        disable: {
          true: "disable-true",
          false: "disable-false",
        },
      },
      defaultVariants: {
        size: "md",
        disable: false,
      },
    });

    expect(klassy()).toEqual("base size-md disable-false");
    expect(klassy({ size: "unknown" as any })).toEqual("base size-md disable-false");
    expect(klassy({ size: "md" })).toEqual("base size-md disable-false");
    expect(klassy({ size: "unknown" as any, disable: true })).toEqual("base size-md disable-true");
    expect(klassy({ size: "md", disable: false })).toEqual("base size-md disable-false");
    expect(klassy({ disable: "unknown" as any })).toEqual("base size-md disable-false");
    expect(klassy({ disable: false })).toEqual("base size-md disable-false");
    expect(klassy({ disable: "unknown" as any, size: "sm" })).toEqual("base size-sm disable-false");
    expect(klassy({ disable: false, size: "lg" })).toEqual("base size-lg disable-false");
  });
});
