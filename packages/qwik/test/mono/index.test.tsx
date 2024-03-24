import { describe, it, expect } from "vitest";

import type { JSXOutput } from "@builder.io/qwik";

import { clsx, klass, reklass, compose } from "@klass/core";

import { composed } from "./../../src/mono";

import * as expects from "./../~expects";
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

const PROPS = {
  "data-testid": "root",
  class: ["extra", "classes"],
};

describe("klassed", () => {
  it("type", () => {
    expects.klassedComponent(KlassedButtonBasic);
    expects.klassedComponent(KlassedButtonBase);
    expects.klassedComponent(KlassedButtonDefaults);
    expects.klassedComponent(KlassedButtonCompounds);
  });

  describe("equal", () => {
    const expect = async (ui: JSXOutput, equal: string) => {
      const { cleanup, getByTestId } = await render(ui);
      tests.expects.element(getByTestId("root")).tagName("BUTTON").className(clsx(equal, PROPS.class)).textContent("children");
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
        const { cleanup, getByTestId } = await render(ui);
        tests.expects
          .element(getByTestId("root"))
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
        const element = (await render(ui)).getByTestId("root");
        expect(element.hasAttribute("type")).toBeTruthy();
        expect(element.getAttribute("type")).toEqual("button");
        expect(element.hasAttribute("color")).toBeTruthy();
        expect(element.getAttribute("color")).toEqual("blue");
        expect(element.hasAttribute("size")).toBeFalsy();
        expect(element.getAttribute("size")).toBeNull();
      };

      it("basic", async () => {
        await attrs(<KlassedButtonBasicCustomEnd data-testid="root" color="blue" />);
      });

      it("base", async () => {
        await attrs(<KlassedButtonBaseCustomEnd data-testid="root" color="blue" />);
      });

      it("defaults", async () => {
        await attrs(<KlassedButtonDefaultsCustomEnd data-testid="root" color="blue" />);
      });

      it("compounds", async () => {
        await attrs(<KlassedButtonCompoundsCustomEnd data-testid="root" color="blue" />);
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
      const { cleanup, getByTestId } = await render(ui);
      tests.expects.element(getByTestId("root")).tagName("DIV").className(clsx(equal, PROPS.class)).textContent("children");
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
        const { cleanup, getByTestId } = await render(ui);
        tests.expects
          .element(getByTestId("root"))
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
  it("klassed", async () => {
    const { getByTestId, fireEvent } = await render(<KlassedButtonBasicReactive />);

    let element = getByTestId("reactive");

    tests.expects
      .element(element)
      .tagName("BUTTON")
      .className(clsx("color-red", ["extra", "classes"]));

    await fireEvent.click(element);

    tests.expects
      .element((element = getByTestId("reactive")))
      .tagName("BUTTON")
      .className(clsx("color-blue", ["extra", "classes", "reactive"]));
  });

  it("klassed signal", async () => {
    const { getByTestId, fireEvent } = await render(<KlassedButtonBasicSignalReactive />);

    let element = getByTestId("reactive");

    tests.expects
      .element(element)
      .tagName("BUTTON")
      .className(clsx("color-red", ["extra", "classes"]));

    await fireEvent.click(element);

    tests.expects
      .element((element = getByTestId("reactive")))
      .tagName("BUTTON")
      .className(clsx("color-blue", ["extra", "classes", "reactive"]));
  });

  it("reklassed", async () => {
    const { getByTestId, fireEvent } = await render(<ReklassedBoxBasicReactive />);

    let element = getByTestId("reactive");

    tests.expects
      .element(element)
      .tagName("DIV")
      .className(clsx("x-1", ["extra", "classes"]));

    await fireEvent.click(element);

    tests.expects
      .element((element = getByTestId("reactive")))
      .tagName("DIV")
      .className(clsx("x-2", ["extra", "classes", "reactive"]));
  });

  it("reklassed signal", async () => {
    const { getByTestId, fireEvent } = await render(<ReklassedBoxBasicSignalReactive />);

    let element = getByTestId("reactive");

    tests.expects
      .element(element)
      .tagName("DIV")
      .className(clsx("x-1", ["extra", "classes"]));

    await fireEvent.click(element);

    tests.expects
      .element((element = getByTestId("reactive")))
      .tagName("DIV")
      .className(clsx("x-2", ["extra", "classes", "reactive"]));
  });
});

describe("composed", () => {
  const color = klass(shared.compose.klass.color.options);
  const size = klass(shared.compose.klass.size.options);
  const margin = reklass(shared.compose.reklass.margin.options);
  const padding = reklass(shared.compose.reklass.padding.options);
  const state = compose(klass(shared.compose.klass.disabled.options));

  const test = async (Composed: any) => {
    const { getByTestId, cleanup } = await render(<Composed {...PROPS} color="blue" size="lg" disabled />);

    let element = getByTestId("root");

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
