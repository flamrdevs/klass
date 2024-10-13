import { expect, expectTypeOf } from "vitest";

import type { ConditionSchema, VariantsSchema, VariantFn, KlassFn, RevariantFn, ReklassFn } from "./../src/types";

import { custom } from "./~shared";

const baseFn = (fn: { (...any: any[]): any; g: Record<any, any>; k: any[] }) => {
  expectTypeOf(fn).toBeFunction();

  expect(fn).toHaveProperty("g");
  expectTypeOf(fn.g).toBeObject();

  expect(fn).toHaveProperty("k");
  expectTypeOf(fn.k).toBeArray();

  expect(Object.keys(fn.g)).toEqual(fn.k);
};

export const variantFn = <T extends VariantsSchema[string]>(variantFn: VariantFn<T>) => {
  expectTypeOf(variantFn).toBeFunction();
};

export const klassFn = <T extends VariantsSchema>(fn: KlassFn<T>) => {
  baseFn(fn);
  for (const key of fn.k) variantFn(fn.g[key]);
};

export const revariantFn = <C extends ConditionSchema, T extends VariantsSchema[string]>(revariantFn: RevariantFn<C, T>) => {
  expectTypeOf(revariantFn).toBeFunction();
};

export const reklassFn = <C extends ConditionSchema, T extends VariantsSchema>(fn: ReklassFn<C, T>) => {
  baseFn(fn);
  for (const key of fn.k) revariantFn(fn.g[key]);
};

export const inCustomEnd = (className: string) => {
  expect(`${className.slice(0, 5)}${className.slice(-2)}`).toEqual(custom.end(""));
};
