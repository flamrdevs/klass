import { expect } from "vitest";

import type { ConditionSchema, VariantsSchema, VariantFn, KlassFn, RevariantFn, ReklassFn } from "./../src/types.ts";

import { customEnd } from "./shared.ts";

export const variantFn = <T extends VariantsSchema[string]>(variantFn: VariantFn<T>) => {
  expect(variantFn).toBeTypeOf("function");
};

export const klassFn = <T extends VariantsSchema>(fn: KlassFn<T>) => {
  expect(fn).toBeTypeOf("function");
  expect(fn).toHaveProperty("o");
  expect(fn.o).toBeTypeOf("object");

  expect(fn).toHaveProperty("v");
  expect(fn.v).toBeTypeOf("object");
  const keys = Object.keys(fn.o.variants) as (keyof T)[];
  expect(fn.vk).toEqual(keys);
  for (const key of keys) variantFn(fn.v[key]);
};

export const revariantFn = <C extends ConditionSchema, T extends VariantsSchema[string]>(revariantFn: RevariantFn<C, T>) => {
  expect(revariantFn).toBeTypeOf("function");
};

export const reklassFn = <C extends ConditionSchema, T extends VariantsSchema>(fn: ReklassFn<C, T>) => {
  expect(fn).toBeTypeOf("function");
  expect(fn).toHaveProperty("o");
  expect(fn.o).toBeTypeOf("object");

  expect(fn).toHaveProperty("rv");
  expect(fn.rv).toBeTypeOf("object");
  const keys = Object.keys(fn.o.variants) as (keyof T)[];
  expect(fn.rvk).toEqual(keys);
  for (const key of keys) revariantFn(fn.rv[key]);
};

export const inCustomEnd = (className: string) => {
  expect(`${className.slice(0, 5)}${className.slice(-2)}`).toEqual(customEnd(""));
};
