import { defineProject } from "vitest/config";

import preact from "@preact/preset-vite";

import { custom } from "../config";

const config = custom(__dirname);

export default defineProject({
	...config,
	define: {
		...config.define,
	},
	plugins: [config.plugins, preact()],
	test: {
		include: ["**/*.test.{ts,tsx}"],
		...config.test,
	},
});
