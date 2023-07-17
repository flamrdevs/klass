import { describe, it, expect } from "vitest";
import { afterEach } from "vitest";

import { isValidElement } from "preact";
import { useState } from "preact/hooks";

import { cleanup, fireEvent, render } from "@testing-library/preact";

import { cxsed } from "./HOCs";

import { expectElement, Button, Div } from "./tests";

afterEach(() => {
  cleanup();
});

describe("cxsed", async () => {
  const DivCXS = cxsed(Div, "base", "class");
  const ButtonCXS = cxsed(Button, "base", "class");

  it("type of", async () => {
    expect(cxsed).toBeTypeOf("function");
    expect(isValidElement(<DivCXS />)).toBeTruthy();
  });

  it("basic", async () => {
    const { getByTestId } = render(
      <>
        <DivCXS data-testid="div" class={["extra", "classes"]}>
          div
        </DivCXS>
      </>
    );

    expectElement(getByTestId("div")).tagName("DIV").className("base class extra classes").textContent("div");
  });

  it("reactive", async () => {
    const ReactiveComponent = () => {
      const [classes, setClasses] = useState<string | null>(null);

      const handleClick = () => {
        setClasses("click-class");
      };

      return (
        <>
          <ButtonCXS data-testid="button-a" class={classes} onClick={handleClick}>
            button-a
          </ButtonCXS>

          <ButtonCXS data-testid="button-b" class={classes} onClick={handleClick}>
            button-b
          </ButtonCXS>
        </>
      );
    };

    const { getByTestId } = render(<ReactiveComponent />);

    const buttona = getByTestId("button-a");
    const buttonb = getByTestId("button-b");

    expectElement(buttona).tagName("BUTTON").className("base class");
    expectElement(buttonb).tagName("BUTTON").className("base class");

    fireEvent.click(buttona);

    expectElement(buttona).className("base class click-class");
    expectElement(buttonb).className("base class click-class");
  });
});
