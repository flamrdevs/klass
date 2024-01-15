import { expect } from "vitest";

import type { JSX } from "solid-js";

import type { ConditionSchema, VariantsSchema } from "@klass/core";

import type { KlassedComponent, ReklassedComponent } from "./../types/index.ts";

import { expectKlassFn, expectReklassFn } from "./../../../core/src/tests/utils.ts";

const expectKlassedComponent = <T extends VariantsSchema>(klassedComponent: KlassedComponent<any, T>, options: { keys: (keyof T)[] }) => {
  expect(klassedComponent).toBeTypeOf("function");
  expect(klassedComponent).toHaveProperty("klass");
  expectKlassFn(klassedComponent.klass, options);
};

const expectReklassedComponent = <C extends ConditionSchema, T extends VariantsSchema>(reklassedComponent: ReklassedComponent<any, C, T>, options: { keys: (keyof T)[] }) => {
  expect(reklassedComponent).toBeTypeOf("function");
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

const A = (props: JSX.IntrinsicElements["a"]) => <a {...props} />;
const Button = (props: JSX.IntrinsicElements["button"]) => <button {...props} />;
const Div = (props: JSX.IntrinsicElements["div"]) => <div {...props} />;

export * from "./../../../core/src/tests/utils.ts";
export { expectKlassedComponent, expectReklassedComponent, expectElement };
export { A, Button, Div };
