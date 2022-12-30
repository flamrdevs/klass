import { describe, it, expect } from "vitest";
import { afterEach } from "vitest";

import { isValidElement } from "preact";

import { cleanup, fireEvent, render } from "@testing-library/preact";

import { klassed } from "./index";

import { BoxKlassed, BoxKlassedOptions, ButtonKlassed, ButtonKlassedOptions } from "./index.test.shared";
import Reactive from "./index.test.shared/Reactive";
import LinkComponent from "./index.test.shared/LinkComponent";

afterEach(() => {
  cleanup();
});

describe("@klass/preact", async () => {
  it("work", async () => {
    expect(true).toBeTruthy();
  });
});

describe("klassed", async () => {
  it("type of", async () => {
    expect(klassed).toBeTypeOf("function");
    expect(isValidElement(<BoxKlassed />)).toBeTruthy();
  });

  it("compund", async () => {
    expect(BoxKlassed.klass.options).toEqual(BoxKlassedOptions);
    expect(BoxKlassed.klass.variant).toBeTypeOf("object");
    expect(BoxKlassed.klass.variant.m).toBeTypeOf("function");
    expect(BoxKlassed.klass.variant.p).toBeTypeOf("function");
    expect(BoxKlassed.klass.variant.m.options).toEqual({
      variant: { "1": "m-1", "2": "m-2", "3": "m-3", "4": "m-4", "5": "m-5" },
    });
    expect(BoxKlassed.klass.variant.p.options).toEqual({
      variant: { "1": "p-1", "2": "p-2", "3": "p-3", "4": "p-4", "5": "p-5" },
    });

    expect(ButtonKlassed.klass.options).toEqual(ButtonKlassedOptions);
    expect(ButtonKlassed.klass.variant).toBeTypeOf("object");
    expect(ButtonKlassed.klass.variant.color).toBeTypeOf("function");
    expect(ButtonKlassed.klass.variant.variant).toBeTypeOf("function");
    expect(ButtonKlassed.klass.variant.full).toBeTypeOf("function");
    expect(ButtonKlassed.klass.variant.color.options).toEqual({
      variant: { red: null, green: null, blue: null },
      defaultVariant: "red",
    });
    expect(ButtonKlassed.klass.variant.variant.options).toEqual({
      variant: { filled: "text-white", outline: "bg-transparent border" },
      defaultVariant: "filled",
    });
    expect(ButtonKlassed.klass.variant.full.options).toEqual({
      variant: { true: "w-full h-full", width: "w-full", height: "h-full" },
    });
  });

  it("basic", async () => {
    const { getByTestId } = render(
      <>
        <BoxKlassed data-testid="box" class={["extra-box", "classes"]}>
          box
        </BoxKlassed>

        <ButtonKlassed data-testid="button" class={["extra-button", "classes"]}>
          button
        </ButtonKlassed>
      </>
    );

    const box = getByTestId("box");
    expect(box).toBeDefined();
    expect(box.tagName).toEqual("DIV");
    expect(box.classList.toString()).toEqual("block extra-box classes");
    expect(box.textContent).toEqual("box");

    const button = getByTestId("button");
    expect(button).toBeDefined();
    expect(button.tagName).toEqual("BUTTON");
    expect(button.classList.toString()).toEqual("inline-block outline-none text-white bg-red-600 extra-button classes");
    expect(button.textContent).toEqual("button");
  });

  it("reactive", async () => {
    const { getByTestId } = render(<Reactive />);

    const reactive = getByTestId("reactive");

    expect(reactive).toBeDefined();
    expect(reactive.tagName).toEqual("BUTTON");
    expect(reactive.classList.toString()).toEqual("inline-block outline-none text-white bg-red-600 extra-reactive classes");
    expect(reactive.textContent).toEqual("Reactive");

    fireEvent.click(reactive);
    expect(reactive.classList.toString()).toEqual("inline-block outline-none text-white bg-red-600 extra-reactive classes reactive");
  });

  it("polymorphic", async () => {
    const ButtonKlassedLink = klassed(LinkComponent, ButtonKlassed.klass.options, { defaultProps: { href: "/" } });

    const { getByTestId } = render(
      <>
        <ButtonKlassed data-testid="button-red" color="red">
          button-red
        </ButtonKlassed>

        <ButtonKlassed data-testid="button-green-as-a" as="a" color="green">
          button-green-as-a
        </ButtonKlassed>

        <ButtonKlassedLink data-testid="button-link-blue" color="blue">
          button-link-blue
        </ButtonKlassedLink>
      </>
    );

    const buttonNormal = getByTestId("button-red");
    expect(buttonNormal).toBeDefined();
    expect(buttonNormal.tagName).toEqual("BUTTON");

    const buttonAs = getByTestId("button-green-as-a");
    expect(buttonAs).toBeDefined();
    expect(buttonAs.tagName).toEqual("A");

    const buttonLink = getByTestId("button-link-blue");
    expect(buttonLink).toBeDefined();
    expect(buttonLink.tagName).toEqual("A");
  });
});
