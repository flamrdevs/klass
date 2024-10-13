import { describe, it, expect } from "vitest";

import type { JSXOutput } from "@builder.io/qwik";

import { clsx, klass, reklass, compose } from "@klass/core";

import { composed } from "./../../src/mono";

import * as expects from "./../~expects";
import * as utils from "./../~utils";
import * as tests from "./../../../tests";

import { render } from "./../testing-library";

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
    const expect = async (ui: JSXOutput, equal: string) => {
      const { cleanup, element } = await utils.renderRoot(ui);
      tests.expects.element(element).tagName("BUTTON").className(clsx(equal, PROPS.class)).textContent("children");
      cleanup();
    };

    it("basic", async () => {
      for await (const test of shared.klass.button.basic.test) {
        await expect(
          <KlassedButtonBasic {...PROPS} {...test.props}>
            children
          </KlassedButtonBasic>,
          test.equal
        );
      }
    });

    it("base", async () => {
      for await (const test of shared.klass.button.base.test) {
        await expect(
          <KlassedButtonBase {...PROPS} {...test.props}>
            children
          </KlassedButtonBase>,
          test.equal
        );
      }
    });

    it("defaults", async () => {
      for await (const test of shared.klass.button.defaults.test) {
        await expect(
          <KlassedButtonDefaults {...PROPS} {...test.props}>
            children
          </KlassedButtonDefaults>,
          test.equal
        );
      }
    });

    it("compounds", async () => {
      for await (const test of shared.klass.button.compounds.test) {
        await expect(
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
      const expect = async (ui: JSXOutput, equal: string) => {
        const { cleanup, element } = await utils.renderRoot(ui);
        tests.expects
          .element(element)
          .tagName("BUTTON")
          .className(shared.custom.end(clsx(equal, PROPS.class)))
          .textContent("children");
        cleanup();
      };

      it("basic", async () => {
        for await (const test of shared.klass.button.basic.test) {
          await expect(
            <KlassedButtonBasicCustomEnd {...PROPS} {...test.props}>
              children
            </KlassedButtonBasicCustomEnd>,
            test.equal
          );
        }
      });

      it("base", async () => {
        for await (const test of shared.klass.button.base.test) {
          await expect(
            <KlassedButtonBaseCustomEnd {...PROPS} {...test.props}>
              children
            </KlassedButtonBaseCustomEnd>,
            test.equal
          );
        }
      });

      it("defaults", async () => {
        for await (const test of shared.klass.button.defaults.test) {
          await expect(
            <KlassedButtonDefaultsCustomEnd {...PROPS} {...test.props}>
              children
            </KlassedButtonDefaultsCustomEnd>,
            test.equal
          );
        }
      });

      it("compounds", async () => {
        for await (const test of shared.klass.button.compounds.test) {
          await expect(
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
      const attrs = async (ui: JSXOutput) => {
        const { element } = await utils.renderRoot(ui);
        expect(element.hasAttribute("type")).toBeTruthy();
        expect(element.getAttribute("type")).toEqual("button");
        expect(element.hasAttribute("color")).toBeTruthy();
        expect(element.getAttribute("color")).toEqual("blue");
        expect(element.hasAttribute("size")).toBeFalsy();
        expect(element.getAttribute("size")).toBeNull();
      };

      it("basic", async () => {
        await attrs(<KlassedButtonBasicCustomEnd {...PROPS} color="blue" />);
      });

      it("base", async () => {
        await attrs(<KlassedButtonBaseCustomEnd {...PROPS} color="blue" />);
      });

      it("defaults", async () => {
        await attrs(<KlassedButtonDefaultsCustomEnd {...PROPS} color="blue" />);
      });

      it("compounds", async () => {
        await attrs(<KlassedButtonCompoundsCustomEnd {...PROPS} color="blue" />);
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
    const expect = async (ui: JSXOutput, equal: string) => {
      const { cleanup, element } = await utils.renderRoot(ui);
      tests.expects.element(element).tagName("DIV").className(clsx(equal, PROPS.class)).textContent("children");
      cleanup();
    };

    it("basic", async () => {
      for await (const test of shared.reklass.box.basic.test) {
        await expect(
          <ReklassedBoxBasic {...PROPS} {...test.props}>
            children
          </ReklassedBoxBasic>,
          test.equal
        );
      }
    });

    it("customAs", async () => {
      for await (const test of shared.reklass.box.customAs.test) {
        await expect(
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
      const expect = async (ui: JSXOutput, equal: string) => {
        const { cleanup, element } = await utils.renderRoot(ui);
        tests.expects
          .element(element)
          .tagName("DIV")
          .className(shared.custom.end(clsx(equal, PROPS.class)))
          .textContent("children");
        cleanup();
      };

      it("basic", async () => {
        for await (const test of shared.reklass.box.basic.test) {
          await expect(
            <ReklassedBoxBasicCustomEnd {...PROPS} {...test.props}>
              children
            </ReklassedBoxBasicCustomEnd>,
            test.equal
          );
        }
      });

      it("customAs", async () => {
        for await (const test of shared.reklass.box.customAs.test) {
          await expect(
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
  const renderGetReactiveElement = async (ui: JSXOutput) => {
    const result = await render(ui);
    return { ...result, getElement: () => result.getByTestId(tests.DATA_TESTID_REACTIVE) };
  };

  it("klassed", async () => {
    const { fireEvent, getElement } = await renderGetReactiveElement(<KlassedButtonBasicReactive />);

    await utils.expectElementFireClick(
      fireEvent,
      getElement,
      (before) => before.tagName("BUTTON").className(clsx("color-red", ["extra", "classes"])),
      (after) => after.tagName("BUTTON").className(clsx("color-blue", ["extra", "classes", "reactive"]))
    );
  });

  it("klassed signal", async () => {
    const { fireEvent, getElement } = await renderGetReactiveElement(<KlassedButtonBasicSignalReactive />);

    await utils.expectElementFireClick(
      fireEvent,
      getElement,
      (before) => before.tagName("BUTTON").className(clsx("color-red", ["extra", "classes"])),
      (after) => after.tagName("BUTTON").className(clsx("color-blue", ["extra", "classes", "reactive"]))
    );
  });

  it("reklassed", async () => {
    const { fireEvent, getElement } = await renderGetReactiveElement(<ReklassedBoxBasicReactive />);

    await utils.expectElementFireClick(
      fireEvent,
      getElement,
      (before) => before.tagName("DIV").className(clsx("x-1", ["extra", "classes"])),
      (after) => after.tagName("DIV").className(clsx("x-2", ["extra", "classes", "reactive"]))
    );
  });

  it("reklassed signal", async () => {
    const { fireEvent, getElement } = await renderGetReactiveElement(<ReklassedBoxBasicSignalReactive />);

    await utils.expectElementFireClick(
      fireEvent,
      getElement,
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

  const test = async (Composed: any) => {
    const { element, cleanup } = await utils.renderRoot(<Composed {...PROPS} color="blue" size="lg" disabled />);

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

  it("works", async () => {
    const Composed = composed("div", ["compose-base", color, size, margin, padding, state], {
      dp: {
        id: "composed",
      },
      fp: ["color"],
    });

    await test(Composed);

    const fx = compose("compose-base", color, size, margin, padding, state);

    const ComposedFx = composed("div", fx, {
      dp: {
        id: "composed",
      },
      fp: ["color"],
    });

    await test(ComposedFx);
  });
});
