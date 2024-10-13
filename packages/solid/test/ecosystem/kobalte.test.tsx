import { describe, it } from "vitest";

import * as mono from "./../../src/mono";

import * as expects from "./../~expects";
import * as utils from "./../~utils";
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
      utils
        .expectElementRoot(() => <Klassed {...tests.DATA_TESTID_ROOT_PROPS} />)
        .tagName("HR")
        .className("base color-red");
    });

    it("equal & own polymorphic", () => {
      utils
        .expectElementRoot(() => <Klassed {...tests.DATA_TESTID_ROOT_PROPS} as="span" color="blue" />)
        .tagName("SPAN")
        .className("base color-blue");
    });
  });
});
