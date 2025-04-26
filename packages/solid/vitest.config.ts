import { defineProject } from "vitest/config";

import solid from "vite-plugin-solid";

import { base } from "../vitest-config";

export default defineProject({
  ...base,
  plugins: [solid()],
  test: {
    ...base.test,
    environment: "jsdom",
    setupFiles: "vitest.setup.ts",
    include: ["test/**/*.test.{ts,tsx}"],
    server: {
      deps: {
        inline: [/solid-js/, /@solidjs\/router/],
      },
    },
  },
});
