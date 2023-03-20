import { describe, it, expect } from "vitest";
import { afterEach } from "vitest";

import { forwardRef, isValidElement, useState } from "react";
import type { PropsWithoutRef } from "react";

import { cleanup, fireEvent, render } from "@testing-library/react";

import { withClassValue } from "./HOCs";

afterEach(() => {
  cleanup();
});

describe("withClassValue", async () => {
  it("type of", async () => {
    const Div = forwardRef<HTMLDivElement, PropsWithoutRef<JSX.IntrinsicElements["div"]>>((props, ref) => <div {...props} ref={ref} />);
    const DivClassValue = withClassValue(Div, "base", "class");

    expect(withClassValue).toBeTypeOf("function");
    expect(isValidElement(<DivClassValue />)).toBeTruthy();
  });

  it("basic", async () => {
    const Div = forwardRef<HTMLDivElement, PropsWithoutRef<JSX.IntrinsicElements["div"]>>((props, ref) => <div {...props} ref={ref} />);
    const DivClassValue = withClassValue(Div, "base", "class");

    const { getByTestId } = render(
      <>
        <DivClassValue data-testid="div" className={["extra", "classes"]}>
          div
        </DivClassValue>
      </>
    );

    const div = getByTestId("div");
    expect(div).toBeDefined();
    expect(div.tagName).toEqual("DIV");
    expect(div.classList.toString()).toEqual("base class extra classes");
    expect(div.textContent).toEqual("div");
  });

  it("reactive", async () => {
    const Button = forwardRef<HTMLButtonElement, PropsWithoutRef<JSX.IntrinsicElements["button"]>>((props, ref) => (
      <button {...props} ref={ref} />
    ));
    const ButtonClassValue = withClassValue(Button, "base", "class");

    function Wrapper() {
      const [classes, setClasses] = useState<string | null>(null);

      const handleClick = () => {
        setClasses("click-class");
      };

      return (
        <>
          <ButtonClassValue data-testid="button-a" className={classes} onClick={handleClick}>
            button-a
          </ButtonClassValue>

          <ButtonClassValue data-testid="button-b" className={classes} onClick={handleClick}>
            button-b
          </ButtonClassValue>
        </>
      );
    }

    const { getByTestId } = render(<Wrapper />);

    const buttona = getByTestId("button-a");
    expect(buttona.classList.toString()).toEqual("base class");
    const buttonb = getByTestId("button-b");
    expect(buttonb.classList.toString()).toEqual("base class");

    fireEvent.click(buttona);
    expect(buttona.classList.toString()).toEqual("base class click-class");
    expect(buttonb.classList.toString()).toEqual("base class click-class");
  });
});
