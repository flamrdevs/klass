import { describe, it, expect } from "vitest";

import { variant, klass, revariant, reklass } from "./index";

import {
  PaddingVariant,
  PaddingVariantOptions,
  SizeVariant,
  SizeVariantOptions,
  LoadingVariant,
  LoadingVariantOptions,
  DisableVariant,
  DisableVariantOptions,
  ZIndexVariant,
  ZIndexVariantOptions,
  OrderVariant,
  OrderVariantOptions,
  MixedVariant,
  MixedVariantOptions,
  BoxKlass,
  BoxKlassOptions,
  ButtonKlass,
  ButtonKlassOptions,
  PaddingRevariant,
  PaddingRevariantOptions,
  LoadingRevariant,
  LoadingRevariantOptions,
  ZIndexRevariant,
  ZIndexRevariantOptions,
  MixedRevariant,
  MixedRevariantOptions,
  BoxReklass,
  BoxReklassOptions,
} from "./index.test.shared";

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
    expect(PaddingVariant.options).toEqual(PaddingVariantOptions);
    expect(SizeVariant.options).toEqual(SizeVariantOptions);
    expect(LoadingVariant.options).toEqual(LoadingVariantOptions);
    expect(DisableVariant.options).toEqual(DisableVariantOptions);
    expect(ZIndexVariant.options).toEqual(ZIndexVariantOptions);
    expect(OrderVariant.options).toEqual(OrderVariantOptions);
    expect(MixedVariant.options).toEqual(MixedVariantOptions);
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
    expect(MixedVariant(true)).toEqual("mix-true");
    expect(MixedVariant(1)).toEqual("mix-1");
  });
});

describe("klass", async () => {
  it("type of", async () => {
    expect(klass).toBeTypeOf("function");
    expect(klass({ variants: {} })).toBeTypeOf("function");
  });

  it("compund", async () => {
    expect(BoxKlass.options).toEqual(BoxKlassOptions);
    expect(BoxKlass.variant).toBeTypeOf("object");
    expect(BoxKlass.variant.m).toBeTypeOf("function");
    expect(BoxKlass.variant.p).toBeTypeOf("function");
    expect(BoxKlass.variant.m.options).toEqual({
      variant: { "1": "m-1", "2": "m-2", "3": "m-3", "4": "m-4", "5": "m-5" },
    });
    expect(BoxKlass.variant.p.options).toEqual({
      variant: { "1": "p-1", "2": "p-2", "3": "p-3", "4": "p-4", "5": "p-5" },
    });

    expect(ButtonKlass.options).toEqual(ButtonKlassOptions);
    expect(ButtonKlass.variant).toBeTypeOf("object");
    expect(ButtonKlass.variant.color).toBeTypeOf("function");
    expect(ButtonKlass.variant.variant).toBeTypeOf("function");
    expect(ButtonKlass.variant.full).toBeTypeOf("function");
    expect(ButtonKlass.variant.color.options).toEqual({
      variant: { red: null, green: null, blue: null },
      defaultVariant: "red",
    });
    expect(ButtonKlass.variant.variant.options).toEqual({
      variant: { filled: "text-white", outline: "bg-transparent border" },
      defaultVariant: "filled",
    });
    expect(ButtonKlass.variant.full.options).toEqual({
      variant: { true: "w-full h-full", width: "w-full", height: "h-full" },
    });
  });

  it("basic", async () => {
    expect(BoxKlass()).toEqual("block");

    expect(BoxKlass({ m: "1" })).toEqual("block m-1");
    expect(BoxKlass({ m: "2", p: "1" })).toEqual("block m-2 p-1");
    expect(BoxKlass({ p: "2" })).toEqual("block p-2");
  });

  it("basic with default variants", async () => {
    expect(ButtonKlass()).toEqual("inline-block outline-none text-white bg-red-600");

    expect(ButtonKlass({ full: true })).toEqual("inline-block outline-none text-white w-full h-full bg-red-600");

    expect(ButtonKlass({ color: "green" })).toEqual("inline-block outline-none text-white bg-green-600");

    expect(ButtonKlass({ color: "blue", variant: "outline" })).toEqual(
      "inline-block outline-none bg-transparent border text-blue-600 border-blue-600"
    );
  });
});

describe("revariant", async () => {
  it("type of", async () => {
    expect(revariant).toBeTypeOf("function");
    expect(revariant({ conditions: { condition: "" }, defaultCondition: "condition", variant: {} })).toBeTypeOf("function");
  });

  it("compund", async () => {
    expect(PaddingRevariant.options).toEqual(PaddingRevariantOptions);
    expect(LoadingRevariant.options).toEqual(LoadingRevariantOptions);
    expect(ZIndexRevariant.options).toEqual(ZIndexRevariantOptions);
    expect(MixedRevariant.options).toEqual(MixedRevariantOptions);
    expect(BoxReklass.options).toEqual(BoxReklassOptions);
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
    expect(MixedVariant()).toBeUndefined();
    expect(MixedVariant("unknown" as any)).toBeUndefined();
    expect(MixedVariant("")).toEqual("mix-");
    expect(MixedVariant(true)).toEqual("mix-true");
    expect(MixedVariant(1)).toEqual("mix-1");
  });
});

describe("reklass", async () => {
  it("type of", async () => {
    expect(reklass).toBeTypeOf("function");
    expect(reklass({ conditions: { condition: "" }, defaultCondition: "condition", variants: {} })).toBeTypeOf("function");
  });

  it("compund", async () => {
    expect(BoxReklass.options).toEqual(BoxReklassOptions);
    expect(BoxReklass.revariant).toBeTypeOf("object");
    expect(BoxReklass.revariant.m).toBeTypeOf("function");
    expect(BoxReklass.revariant.p).toBeTypeOf("function");
    expect(BoxReklass.revariant.m.options).toEqual({
      conditions: {
        base: "",
        sm: "sm:",
        md: "md:",
        lg: "lg:",
      },
      defaultCondition: "base",
      variant: { "1": "m-1", "2": "m-2", "3": "m-3", "4": "m-4", "5": "m-5" },
    });
    expect(BoxReklass.revariant.p.options).toEqual({
      conditions: {
        base: "",
        sm: "sm:",
        md: "md:",
        lg: "lg:",
      },
      defaultCondition: "base",
      variant: { "1": "p-1", "2": "p-2", "3": "p-3", "4": "p-4", "5": "p-5" },
    });
  });

  it("basic", async () => {
    expect(BoxReklass()).toEqual("");

    expect(BoxReklass({ m: "1" })).toEqual("m-1");
    expect(BoxReklass({ m: "2", p: "1" })).toEqual("m-2 p-1");
    expect(BoxReklass({ p: "2" })).toEqual("p-2");

    expect(BoxReklass({ m: { base: "1", md: "3" } })).toEqual("m-1 md:m-3");
    expect(BoxReklass({ m: { base: "2", md: "4" }, p: { base: "1", md: "3" } })).toEqual("m-2 md:m-4 p-1 md:p-3");
    expect(BoxReklass({ p: { base: "2", md: "4" } })).toEqual("p-2 md:p-4");
  });
});
