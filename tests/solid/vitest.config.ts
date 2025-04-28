import { defineProject } from "vitest/config";

import solid from "vite-plugin-solid";

import { custom } from "../config";

const config = custom(__dirname);

export default defineProject({
	...config,
	define: {
		...config.define,
	},
	plugins: [config.plugins, solid()],
	test: {
		include: ["**/*.test.{ts,tsx}"],
		...config.test,
	},
});
