import { defineProject } from "vitest/config";

import react from "@vitejs/plugin-react";

import { base } from "../vitest-config";

export default defineProject({
	...base,
	plugins: [react()],
	test: {
		...base.test,
		environment: "jsdom",
		setupFiles: "vitest.setup.ts",
		include: ["test/**/*.test.{ts,tsx}"],
		server: {
			deps: {
				inline: [/react/, /react-dom/],
			},
		},
	},
});
