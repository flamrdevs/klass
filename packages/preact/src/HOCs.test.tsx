import { describe, it, expect } from "vitest";
import { afterEach } from "vitest";

import { isValidElement } from "preact";
import type { JSX } from "preact";

import { cleanup, render } from "@testing-library/preact";

import { withClassValue } from "./HOCs";

afterEach(() => {
  cleanup();
});

describe("withClassValue", async () => {
  type ExampleProps = { some: string };
  const Example = ({ some, ...others }: JSX.IntrinsicElements["div"] & ExampleProps) => {
    return <div {...others} />;
  };

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
