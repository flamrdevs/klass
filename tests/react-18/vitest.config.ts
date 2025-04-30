import { defineProject } from "vitest/config";

import react from "@vitejs/plugin-react";

import { custom } from "../config";

const config = custom(__dirname);

export default defineProject({
	...config,
	define: {
		...config.define,
	},
	plugins: [config.plugins, react()],
	test: {
		include: ["**/*.test.{ts,tsx}"],
		...config.test,
	},
});
