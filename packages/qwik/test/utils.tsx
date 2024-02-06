import { expect } from "vitest";

import type { JSXOutput } from "@builder.io/qwik";
import type { JSX } from "@builder.io/qwik/jsx-runtime";
import { createDOM } from "@builder.io/qwik/testing";

import type { ConditionSchema, VariantsSchema } from "@klass/core";

import type { KlassedComponent, ReklassedComponent } from "./../src/types/index.ts";
import type * as Mono from "./../src/mono.tsx";

import { expectKlassFn, expectReklassFn } from "./../../core/test/utils.ts";

const expectKlassed = (object: { klass?: any }, options: { keys: any[] }) => {
  expect(object).toBeTypeOf("function");
  expect(object).toHaveProperty("klass");
  expectKlassFn(object.klass, options);
};

const expectReklassed = (object: { reklass?: any }, options: { keys: any[] }) => {
  expect(object).toBeTypeOf("function");
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

const A = (props: JSX.IntrinsicElements["a"]) => <a {...props} />;
const Button = (props: JSX.IntrinsicElements["button"]) => <button {...props} />;
const Div = (props: JSX.IntrinsicElements["div"]) => <div {...props} />;

const render = async (
  jsxElement: JSXOutput,
  runner: (ext: {
    fireEvent: {
      click: (element: Element) => Promise<void>;
    };
    getByTestId: (id: string) => HTMLElement;
  }) => Promise<unknown>
) => {
  const { render, screen, userEvent } = await createDOM();

  const { cleanup } = await render(jsxElement);

  await runner({
    fireEvent: {
      click: async (element: Element) => await userEvent(element, "click"),
    },
    getByTestId: (id) => screen.querySelector(`[data-testid=${id}]`)!,
  });

  cleanup();
};

export * from "./../../core/test/utils.ts";
export { expectKlassedComponent, expectReklassedComponent, expectMonoKlassedComponent, expectMonoReklassedComponent, expectElement };
export { A, Button, Div };
export { render };
