import { describe, it } from "vitest";

import { render } from "@solidjs/testing-library";

import * as mono from "./../../src/mono";

import * as expects from "./../~expects";

import { As, Separator } from "@kobalte/core";

describe("mono", () => {
  describe("Separator", () => {
    const Klassed = mono.klassed(Separator.Root, {
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
        .element(render(() => <Klassed data-testid="root" />).getByTestId("root"))
        .tagName("HR")
        .className("base color-red");
    });

    it("equal - own polymorphic", () => {
      expects
        .element(
          render(() => (
            <Klassed asChild data-testid="root" color="blue">
              <As component="span" class="as-child" />
            </Klassed>
          )).getByTestId("root")
        )
        .tagName("SPAN")
        .className("base color-blue as-child");
    });
  });
});
