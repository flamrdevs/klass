import { describe, it } from "vitest";

import * as setup from "./../src/setup.ts";

import * as shared from "./shared.ts";
import * as expects from "./expects.ts";

describe("setup", async () => {
  const config: setup.Config = {
    as: shared.customAs,
    end: shared.customEnd,
  };

  const works = ([klass, reklass]: ReturnType<typeof setup.default>) => {
    const klassFn = klass(shared.klass.button.basic.options);
    const reklassFn = reklass(shared.reklass.box.basic.options);

    expects.klassFn(klassFn);
    expects.reklassFn(reklassFn);

    expects.inCustomEnd(klassFn());
    expects.inCustomEnd(reklassFn());
  };

  it("works", async () => {
    works(setup.default(config));
    works([setup.klass(config), setup.reklass(config)]);
  });
});
