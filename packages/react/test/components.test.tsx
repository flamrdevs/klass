import { describe, it } from "vitest";

import type { ReactElement } from "react";

import { render } from "@testing-library/react";

import * as expects from "./~expects";

import { klassed, reklassed } from "./../src";

import { A, Button, Div, RequiredA, RequiredButton, RequiredDiv } from "./~res/components";

const PROPS = {
  "data-testid": "root",
};

describe("klassed", () => {
  const options = { variants: {} } as { variants: {} };
  const expect = (ui: ReactElement) => expects.element(render(ui).getByTestId(PROPS["data-testid"]));

  it("A", () => {
    const Component = klassed(A, options);
    expect(<Component {...PROPS} />).tagName("A");
  });

  it("Button", () => {
    const Component = klassed(Button, options);
    expect(<Component {...PROPS} />).tagName("BUTTON");
  });

  describe("required", () => {
    it("A", () => {
      const Component = klassed(RequiredA, options);
      expect(<Component {...PROPS} id="id" />).tagName("A");
    });

    it("Button", () => {
      const Component = klassed(RequiredButton, options);
      expect(<Component {...PROPS} id="id" />).tagName("BUTTON");
    });

    describe("polymorphic", () => {
      it("A", () => {
        const Component = klassed("span", options);
        expect(<Component {...PROPS} as={RequiredA} id="id" />).tagName("A");
      });

      it("Button", () => {
        const Component = klassed("span", options);
        expect(<Component {...PROPS} as={RequiredButton} id="id" />).tagName("BUTTON");
      });
    });
  });
});

describe("reklassed", () => {
  const options = { conditions: [{ base: "" }, "base"], variants: {} } as { conditions: [{ base: "" }, "base"]; variants: {} };
  const expect = (ui: ReactElement) => expects.element(render(ui).getByTestId(PROPS["data-testid"]));

  it("Div", () => {
    const Component = reklassed(Div, options);
    expect(<Component {...PROPS} />).tagName("DIV");
  });

  describe("required", () => {
    it("Div", () => {
      const Component = reklassed(RequiredDiv, options);
      expect(<Component {...PROPS} id="id" />).tagName("DIV");
    });

    describe("polymorphic", () => {
      it("Div", () => {
        const Component = reklassed("span", options);
        expect(<Component {...PROPS} as={RequiredDiv} id="id" />).tagName("DIV");
      });
    });
  });
});
