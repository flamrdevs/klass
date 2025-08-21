import { defineProject } from "vitest/config";
import vue from "@vitejs/plugin-vue";
import jsx from "@vitejs/plugin-vue-jsx";

import { custom } from "../config";

const config = custom(__dirname);

export default defineProject({
	...config,
	define: {
		...config.define,
	},
	plugins: [config.plugins, vue(), jsx()],
	test: {
		include: ["**/*.test.{ts,tsx}"],
		...config.test,
	},
});
