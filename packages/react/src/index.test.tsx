import { describe, it, expect } from "vitest";

import { isValidElement } from "react";

import { fireEvent, render } from "@testing-library/react";

import { klassed, reklassed } from "./index.tsx";

import { expectKlassedComponent, expectReklassedComponent, expectElement, customEnd, A } from "./tests/utils.tsx";

import { BoxKlassed, ButtonKlassed, BoxElement, BoxCustomEndKlassed, KlassedReactiveComponent, BoxReklassed, BoxCustomEndReklassed, ReklassedReactiveComponent } from "./index.test.utils.tsx";

describe("klassed", async () => {
  it("type of", async () => {
    expect(klassed).toBeTypeOf("function");
    expect(isValidElement(<ButtonKlassed />)).toBeTruthy();
  });

  it("compound", async () => {
    expectKlassedComponent(BoxKlassed, { keys: ["m", "p"] });
  });

  it("basic", async () => {
    const { getByTestId } = render(
      <>
        <BoxKlassed data-testid="box" m="1" p="2" className={["extra-box", "classes"]}>
          box
        </BoxKlassed>

        <ButtonKlassed
          data-testid="button"
          full="width"
          className={["extra-button", "classes"]}
          onClick={() => {
            console.log("button-klassed");
          }}
        >
          button
        </ButtonKlassed>

        <BoxElement data-testid="box-element">box-element</BoxElement>

        <BoxCustomEndKlassed data-testid="box-it" m="1" p="2" className={["extra-box", "classes"]}>
          box-it
        </BoxCustomEndKlassed>
      </>
    );

    expectElement(getByTestId("box")).tagName("DIV").className("block m-1 p-2 extra-box classes").textContent("box");

    const button = getByTestId("button");
    expectElement(button).tagName("BUTTON").className("inline-block outline-none text-white w-full bg-red-600 extra-button classes").textContent("button");

    const output: any[] = [];
    console.log = (...args) => output.push(args);
    fireEvent.click(button);
    expect(output).toEqual([["button-klassed"]]);

    const boxelement = getByTestId("box-element");
    expect(boxelement.className).toEqual(customEnd("block"));

    const boxit = getByTestId("box-it");
    expect(boxit.className).toEqual(customEnd("block m-1 p-2 extra-box classes"));
  });

  it("reactive", async () => {
    const { getByTestId } = render(<KlassedReactiveComponent />);

    const reactive = getByTestId("reactive");
    expectElement(reactive).tagName("BUTTON").className("block m-1 p-1 extra-reactive classes").textContent("ReactiveKlassed");

    fireEvent.click(reactive);
    expect(reactive.className).toEqual("block m-2 p-2 extra-reactive classes reactive");
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

        <ButtonKlassed data-testid="anchor-button-blue" as={A} color="blue">
          anchor-button-blue
        </ButtonKlassed>
      </>
    );

    expectElement(getByTestId("button-red")).tagName("BUTTON");
    expectElement(getByTestId("button-green-as-a")).tagName("A");
    expectElement(getByTestId("anchor-button-blue")).tagName("A");
  });
});

describe("reklassed", async () => {
  it("type of", async () => {
    expect(reklassed).toBeTypeOf("function");
    expect(isValidElement(<BoxReklassed />)).toBeTruthy();
  });

  it("compound", async () => {
    expectReklassedComponent(BoxReklassed, { keys: ["m", "p"] });
  });

  it("basic", async () => {
    const { getByTestId } = render(
      <>
        <BoxReklassed data-testid="box" m="2" p={{ base: "1", md: "3" }} className={["extra-box", "classes"]}>
          box
        </BoxReklassed>

        <BoxCustomEndReklassed data-testid="box-it" m="2" p={{ base: "1", md: "3" }} className={["extra-box", "classes"]}>
          box-it
        </BoxCustomEndReklassed>
      </>
    );

    expectElement(getByTestId("box")).tagName("DIV").className("m-2 p-1 md:p-3 extra-box classes").textContent("box");
    expectElement(getByTestId("box-it")).tagName("DIV").className(customEnd("m-2 p-1 md:p-3 extra-box classes")).textContent("box-it");
  });

  it("reactive", async () => {
    const { getByTestId } = render(<ReklassedReactiveComponent />);

    const reactive = getByTestId("reactive");
    expectElement(reactive).tagName("BUTTON").className("m-1 p-1 extra-reactive classes").textContent("ReactiveReklassed");

    fireEvent.click(reactive);
    expect(reactive.className).toEqual("m-1 md:m-3 p-2 extra-reactive classes reactive");
  });

  it("polymorphic", async () => {
    const { getByTestId } = render(
      <>
        <BoxReklassed data-testid="box">box</BoxReklassed>

        <BoxReklassed data-testid="box-as-a" as="a">
          box-as-a
        </BoxReklassed>

        <BoxReklassed data-testid="box-link" as={A}>
          box-link
        </BoxReklassed>
      </>
    );

    expectElement(getByTestId("box")).tagName("DIV");
    expectElement(getByTestId("box-as-a")).tagName("A");
    expectElement(getByTestId("box-link")).tagName("A");
  });
});
