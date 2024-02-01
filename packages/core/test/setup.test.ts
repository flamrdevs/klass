import { describe, it } from "vitest";

import * as setup from "./../src/setup.ts";

import { expectKlassFn, expectReklassFn, customEnd, expectCustomEndFormat, customAs } from "./utils.ts";

describe("setup", async () => {
  const config: setup.Config = {
    as: customAs,
    end: customEnd,
  };

  const works = ([klass, reklass]: ReturnType<typeof setup.default>) => {
    const klassFn = klass({
      base: "block",
      variants: {
        m: { "1": "m-1", "2": "m-2", "3": "m-3", "4": "m-4", "5": "m-5" },
        p: { "1": "p-1", "2": "p-2", "3": "p-3", "4": "p-4", "5": "p-5" },
      },
    });
    const reklassFn = reklass({
      conditions: [{ base: "", sm: "sm:", md: "md:", lg: "lg:" }, "base"],
      variants: {
        m: { "1": "m-1", "2": "m-2", "3": "m-3", "4": "m-4", "5": "m-5" },
        p: { "1": "p-1", "2": "p-2", "3": "p-3", "4": "p-4", "5": "p-5" },
      },
    });

    expectKlassFn(klassFn, { keys: ["m", "p"] });
    expectReklassFn(reklassFn, { keys: ["m", "p"] });

    expectCustomEndFormat(klassFn());
    expectCustomEndFormat(reklassFn());
  };

  it("works", async () => {
    works(setup.default(config));
    works([setup.klass(config), setup.reklass(config)]);
  });
});
