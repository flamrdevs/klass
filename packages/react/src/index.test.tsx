import { describe, it, expect } from "vitest";
import { afterEach } from "vitest";

import { isValidElement } from "react";

import { cleanup, fireEvent, render } from "@testing-library/react";

import { klassed, reklassed } from "./index";

import { BoxKlassed, BoxKlassedOptions, ButtonKlassed, ButtonKlassedOptions, BoxReklassed, BoxReklassedOptions } from "./index.test.shared";

import LinkComponent from "./index.test.shared/LinkComponent";
import ReactiveKlassed from "./index.test.shared/ReactiveKlassed";
import ReactiveReklassed from "./index.test.shared/ReactiveReklassed";

afterEach(() => {
  cleanup();
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
        <BoxKlassed data-testid="box" m="1" p="2" className={["extra-box", "classes"]}>
          box
        </BoxKlassed>

        <ButtonKlassed data-testid="button" full="width" className={["extra-button", "classes"]}>
          button
        </ButtonKlassed>
      </>
    );

    const box = getByTestId("box");
    expect(box).toBeDefined();
    expect(box.tagName).toEqual("DIV");
    expect(box.classList.toString()).toEqual("block m-1 p-2 extra-box classes");
    expect(box.textContent).toEqual("box");

    const button = getByTestId("button");
    expect(button).toBeDefined();
    expect(button.tagName).toEqual("BUTTON");
    expect(button.classList.toString()).toEqual("inline-block outline-none text-white w-full bg-red-600 extra-button classes");
    expect(button.textContent).toEqual("button");

    const output: any[] = [];
    console.log = (...args) => output.push(args);
    fireEvent.click(button);
    expect(output).toEqual([["button-klassed"]]);
  });

  it("reactive", async () => {
    const { getByTestId } = render(<ReactiveKlassed />);

    const reactive = getByTestId("reactive");

    expect(reactive).toBeDefined();
    expect(reactive.tagName).toEqual("BUTTON");
    expect(reactive.classList.toString()).toEqual("block m-1 p-1 extra-reactive classes");
    expect(reactive.textContent).toEqual("ReactiveKlassed");

    fireEvent.click(reactive);
    expect(reactive.classList.toString()).toEqual("block m-2 p-2 extra-reactive classes reactive");
  });

  it("polymorphic", async () => {
    const { getByTestId } = render(
      <>
        <ButtonKlassed data-testid="button-red" color="red">
          button-red
        </ButtonKlassed>

        <ButtonKlassed data-testid="button-green-as-a" as="a" color="green">
          button-green-as-a
        </ButtonKlassed>

        <ButtonKlassed data-testid="button-link-blue" as={LinkComponent} color="blue">
          button-link-blue
        </ButtonKlassed>
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

describe("reklassed", async () => {
  it("type of", async () => {
    expect(reklassed).toBeTypeOf("function");
    expect(isValidElement(<BoxReklassed />)).toBeTruthy();
  });

  it("compund", async () => {
    expect(BoxReklassed.reklass.options).toEqual(BoxReklassedOptions);
    expect(BoxReklassed.reklass.revariant).toBeTypeOf("object");
    expect(BoxReklassed.reklass.revariant.m).toBeTypeOf("function");
    expect(BoxReklassed.reklass.revariant.p).toBeTypeOf("function");
    expect(BoxReklassed.reklass.revariant.m.options).toEqual({
      conditions: {
        base: "",
        sm: "sm:",
        md: "md:",
        lg: "lg:",
      },
      defaultCondition: "base",
      variant: { "1": "m-1", "2": "m-2", "3": "m-3", "4": "m-4", "5": "m-5" },
    });
    expect(BoxReklassed.reklass.revariant.p.options).toEqual({
      conditions: {
        base: "",
        sm: "sm:",
        md: "md:",
        lg: "lg:",
      },
      defaultCondition: "base",
      variant: { "1": "p-1", "2": "p-2", "3": "p-3", "4": "p-4", "5": "p-5" },
    });
  });

  it("basic", async () => {
    const { getByTestId } = render(
      <>
        <BoxReklassed data-testid="box" m="2" p={{ base: "1", md: "3" }} className={["extra-box", "classes"]}>
          box
        </BoxReklassed>
      </>
    );

    const box = getByTestId("box");
    expect(box).toBeDefined();
    expect(box.tagName).toEqual("DIV");
    expect(box.classList.toString()).toEqual("m-2 p-1 md:p-3 extra-box classes");
    expect(box.textContent).toEqual("box");
  });

  it("reactive", async () => {
    const { getByTestId } = render(<ReactiveReklassed />);

    const reactive = getByTestId("reactive");

    expect(reactive).toBeDefined();
    expect(reactive.tagName).toEqual("BUTTON");
    expect(reactive.classList.toString()).toEqual("m-1 p-1 extra-reactive classes");
    expect(reactive.textContent).toEqual("ReactiveReklassed");

    fireEvent.click(reactive);
    expect(reactive.classList.toString()).toEqual("m-1 md:m-3 p-2 extra-reactive classes reactive");
  });

  it("polymorphic", async () => {
    const { getByTestId } = render(
      <>
        <BoxReklassed data-testid="box">box</BoxReklassed>

        <BoxReklassed data-testid="box-as-a" as="a">
          box-as-a
        </BoxReklassed>

        <BoxReklassed data-testid="box-link" as={LinkComponent}>
          box-link
        </BoxReklassed>
      </>
    );

    const boxNormal = getByTestId("box");
    expect(boxNormal).toBeDefined();
    expect(boxNormal.tagName).toEqual("DIV");

    const boxAs = getByTestId("box-as-a");
    expect(boxAs).toBeDefined();
    expect(boxAs.tagName).toEqual("A");

    const boxLink = getByTestId("box-link");
    expect(boxLink).toBeDefined();
    expect(boxLink.tagName).toEqual("A");
  });
});
