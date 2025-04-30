import { render as _render } from "preact";
import type { ComponentChild } from "preact";

export const render = (vnode: ComponentChild) => {
	const container = document.createElement("div");
	document.body.appendChild(container);

	_render(vnode, container);

	let removed = false;
	return () => {
		if (!removed) {
			removed = true;
			_render(null, container);
			document.body.removeChild(container);
		}
	};
};
