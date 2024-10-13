import { describe, it, expect } from "vitest";

import type { ComponentChild } from "preact";

import { render, cleanup } from "@testing-library/preact";

import { clsx, klass, reklass, compose } from "@klass/core";

import { composed } from "./../../src/mono";

import * as expects from "./../~expects";
import * as utils from "./../~utils";
import * as tests from "./../../../tests";

import { shared } from "./../../../core/test/~";

import {
  KlassedButtonBasic,
  KlassedButtonBase,
  KlassedButtonDefaults,
  KlassedButtonCompounds,
  KlassedButtonBasicCustomEnd,
  KlassedButtonBaseCustomEnd,
  KlassedButtonDefaultsCustomEnd,
  KlassedButtonCompoundsCustomEnd,
  ReklassedBoxBasic,
  ReklassedBoxCustomAs,
  ReklassedBoxBasicCustomEnd,
  ReklassedBoxCustomAsCustomEnd,
  KlassedButtonBasicReactive,
  KlassedButtonBasicSignalReactive,
  ReklassedBoxBasicReactive,
  ReklassedBoxBasicSignalReactive,
} from "./~res";

const PROPS = { ...tests.DATA_TESTID_ROOT_PROPS, class: ["extra", "classes"] };

describe("klassed", () => {
  it("type", () => {
    expects.klassedComponent(KlassedButtonBasic);
    expects.klassedComponent(KlassedButtonBase);
    expects.klassedComponent(KlassedButtonDefaults);
    expects.klassedComponent(KlassedButtonCompounds);
  });

  describe("equal", () => {
    const expect = (ui: ComponentChild, equal: string) => {
      tests.expects.element(utils.renderRoot(ui)).tagName("BUTTON").className(clsx(equal, PROPS.class)).textContent("children");
      cleanup();
    };

    it("basic", () => {
      for (const test of shared.klass.button.basic.test) {
        expect(
          <KlassedButtonBasic {...PROPS} {...test.props}>
            children
          </KlassedButtonBasic>,
          test.equal
        );
      }
    });

    it("base", () => {
      for (const test of shared.klass.button.base.test) {
        expect(
          <KlassedButtonBase {...PROPS} {...test.props}>
            children
          </KlassedButtonBase>,
          test.equal
        );
      }
    });

    it("defaults", () => {
      for (const test of shared.klass.button.defaults.test) {
        expect(
          <KlassedButtonDefaults {...PROPS} {...test.props}>
            children
          </KlassedButtonDefaults>,
          test.equal
        );
      }
    });

    it("compounds", () => {
      for (const test of shared.klass.button.compounds.test) {
        expect(
          <KlassedButtonCompounds {...PROPS} {...test.props}>
            children
          </KlassedButtonCompounds>,
          test.equal
        );
      }
    });
  });

  describe("custom end", () => {
    it("type", () => {
      expects.klassedComponent(KlassedButtonBasicCustomEnd);
      expects.klassedComponent(KlassedButtonBaseCustomEnd);
      expects.klassedComponent(KlassedButtonDefaultsCustomEnd);
      expects.klassedComponent(KlassedButtonCompoundsCustomEnd);
    });

    describe("equal", () => {
      const expect = (ui: ComponentChild, equal: string) => {
        tests.expects
          .element(utils.renderRoot(ui))
          .tagName("BUTTON")
          .className(shared.custom.end(clsx(equal, PROPS.class)))
          .textContent("children");
        cleanup();
      };

      it("basic", () => {
        for (const test of shared.klass.button.basic.test) {
          expect(
            <KlassedButtonBasicCustomEnd {...PROPS} {...test.props}>
              children
            </KlassedButtonBasicCustomEnd>,
            test.equal
          );
        }
      });

      it("base", () => {
        for (const test of shared.klass.button.base.test) {
          expect(
            <KlassedButtonBaseCustomEnd {...PROPS} {...test.props}>
              children
            </KlassedButtonBaseCustomEnd>,
            test.equal
          );
        }
      });

      it("defaults", () => {
        for (const test of shared.klass.button.defaults.test) {
          expect(
            <KlassedButtonDefaultsCustomEnd {...PROPS} {...test.props}>
              children
            </KlassedButtonDefaultsCustomEnd>,
            test.equal
          );
        }
      });

      it("compounds", () => {
        for (const test of shared.klass.button.compounds.test) {
          expect(
            <KlassedButtonCompoundsCustomEnd {...PROPS} {...test.props}>
              children
            </KlassedButtonCompoundsCustomEnd>,
            test.equal
          );
        }
      });
    });
  });

  describe("attributes", () => {
    describe("custom end", () => {
      const attrs = (ui: ComponentChild) => {
        const element = utils.renderRoot(ui);
        expect(element.hasAttribute("type")).toBeTruthy();
        expect(element.getAttribute("type")).toEqual("button");
        expect(element.hasAttribute("color")).toBeTruthy();
        expect(element.getAttribute("color")).toEqual("blue");
        expect(element.hasAttribute("size")).toBeFalsy();
        expect(element.getAttribute("size")).toBeNull();
      };

      it("basic", () => {
        attrs(<KlassedButtonBasicCustomEnd {...PROPS} color="blue" />);
      });

      it("base", () => {
        attrs(<KlassedButtonBaseCustomEnd {...PROPS} color="blue" />);
      });

      it("defaults", () => {
        attrs(<KlassedButtonDefaultsCustomEnd {...PROPS} color="blue" />);
      });

      it("compounds", () => {
        attrs(<KlassedButtonCompoundsCustomEnd {...PROPS} color="blue" />);
      });
    });
  });
});

