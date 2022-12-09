import { describe, it, expect } from "vitest";
import { afterEach } from "vitest";

import React from "react";

import { cleanup, render, screen } from "@testing-library/react";

import { klassed } from "./index";

afterEach(() => {
  cleanup();
});

describe("@klass/react", async () => {
  it("work", async () => {
    expect(true).toBeTruthy();
  });
});

describe("klassed", async () => {
  it("type of", async () => {
    expect(klassed).toBeTypeOf("function");
    const Div = klassed("div", {
      base: "div",
      variants: {
        enable: { true: "enable-true" },
        display: { block: "display-block", none: "display-none" },
        order: { 1: "order-1", 2: "order-2", 3: "order-3" },
      },
      defaultVariants: {
        display: "block",
      },
    });
    expect(React.isValidElement(<Div />)).toBeTruthy();
  });

  it("compund", async () => {
    const Div = klassed("div", {
      base: "div",
      variants: {
        enable: { true: "enable-true" },
        display: { block: "display-block", none: "display-none" },
        order: { 1: "order-1", 2: "order-2", 3: "order-3" },
      },
      defaultVariants: {
        display: "block",
      },
    });

    expect(Div.klass).toBeTypeOf("function");
    expect(Div.klass()).toEqual("div display-block");
    expect(Div.klass({ enable: true })).toEqual("div enable-true display-block");
    expect(Div.klass({ display: "none" })).toEqual("div display-none");

    expect(Div.klass.options).toEqual({
      base: "div",
      variants: {
        enable: { true: "enable-true" },
        display: { block: "display-block", none: "display-none" },
        order: { 1: "order-1", 2: "order-2", 3: "order-3" },
      },
      defaultVariants: {
        display: "block",
      },
    });
    expect(Div.klass.variant).toBeTypeOf("object");
    expect(Div.klass.variant.enable).toBeTypeOf("function");
    expect(Div.klass.variant.display).toBeTypeOf("function");
    expect(Div.klass.variant.enable()).toBeUndefined();
    expect(Div.klass.variant.enable.options).toEqual({
      variant: { true: "enable-true" },
    });
    expect(Div.klass.variant.display()).toEqual("display-block");
    expect(Div.klass.variant.display.options).toEqual({
      variant: { block: "display-block", none: "display-none" },
      defaultVariant: "block",
    });
    expect(Div.klass.variant.enable(true)).toEqual("enable-true");
    expect(Div.klass.variant.display("block")).toEqual("display-block");
  });

  it("basic", async () => {
    const Div = klassed("div", {
      base: "div",
      variants: {
        enable: { true: "enable-true" },
        display: { block: "display-block", none: "display-none" },
        order: { 1: "order-1", 2: "order-2", 3: "order-3" },
        className: { will: "not-work" },
      },
      defaultVariants: {
        display: "block",
      },
    });

    const Button = klassed(
      "button",
      {
        base: "btn",
        variants: {
          color: { red: "btn--red", green: "btn--green", blue: "btn--blue" },
          outline: { true: "btn--outline" },
        },
        defaultVariants: {
          color: "blue",
        },
        compoundVariants: [
          { variant: { color: "red", outline: true }, classes: "btn--outline-red" },
          { variant: { color: "green", outline: true }, classes: "btn--outline-green" },
          { variant: { color: "blue", outline: true }, classes: "btn--outline-blue" },
        ],
      },
      {
        defaultProps: {
          type: "button",
        },
      }
    );

    const LinkComponent = React.forwardRef<HTMLAnchorElement, JSX.IntrinsicElements["a"]>((props, ref) => <a {...props} ref={ref} />);
    const ButtonLink = klassed(LinkComponent, Button.klass.options, { defaultProps: { href: "/" } });

    render(
      <>
        <Div data-testid="div" enable className={["extra", "class"]}>
          div
        </Div>

        <Button data-testid="btn-red" color="red" outline>
          btn-red
        </Button>
        <Button data-testid="btn-green" color="green" outline>
          btn-green
        </Button>
        <Button data-testid="btn-blue" color="blue" outline>
          btn-blue
        </Button>

        <Button data-testid="btn-red-as-a" as="a" color="red" outline>
          btn-red-as-a
        </Button>
        <Button data-testid="btn-green-as-a" as="a" color="green" outline>
          btn-green-as-a
        </Button>
        <Button data-testid="btn-blue-as-a" as="a" color="blue" outline>
          btn-blue-as-a
        </Button>

        <ButtonLink data-testid="btn-link-red" color="red" outline>
          btn-link-red
        </ButtonLink>
        <ButtonLink data-testid="btn-link-green" color="green" outline>
          btn-link-green
        </ButtonLink>
        <ButtonLink data-testid="btn-link-blue" color="blue" outline>
          btn-link-blue
        </ButtonLink>
      </>
    );

    expect(screen.getByTestId("div")).toBeDefined();
    expect(screen.getByTestId("div").tagName).toEqual("DIV");
    expect(screen.getByTestId("div").classList.toString()).toEqual("div enable-true display-block extra class");
    expect(screen.getByTestId("div").textContent).toEqual("div");

    function expectButton(color: string) {
      const element = screen.getByTestId(`btn-${color}`);
      expect(element).toBeDefined();
      expect(element.tagName).toEqual("BUTTON");
      expect(element.classList.toString()).toEqual(`btn btn--${color} btn--outline btn--outline-${color}`);
      expect(element.getAttribute("type")).toEqual("button");
      expect(element.textContent).toEqual(`btn-${color}`);
    }
    expectButton("red");
    expectButton("green");
    expectButton("blue");

    function expectButtonAsA(color: string) {
      const element = screen.getByTestId(`btn-${color}-as-a`);
      expect(element).toBeDefined();
      expect(element.tagName).toEqual("A");
      expect(element.classList.toString()).toEqual(`btn btn--${color} btn--outline btn--outline-${color}`);
      expect(element.getAttribute("type")).toEqual("button");
      expect(element.textContent).toEqual(`btn-${color}-as-a`);
    }
    expectButtonAsA("red");
    expectButtonAsA("green");
    expectButtonAsA("blue");

    function expectButtonLink(color: string) {
      const element = screen.getByTestId(`btn-link-${color}`);
      expect(element).toBeDefined();
      expect(element.tagName).toEqual("A");
      expect(element.classList.toString()).toEqual(`btn btn--${color} btn--outline btn--outline-${color}`);
      expect(element.getAttribute("href")).toEqual("/");
      expect(element.textContent).toEqual(`btn-link-${color}`);
    }
    expectButtonLink("red");
    expectButtonLink("green");
    expectButtonLink("blue");
  });
});
