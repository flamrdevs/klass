import { describe, it, expect } from "vitest";

import { variant, klass } from "./index";

import {
  PaddingVariant,
  PaddingVariantOptions,
  SizeVariant,
  SizeVariantOptions,
  LoadingVariant,
  LoadingVariantOptions,
  DisableVariant,
  DisableVariantOptions,
  MixedVariant_SymbolVariant,
  MixedVariant,
  MixedVariantOptions,
  BoxKlass,
  BoxKlassOptions,
  ButtonKlass,
  ButtonKlassOptions,
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
    expect(MixedVariant.options).toEqual(MixedVariantOptions);
  });

  it("basic string", async () => {
    expect(PaddingVariant()).toBeUndefined();
    expect(PaddingVariant("unknown" as any)).toBeUndefined();
    expect(PaddingVariant("md")).toEqual("padding-md");
  });

  it("basic string with default variant", async () => {
    expect(SizeVariant()).toEqual("size-md");
    expect(SizeVariant("unknown" as any)).toBeUndefined();
    expect(SizeVariant("md")).toEqual("size-md");
  });

  it("basic boolean", async () => {
    expect(LoadingVariant()).toBeUndefined();
    expect(LoadingVariant("unknown" as any)).toBeUndefined();
    expect(LoadingVariant(true)).toEqual("loading-true");
  });

  it("basic boolean with default variant", async () => {
    expect(DisableVariant()).toEqual("disable-false");
    expect(DisableVariant("unknown" as any)).toBeUndefined();
    expect(DisableVariant(true)).toEqual("disable-true");
  });

  it("mix practice", async () => {
    expect(MixedVariant()).toBeUndefined();
    expect(MixedVariant("unknown" as any)).toBeUndefined();
    expect(MixedVariant("")).toEqual("mix-");
    expect(MixedVariant(true)).toEqual("mix-true");
    expect(MixedVariant(1)).toEqual("mix-1");
    expect(MixedVariant(MixedVariant_SymbolVariant)).toEqual("mix-symbol(SYMBOL)");
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
