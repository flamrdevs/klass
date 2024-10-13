import { describe, it } from "vitest";

import * as mono from "./../../src/mono";

import * as expects from "./../~expects";
import * as utils from "./../~utils";
import * as tests from "./../../../tests";

import { Button } from "@ariakit/react";

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
      utils
        .expectElementRoot(<Klassed {...tests.DATA_TESTID_ROOT_PROPS} />)
        .tagName("BUTTON")
        .className("base color-red");
    });

    it("equal & own polymorphic", () => {
      utils
        .expectElementRoot(<Klassed {...tests.DATA_TESTID_ROOT_PROPS} render={<a />} />)
        .tagName("A")
        .className("base color-red");
    });
  });
});
