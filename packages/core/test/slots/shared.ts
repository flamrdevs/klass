import { expect, expectTypeOf } from "vitest";

import type { EndFn } from "./../../src/types";
import { defaultEndFn } from "./../../src/utils";

import * as expects from "./../~expects";

export const options = {
  base: { root: "root", header: "header", body: "body", footer: "footer" },
  variants: {
    color: { primary: { root: "color-primary", body: "color-primary" }, secondary: { root: "color-secondary", body: "color-secondary" } },
    size: { sm: { root: "size-sm", body: "size-sm" }, md: { root: "size-md", body: "size-md" }, lg: { root: "size-lg", body: "size-lg" } },
  },
  defaults: { color: "primary", size: "md" },
  compounds: [
    [{ color: "primary", size: "lg" }, { header: "header-color-primary-size-lg" }],
    [{ color: "primary", size: "lg" }, { footer: "footer-color-primary-size-lg" }],
  ],
} as {
  base: { root: "root"; header: "header"; body: "body"; footer: "footer" };
  variants: {
    color: { primary: { root: "color-primary"; body: "color-primary" }; secondary: { root: "color-secondary"; body: "color-secondary" } };
    size: { sm: { root: "size-sm"; body: "size-sm" }; md: { root: "size-md"; body: "size-md" }; lg: { root: "size-lg"; body: "size-lg" } };
  };
  defaults: { color: "primary"; size: "md" };
  compounds: [[{ color: "primary"; size: "lg" }, { header: "header-color-primary-size-lg" }], [{ color: "primary"; size: "lg" }, { footer: "footer-color-primary-size-lg" }]];
};

export const expectResult = (result: any, end: EndFn = defaultEndFn) => {
  expectTypeOf(result as (...any: any[]) => any).toBeFunction();
  expect(result).toHaveProperty("klass");
  expectTypeOf(result.klass as Record<any, any>).toBeObject();

  expects.klassFn(result.klass.root);
  expects.klassFn(result.klass.header);
  expects.klassFn(result.klass.body);
  expects.klassFn(result.klass.footer);

  const result1 = result();

  expect(result1.root()).toEqual(end("root color-primary size-md"));
  expect(result1.header()).toEqual(end("header"));
  expect(result1.body()).toEqual(end("body color-primary size-md"));
  expect(result1.footer()).toEqual(end("footer"));

  const result2 = result({ color: "secondary" });

  expect(result2.root()).toEqual(end("root color-secondary size-md"));
  expect(result2.header()).toEqual(end("header"));
  expect(result2.body()).toEqual(end("body color-secondary size-md"));
  expect(result2.footer()).toEqual(end("footer"));

  const result3 = result({ color: "secondary", size: "lg" });

  expect(result3.root({ color: "primary" })).toEqual(end("root color-primary size-lg"));
  expect(result3.header({ color: "primary" })).toEqual(end("header header-color-primary-size-lg"));
  expect(result3.body({ size: "md" })).toEqual(end("body color-secondary size-md"));
  expect(result3.footer({ color: "primary" })).toEqual(end("footer footer-color-primary-size-lg"));
};
