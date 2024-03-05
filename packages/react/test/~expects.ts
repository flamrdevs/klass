import { expect } from "vitest";

import type { ConditionSchema, VariantsSchema } from "@klass/core";

import type { KlassedComponent, ReklassedComponent } from "./../src/types";
import type { MonoKlassedComponent, MonoReklassedComponent } from "./../src/mono";

import { expects } from "./../../core/test/~";

const klassed = (object: { klass?: any }) => {
  expect(object).toBeTypeOf("object");
  expect(object).toHaveProperty("klass");
  expects.klassFn(object.klass);
};
const reklassed = (object: { reklass?: any }) => {
  expect(object).toBeTypeOf("object");
  expect(object).toHaveProperty("reklass");
  expects.reklassFn(object.reklass);
};

export const klassedComponent = <T extends VariantsSchema>(klassedComponent: KlassedComponent<any, T>) => {
  klassed(klassedComponent);
};
export const reklassedComponent = <C extends ConditionSchema, T extends VariantsSchema>(reklassedComponent: ReklassedComponent<any, C, T>) => {
  reklassed(reklassedComponent);
};

export const mono = {
  klassedComponent: <T extends VariantsSchema>(klassedComponent: MonoKlassedComponent<any, T>) => {
    klassed(klassedComponent);
  },
  reklassedComponent: <C extends ConditionSchema, T extends VariantsSchema>(reklassedComponent: MonoReklassedComponent<any, C, T>) => {
    reklassed(reklassedComponent);
  },
};

export const element = <T extends Element>(el: T) => {
  expect(el).toBeDefined();
  return {
    className(className: string) {
      expect(el.className).toEqual(className);
      return this;
    },
    tagName(tagName: string) {
      expect(el.tagName).toEqual(tagName);
      return this;
    },
    textContent(textContent: string) {
      expect(el.textContent).toEqual(textContent);
      return this;
    },
  };
};
