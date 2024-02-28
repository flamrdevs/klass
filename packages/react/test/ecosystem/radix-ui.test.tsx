import { describe, it } from "vitest";

import type { ButtonHTMLAttributes } from "react";

import { render } from "@testing-library/react";

import { klassed } from "../../src/mono";

import * as expects from "../expects";

import { Separator } from "@radix-ui/react-separator";
import { Slot } from "@radix-ui/react-slot";

describe("Separator", () => {
  const Klassed = klassed(Separator, {
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
            <span className="as-child"></span>
          </Klassed>
        ).getByTestId("root")
      )
      .tagName("SPAN")
      .className("base color-blue as-child");
  });
});

describe("Slot", () => {
  const Component = ({ asChild, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean }) => {
    const Element = asChild ? Slot : "button";
    return <Element {...(props as any)} />;
  };

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
            <a className="as-child"></a>
          </Klassed>
        ).getByTestId("root")
      )
      .tagName("A")
      .className("base color-blue as-child");
  });
});
