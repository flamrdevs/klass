import { expect } from "vitest";

import { h } from "vue";
import type { FunctionalComponent } from "vue";
import type { JSX } from "vue/jsx-runtime";

import type { ConditionSchema, VariantsSchema } from "@klass/core";

import type { KlassedComponent, ReklassedComponent } from "./../types/index.ts";

import { expectKlassFn, expectReklassFn } from "./../../../core/src/tests/utils.ts";

const expectKlassedComponent = <T extends VariantsSchema>(klassedComponent: KlassedComponent<any, T>, options: { keys: (keyof T)[] }) => {
  expect(klassedComponent).toBeTypeOf("object");
  expect(klassedComponent).toHaveProperty("klass");
  expectKlassFn(klassedComponent.klass, options);
};

const expectReklassedComponent = <C extends ConditionSchema, T extends VariantsSchema>(reklassedComponent: ReklassedComponent<any, C, T>, options: { keys: (keyof T)[] }) => {
  expect(reklassedComponent).toBeTypeOf("object");
  expect(reklassedComponent).toHaveProperty("reklass");
  expectReklassFn(reklassedComponent.reklass, options);
};

const expectElement = <T extends Element>(el: T) => {
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

const A: FunctionalComponent<JSX.IntrinsicElements["a"]> = (_, { attrs, slots }) => h("a", attrs, slots);
A.inheritAttrs = false;
const Button: FunctionalComponent<JSX.IntrinsicElements["button"]> = (_, { attrs, slots }) => h("button", attrs, slots);
Button.inheritAttrs = false;
const Div: FunctionalComponent<JSX.IntrinsicElements["div"]> = (_, { attrs, slots }) => h("div", attrs, slots);
Div.inheritAttrs = false;

export * from "./../../../core/src/tests/utils.ts";
export { expectKlassedComponent, expectReklassedComponent, expectElement };
export { A, Button, Div };
