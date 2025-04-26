import { ViteUserConfig } from "vitest/config";

export const base: ViteUserConfig = {
  mode: "development",
  define: {
    "process.env.NODE_ENV": `"development"`,
  },
  test: {
    reporters: ["default"],
  },
};
