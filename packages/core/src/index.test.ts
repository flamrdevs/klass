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
    const size = variant({ variant: { sm: "size-sm", md: "size-md", lg: "size-lg" } });

    expect(size.options).toEqual({ variant: { sm: "size-sm", md: "size-md", lg: "size-lg" } });
  });

  it("basic string", async () => {
    const size = variant({ variant: { sm: "size-sm", md: "size-md", lg: "size-lg" } });

    expect(size()).toBeUndefined();
    expect(size("unknown" as any)).toBeUndefined();
    expect(size("md")).toEqual("size-md");
  });

  it("basic string with default variant", async () => {
    const size = variant({ variant: { sm: "size-sm", md: "size-md", lg: "size-lg" }, defaultVariant: "md" });

    expect(size()).toEqual("size-md");
    expect(size("unknown" as any)).toBeUndefined();
    expect(size("md")).toEqual("size-md");
  });

  it("basic boolean", async () => {
    const loading = variant({ variant: { true: "loading-true", false: "loading-false" } });

    expect(loading()).toBeUndefined();
    expect(loading("unknown" as any)).toBeUndefined();
    expect(loading(true)).toEqual("loading-true");
  });

  it("basic boolean with default variant", async () => {
    const loading = variant({ variant: { true: "loading-true", false: "loading-false" }, defaultVariant: false });

    expect(loading()).toEqual("loading-false");
    expect(loading("unknown" as any)).toBeUndefined();
    expect(loading(true)).toEqual("loading-true");
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
        size: { sm: "size-sm", md: "size-md", lg: "size-lg" },
        loading: { true: "loading-true", false: "loading-false" },
        order: { 1: "order-1", 2: "order-2", 3: "order-3" },
      },
      defaultVariants: { size: "md", loading: false, order: 1 },
      compoundVariants: [
        { variant: { size: "sm", loading: true }, classes: "size-sm---loading-true" },
        { variant: { size: "md", loading: true }, classes: "size-md---loading-true" },
        { variant: { size: "lg", loading: true }, classes: "size-lg---loading-true" },
        { variant: { loading: true, order: 1 }, classes: "loading-true---order-1" },
        { variant: { loading: true, order: 2 }, classes: "loading-true---order-2" },
        { variant: { loading: true, order: 3 }, classes: "loading-true---order-3" },
      ],
    });

    expect(klassy.options).toEqual({
      base: "base",
      variants: {
        size: { sm: "size-sm", md: "size-md", lg: "size-lg" },
        loading: { true: "loading-true", false: "loading-false" },
        order: { 1: "order-1", 2: "order-2", 3: "order-3" },
      },
      defaultVariants: { size: "md", loading: false, order: 1 },
      compoundVariants: [
        { variant: { size: "sm", loading: true }, classes: "size-sm---loading-true" },
        { variant: { size: "md", loading: true }, classes: "size-md---loading-true" },
        { variant: { size: "lg", loading: true }, classes: "size-lg---loading-true" },
        { variant: { loading: true, order: 1 }, classes: "loading-true---order-1" },
        { variant: { loading: true, order: 2 }, classes: "loading-true---order-2" },
        { variant: { loading: true, order: 3 }, classes: "loading-true---order-3" },
      ],
    });
    expect(klassy.variant).toBeTypeOf("object");
    expect(klassy.variant.size).toBeTypeOf("function");
    expect(klassy.variant.loading).toBeTypeOf("function");
    expect(klassy.variant.size()).toEqual("size-md");
    expect(klassy.variant.size.options).toEqual({ variant: { sm: "size-sm", md: "size-md", lg: "size-lg" }, defaultVariant: "md" });
    expect(klassy.variant.loading()).toEqual("loading-false");
    expect(klassy.variant.loading.options).toEqual({ variant: { true: "loading-true", false: "loading-false" }, defaultVariant: false });
    expect(klassy.variant.size("md")).toEqual("size-md");
    expect(klassy.variant.loading(true)).toEqual("loading-true");
  });

  it("basic", async () => {
    const klassy = klass({
      base: "base",
      variants: {
        size: { sm: "size-sm", md: "size-md", lg: "size-lg" },
        loading: { true: "loading-true", false: "loading-false" },
        order: { 1: "order-1", 2: "order-2", 3: "order-3" },
      },
      compoundVariants: [
        { variant: { size: "sm", loading: true }, classes: "size-sm---loading-true" },
        { variant: { size: "md", loading: true }, classes: "size-md---loading-true" },
        { variant: { size: "lg", loading: true }, classes: "size-lg---loading-true" },
        { variant: { loading: true, order: 1 }, classes: "loading-true---order-1" },
        { variant: { loading: true, order: 2 }, classes: "loading-true---order-2" },
        { variant: { loading: true, order: 3 }, classes: "loading-true---order-3" },
      ],
    });

    expect(klassy()).toEqual("base");
    // size first
    expect(klassy({ size: "unknown" as any })).toEqual("base");
    expect(klassy({ size: "md" })).toEqual("base size-md");
    expect(klassy({ size: "unknown" as any, loading: true })).toEqual("base loading-true");
    expect(klassy({ size: "md", loading: false })).toEqual("base size-md loading-false");
    // loading first
    expect(klassy({ loading: "unknown" as any })).toEqual("base");
    expect(klassy({ loading: false })).toEqual("base loading-false");
    expect(klassy({ loading: "unknown" as any, size: "sm" })).toEqual("base size-sm");
    expect(klassy({ loading: false, size: "lg" })).toEqual("base size-lg loading-false");
    // order first
    expect(klassy({ order: 1 })).toEqual("base order-1");
    expect(klassy({ order: 2 })).toEqual("base order-2");
    expect(klassy({ order: 3 })).toEqual("base order-3");
    expect(klassy({ order: "unknown" as any })).toEqual("base");
    // compound
    expect(klassy({ size: "sm", loading: true })).toEqual("base size-sm loading-true size-sm---loading-true");
    expect(klassy({ size: "md", loading: true })).toEqual("base size-md loading-true size-md---loading-true");
    expect(klassy({ size: "lg", loading: true })).toEqual("base size-lg loading-true size-lg---loading-true");
  });

  it("basic with default variants", async () => {
    const klassy = klass({
      base: "base",
      variants: {
        size: { sm: "size-sm", md: "size-md", lg: "size-lg" },
        loading: { true: "loading-true", false: "loading-false" },
        order: { 1: "order-1", 2: "order-2", 3: "order-3" },
      },
      defaultVariants: { size: "md", loading: false, order: 1 },
      compoundVariants: [
        { variant: { size: "sm", loading: true }, classes: "size-sm---loading-true" },
        { variant: { size: "md", loading: true }, classes: "size-md---loading-true" },
        { variant: { size: "lg", loading: true }, classes: "size-lg---loading-true" },
        { variant: { loading: true, order: 1 }, classes: "loading-true---order-1" },
        { variant: { loading: true, order: 2 }, classes: "loading-true---order-2" },
        { variant: { loading: true, order: 3 }, classes: "loading-true---order-3" },
      ],
    });

    expect(klassy()).toEqual("base size-md loading-false order-1");
    // size first
    expect(klassy({ size: "unknown" as any })).toEqual("base loading-false order-1");
    expect(klassy({ size: "md" })).toEqual("base size-md loading-false order-1");
    expect(klassy({ size: "unknown" as any, loading: true })).toEqual("base loading-true order-1 loading-true---order-1");
    expect(klassy({ size: "md", loading: false })).toEqual("base size-md loading-false order-1");
    // loading first
    expect(klassy({ loading: "unknown" as any })).toEqual("base size-md order-1");
    expect(klassy({ loading: false })).toEqual("base size-md loading-false order-1");
    expect(klassy({ loading: "unknown" as any, size: "sm" })).toEqual("base size-sm order-1");
    expect(klassy({ loading: false, size: "lg" })).toEqual("base size-lg loading-false order-1");
    // order first
    expect(klassy({ order: 1 })).toEqual("base size-md loading-false order-1");
    expect(klassy({ order: 2 })).toEqual("base size-md loading-false order-2");
    expect(klassy({ order: 3 })).toEqual("base size-md loading-false order-3");
    expect(klassy({ order: "unknown" as any })).toEqual("base size-md loading-false");
    // compound
    expect(klassy({ size: "sm", loading: true })).toEqual(
      "base size-sm loading-true order-1 size-sm---loading-true loading-true---order-1"
    );
    expect(klassy({ size: "md", loading: true })).toEqual(
      "base size-md loading-true order-1 size-md---loading-true loading-true---order-1"
    );
    expect(klassy({ size: "lg", loading: true })).toEqual(
      "base size-lg loading-true order-1 size-lg---loading-true loading-true---order-1"
    );
  });
});
