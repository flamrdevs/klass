import { describe, it, expect } from "vitest";

import type { JSX } from "solid-js";

import { render, cleanup, fireEvent } from "@solidjs/testing-library";

import { clsx, klass, reklass, compose } from "@klass/core";

import { composed } from "./../../src/mono";

import * as expects from "./../~expects";
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
  ReklassedBoxBasicReactive,
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
    const expect = (ui: () => JSX.Element, equal: string) => {
      tests.expects.element(render(ui).getByTestId("root")).tagName("BUTTON").className(clsx(equal, PROPS.class)).textContent("children");
      cleanup();
    };

    it("basic", () => {
      for (const test of shared.klass.button.basic.test) {
        expect(
          () => (
            <KlassedButtonBasic data-testid="root" {...test.props} class={["extra", "classes"]}>
              children
            </KlassedButtonBasic>
          ),
          test.equal
        );
      }
    });

    it("base", () => {
      for (const test of shared.klass.button.base.test) {
        expect(
          () => (
            <KlassedButtonBase data-testid="root" {...test.props} class={["extra", "classes"]}>
              children
            </KlassedButtonBase>
          ),
          test.equal
        );
      }
    });

    it("defaults", () => {
      for (const test of shared.klass.button.defaults.test) {
        expect(
          () => (
            <KlassedButtonDefaults data-testid="root" {...test.props} class={["extra", "classes"]}>
              children
            </KlassedButtonDefaults>
          ),
          test.equal
        );
      }
    });

    it("compounds", () => {
      for (const test of shared.klass.button.compounds.test) {
        expect(
          () => (
            <KlassedButtonCompounds data-testid="root" {...test.props} class={["extra", "classes"]}>
              children
            </KlassedButtonCompounds>
          ),
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
      const expect = (ui: () => JSX.Element, equal: string) => {
        tests.expects
          .element(render(ui).getByTestId("root"))
          .tagName("BUTTON")
          .className(shared.custom.end(clsx(equal, PROPS.class)))
          .textContent("children");
        cleanup();
      };

      it("basic", () => {
        for (const test of shared.klass.button.basic.test) {
          expect(
            () => (
              <KlassedButtonBasicCustomEnd data-testid="root" {...test.props} class={["extra", "classes"]}>
                children
              </KlassedButtonBasicCustomEnd>
            ),
            test.equal
          );
        }
      });

      it("base", () => {
        for (const test of shared.klass.button.base.test) {
          expect(
            () => (
              <KlassedButtonBaseCustomEnd data-testid="root" {...test.props} class={["extra", "classes"]}>
                children
              </KlassedButtonBaseCustomEnd>
            ),
            test.equal
          );
        }
      });

      it("defaults", () => {
        for (const test of shared.klass.button.defaults.test) {
          expect(
            () => (
              <KlassedButtonDefaultsCustomEnd data-testid="root" {...test.props} class={["extra", "classes"]}>
                children
              </KlassedButtonDefaultsCustomEnd>
            ),
            test.equal
          );
        }
      });

      it("compounds", () => {
        for (const test of shared.klass.button.compounds.test) {
          expect(
            () => (
              <KlassedButtonCompoundsCustomEnd data-testid="root" {...test.props} class={["extra", "classes"]}>
                children
              </KlassedButtonCompoundsCustomEnd>
            ),
            test.equal
          );
        }
      });
    });
  });

  describe("attributes", () => {
    describe("custom end", () => {
      const attrs = (ui: () => JSX.Element) => {
        const element = render(ui).getByTestId("root");
        expect(element.hasAttribute("type")).toBeTruthy();
        expect(element.getAttribute("type")).toEqual("button");
        expect(element.hasAttribute("color")).toBeTruthy();
        expect(element.getAttribute("color")).toEqual("blue");
        expect(element.hasAttribute("size")).toBeFalsy();
        expect(element.getAttribute("size")).toBeNull();
      };

      it("basic", () => {
        attrs(() => <KlassedButtonBasicCustomEnd data-testid="root" color="blue" />);
      });

      it("base", () => {
        attrs(() => <KlassedButtonBaseCustomEnd data-testid="root" color="blue" />);
      });

      it("defaults", () => {
        attrs(() => <KlassedButtonDefaultsCustomEnd data-testid="root" color="blue" />);
      });

      it("compounds", () => {
        attrs(() => <KlassedButtonCompoundsCustomEnd data-testid="root" color="blue" />);
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
    const expect = (ui: () => JSX.Element, equal: string) => {
      tests.expects.element(render(ui).getByTestId("root")).tagName("DIV").className(clsx(equal, PROPS.class)).textContent("children");
      cleanup();
    };

    it("basic", () => {
      for (const test of shared.reklass.box.basic.test) {
        expect(
          () => (
            <ReklassedBoxBasic data-testid="root" {...test.props} class={["extra", "classes"]}>
              children
            </ReklassedBoxBasic>
          ),
          test.equal
        );
      }
    });

    it("customAs", () => {
      for (const test of shared.reklass.box.customAs.test) {
        expect(
          () => (
            <ReklassedBoxCustomAs data-testid="root" {...test.props} class={["extra", "classes"]}>
              children
            </ReklassedBoxCustomAs>
          ),
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
      const expect = (ui: () => JSX.Element, equal: string) => {
        tests.expects
          .element(render(ui).getByTestId("root"))
          .tagName("DIV")
          .className(shared.custom.end(clsx(equal, PROPS.class)))
          .textContent("children");
        cleanup();
      };

      it("basic", () => {
        for (const test of shared.reklass.box.basic.test) {
          expect(
            () => (
              <ReklassedBoxBasicCustomEnd data-testid="root" {...test.props} class={["extra", "classes"]}>
                children
              </ReklassedBoxBasicCustomEnd>
            ),
            test.equal
          );
        }
      });

      it("customAs", () => {
        for (const test of shared.reklass.box.customAs.test) {
          expect(
            () => (
              <ReklassedBoxCustomAsCustomEnd data-testid="root" {...test.props} class={["extra", "classes"]}>
                children
              </ReklassedBoxCustomAsCustomEnd>
            ),
            test.equal
          );
        }
      });
    });
  });
});

describe("reactive", () => {
  it("klassed", () => {
    const { getByTestId } = render(() => <KlassedButtonBasicReactive />);

    let element = getByTestId("reactive");

    tests.expects
      .element(element)
      .tagName("BUTTON")
      .className(clsx("color-red", ["extra", "classes"]));

    fireEvent.click(element);

    tests.expects
      .element((element = getByTestId("reactive")))
      .tagName("BUTTON")
      .className(clsx("color-blue", ["extra", "classes", "reactive"]));
  });

  it("reklassed", () => {
    const { getByTestId } = render(() => <ReklassedBoxBasicReactive />);

    let element = getByTestId("reactive");

    tests.expects
      .element(element)
      .tagName("DIV")
      .className(clsx("x-1", ["extra", "classes"]));

    fireEvent.click(element);

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

  const test = (Composed: any) => {
    const { getByTestId } = render(() => <Composed {...PROPS} color="blue" size="lg" disabled />);

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
