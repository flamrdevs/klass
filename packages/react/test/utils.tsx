import { expect } from "vitest";

import { forwardRef } from "react";
import type { JSX, PropsWithoutRef } from "react";

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

const A = forwardRef<HTMLAnchorElement, PropsWithoutRef<JSX.IntrinsicElements["a"]>>((props, ref) => <a ref={ref} {...props} />);
const Button = forwardRef<HTMLButtonElement, PropsWithoutRef<JSX.IntrinsicElements["button"]>>((props, ref) => <button ref={ref} {...props} />);
const Div = forwardRef<HTMLDivElement, PropsWithoutRef<JSX.IntrinsicElements["div"]>>((props, ref) => <div ref={ref} {...props} />);

export * from "./../../core/test/utils.ts";
export { expectKlassedComponent, expectReklassedComponent, expectMonoKlassedComponent, expectMonoReklassedComponent, expectElement };
export { A, Button, Div };
