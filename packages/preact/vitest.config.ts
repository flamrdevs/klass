import { defineProject } from "vitest/config";

import preact from "@preact/preset-vite";

import { base } from "../vitest-config";

export default defineProject({
  ...base,
  plugins: [preact()],
  test: {
    ...base.test,
    environment: "jsdom",
    setupFiles: "vitest.setup.ts",
    include: ["test/**/*.test.{ts,tsx}"],
    server: {
      deps: {
        inline: [/preact/],
      },
    },
  },
});
