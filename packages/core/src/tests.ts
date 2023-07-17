import { expect } from "vitest";

import type { ConditionSchema, VariantsSchema, ItFn, VariantFn, KlassFn, RevariantFn, ReklassFn } from "./index";

const expectVariantFn = <T extends VariantsSchema[string]>(variantFn: VariantFn<T>) => {
  expect(variantFn).toBeTypeOf("function");
  expect(variantFn).toHaveProperty("options");
  expect(variantFn.options).toBeTypeOf("object");
};

const expectKlassFn = <T extends VariantsSchema>(klassFn: KlassFn<T>, options: { keys: (keyof T)[] }) => {
  expect(klassFn).toBeTypeOf("function");
  expect(klassFn).toHaveProperty("options");
  expect(klassFn.options).toBeTypeOf("object");

  expect(klassFn).toHaveProperty("variant");
  expect(klassFn.variant).toBeTypeOf("object");
  expect(klassFn.variantKeys).toEqual(options.keys);
  options.keys.forEach((key) => {
    expectVariantFn(klassFn.variant[key]);
  });
};

const expectRevariantFn = <C extends ConditionSchema, T extends VariantsSchema[string]>(revariantFn: RevariantFn<C, T>) => {
  expect(revariantFn).toBeTypeOf("function");
  expect(revariantFn).toHaveProperty("options");
  expect(revariantFn.options).toBeTypeOf("object");
};

const expectReklassFn = <C extends ConditionSchema, T extends VariantsSchema>(reklassFn: ReklassFn<C, T>, options: { keys: (keyof T)[] }) => {
  expect(reklassFn).toBeTypeOf("function");
  expect(reklassFn).toHaveProperty("options");
  expect(reklassFn.options).toBeTypeOf("object");

  expect(reklassFn).toHaveProperty("revariant");
  expect(reklassFn.revariant).toBeTypeOf("object");
  expect(reklassFn.revariantKeys).toEqual(options.keys);
  options.keys.forEach((key) => {
    expectRevariantFn(reklassFn.revariant[key]);
  });
};

const itOptimizedClass: ItFn = (value) => `optimized( ${value} )`;

export { expectVariantFn, expectKlassFn, expectRevariantFn, expectReklassFn };
export { itOptimizedClass };