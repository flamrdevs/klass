import { describe, it, expect } from "vitest";
import { afterEach } from "vitest";

import { createSignal } from "solid-js";
import type { JSX } from "solid-js";

import { cleanup, fireEvent, render } from "@solidjs/testing-library";

import { cxsed } from "./HOCs";

afterEach(() => {
  cleanup();
});

describe("cxsed", async () => {
  it("type of", async () => {
    const Div = (props: JSX.IntrinsicElements["div"]) => <div {...props} />;
    const DivClassValue = cxsed(Div, "base", "class");

    expect(cxsed).toBeTypeOf("function");
    expect(() => <DivClassValue />).toBeTypeOf("function");
  });

  it("basic", async () => {
    const Div = (props: JSX.IntrinsicElements["div"]) => <div {...props} />;
    const DivClassValue = cxsed(Div, "base", "class");

    const { getByTestId } = render(() => (
      <>
        <DivClassValue data-testid="div" class={["extra", "classes"]}>
          div
        </DivClassValue>
      </>
    ));

    const div = getByTestId("div");
    expect(div).toBeDefined();
    expect(div.tagName).toEqual("DIV");
    expect(div.classList.toString()).toEqual("base class extra classes");
    expect(div.textContent).toEqual("div");
  });

  it("reactive", async () => {
    const Button = (props: JSX.IntrinsicElements["button"]) => <button {...props} />;
    const ButtonClassValue = cxsed(Button, "base", "class");

    const { getByTestId } = render(() => {
      const [classes, setClasses] = createSignal<string | null>(null);

      const handleClick = () => {
        setClasses("click-class");
      };

      return (
        <>
          <ButtonClassValue data-testid="button-a" class={classes()} onClick={handleClick}>
            button-a
          </ButtonClassValue>

          <ButtonClassValue data-testid="button-b" class={classes()} onClick={handleClick}>
            button-b
          </ButtonClassValue>
        </>
      );
    });

    const buttona = getByTestId("button-a");
    expect(buttona.classList.toString()).toEqual("base class");
    const buttonb = getByTestId("button-b");
    expect(buttonb.classList.toString()).toEqual("base class");

    fireEvent.click(buttona);
    expect(buttona.classList.toString()).toEqual("base class click-class");
    expect(buttonb.classList.toString()).toEqual("base class click-class");
  });
});
