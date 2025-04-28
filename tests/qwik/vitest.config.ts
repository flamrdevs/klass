import { defineProject } from "vitest/config";

import { qwikVite as qwik } from "@builder.io/qwik/optimizer";

import { custom } from "../config";

const config = custom(__dirname);

export default defineProject({
	...config,
	define: {
		...config.define,
	},
	plugins: [config.plugins, qwik({ csr: true })],
	test: {
		include: ["**/*.test.{ts,tsx}"],
		...config.test,
	},
});
