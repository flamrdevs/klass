import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		workspace: ["tests/*/vitest.config.ts"],
		pool: "threads",
		testTimeout: 10000,
	},
});
