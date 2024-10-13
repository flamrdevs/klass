import { expectTypeOf } from "vitest";

import { expects } from "./../../core/test/~";

export const klassedComponent = (object: { (...any: any[]): any; fx?: any }) => {
  expectTypeOf(object).toBeFunction();
  expects.klassFn(object.fx);
};
export const reklassedComponent = (object: { (...any: any[]): any; fx?: any }) => {
  expectTypeOf(object).toBeFunction();
  expects.reklassFn(object.fx);
};