describe("reklassed", () => {
  it("type", () => {
    expects.reklassedComponent(ReklassedBoxBasic);
    expects.reklassedComponent(ReklassedBoxCustomAs);
  });

  describe("equal", () => {
    const expect = (ui: ComponentChild, equal: string) => {
      tests.expects.element(utils.renderRoot(ui)).tagName("DIV").className(clsx(equal, PROPS.class)).textContent("children");
      cleanup();
    };

    it("basic", () => {
      for (const test of shared.reklass.box.basic.test) {
        expect(
          <ReklassedBoxBasic {...PROPS} {...test.props}>
            children
          </ReklassedBoxBasic>,
          test.equal
        );
      }
    });

    it("customAs", () => {
      for (const test of shared.reklass.box.customAs.test) {
        expect(
          <ReklassedBoxCustomAs {...PROPS} {...test.props}>
            children
          </ReklassedBoxCustomAs>,
          test.equal
        );
      }
    });
  });

  describe("custom end", () => {
    it("type", () => {
      expects.reklassedComponent(ReklassedBoxBasicCustomEnd);
      expects.reklassedComponent(ReklassedBoxCustomAsCustomEnd);
    });

    describe("equal", () => {
      const expect = (ui: ComponentChild, equal: string) => {
        tests.expects
          .element(utils.renderRoot(ui))
          .tagName("DIV")
          .className(shared.custom.end(clsx(equal, PROPS.class)))
          .textContent("children");
        cleanup();
      };

      it("basic", () => {
        for (const test of shared.reklass.box.basic.test) {
          expect(
            <ReklassedBoxBasicCustomEnd {...PROPS} {...test.props}>
              children
            </ReklassedBoxBasicCustomEnd>,
            test.equal
          );
        }
      });

      it("customAs", () => {
        for (const test of shared.reklass.box.customAs.test) {
          expect(
            <ReklassedBoxCustomAsCustomEnd {...PROPS} {...test.props}>
              children
            </ReklassedBoxCustomAsCustomEnd>,
            test.equal
          );
        }
      });
    });
  });
});

describe("reactive", () => {
  const renderGetReactiveElement = (ui: ComponentChild) => {
    const { getByTestId } = render(ui);
    return () => getByTestId(tests.DATA_TESTID_REACTIVE);
  };

  it("klassed", () => {
    utils.expectElementFireClick(
      renderGetReactiveElement(<KlassedButtonBasicReactive />),
      (before) => before.tagName("BUTTON").className(clsx("color-red", ["extra", "classes"])),
      (after) => after.tagName("BUTTON").className(clsx("color-blue", ["extra", "classes", "reactive"]))
    );
  });

  it("klassed signal", () => {
    utils.expectElementFireClick(
      renderGetReactiveElement(<KlassedButtonBasicSignalReactive />),
      (before) => before.tagName("BUTTON").className(clsx("color-red", ["extra", "classes"])),
      (after) => after.tagName("BUTTON").className(clsx("color-blue", ["extra", "classes", "reactive"]))
    );
  });

  it("reklassed", () => {
    utils.expectElementFireClick(
      renderGetReactiveElement(<ReklassedBoxBasicReactive />),
      (before) => before.tagName("DIV").className(clsx("x-1", ["extra", "classes"])),
      (after) => after.tagName("DIV").className(clsx("x-2", ["extra", "classes", "reactive"]))
    );
  });

  it("reklassed signal", () => {
    utils.expectElementFireClick(
      renderGetReactiveElement(<ReklassedBoxBasicSignalReactive />),
      (before) => before.tagName("DIV").className(clsx("x-1", ["extra", "classes"])),
      (after) => after.tagName("DIV").className(clsx("x-2", ["extra", "classes", "reactive"]))
    );
  });
});

describe("composed", () => {
  const color = klass(shared.compose.klass.color.options);
  const size = klass(shared.compose.klass.size.options);
  const margin = reklass(shared.compose.reklass.margin.options);
  const padding = reklass(shared.compose.reklass.padding.options);
  const state = compose(klass(shared.compose.klass.disabled.options));

  const test = (Composed: any) => {
    const element = utils.renderRoot(<Composed {...PROPS} color="blue" size="lg" disabled />);

    tests.expects
      .element(element)
      .tagName("DIV")
      .className(clsx("compose-base color-base color-blue size-base size-lg disabled-true", ["extra", "classes"]));

    expect(element.hasAttribute("id")).toBeTruthy();
    expect(element.getAttribute("id")).toEqual("composed");
    expect(element.hasAttribute("color")).toBeTruthy();
    expect(element.getAttribute("color")).toEqual("blue");

    cleanup();
  };

  it("works", () => {
    const Composed = composed("div", ["compose-base", color, size, margin, padding, state], {
      dp: {
        id: "composed",
      },
      fp: ["color"],
    });

    test(Composed);

    const fx = compose("compose-base", color, size, margin, padding, state);

    const ComposedFx = composed("div", fx, {
      dp: {
        id: "composed",
      },
      fp: ["color"],
    });

    test(ComposedFx);
  });
});
