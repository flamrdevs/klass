import { defineProject } from "vitest/config";

import { custom } from "../config";

const config = custom(__dirname);

export default defineProject({
	...config,
	define: {
		...config.define,
	},
	plugins: [config.plugins],
	test: {
		include: ["**/*.test.ts"],
		...config.test,
	},
});
