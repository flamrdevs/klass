import { describe, it } from "vitest";

import { h } from "vue";
import type { ButtonHTMLAttributes, FunctionalComponent } from "vue";

import { render } from "@testing-library/vue";

import group from "@klass/core/group";

import * as mono from "./../../src/mono";

import * as expects from "./../~expects";
import * as utils from "./../~utils";
import * as tests from "./../../../tests";

import { Separator, SwitchRoot, SwitchThumb, Slot } from "radix-vue";

describe("mono", () => {
  describe("Separator", () => {
    const Klassed = mono.klassed(Separator, {
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
        .tagName("DIV")
        .className("base color-red");
    });

    it("equal - own polymorphic", () => {
      utils
        .expectElementRoot(
          <Klassed asChild {...tests.DATA_TESTID_ROOT_PROPS} color="blue">
            <span class="as-child"></span>
          </Klassed>
        )
        .tagName("SPAN")
        .className("base color-blue as-child");
    });
  });

  describe("Switch", () => {
    const variant = group({
      base: {
        root: "root-base",
        thumb: "thumb-base",
      },
      variants: {
        color: {
          red: {
            root: "root-color-red",
            thumb: "thumb-color-red",
          },
          green: {
            root: "root-color-green",
            thumb: "thumb-color-green",
          },
          blue: {
            root: "root-color-blue",
            thumb: "thumb-color-blue",
          },
        },
      },
      defaults: {
        color: "red",
      },
    });

    const KlassedRoot = mono.klassed(SwitchRoot, variant.root);
    const KlassedThumb = mono.klassed(SwitchThumb, variant.thumb);

    it("type", () => {
      expects.klassedComponent(KlassedRoot);
      expects.klassedComponent(KlassedThumb);
    });

    it("equal & own polymorphic", () => {
      const { getByTestId } = render(
        <KlassedRoot {...tests.DATA_TESTID_ROOT_PROPS}>
          <KlassedThumb data-testid="thumb" asChild>
            <div />
          </KlassedThumb>
        </KlassedRoot>
      );

      tests.expects.element(getByTestId("root")).tagName("BUTTON").className("root-base root-color-red");
      tests.expects.element(getByTestId("thumb")).tagName("DIV").className("thumb-base thumb-color-red");
    });
  });

  describe("Slot", () => {
    const Component: FunctionalComponent<ButtonHTMLAttributes & { asChild?: boolean }> = ({ asChild }, { attrs, slots }) => h(asChild ? Slot : "button", attrs as any, slots);
    Component.props = ["asChild"];
    Component.inheritAttrs = false;

    const Klassed = mono.klassed(Component, {
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

    it("equal - own polymorphic", () => {
      utils
        .expectElementRoot(
          <Klassed asChild {...tests.DATA_TESTID_ROOT_PROPS} color="blue">
            <a class="as-child"></a>
          </Klassed>
        )
        .tagName("A")
        .className("base color-blue as-child");
    });
  });
});
