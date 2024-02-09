import type { JSXOutput } from "@builder.io/qwik";
import { createDOM } from "@builder.io/qwik/testing";

export const render = async (jsxElement: JSXOutput) => {
  const { render, screen, userEvent } = await createDOM();
  const { cleanup } = await render(jsxElement);
  return {
    cleanup,
    fireEvent: {
      click: async (element: Element) => await userEvent(element, "click"),
    },
    getByTestId: (id: string) => screen.querySelector(`[data-testid=${id}]`)!,
  };
};
