import { expectTypeOf } from "vitest";

import { expects } from "./../../core/test/~";

import * as tests from "./../../tests";

export const klassedComponent = (object: { (...any: any[]): any; fx?: any }) => {
  expectTypeOf(object).toBeFunction();
  tests.expects.hasFxProperty(object);
  expects.klassFn(object.fx);
};
export const reklassedComponent = (object: { (...any: any[]): any; fx?: any }) => {
  expectTypeOf(object).toBeFunction();
  tests.expects.hasFxProperty(object);
  expects.reklassFn(object.fx);
};
