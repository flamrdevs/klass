import { describe, it } from "vitest";

import { h } from "vue";
import type { ButtonHTMLAttributes, FunctionalComponent } from "vue";

import { render } from "@testing-library/vue";

import group from "@klass/core/group";

import * as mono from "./../../src/mono";

import * as expects from "./../~expects";
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
      tests.expects
        .element(render(<Klassed data-testid="root" />).getByTestId("root"))
        .tagName("DIV")
        .className("base color-red");
    });

    it("equal - own polymorphic", () => {
      tests.expects
        .element(
          render(
            <Klassed asChild data-testid="root" color="blue">
              <span class="as-child"></span>
            </Klassed>
          ).getByTestId("root")
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
        <KlassedRoot data-testid="root">
          <KlassedThumb data-testid="thumb" asChild>
            <div />
          </KlassedThumb>
        </KlassedRoot>
      );

      const root = getByTestId("root");
      const thumb = getByTestId("thumb");

      tests.expects.element(root).tagName("BUTTON").className("root-base root-color-red");
      tests.expects.element(thumb).tagName("DIV").className("thumb-base thumb-color-red");
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
      tests.expects
        .element(render(<Klassed data-testid="root" />).getByTestId("root"))
        .tagName("BUTTON")
        .className("base color-red");
    });

    it("equal - own polymorphic", () => {
      tests.expects
        .element(
          render(
            <Klassed asChild data-testid="root" color="blue">
              <a class="as-child"></a>
            </Klassed>
          ).getByTestId("root")
        )
        .tagName("A")
        .className("base color-blue as-child");
    });
  });
});
