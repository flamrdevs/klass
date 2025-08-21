import type { FunctionComponent, JSXOutput } from "@builder.io/qwik";
import { render as _render } from "@builder.io/qwik";

export const render = async (jsxOutput: JSXOutput | FunctionComponent<any>) => {
	const container = document.createElement("div");
	document.body.appendChild(container);

	const result = await _render(container, jsxOutput);

	let removed = false;
	return () => {
		if (!removed) {
			removed = true;
			result.cleanup();
			document.body.removeChild(container);
		}
	};
};
