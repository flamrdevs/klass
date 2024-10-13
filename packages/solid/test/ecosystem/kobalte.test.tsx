import { describe, it } from "vitest";

import { render } from "@solidjs/testing-library";

import * as mono from "./../../src/mono";

import * as expects from "./../~expects";
import * as tests from "./../../../tests";

import { Separator } from "@kobalte/core";

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
      tests.expects
        .element(render(() => <Klassed data-testid="root" />).getByTestId("root"))
        .tagName("HR")
        .className("base color-red");
    });

    it("equal & own polymorphic", () => {
      tests.expects
        .element(render(() => <Klassed data-testid="root" as="span" color="blue" />).getByTestId("root"))
        .tagName("SPAN")
        .className("base color-blue");
    });
  });
});
