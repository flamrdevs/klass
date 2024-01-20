import { describe, it, expect } from "vitest";

import { variant, klass, revariant, reklass } from "./../src/index.ts";

import { expectVariantFn, expectKlassFn, expectRevariantFn, expectReklassFn, customEnd, customAs, createArray } from "./utils.ts";

describe("variant", async () => {
  const PaddingVariant = variant({ sm: "padding-sm", md: "padding-md", lg: "padding-lg" });

  const SizeVariant = variant({ sm: "size-sm", md: "size-md", lg: "size-lg" }, "md");

  const LoadingVariant = variant({ true: "loading-true", false: "loading-false" });

  const DisableVariant = variant({ true: "disable-true", false: "disable-false" }, false);

  const ZIndexVariant = variant({ 0: "z-index-0", 1: "z-index-1", 2: "z-index-2", 3: "z-index-3", 4: "z-index-4", 5: "z-index-5" });

  const OrderVariant = variant({ 0: "order-0", 1: "order-1", 2: "order-2", 3: "order-3", 4: "order-4", 5: "order-5" }, 0);

  const MixedVariant = variant({ "": "mix-", empty: "", false: "mix-false", true: "mix-true", 0: "mix-0", 1: "mix-1" });

  it("type of", async () => {
    expect(variant).toBeTypeOf("function");
    expect(variant({})).toBeTypeOf("function");
  });

  it("compound", async () => {
    expectVariantFn(PaddingVariant);
    expectVariantFn(SizeVariant);
    expectVariantFn(LoadingVariant);
    expectVariantFn(DisableVariant);
    expectVariantFn(ZIndexVariant);
    expectVariantFn(OrderVariant);
    expectVariantFn(MixedVariant);
  });

  it("string", async () => {
    expect(PaddingVariant()).toBeUndefined();
    expect(PaddingVariant("unknown" as any)).toBeUndefined();
    expect(PaddingVariant("md")).toEqual("padding-md");
  });

  it("string with default variant", async () => {
    expect(SizeVariant()).toEqual("size-md");
    expect(SizeVariant("unknown" as any)).toBeUndefined();
    expect(SizeVariant("md")).toEqual("size-md");
  });

  it("boolean", async () => {
    expect(LoadingVariant()).toBeUndefined();
    expect(LoadingVariant("unknown" as any)).toBeUndefined();
    expect(LoadingVariant(true)).toEqual("loading-true");
  });

  it("boolean with default variant", async () => {
    expect(DisableVariant()).toEqual("disable-false");
    expect(DisableVariant("unknown" as any)).toBeUndefined();
    expect(DisableVariant(true)).toEqual("disable-true");
  });

  it("number", async () => {
    expect(ZIndexVariant()).toBeUndefined();
    expect(ZIndexVariant("unknown" as any)).toBeUndefined();
    expect(ZIndexVariant(0)).toEqual("z-index-0");
  });

  it("number with default variant", async () => {
    expect(OrderVariant()).toEqual("order-0");
    expect(OrderVariant("unknown" as any)).toBeUndefined();
    expect(OrderVariant(0)).toEqual("order-0");
  });

  it("mix practice", async () => {
    expect(MixedVariant()).toBeUndefined();
    expect(MixedVariant("unknown" as any)).toBeUndefined();
    expect(MixedVariant("")).toEqual("mix-");
    expect(MixedVariant("empty")).toEqual("");
    expect(MixedVariant(false)).toEqual("mix-false");
    expect(MixedVariant(true)).toEqual("mix-true");
    expect(MixedVariant(0)).toEqual("mix-0");
    expect(MixedVariant(1)).toEqual("mix-1");
  });
});

