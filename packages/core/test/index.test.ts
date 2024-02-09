import { describe, it, expect } from "vitest";

import { variant, klass, revariant, reklass } from "./../src/index.ts";

import * as shared from "./shared.ts";
import * as expects from "./expects.ts";

describe("variant", () => {
  describe("string", () => {
    it("basic", () => {
      const fn = variant({
        foo: "foo",
        bar: "bar",
        baz: "baz",
      });

      expect(fn()).toBeUndefined();
      expect(fn("bar")).toEqual("bar");
      expect(fn("unknown" as any)).toBeUndefined();
    });

    it("with default", () => {
      const fn = variant(
        {
          foo: "foo",
          bar: "bar",
          baz: "baz",
        },
        "foo"
      );

      expect(fn()).toEqual("foo");
      expect(fn("bar")).toEqual("bar");
      expect(fn("unknown" as any)).toBeUndefined();
    });
  });

  describe("number", () => {
    it("basic", () => {
      const fn = variant({
        0: "zero",
        1: "one",
        2: "two",
      });

      expect(fn()).toBeUndefined();
      expect(fn(1)).toEqual("one");
      expect(fn(-1 as any)).toBeUndefined();
    });

    it("with default", () => {
      const fn = variant(
        {
          0: "zero",
          1: "one",
          2: "two",
        },
        0
      );

      expect(fn()).toEqual("zero");
      expect(fn(1)).toEqual("one");
      expect(fn(-1 as any)).toBeUndefined();
    });
  });

  describe("boolean", () => {
    it("basic", () => {
      const fn = variant({
        true: "true",
        false: "false",
      });

      expect(fn()).toBeUndefined();
      expect(fn(false)).toEqual("false");
    });

    it("with default", () => {
      const fn = variant(
        {
          true: "true",
          false: "false",
        },
        true
      );

      expect(fn()).toEqual("true");
      expect(fn(false)).toEqual("false");
    });
  });
});

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

  describe("custom end", () => {
    const klass_button_basic = klass(shared.klass.button.basic.options, { end: shared.customEnd });
    const klass_button_base = klass(shared.klass.button.base.options, { end: shared.customEnd });
    const klass_button_defaults = klass(shared.klass.button.defaults.options, { end: shared.customEnd });
    const klass_button_compounds = klass(shared.klass.button.compounds.options, { end: shared.customEnd });

    it("type", () => {
      expects.klassFn(klass_button_basic);
      expects.klassFn(klass_button_base);
      expects.klassFn(klass_button_defaults);
      expects.klassFn(klass_button_compounds);
    });

    describe("equal", () => {
      it("basic", () => {
        for (const test of shared.klass.button.basic.test) expect(klass_button_basic(test.props)).toEqual(shared.customEnd(test.equal));
      });

      it("base", () => {
        for (const test of shared.klass.button.base.test) expect(klass_button_base(test.props)).toEqual(shared.customEnd(test.equal));
      });

      it("defaults", () => {
        for (const test of shared.klass.button.defaults.test) expect(klass_button_defaults(test.props)).toEqual(shared.customEnd(test.equal));
      });

      it("compounds", () => {
        for (const test of shared.klass.button.compounds.test) expect(klass_button_compounds(test.props)).toEqual(shared.customEnd(test.equal));
      });
    });
  });
});

describe("revariant", () => {
  describe("string", () => {
    it("basic", () => {
      const fn = revariant(
        {
          base: "",
          sm: "sm:",
          md: "md:",
          lg: "lg:",
        },
        "base",
        {
          foo: "foo",
          bar: "bar",
          baz: "baz",
        }
      );

      expect(fn()).toBeUndefined();
      expect(fn("bar")).toEqual("bar");
      expect(fn({ base: "foo", md: "bar" })).toEqual("foo md:bar");
      expect(fn("unknown" as any)).toBeUndefined();
    });
  });

  describe("number", () => {
    it("basic", () => {
      const fn = revariant(
        {
          base: "",
          sm: "sm:",
          md: "md:",
          lg: "lg:",
        },
        "base",
        {
          0: "zero",
          1: "one",
          2: "two",
        }
      );

      expect(fn()).toBeUndefined();
      expect(fn(1)).toEqual("one");
      expect(fn({ base: 0, md: 1 })).toEqual("zero md:one");
      expect(fn(-1 as any)).toBeUndefined();
    });
  });

  describe("boolean", () => {
    it("basic", () => {
      const fn = revariant(
        {
          base: "",
          sm: "sm:",
          md: "md:",
          lg: "lg:",
        },
        "base",
        {
          true: "true",
          false: "false",
        }
      );

      expect(fn()).toBeUndefined();
      expect(fn(false)).toEqual("false");
      expect(fn({ base: true, md: false })).toEqual("true md:false");
    });
  });
});

describe("reklass", () => {
  const reklass_box_basic = reklass(shared.reklass.box.basic.options);
  const reklass_box_customAs = reklass(shared.reklass.box.customAs.options, { as: shared.customAs });

  it("type", () => {
    expects.reklassFn(reklass_box_basic);
    expects.reklassFn(reklass_box_customAs);
  });

  describe("equal", () => {
    it("basic", () => {
      for (const test of shared.reklass.box.basic.test) expect(reklass_box_basic(test.props)).toEqual(test.equal);
    });

    it("customAs", () => {
      for (const test of shared.reklass.box.customAs.test) expect(reklass_box_customAs(test.props)).toEqual(test.equal);
    });
  });

  describe("custom end", () => {
    const reklass_box_basic = reklass(shared.reklass.box.basic.options, { end: shared.customEnd });
    const reklass_box_customAs = reklass(shared.reklass.box.customAs.options, { end: shared.customEnd, as: shared.customAs });

    it("type", () => {
      expects.reklassFn(reklass_box_basic);
      expects.reklassFn(reklass_box_customAs);
    });

    describe("equal", () => {
      it("basic", () => {
        for (const test of shared.reklass.box.basic.test) expect(reklass_box_basic(test.props)).toEqual(shared.customEnd(test.equal));
      });

      it("customAs", () => {
        for (const test of shared.reklass.box.customAs.test) expect(reklass_box_customAs(test.props)).toEqual(shared.customEnd(test.equal));
      });
    });
  });
});
