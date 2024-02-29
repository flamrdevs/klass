import { expect } from "vitest";

import type { EndFn } from "./../../src/types";
import { defaultEndFn } from "./../../src/utils";

import { simplify } from "./../../src/group";

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

  expect(root({ color: "secondary" })).toEqual(end("root color-secondary size-md"));
  expect(header({ size: "lg" })).toEqual(end("header header-color-primary-size-lg"));
  expect(body({ size: "lg" })).toEqual(end("body color-primary size-lg"));
  expect(footer({ size: "lg" })).toEqual(end("footer footer-color-primary-size-lg"));
};

export const expectSimplifyResult = (result: any, end: EndFn = defaultEndFn) => {
  const simplified = simplify(result);

  expect(simplified).toBeTypeOf("function");

  const simplified1 = simplified();

  expect(simplified1.root).toEqual(end("root color-primary size-md"));
  expect(simplified1.header).toEqual(end("header"));
  expect(simplified1.body).toEqual(end("body color-primary size-md"));
  expect(simplified1.footer).toEqual(end("footer"));

  const simplified2 = simplified({ color: "secondary", size: "lg" });

  expect(simplified2.root).toEqual(end("root color-secondary size-lg"));
  expect(simplified2.header).toEqual(end("header"));
  expect(simplified2.body).toEqual(end("body color-secondary size-lg"));
  expect(simplified2.footer).toEqual(end("footer"));

  const simplified3 = simplified({ color: "primary", size: "lg" });

  expect(simplified3.root).toEqual(end("root color-primary size-lg"));
  expect(simplified3.header).toEqual(end("header header-color-primary-size-lg"));
  expect(simplified3.body).toEqual(end("body color-primary size-lg"));
  expect(simplified3.footer).toEqual(end("footer footer-color-primary-size-lg"));
};
