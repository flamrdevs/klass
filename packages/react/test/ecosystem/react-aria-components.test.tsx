import { describe, it } from "vitest";

import { render } from "@testing-library/react";

import { klassed } from "./../../src/mono";

import * as expects from "./../~expects";

import { Button } from "react-aria-components";

describe("Button", () => {
  const Klassed = klassed(Button, {
    base: "base",
    variants: {
      color: {
        red: "color-red",
        green: "color-green",
        blue: "color-blue",
      },
    },
    defaults: {
      color: "red",
    },
  });

  it("type", () => {
    expects.klassedComponent(Klassed);
  });

  it("equal", () => {
    expects
      .element(render(<Klassed data-testid="root" />).getByTestId("root"))
      .tagName("BUTTON")
      .className("base color-red");
  });
});
