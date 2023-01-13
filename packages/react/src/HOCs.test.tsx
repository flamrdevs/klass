import { describe, it, expect } from "vitest";
import { afterEach } from "vitest";

import { forwardRef, isValidElement } from "react";

import { cleanup, render } from "@testing-library/react";

import { withClassValue } from "./HOCs";

afterEach(() => {
  cleanup();
});

describe("withClassValue", async () => {
  type ExampleProps = { some: string };
  const Example = forwardRef<HTMLDivElement, JSX.IntrinsicElements["div"] & ExampleProps>(({ some, ...others }, ref) => (
    <div {...others} ref={ref} />
  ));

  const ExampleClassValue = withClassValue(Example, "base", "class");

  it("type of", async () => {
    expect(withClassValue).toBeTypeOf("function");
    expect(isValidElement(<ExampleClassValue some="some" />)).toBeTruthy();
  });

  it("basic", async () => {
    const { getByTestId } = render(
      <>
        <ExampleClassValue data-testid="example" some="some" className={["extra-example", "classes"]}>
          example
        </ExampleClassValue>
      </>
    );

    const example = getByTestId("example");
    expect(example).toBeDefined();
    expect(example.tagName).toEqual("DIV");
    expect(example.classList.toString()).toEqual("base class extra-example classes");
    expect(example.textContent).toEqual("example");
  });
});
