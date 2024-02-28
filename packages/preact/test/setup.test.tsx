import { describe, it } from "vitest";

import * as setup from "./../src/setup";

import * as core from "./../../core/test/exports";
import * as expects from "./expects";

describe("setup", async () => {
  const config: setup.Config = {
    as: core.shared.customAs,
    end: core.shared.customEnd,
  };

  const works = ([klassed, reklassed]: ReturnType<typeof setup.default>) => {
    const KlassedComponent = klassed("div", core.shared.klass.button.basic.options);
    const ReklassedComponent = reklassed("div", core.shared.reklass.box.basic.options);

    expects.klassedComponent(KlassedComponent);
    expects.reklassedComponent(ReklassedComponent);

    core.expects.inCustomEnd(KlassedComponent.klass());
    core.expects.inCustomEnd(ReklassedComponent.reklass());
  };

  it("works", async () => {
    works(setup.default(config));
    works([setup.klassed(config), setup.reklassed(config)]);
  });
});
