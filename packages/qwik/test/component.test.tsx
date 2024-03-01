import { describe, it } from "vitest";

import * as expects from "./expects";

import { render } from "./testing-library";

import { klassed, reklassed } from "../src";

import { A, Button, Div } from "./components";

const PROPS = {
  "data-testid": "root",
};

describe("klassed", () => {
  it("A", async () => {
    const Klassed = klassed(A, { variants: {} });
    expects.klassedComponent(Klassed);
    expects.element((await render(<Klassed {...PROPS} />)).getByTestId("root")).tagName("A");
  });

  it("Button", async () => {
    const Klassed = klassed(Button, { variants: {} });
    expects.klassedComponent(Klassed);
    expects.element((await render(<Klassed {...PROPS} />)).getByTestId("root")).tagName("BUTTON");
  });
});

describe("reklassed", () => {
  it("Div", async () => {
    const Reklassed = reklassed(Div, { conditions: [{ base: "" }, "base"], variants: {} });
    expects.reklassedComponent(Reklassed);
    expects.element((await render(<Reklassed {...PROPS} />)).getByTestId("root")).tagName("DIV");
  });
});
