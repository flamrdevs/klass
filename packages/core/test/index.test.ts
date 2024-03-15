import { describe, it, expect } from "vitest";

import { klass, reklass, compose } from "./../src";

import * as shared from "./~shared";
import * as expects from "./~expects";

describe("klass", () => {
  const klass_button_basic = klass(shared.klass.button.basic.options);
  const klass_button_base = klass(shared.klass.button.base.options);
  const klass_button_defaults = klass(shared.klass.button.defaults.options);
  const klass_button_compounds = klass(shared.klass.button.compounds.options);

  it("type", () => {
    expects.klassFn(klass_button_basic);
    expects.klassFn(klass_button_base);
    expects.klassFn(klass_button_defaults);
    expects.klassFn(klass_button_compounds);
  });

  describe("equal", () => {
    it("basic", () => {
      for (const test of shared.klass.button.basic.test) expect(klass_button_basic(test.props)).toEqual(test.equal);
    });

    it("base", () => {
      for (const test of shared.klass.button.base.test) expect(klass_button_base(test.props)).toEqual(test.equal);
    });

    it("defaults", () => {
      for (const test of shared.klass.button.defaults.test) expect(klass_button_defaults(test.props)).toEqual(test.equal);
    });

    it("compounds", () => {
      for (const test of shared.klass.button.compounds.test) expect(klass_button_compounds(test.props)).toEqual(test.equal);
    });
  });
});

describe("reklass", () => {
  const reklass_box_basic = reklass(shared.reklass.box.basic.options);

  it("type", () => {
    expects.reklassFn(reklass_box_basic);
  });

  describe("equal", () => {
    it("basic", () => {
      for (const test of shared.reklass.box.basic.test) expect(reklass_box_basic(test.props)).toEqual(test.equal);
    });
  });
});

describe("compose", () => {
  it("works", () => {
    const color = klass(shared.compose.klass.color.options);
    const size = klass(shared.compose.klass.size.options);
    const margin = reklass(shared.compose.reklass.margin.options);
    const padding = reklass(shared.compose.reklass.padding.options);

    const fn = compose(color, size, margin, padding);

    expect(fn.k).toEqual(["color", "size", "m", "mx", "my", "p", "px", "py"]);

    expect(fn()).toEqual("color-base size-base");
    expect(fn({}, ["extra", "classes"])).toEqual("color-base size-base extra classes");
    expect(
      fn(
        {
          color: "blue",
          size: "lg",
          m: "xs",
          p: "xs",
        },
        ["extra", "classes"]
      )
    ).toEqual("color-base color-blue size-base size-lg m-1 p-1 extra classes");
    expect(
      fn(
        {
          color: "blue",
          size: "lg",
          m: { base: "xs", md: "xl" },
          p: { base: "xs", md: "xl" },
        },
        ["extra", "classes"]
      )
    ).toEqual("color-base color-blue size-base size-lg m-1 md:m-5 p-1 md:p-5 extra classes");
  });
});
