import fs from "node:fs";
import path from "node:path";

import type { BuildEnvironmentOptions, LibraryOptions } from "vite";

import dtsPlugin, { type PluginOptions as dtsPluginOptions } from "vite-plugin-dts";

export const dts = (include: string[], options?: dtsPluginOptions) => dtsPlugin({ include, rollupTypes: true, ...options });

const cwd = process.cwd();

const packagedotjson = JSON.parse(fs.readFileSync(path.resolve(cwd, "package.json"), "utf-8"));

type MutableOptions = { lib: LibraryOptions };

export const build = (src: string[], mutate?: (options: MutableOptions) => void) => {
  const options: Omit<BuildEnvironmentOptions, keyof MutableOptions> & MutableOptions = {
    target: "esnext",
    outDir: "dist",
    minify: "terser",
    lib: {
      entry: src.map((e) => `src/${e}`),
      fileName: (format, entry) => `${entry}.${format === "cjs" ? "cjs" : "js"}`,
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: (() => {
        return ((objects: (Record<string, any> | undefined)[]) => {
          const result: RegExp[] = [];

          let deps: string[] = [];
          for (const object of objects) {
            if (typeof object === "object") {
              if ((deps = Object.keys(object)).length) for (const dep of deps) result.push(new RegExp(`^${dep}(?:/.+)?$`));
            }
          }

          return result;
        })([packagedotjson.dependencies, packagedotjson.peerDependencies]);
      })(),
      output: {
        exports: "named",
        preserveModules: true,
      },
    },
  };

  mutate?.(options);

  return options;
};