describe("klass", async () => {
  const BoxKlass = klass({
    base: "block",
    variants: {
      m: { "1": "m-1", "2": "m-2", "3": "m-3", "4": "m-4", "5": "m-5" },
      p: { "1": "p-1", "2": "p-2", "3": "p-3", "4": "p-4", "5": "p-5" },
      empty: { 0: "", 1: "", true: "", false: "" },
    },
  });

  const ButtonKlass = klass({
    base: "inline-block outline-none",
    variants: {
      color: { red: null, green: null, blue: null },
      variant: { filled: "text-white", outline: "bg-transparent border" },
      full: { true: "w-full h-full", width: "w-full", height: "h-full" },
      empty: { 0: "", 1: "", true: "", false: "" },
    },
    defaults: { color: "red", variant: "filled" },
    compounds: [
      [{ color: "red", variant: "filled" }, "bg-red-600"],
      [{ color: "green", variant: "filled" }, "bg-green-600"],
      [{ color: "blue", variant: "filled" }, "bg-blue-600"],
      [{ color: "red", variant: "outline" }, "text-red-600 border-red-600"],
      [{ color: "green", variant: "outline" }, "text-green-600 border-green-600"],
      [{ color: "blue", variant: "outline" }, "text-blue-600 border-blue-600"],
      [{ empty: true, color: "red" }, ""],
      [{ empty: true, color: "red" }, ""],
      [{ empty: true, color: "red" }, ""],
    ],
  });

  const BoxCustomEndKlass = klass(BoxKlass.o, { end: customEnd });

  it("type of", async () => {
    expect(klass).toBeTypeOf("function");
    expect(klass({ variants: {} })).toBeTypeOf("function");
  });

  it("compound", async () => {
    expectKlassFn(BoxKlass, { keys: ["m", "p", "empty"] });
    expectKlassFn(ButtonKlass, { keys: ["color", "variant", "full", "empty"] });
  });

  it("basic", async () => {
    expect(BoxKlass()).toEqual("block");

    expect(([0, 1, false, true] as const).map((empty) => BoxKlass({ empty }))).toEqual(createArray(4, () => "block"));

    expect(BoxKlass({ m: "1" })).toEqual("block m-1");
    expect(BoxKlass({ m: "2", p: "1" })).toEqual("block m-2 p-1");
    expect(BoxKlass({ p: "2" })).toEqual("block p-2");
  });

  it("basic with default variants", async () => {
    expect(([0, 1, false, true] as const).map((empty) => ButtonKlass({ empty }))).toEqual(createArray(4, () => "inline-block outline-none text-white bg-red-600"));

    expect(ButtonKlass()).toEqual("inline-block outline-none text-white bg-red-600");

    expect(ButtonKlass({ full: true })).toEqual("inline-block outline-none text-white w-full h-full bg-red-600");

    expect(ButtonKlass({ color: "green" })).toEqual("inline-block outline-none text-white bg-green-600");

    expect(ButtonKlass({ color: "blue", variant: "outline" })).toEqual("inline-block outline-none bg-transparent border text-blue-600 border-blue-600");
  });

  it("customize end", async () => {
    expect(BoxCustomEndKlass()).toEqual(customEnd("block"));
    expect(BoxCustomEndKlass({ m: "3" })).toEqual(customEnd("block m-3"));
  });
});

describe("revariant", async () => {
  const PaddingRevariant = revariant({ base: "", sm: "sm:", md: "md:", lg: "lg:" }, "base", { sm: "padding-sm", md: "padding-md", lg: "padding-lg" });

  const LoadingRevariant = revariant({ base: "", sm: "sm:", md: "md:", lg: "lg:" }, "base", { true: "loading-true", false: "loading-false" });

  const ZIndexRevariant = revariant({ base: "", sm: "sm:", md: "md:", lg: "lg:" }, "base", { 0: "z-index-0", 1: "z-index-1", 2: "z-index-2", 3: "z-index-3", 4: "z-index-4", 5: "z-index-5" });

  const MixedRevariant = revariant({ base: "", sm: "sm:", md: "md:", lg: "lg:" }, "base", { "": "mix-", empty: "", false: "mix-false", true: "mix-true", 0: "mix-0", 1: "mix-1" });

  const MixedCustomAsRevariant = revariant(
    { base: "", sm: "@sm", md: "@md", lg: "@lg" },
    "base",
    { "": "mix-", empty: "", false: "mix-false", true: "mix-true", 0: "mix-0", 1: "mix-1" },
    { as: customAs }
  );

  it("type of", async () => {
    expect(revariant).toBeTypeOf("function");
    expect(revariant({ condition: "" }, "condition", {})).toBeTypeOf("function");
  });

  it("compound", async () => {
    expectRevariantFn(PaddingRevariant);
    expectRevariantFn(LoadingRevariant);
    expectRevariantFn(ZIndexRevariant);
    expectRevariantFn(MixedRevariant);
  });

  it("string", async () => {
    expect(PaddingRevariant()).toBeUndefined();
    expect(PaddingRevariant("unknown" as any)).toBeUndefined();
    expect(PaddingRevariant("md")).toEqual("padding-md");
    expect(PaddingRevariant({ base: "sm", md: "md" })).toEqual("padding-sm md:padding-md");
  });

  it("boolean", async () => {
    expect(LoadingRevariant()).toBeUndefined();
    expect(LoadingRevariant("unknown" as any)).toBeUndefined();
    expect(LoadingRevariant(true)).toEqual("loading-true");
    expect(LoadingRevariant({ base: true, md: false })).toEqual("loading-true md:loading-false");
  });

  it("number", async () => {
    expect(ZIndexRevariant()).toBeUndefined();
    expect(ZIndexRevariant("unknown" as any)).toBeUndefined();
    expect(ZIndexRevariant(0)).toEqual("z-index-0");
    expect(ZIndexRevariant({ base: 0, md: 0 })).toEqual("z-index-0 md:z-index-0");
  });

  it("mix practice", async () => {
    expect(MixedRevariant()).toBeUndefined();
    expect(MixedRevariant("unknown" as any)).toBeUndefined();
    expect(MixedRevariant("")).toEqual("mix-");
    expect(MixedRevariant("empty")).toEqual("");
    expect(MixedRevariant(false)).toEqual("mix-false");
    expect(MixedRevariant(true)).toEqual("mix-true");
    expect(MixedRevariant(0)).toEqual("mix-0");
    expect(MixedRevariant(1)).toEqual("mix-1");
    expect(MixedRevariant({ base: false, sm: 0, md: "", lg: false })).toEqual("mix-false sm:mix-0 md:mix- lg:mix-false");
    expect(MixedRevariant({ base: true, sm: 1, md: "", lg: true })).toEqual("mix-true sm:mix-1 md:mix- lg:mix-true");
  });

  it("customize as", async () => {
    expect(MixedCustomAsRevariant({ base: false, sm: 0, md: "", lg: false })).toEqual("mix-false mix-0@sm mix-@md mix-false@lg");
    expect(MixedCustomAsRevariant({ base: true, sm: 1, md: "", lg: true })).toEqual("mix-true mix-1@sm mix-@md mix-true@lg");
  });
});

