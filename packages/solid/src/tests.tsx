import { expect } from "vitest";

import type { JSX } from "solid-js";

import type { ConditionSchema, VariantsSchema, ItFn, VariantFn, KlassFn, RevariantFn, ReklassFn } from "@klass/core";

import type { KlassedComponent, ReklassedComponent } from "./types";

const expectVariantFn = <T extends VariantsSchema[string]>(variantFn: VariantFn<T>) => {
  expect(variantFn).toBeTypeOf("function");
  expect(variantFn).toHaveProperty("options");
  expect(variantFn.options).toBeTypeOf("object");
};

const expectKlassFn = <T extends VariantsSchema>(klassFn: KlassFn<T>, options: { keys: (keyof T)[] }) => {
  expect(klassFn).toBeTypeOf("function");
  expect(klassFn).toHaveProperty("options");
  expect(klassFn.options).toBeTypeOf("object");

  expect(klassFn).toHaveProperty("variant");
  expect(klassFn.variant).toBeTypeOf("object");
  expect(klassFn.variantKeys).toEqual(options.keys);
  options.keys.forEach((key) => {
    expectVariantFn(klassFn.variant[key]);
  });
};

const expectKlassedComponent = <T extends VariantsSchema>(klassedComponent: KlassedComponent<any, T>, options: { keys: (keyof T)[] }) => {
  expect(klassedComponent).toBeTypeOf("function");
  expect(klassedComponent).toHaveProperty("klass");
  expectKlassFn(klassedComponent.klass, options);
};

const expectRevariantFn = <C extends ConditionSchema, T extends VariantsSchema[string]>(revariantFn: RevariantFn<C, T>) => {
  expect(revariantFn).toBeTypeOf("function");
  expect(revariantFn).toHaveProperty("options");
  expect(revariantFn.options).toBeTypeOf("object");
};

const expectReklassFn = <C extends ConditionSchema, T extends VariantsSchema>(reklassFn: ReklassFn<C, T>, options: { keys: (keyof T)[] }) => {
  expect(reklassFn).toBeTypeOf("function");
  expect(reklassFn).toHaveProperty("options");
  expect(reklassFn.options).toBeTypeOf("object");

  expect(reklassFn).toHaveProperty("revariant");
  expect(reklassFn.revariant).toBeTypeOf("object");
  expect(reklassFn.revariantKeys).toEqual(options.keys);
  options.keys.forEach((key) => {
    expectRevariantFn(reklassFn.revariant[key]);
  });
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

const itOptimizedClass: ItFn = (value) => `optimized( ${value} )`;

const A = (props: JSX.IntrinsicElements["a"]) => <a {...props} />;
const Button = (props: JSX.IntrinsicElements["button"]) => <button {...props} />;
const Div = (props: JSX.IntrinsicElements["div"]) => <div {...props} />;

export { expectKlassedComponent, expectReklassedComponent, expectElement };
export { itOptimizedClass };
export { A, Button, Div };
