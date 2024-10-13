import type { ReactElement } from "react";

import { render, fireEvent } from "@testing-library/react";

import * as tests from "./../../tests";

export const renderRoot = (ui: ReactElement) => render(ui).getByTestId(tests.DATA_TESTID_ROOT);

export const expectElementRoot = (ui: ReactElement) => tests.expects.element(renderRoot(ui));

export const expectElementFireClick = (getElement: () => HTMLElement, before: (expects: tests.expects.ElementReturn) => any, after: (expects: tests.expects.ElementReturn) => any) => {
  let element: HTMLElement = getElement();
  before(tests.expects.element(element));
  fireEvent.click(element);
  after(tests.expects.element((element = getElement())));
  return element;
};
