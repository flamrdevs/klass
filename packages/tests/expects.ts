import { expect } from "vitest";

export const hasGProperty = (object: Record<any, any>) => {
  expect(object).toHaveProperty("g");
};

export const hasKProperty = (object: Record<any, any>) => {
  expect(object).toHaveProperty("k");
};

export const hasFxProperty = (object: Record<any, any>) => {
  expect(object).toHaveProperty("fx");
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
