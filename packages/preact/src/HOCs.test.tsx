import { describe, it, expect } from "vitest";
import { afterEach } from "vitest";

import { isValidElement } from "preact";
import type { JSX } from "preact";
import { useState } from "preact/hooks";

import { cleanup, fireEvent, render } from "@testing-library/preact";

import { withClassValue } from "./HOCs";

afterEach(() => {
  cleanup();
});

describe("withClassValue", async () => {
  it("type of", async () => {
    const Div = (props: JSX.IntrinsicElements["div"]) => <div {...props} />;
    const DivClassValue = withClassValue(Div, "base", "class");

    expect(withClassValue).toBeTypeOf("function");
    expect(isValidElement(<DivClassValue />)).toBeTruthy();
  });

  it("basic", async () => {
    const Div = (props: JSX.IntrinsicElements["div"]) => <div {...props} />;
    const DivClassValue = withClassValue(Div, "base", "class");

    const { getByTestId } = render(
      <>
        <DivClassValue data-testid="div" class={["extra", "classes"]}>
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
    const Button = (props: JSX.IntrinsicElements["button"]) => <button {...props} />;
    const ButtonClassValue = withClassValue(Button, "base", "class");

    function Wrapper() {
      const [classes, setClasses] = useState<string | null>(null);

      const handleClick = () => {
        setClasses("click-class");
      };

      return (
        <>
          <ButtonClassValue data-testid="button-a" class={classes} onClick={handleClick}>
            button-a
          </ButtonClassValue>

          <ButtonClassValue data-testid="button-b" class={classes} onClick={handleClick}>
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
