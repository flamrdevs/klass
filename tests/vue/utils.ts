import { createApp } from "vue";
import type { Component } from "vue";

export const mount = (component: Component) => {
	const container = document.createElement("div");
	document.body.appendChild(container);

	const app = createApp(component);
	app.mount(container);

	let removed = false;
	return () => {
		if (!removed) {
			removed = true;
			app.unmount();
			document.body.removeChild(container);
		}
	};
};
