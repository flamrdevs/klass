import { render, fireEvent } from "@testing-library/vue";

import * as tests from "./../../tests";

export const renderRoot = (ui: any) => render(ui).getByTestId(tests.DATA_TESTID_ROOT);

export const expectElementRoot = (ui: any) => tests.expects.element(renderRoot(ui));

export const expectElementFireClick = async (getElement: () => HTMLElement, before: (expects: tests.expects.ElementReturn) => any, after: (expects: tests.expects.ElementReturn) => any) => {
  let element: HTMLElement = getElement();
  before(tests.expects.element(element));
  await fireEvent.click(element);
  after(tests.expects.element((element = getElement())));
  return element;
};
