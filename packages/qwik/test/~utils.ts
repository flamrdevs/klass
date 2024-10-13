import type { JSXOutput } from "@builder.io/qwik";

import * as tests from "./../../tests";

import { render } from "./testing-library";

export const renderRoot = async (ui: JSXOutput) => {
  const result = await render(ui);
  return { ...result, element: result.getByTestId(tests.DATA_TESTID_ROOT) };
};

export const expectElementRoot = async (ui: JSXOutput) => tests.expects.element((await renderRoot(ui)).element);

export const expectElementFireClick = async (
  fireEvent: Awaited<ReturnType<typeof render>>["fireEvent"],
  getElement: () => HTMLElement,
  before: (expects: tests.expects.ElementReturn) => any,
  after: (expects: tests.expects.ElementReturn) => any
) => {
  let element: HTMLElement = getElement();
  before(tests.expects.element(element));
  await fireEvent.click(element);
  after(tests.expects.element((element = getElement())));
  return element;
};
