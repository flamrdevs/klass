import { expect } from "vitest";

import type { ConditionSchema, VariantsSchema, EndFn, AsFn, VariantFn, KlassFn, RevariantFn, ReklassFn } from "./index.ts";

const expectVariantFn = <T extends VariantsSchema[string]>(variantFn: VariantFn<T>) => {
  expect(variantFn).toBeTypeOf("function");
  expect(variantFn).toHaveProperty("o");
  expect(variantFn.o).toBeTypeOf("object");
};

const expectKlassFn = <T extends VariantsSchema>(klassFn: KlassFn<T>, options: { keys: (keyof T)[] }) => {
  expect(klassFn).toBeTypeOf("function");
  expect(klassFn).toHaveProperty("o");
  expect(klassFn.o).toBeTypeOf("object");

  expect(klassFn).toHaveProperty("v");
  expect(klassFn.v).toBeTypeOf("object");
  expect(klassFn.vk).toEqual(options.keys);
  options.keys.forEach((key) => {
    expectVariantFn(klassFn.v[key]);
  });
};

const expectRevariantFn = <C extends ConditionSchema, T extends VariantsSchema[string]>(revariantFn: RevariantFn<C, T>) => {
  expect(revariantFn).toBeTypeOf("function");
  expect(revariantFn).toHaveProperty("o");
  expect(revariantFn.o).toBeTypeOf("object");
};

const expectReklassFn = <C extends ConditionSchema, T extends VariantsSchema>(reklassFn: ReklassFn<C, T>, options: { keys: (keyof T)[] }) => {
  expect(reklassFn).toBeTypeOf("function");
  expect(reklassFn).toHaveProperty("o");
  expect(reklassFn.o).toBeTypeOf("object");

  expect(reklassFn).toHaveProperty("rv");
  expect(reklassFn.rv).toBeTypeOf("object");
  expect(reklassFn.rvk).toEqual(options.keys);
  options.keys.forEach((key) => {
    expectRevariantFn(reklassFn.rv[key]);
  });
};

const customEnd: EndFn = (value) => `end( ${value} )`;
const customAs: AsFn = (condition, className) => `${className}${condition}`;

const array = <T>(length: number, map: (index: number) => T) => Array.from({ length }).map((_, index) => map(index));

export { expectVariantFn, expectKlassFn, expectRevariantFn, expectReklassFn };
export { customEnd, customAs, array };
