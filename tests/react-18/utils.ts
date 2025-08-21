import type { ReactNode } from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";

let init = false;

export const render = (children: ReactNode) => {
	if (!init) {
		init = true;
		(global as any).IS_REACT_ACT_ENVIRONMENT = true;
	}

	const container = document.createElement("div");
	document.body.appendChild(container);

	const root = createRoot(container);
	act(() => {
		root.render(children);
	});

	let removed = false;
	return () => {
		if (!removed) {
			removed = true;
			act(() => {
				root.unmount();
			});
			document.body.removeChild(container);
		}
	};
};
