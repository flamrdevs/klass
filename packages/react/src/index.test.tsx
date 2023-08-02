import { describe, it, expect } from "vitest";
import { afterEach } from "vitest";

import { isValidElement, useState } from "react";

import { cleanup, fireEvent, render } from "@testing-library/react";

import { klassed, reklassed } from "./index";

import { expectKlassedComponent, expectReklassedComponent, expectElement, itOptimizedClass, A } from "./tests";

afterEach(() => {
  cleanup();
});

describe("klassed", async () => {
  const BoxKlassed = klassed("div", {
    base: "block",
    variants: {
      m: {
        "1": "m-1",
        "2": "m-2",
        "3": "m-3",
        "4": "m-4",
        "5": "m-5",
      },
      p: {
        "1": "p-1",
        "2": "p-2",
        "3": "p-3",
        "4": "p-4",
        "5": "p-5",
      },
    },
  });

  const ButtonKlassed = klassed(
    "button",
    {
      base: "inline-block outline-none",
      variants: {
        color: {
          red: null,
          green: null,
          blue: null,
        },
        variant: {
          filled: "text-white",
          outline: "bg-transparent border",
        },
        full: {
          true: "w-full h-full",
          width: "w-full",
          height: "h-full",
        },
      },
      defaultVariants: {
        color: "red",
        variant: "filled",
      },
      compoundVariants: [
        {
          color: "red",
          variant: "filled",
          class: "bg-red-600",
        },
        {
          color: "green",
          variant: "filled",
          class: "bg-green-600",
        },
        {
          color: "blue",
          variant: "filled",
          class: "bg-blue-600",
        },
        {
          color: "red",
          variant: "outline",
          class: "text-red-600 border-red-600",
        },
        {
          color: "green",
          variant: "outline",
          class: "text-green-600 border-green-600",
        },
        {
          color: "blue",
          variant: "outline",
          class: "text-blue-600 border-blue-600",
        },
      ],
    },
    {
      dp: {
        type: "button",
      },
    }
  );

  const BoxWithItKlassed = klassed("div", BoxKlassed.klass.o, { it: itOptimizedClass });

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

        <BoxWithItKlassed data-testid="box-it" m="1" p="2" className={["extra-box", "classes"]}>
          box-it
        </BoxWithItKlassed>
      </>
    );

    expectElement(getByTestId("box")).tagName("DIV").className("block m-1 p-2 extra-box classes").textContent("box");

    const button = getByTestId("button");
    expectElement(button).tagName("BUTTON").className("inline-block outline-none text-white w-full bg-red-600 extra-button classes").textContent("button");

    const output: any[] = [];
    console.log = (...args) => output.push(args);
    fireEvent.click(button);
    expect(output).toEqual([["button-klassed"]]);

    const boxit = getByTestId("box-it");
    expect(boxit.className).toEqual(itOptimizedClass("block m-1 p-2 extra-box classes"));
  });

  it("reactive", async () => {
    const ReactiveComponent = () => {
      const [m, setM] = useState<"1" | "2">("1");
      const [p, setP] = useState<"1" | "2">("1");
      const [classes, setClasses] = useState<string | null>(null);

      const handleClick = () => {
        setM("2");
        setP("2");
        setClasses("reactive");
      };

      return (
        <BoxKlassed data-testid="reactive" as="button" m={m} p={p} className={["extra-reactive", "classes", classes]} onClick={handleClick}>
          ReactiveKlassed
        </BoxKlassed>
      );
    };

    const { getByTestId } = render(<ReactiveComponent />);

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
  const BoxReklassed = reklassed("div", {
    conditions: {
      base: "",
      sm: "sm:",
      md: "md:",
      lg: "lg:",
    },
    defaultCondition: "base",
    variants: {
      m: {
        "1": "m-1",
        "2": "m-2",
        "3": "m-3",
        "4": "m-4",
        "5": "m-5",
      },
      p: {
        "1": "p-1",
        "2": "p-2",
        "3": "p-3",
        "4": "p-4",
        "5": "p-5",
      },
    },
  });

  const BoxWithItReklassed = reklassed("div", BoxReklassed.reklass.o, { it: itOptimizedClass });

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

        <BoxWithItReklassed data-testid="box-it" m="2" p={{ base: "1", md: "3" }} className={["extra-box", "classes"]}>
          box-it
        </BoxWithItReklassed>
      </>
    );

    expectElement(getByTestId("box")).tagName("DIV").className("m-2 p-1 md:p-3 extra-box classes").textContent("box");
    expectElement(getByTestId("box-it")).tagName("DIV").className(itOptimizedClass("m-2 p-1 md:p-3 extra-box classes")).textContent("box-it");
  });

  it("reactive", async () => {
    const ReactiveComponent = () => {
      const [m, setM] = useState<"1" | { base: "1"; md: "3" }>("1");
      const [p, setP] = useState<"1" | "2">("1");
      const [classes, setClasses] = useState<string | undefined>();

      const handleClick = () => {
        setM({ base: "1", md: "3" });
        setP("2");
        setClasses("reactive");
      };

      return (
        <BoxReklassed data-testid="reactive" as="button" m={m} p={p} className={["extra-reactive", "classes", classes]} onClick={handleClick}>
          ReactiveReklassed
        </BoxReklassed>
      );
    };

    const { getByTestId } = render(<ReactiveComponent />);

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
