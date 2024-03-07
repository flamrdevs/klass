import { expect } from "vitest";

import { expects } from "./../../core/test/~";

const klassed = (object: { klass?: any }) => {
  expect(object).toBeTypeOf("function");
  expect(object).toHaveProperty("klass");
  expects.klassFn(object.klass);
};
const reklassed = (object: { reklass?: any }) => {
  expect(object).toBeTypeOf("function");
  expect(object).toHaveProperty("reklass");
  expects.reklassFn(object.reklass);
};

export const klassedComponent = (object: { klass?: any }) => {
  klassed(object);
};
export const reklassedComponent = (object: { reklass?: any }) => {
  reklassed(object);
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
