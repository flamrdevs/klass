import { expect } from "vitest";

import type { ConditionSchema, VariantsSchema, VariantFn, KlassFn, RevariantFn, ReklassFn } from "./../src/types";

import { custom } from "./~shared";

export const variantFn = <T extends VariantsSchema[string]>(variantFn: VariantFn<T>) => {
  expect(variantFn).toBeTypeOf("function");
};

export const klassFn = <T extends VariantsSchema>(fn: KlassFn<T>) => {
  expect(fn).toBeTypeOf("function");
  expect(fn).toHaveProperty("o");
  expect(fn.o).toBeTypeOf("object");

  expect(fn).toHaveProperty("g");
  expect(fn).toHaveProperty("k");
  expect(fn.g).toBeTypeOf("object");
  const keys = Object.keys(fn.o.variants) as (keyof T)[];
  expect(fn.k).toEqual(keys);
  for (const key of keys) variantFn(fn.g[key]);
};

export const revariantFn = <C extends ConditionSchema, T extends VariantsSchema[string]>(revariantFn: RevariantFn<C, T>) => {
  expect(revariantFn).toBeTypeOf("function");
};

export const reklassFn = <C extends ConditionSchema, T extends VariantsSchema>(fn: ReklassFn<C, T>) => {
  expect(fn).toBeTypeOf("function");
  expect(fn).toHaveProperty("o");
  expect(fn.o).toBeTypeOf("object");

  expect(fn).toHaveProperty("g");
  expect(fn).toHaveProperty("k");
  expect(fn.g).toBeTypeOf("object");
  const keys = Object.keys(fn.o.variants) as (keyof T)[];
  expect(fn.k).toEqual(keys);
  for (const key of keys) revariantFn(fn.g[key]);
};

export const inCustomEnd = (className: string) => {
  expect(`${className.slice(0, 5)}${className.slice(-2)}`).toEqual(custom.end(""));
};
