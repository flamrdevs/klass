import { describe, it } from "vitest";

import * as setup from "./../src/setup";

import * as core from "./../../core/test/~";
import * as expects from "./~expects";

describe("setup", () => {
  const config: setup.Config = core.shared.custom.configEndAsProps;

  const works = ([klassed, reklassed]: ReturnType<typeof setup.default>) => {
    const KlassedComponent = klassed("div", core.shared.klass.button.basic.options);
    const ReklassedComponent = reklassed("div", core.shared.reklass.box.basic.options);

    expects.klassedComponent(KlassedComponent);
    expects.reklassedComponent(ReklassedComponent);

    core.expects.inCustomEnd(KlassedComponent.fx());
    core.expects.inCustomEnd(ReklassedComponent.fx());
  };

  it("works", () => {
    works(setup.default(config));
    works([setup.klassed(config), setup.reklassed(config)]);
  });
});
