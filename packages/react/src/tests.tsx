import { expect } from "vitest";

import { forwardRef } from "react";
import type { PropsWithoutRef } from "react";

import type { ConditionSchema, VariantsSchema, EndFn, VariantFn, KlassFn, RevariantFn, ReklassFn } from "@klass/core";

import type { KlassedComponent, ReklassedComponent } from "./types/index.ts";

const expectVariantFn = <T extends VariantsSchema[string]>(variantFn: VariantFn<T>) => {
  expect(variantFn).toBeTypeOf("function");
};

const expectKlassFn = <T extends VariantsSchema>(klassFn: KlassFn<T>, options: { keys: (keyof T)[] }) => {
  expect(klassFn).toBeTypeOf("function");
  expect(klassFn).toHaveProperty("o");
  expect(klassFn.o).toBeTypeOf("object");

  expect(klassFn).toHaveProperty("v");
  expect(klassFn.v).toBeTypeOf("object");
  expect(klassFn.vk).toEqual(options.keys);
  options.keys.forEach((key) => {
    expectVariantFn(klassFn.v[key]);
  });
};

const expectKlassedComponent = <T extends VariantsSchema>(klassedComponent: KlassedComponent<any, T>, options: { keys: (keyof T)[] }) => {
  expect(klassedComponent).toBeTypeOf("object");
  expect(klassedComponent).toHaveProperty("klass");
  expectKlassFn(klassedComponent.klass, options);
};

const expectRevariantFn = <C extends ConditionSchema, T extends VariantsSchema[string]>(revariantFn: RevariantFn<C, T>) => {
  expect(revariantFn).toBeTypeOf("function");
};

const expectReklassFn = <C extends ConditionSchema, T extends VariantsSchema>(reklassFn: ReklassFn<C, T>, options: { keys: (keyof T)[] }) => {
  expect(reklassFn).toBeTypeOf("function");
  expect(reklassFn).toHaveProperty("o");
  expect(reklassFn.o).toBeTypeOf("object");

  expect(reklassFn).toHaveProperty("rv");
  expect(reklassFn.rv).toBeTypeOf("object");
  expect(reklassFn.rvk).toEqual(options.keys);
  options.keys.forEach((key) => {
    expectRevariantFn(reklassFn.rv[key]);
  });
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

const customEnd: EndFn = (value) => `end( ${value} )`;

const A = forwardRef<HTMLAnchorElement, PropsWithoutRef<JSX.IntrinsicElements["a"]>>((props, ref) => <a ref={ref} {...props} />);
const Button = forwardRef<HTMLButtonElement, PropsWithoutRef<JSX.IntrinsicElements["button"]>>((props, ref) => <button ref={ref} {...props} />);
const Div = forwardRef<HTMLDivElement, PropsWithoutRef<JSX.IntrinsicElements["div"]>>((props, ref) => <div ref={ref} {...props} />);

export { expectKlassedComponent, expectReklassedComponent, expectElement };
export { customEnd };
export { A, Button, Div };
