import { expect } from "vitest";

import { h } from "vue";
import type { FunctionalComponent } from "vue";
import type { JSX } from "vue/jsx-runtime";

import type { ConditionSchema, VariantsSchema } from "@klass/core";

import type { KlassedComponent, ReklassedComponent } from "./../src/types/index.ts";
import type * as Mono from "./../src/mono.tsx";

import { expectKlassFn, expectReklassFn } from "./../../core/test/utils.ts";

const expectKlassed = (object: { klass?: any }, options: { keys: any[] }) => {
  expect(object).toBeTypeOf("object");
  expect(object).toHaveProperty("klass");
  expectKlassFn(object.klass, options);
};

const expectReklassed = (object: { reklass?: any }, options: { keys: any[] }) => {
  expect(object).toBeTypeOf("object");
  expect(object).toHaveProperty("reklass");
  expectReklassFn(object.reklass, options);
};

const expectKlassedComponent = <T extends VariantsSchema>(klassedComponent: KlassedComponent<any, T>, options: { keys: (keyof T)[] }) => {
  expectKlassed(klassedComponent, options);
};

const expectReklassedComponent = <C extends ConditionSchema, T extends VariantsSchema>(reklassedComponent: ReklassedComponent<any, C, T>, options: { keys: (keyof T)[] }) => {
  expectReklassed(reklassedComponent, options);
};

const expectMonoKlassedComponent = <T extends VariantsSchema>(klassedComponent: Mono.KlassedComponent<any, T>, options: { keys: (keyof T)[] }) => {
  expectKlassed(klassedComponent, options);
};

const expectMonoReklassedComponent = <C extends ConditionSchema, T extends VariantsSchema>(reklassedComponent: Mono.ReklassedComponent<any, C, T>, options: { keys: (keyof T)[] }) => {
  expectReklassed(reklassedComponent, options);
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

export * from "./../../core/test/utils.ts";
export { expectKlassedComponent, expectReklassedComponent, expectMonoKlassedComponent, expectMonoReklassedComponent, expectElement };
export { A, Button, Div };
