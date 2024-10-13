import type { ComponentChild } from "preact";

import { render, fireEvent } from "@testing-library/preact";

import * as tests from "./../../tests";

export const renderRoot = (ui: ComponentChild) => render(ui).getByTestId(tests.DATA_TESTID_ROOT);

export const expectElementRoot = (ui: ComponentChild) => tests.expects.element(renderRoot(ui));

export const expectElementFireClick = (getElement: () => HTMLElement, before: (expects: tests.expects.ElementReturn) => any, after: (expects: tests.expects.ElementReturn) => any) => {
  let element: HTMLElement = getElement();
  before(tests.expects.element(element));
  fireEvent.click(element);
  after(tests.expects.element((element = getElement())));
  return element;
};
