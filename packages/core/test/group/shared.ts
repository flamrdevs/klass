import { expect } from "vitest";

import type { EndFn } from "./../../src/types";
import { defaultEndFn } from "./../../src/utils";

import * as expects from "./../expects";

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
  expect(result).toBeTypeOf("object");

  expects.klassFn(result.root);
  expects.klassFn(result.header);
  expects.klassFn(result.body);
  expects.klassFn(result.footer);

  const { root, header, body, footer } = result;

  expect(root()).toEqual(end("root color-primary size-md"));
  expect(header()).toEqual(end("header"));
  expect(body()).toEqual(end("body color-primary size-md"));
  expect(footer()).toEqual(end("footer"));

  expect(root()).toEqual(end("root color-primary size-md"));
  expect(header()).toEqual(end("header"));
  expect(body()).toEqual(end("body color-primary size-md"));
  expect(footer()).toEqual(end("footer"));

  expect(root({ color: "secondary" })).toEqual(end("root color-secondary size-md"));
  expect(header({ size: "lg" })).toEqual(end("header header-color-primary-size-lg"));
  expect(body({ size: "lg" })).toEqual(end("body color-primary size-lg"));
  expect(footer({ size: "lg" })).toEqual(end("footer footer-color-primary-size-lg"));
};
