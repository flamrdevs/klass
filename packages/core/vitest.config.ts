import { defineProject } from "vitest/config";

import { base } from "../vitest-config";

export default defineProject({
	...base,
	plugins: [],
	test: {
		...base.test,
		include: ["test/**/*.test.ts"],
	},
});
