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
        enable: {
          true: "enable-true",
        },
        display: {
          block: "display-block",
          none: "display-none",
        },
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
        enable: {
          true: "enable-true",
        },
        display: {
          block: "display-block",
          none: "display-none",
        },
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
        enable: {
          true: "enable-true",
        },
        display: {
          block: "display-block",
          none: "display-none",
        },
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
      variant: {
        true: "enable-true",
      },
    });
    expect(Div.klass.variant.display()).toEqual("display-block");
    expect(Div.klass.variant.display.options).toEqual({
      variant: {
        block: "display-block",
        none: "display-none",
      },
      defaultVariant: "block",
    });
    expect(Div.klass.variant.enable(true)).toEqual("enable-true");
    expect(Div.klass.variant.display("block")).toEqual("display-block");
  });

  it("basic", async () => {
    const Div = klassed("div", {
      base: "div",
      variants: {
        enable: {
          true: "enable-true",
        },
        display: {
          block: "display-block",
          none: "display-none",
        },
        className: {
          will: "not-work",
        },
        children: {
          haha: "lol",
        },
      },
      defaultVariants: {
        display: "block",
      },
    });

    render(<Div data-testid="div" enable className="extra class" {...{ out1: "out1", out2: "out2", out3: "out3" }} children="haha" />);

    expect(screen.getByTestId(/div/i)).toBeDefined();
    expect(screen.getByTestId(/div/i).classList.toString()).toEqual("div enable-true display-block lol extra class");
  });
});
