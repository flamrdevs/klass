import { expect } from "vitest";

import type { ConditionSchema, VariantsSchema, EndFn, AsFn, VariantFn, KlassFn, RevariantFn, ReklassFn } from "./../src/types.ts";

const expectVariantFn = <T extends VariantsSchema[string]>(variantFn: VariantFn<T>) => {
  expect(variantFn).toBeTypeOf("function");
};

const expectKlassFn = <T extends VariantsSchema>(fn: KlassFn<T>, options: { keys: (keyof T)[] }) => {
  expect(fn).toBeTypeOf("function");
  expect(fn).toHaveProperty("o");
  expect(fn.o).toBeTypeOf("object");

  expect(fn).toHaveProperty("v");
  expect(fn.v).toBeTypeOf("object");
  expect(fn.vk).toEqual(options.keys);
  for (const key of options.keys) expectVariantFn(fn.v[key]);
};

const expectRevariantFn = <C extends ConditionSchema, T extends VariantsSchema[string]>(revariantFn: RevariantFn<C, T>) => {
  expect(revariantFn).toBeTypeOf("function");
};

const expectReklassFn = <C extends ConditionSchema, T extends VariantsSchema>(fn: ReklassFn<C, T>, options: { keys: (keyof T)[] }) => {
  expect(fn).toBeTypeOf("function");
  expect(fn).toHaveProperty("o");
  expect(fn.o).toBeTypeOf("object");

  expect(fn).toHaveProperty("rv");
  expect(fn.rv).toBeTypeOf("object");
  expect(fn.rvk).toEqual(options.keys);
  for (const key of options.keys) expectRevariantFn(fn.rv[key]);
};

const customEnd: EndFn = (value) => `end( ${value} )`;
const expectCustomEndFormat = (className: string) => {
  expect(`${className.slice(0, 5)}${className.slice(-2)}`).toEqual(customEnd(""));
};

const customAs: AsFn = (condition, className) => `${className}${condition}`;

const createArray = <T>(length: number, map: (index: number) => T) => Array.from({ length }).map((_, index) => map(index));

export { expectVariantFn, expectKlassFn, expectRevariantFn, expectReklassFn };
export { customEnd, expectCustomEndFormat, customAs };
export { createArray };
