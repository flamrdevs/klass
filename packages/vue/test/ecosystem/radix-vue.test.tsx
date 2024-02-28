import { describe, it } from "vitest";

import { h } from "vue";
import type { ButtonHTMLAttributes, FunctionalComponent } from "vue";

import { render } from "@testing-library/vue";

import { klassed } from "../../src/mono";

import * as expects from "../expects";

import { Separator, Slot } from "radix-vue";
import type { SeparatorProps } from "radix-vue";

describe("Separator", () => {
  const Component: FunctionalComponent<SeparatorProps> = (props, { attrs, slots }) => h(Separator, { ...props, ...(attrs as any) }, slots);
  Component.props = ["as", "asChild", "decorative", "orientation"];
  Component.inheritAttrs = false;

  const Klassed = klassed(Component, {
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
      .tagName("DIV")
      .className("base color-red");
  });

  it("equal - own polymorphic", () => {
    expects
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

describe("Slot", () => {
  const Component: FunctionalComponent<ButtonHTMLAttributes & { asChild?: boolean }> = ({ asChild }, { attrs, slots }) => h(asChild ? Slot : "button", attrs as any, slots);
  Component.props = ["asChild"];
  Component.inheritAttrs = false;

  const Klassed = klassed(Component, {
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

  it("equal - own polymorphic", () => {
    expects
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
