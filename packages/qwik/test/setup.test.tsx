import { describe, it } from "vitest";

import * as setup from "../src/setup.tsx";

import { expectKlassedComponent, expectReklassedComponent, customEnd, expectCustomEndFormat, customAs } from "./utils.tsx";

describe("setup", async () => {
  const config: setup.Config = {
    as: customAs,
    end: customEnd,
  };

  const works = ([klassed, reklassed]: ReturnType<typeof setup.default>) => {
    const KlassedComponent = klassed(
      "div",
      {
        base: "block",
        variants: {
          m: { "1": "m-1", "2": "m-2", "3": "m-3", "4": "m-4", "5": "m-5" },
          p: { "1": "p-1", "2": "p-2", "3": "p-3", "4": "p-4", "5": "p-5" },
        },
      },
      {
        dp: {
          id: "klassed",
        },
      }
    );
    const ReklassedComponent = reklassed(
      "div",
      {
        conditions: [{ base: "", sm: "sm:", md: "md:", lg: "lg:" }, "base"],
        variants: {
          m: { "1": "m-1", "2": "m-2", "3": "m-3", "4": "m-4", "5": "m-5" },
          p: { "1": "p-1", "2": "p-2", "3": "p-3", "4": "p-4", "5": "p-5" },
        },
      },
      {
        dp: {
          id: "reklassed",
        },
      }
    );

    expectKlassedComponent(KlassedComponent, { keys: ["m", "p"] });
    expectReklassedComponent(ReklassedComponent, { keys: ["m", "p"] });

    expectCustomEndFormat(KlassedComponent.klass());
    expectCustomEndFormat(ReklassedComponent.reklass());
  };

  it("works", async () => {
    works(setup.default(config));
    works([setup.klassed(config), setup.reklassed(config)]);
  });
});
