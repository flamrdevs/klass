import { describe, it, expect } from "vitest";
import { afterEach } from "vitest";

import { splitProps } from "solid-js";
import type { JSX } from "solid-js";

import { cleanup, render } from "@solidjs/testing-library";

import { withClassValue } from "./HOCs";

afterEach(() => {
  cleanup();
});

describe("withClassValue", async () => {
  type ExampleProps = { some: string };
  const Example = (props: JSX.IntrinsicElements["div"] & ExampleProps) => {
    const [, others] = splitProps(props, ["some"]);
    return <div {...others} />;
  };

  const ExampleClassValue = withClassValue(Example, "base", "class");

  it("type of", async () => {
    expect(withClassValue).toBeTypeOf("function");
    expect(() => <ExampleClassValue some="some" />).toBeTypeOf("function");
  });

  it("basic", async () => {
    const { getByTestId } = render(() => (
      <>
        <ExampleClassValue data-testid="example" some="some" class={["extra-example", "classes"]}>
          example
        </ExampleClassValue>
      </>
    ));

    const example = getByTestId("example");
    expect(example).toBeDefined();
    expect(example.tagName).toEqual("DIV");
    expect(example.classList.toString()).toEqual("base class extra-example classes");
    expect(example.textContent).toEqual("example");
  });
});
