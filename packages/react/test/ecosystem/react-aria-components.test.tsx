import { describe, it } from "vitest";

import { render } from "@testing-library/react";

import * as mono from "./../../src/mono";

import * as expects from "./../~expects";
import * as tests from "./../../../tests";

import { Button } from "react-aria-components";

describe("mono", () => {
  describe("Button", () => {
    const Klassed = mono.klassed(Button, {
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
      tests.expects
        .element(render(<Klassed data-testid="root" />).getByTestId("root"))
        .tagName("BUTTON")
        .className("base color-red");
    });
  });
});
