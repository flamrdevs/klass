import { describe, it } from "vitest";

import type { JSXOutput } from "@builder.io/qwik";

import * as expects from "./~expects";

import { render } from "./testing-library";

import { klassed, reklassed } from "./../src";

import { A, Button, Div, RequiredA, RequiredButton, RequiredDiv } from "./~res/components";

const PROPS = {
  "data-testid": "root",
};

describe("klassed", () => {
  const options = { variants: {} } as { variants: {} };
  const expect = async (ui: JSXOutput) => expects.element((await render(ui)).getByTestId(PROPS["data-testid"]));

  it("A", async () => {
    const Component = klassed(A, options);
    (await expect(<Component {...PROPS} />)).tagName("A");
  });

  it("Button", async () => {
    const Component = klassed(Button, options);
    (await expect(<Component {...PROPS} />)).tagName("BUTTON");
  });

  describe("required", () => {
    it("A", async () => {
      const Component = klassed(RequiredA, options);
      (await expect(<Component {...PROPS} id="id" />)).tagName("A");
    });

    it("Button", async () => {
      const Component = klassed(RequiredButton, options);
      (await expect(<Component {...PROPS} id="id" />)).tagName("BUTTON");
    });

    describe("polymorphic", () => {
      it("A", async () => {
        const Component = klassed("span", options);
        (await expect(<Component {...PROPS} as={RequiredA} id="id" />)).tagName("A");
      });

      it("Button", async () => {
        const Component = klassed("span", options);
        (await expect(<Component {...PROPS} as={RequiredButton} id="id" />)).tagName("BUTTON");
      });
    });
  });
});

describe("reklassed", () => {
  const options = { conditions: [{ base: "" }, "base"], variants: {} } as { conditions: [{ base: "" }, "base"]; variants: {} };
  const expect = async (ui: JSXOutput) => expects.element((await render(ui)).getByTestId(PROPS["data-testid"]));

  it("Div", async () => {
    const Component = reklassed(Div, options);
    (await expect(<Component {...PROPS} />)).tagName("DIV");
  });

  describe("required", () => {
    it("Div", async () => {
      const Component = reklassed(RequiredDiv, options);
      (await expect(<Component {...PROPS} id="id" />)).tagName("DIV");
    });

    describe("polymorphic", () => {
      it("Div", async () => {
        const Component = reklassed("span", options);
        (await expect(<Component {...PROPS} as={RequiredDiv} id="id" />)).tagName("DIV");
      });
    });
  });
});
