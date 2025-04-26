import { defineProject } from "vitest/config";

import { qwikVite as qwik } from "@builder.io/qwik/optimizer";

import { base } from "../vitest-config";

export default defineProject({
	...base,
	plugins: [qwik()],
	test: {
		...base.test,
		include: ["test/**/*.test.{ts,tsx}"],
		server: {
			deps: {
				inline: [/@builder.io\/qwik/],
			},
		},
	},
});
