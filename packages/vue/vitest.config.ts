import { defineProject } from "vitest/config";

import vue from "@vitejs/plugin-vue";
import jsx from "@vitejs/plugin-vue-jsx";

import { base } from "../vitest-config";

export default defineProject({
  ...base,
  plugins: [vue(), jsx()],
  test: {
    ...base.test,
    environment: "jsdom",
    setupFiles: "vitest.setup.ts",
    include: ["test/**/*.test.{ts,tsx}"],
    server: {
      deps: {
        inline: [/vue/],
      },
    },
  },
});
