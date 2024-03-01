import { describe, it } from "vitest";

import { render } from "@testing-library/vue";

import * as expects from "./expects";

import { klassed, reklassed } from "../src";

import { A, Button, Div, DefineA, DefineButton, DefineDiv } from "./components";

const PROPS = {
  "data-testid": "root",
};

describe("klassed", () => {
  it("A", () => {
    const Klassed = klassed(A, { variants: {} });
    expects.klassedComponent(Klassed);
    expects.element(render(<Klassed {...PROPS} />).getByTestId("root")).tagName("A");
  });

  it("Button", () => {
    const Klassed = klassed(Button, { variants: {} });
    expects.klassedComponent(Klassed);
    expects.element(render(<Klassed {...PROPS} />).getByTestId("root")).tagName("BUTTON");
  });

  describe("define klassed", () => {
    it("A", () => {
      const Klassed = klassed(DefineA, { variants: {} });
      expects.klassedComponent(Klassed);
      expects.element(render(<Klassed {...PROPS} />).getByTestId("root")).tagName("A");
    });

    it("Button", () => {
      const Klassed = klassed(DefineButton, { variants: {} });
      expects.klassedComponent(Klassed);
      expects.element(render(<Klassed {...PROPS} />).getByTestId("root")).tagName("BUTTON");
    });
  });
});

describe("reklassed", () => {
  it("Div", () => {
    const Reklassed = reklassed(Div, { conditions: [{ base: "" }, "base"], variants: {} });
    expects.reklassedComponent(Reklassed);
    expects.element(render(<Reklassed {...PROPS} />).getByTestId("root")).tagName("DIV");
  });

  describe("define reklassed", () => {
    it("Div", () => {
      const Reklassed = reklassed(DefineDiv, { conditions: [{ base: "" }, "base"], variants: {} });
      expects.reklassedComponent(Reklassed);
      expects.element(render(<Reklassed {...PROPS} />).getByTestId("root")).tagName("DIV");
    });
  });
});