describe("reklass", async () => {
  const BoxReklass = reklass({
    conditions: [{ base: "", sm: "sm:", md: "md:", lg: "lg:" }, "base"],
    variants: {
      m: { "1": "m-1", "2": "m-2", "3": "m-3", "4": "m-4", "5": "m-5" },
      p: { "1": "p-1", "2": "p-2", "3": "p-3", "4": "p-4", "5": "p-5" },
      empty: { 0: "", 1: "", true: "", false: "" },
    },
  });

  const BoxCustomAsReklass = reklass(
    {
      conditions: [{ base: "", sm: "@sm", md: "@md", lg: "@lg" }, "base"],
      variants: BoxReklass.o.variants,
    },
    { as: customAs }
  );

  const BoxCustomEndReklass = reklass(BoxReklass.o, { end: customEnd });

  it("type of", async () => {
    expect(reklass).toBeTypeOf("function");
    expect(reklass({ conditions: [{ condition: "" }, "condition"], variants: {} })).toBeTypeOf("function");
  });

  it("compound", async () => {
    expectReklassFn(BoxReklass, { keys: ["m", "p", "empty"] });
  });

  it("basic", async () => {
    expect(BoxReklass()).toEqual("");

    expect(([0, 1, false, true] as const).map((empty) => BoxReklass({ empty }))).toEqual(createArray(4, () => ""));

    expect(BoxReklass({ m: "1" })).toEqual("m-1");
    expect(BoxReklass({ m: "2", p: "1" })).toEqual("m-2 p-1");
    expect(BoxReklass({ p: "2" })).toEqual("p-2");

    expect(BoxReklass({ m: { base: "1", md: "3" } })).toEqual("m-1 md:m-3");
    expect(BoxReklass({ m: { base: "2", md: "4" }, p: { base: "1", md: "3" } })).toEqual("m-2 md:m-4 p-1 md:p-3");
    expect(BoxReklass({ p: { base: "2", md: "4" } })).toEqual("p-2 md:p-4");
  });

  it("customize as", async () => {
    expect(BoxCustomAsReklass({ m: { base: "1", md: "3" } })).toEqual("m-1 m-3@md");
    expect(BoxCustomAsReklass({ m: { base: "2", md: "4" }, p: { base: "1", md: "3" } })).toEqual("m-2 m-4@md p-1 p-3@md");
    expect(BoxCustomAsReklass({ p: { base: "2", md: "4" } })).toEqual("p-2 p-4@md");
  });

  it("customize end", async () => {
    expect(BoxCustomEndReklass()).toEqual(customEnd(""));
    expect(BoxCustomEndReklass({ m: "3" })).toEqual(customEnd("m-3"));
  });
});
