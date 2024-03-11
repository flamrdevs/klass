import { describe, it } from "vitest";

import type { JSXOutput } from "@builder.io/qwik";

import * as tests from "./../../tests";

import { render } from "./testing-library";

import { shared } from "./../../core/test/~";

import * as poly from "./../src";
import * as mono from "./../src/mono";

import { A, Button, Div, A$, Button$, Div$, RequiredA, RequiredButton, RequiredDiv } from "./~res/components";

const PROPS = { "data-testid": "root" };
const KLASS_OPTIONS = shared.klass.abstract.options;
const REKLASS_OPTIONS = shared.reklass.abstract.options;

describe("poly", () => {
  describe("klassed", () => {
    const expect = async (ui: JSXOutput) => tests.expects.element((await render(ui)).getByTestId(PROPS["data-testid"]));

    it("A", async () => {
      const Component = poly.klassed(A, KLASS_OPTIONS);
      (await expect(<Component {...PROPS} />)).tagName("A");
    });

    it("Button", async () => {
      const Component = poly.klassed(Button, KLASS_OPTIONS);
      (await expect(<Component {...PROPS} />)).tagName("BUTTON");
    });

    describe("$", () => {
      it("A", async () => {
        const Component = poly.klassed(A$, KLASS_OPTIONS);
        (await expect(<Component {...PROPS} />)).tagName("A");
      });

      it("Button", async () => {
        const Component = poly.klassed(Button$, KLASS_OPTIONS);
        (await expect(<Component {...PROPS} />)).tagName("BUTTON");
      });
    });

    describe("required", () => {
      it("A", async () => {
        const Component = poly.klassed(RequiredA, KLASS_OPTIONS);
        (await expect(<Component {...PROPS} id="id" />)).tagName("A");
      });

      it("Button", async () => {
        const Component = poly.klassed(RequiredButton, KLASS_OPTIONS);
        (await expect(<Component {...PROPS} id="id" />)).tagName("BUTTON");
      });

      describe("polymorphic", () => {
        it("A", async () => {
          const Component = poly.klassed("span", KLASS_OPTIONS);
          (await expect(<Component {...PROPS} as={RequiredA} id="id" />)).tagName("A");
        });

        it("Button", async () => {
          const Component = poly.klassed("span", KLASS_OPTIONS);
          (await expect(<Component {...PROPS} as={RequiredButton} id="id" />)).tagName("BUTTON");
        });
      });
    });
  });

  describe("reklassed", () => {
    const expect = async (ui: JSXOutput) => tests.expects.element((await render(ui)).getByTestId(PROPS["data-testid"]));

    it("Div", async () => {
      const Component = poly.reklassed(Div, REKLASS_OPTIONS);
      (await expect(<Component {...PROPS} />)).tagName("DIV");
    });

    describe("$", () => {
      it("Div", async () => {
        const Component = poly.reklassed(Div$, REKLASS_OPTIONS);
        (await expect(<Component {...PROPS} />)).tagName("DIV");
      });
    });

    describe("required", () => {
      it("Div", async () => {
        const Component = poly.reklassed(RequiredDiv, REKLASS_OPTIONS);
        (await expect(<Component {...PROPS} id="id" />)).tagName("DIV");
      });

      describe("polymorphic", () => {
        it("Div", async () => {
          const Component = poly.reklassed("span", REKLASS_OPTIONS);
          (await expect(<Component {...PROPS} as={RequiredDiv} id="id" />)).tagName("DIV");
        });
      });
    });
  });
});

describe("mono", () => {
  describe("klassed", () => {
    const expect = async (ui: JSXOutput) => tests.expects.element((await render(ui)).getByTestId(PROPS["data-testid"]));

    it("A", async () => {
      const Component = mono.klassed(A, KLASS_OPTIONS);
      (await expect(<Component {...PROPS} />)).tagName("A");
    });

    it("Button", async () => {
      const Component = mono.klassed(Button, KLASS_OPTIONS);
      (await expect(<Component {...PROPS} />)).tagName("BUTTON");
    });

    describe("$", () => {
      it("A", async () => {
        const Component = mono.klassed(A$, KLASS_OPTIONS);
        (await expect(<Component {...PROPS} />)).tagName("A");
      });

      it("Button", async () => {
        const Component = mono.klassed(Button$, KLASS_OPTIONS);
        (await expect(<Component {...PROPS} />)).tagName("BUTTON");
      });
    });

    describe("required", () => {
      it("A", async () => {
        const Component = mono.klassed(RequiredA, KLASS_OPTIONS);
        (await expect(<Component {...PROPS} id="id" />)).tagName("A");
      });

      it("Button", async () => {
        const Component = mono.klassed(RequiredButton, KLASS_OPTIONS);
        (await expect(<Component {...PROPS} id="id" />)).tagName("BUTTON");
      });
    });
  });

  describe("reklassed", () => {
    const expect = async (ui: JSXOutput) => tests.expects.element((await render(ui)).getByTestId(PROPS["data-testid"]));

    it("Div", async () => {
      const Component = mono.reklassed(Div, REKLASS_OPTIONS);
      (await expect(<Component {...PROPS} />)).tagName("DIV");
    });

    describe("$", () => {
      it("Div", async () => {
        const Component = mono.reklassed(Div$, REKLASS_OPTIONS);
        (await expect(<Component {...PROPS} />)).tagName("DIV");
      });
    });

    describe("required", () => {
      it("Div", async () => {
        const Component = mono.reklassed(RequiredDiv, REKLASS_OPTIONS);
        (await expect(<Component {...PROPS} id="id" />)).tagName("DIV");
      });
    });
  });
});
