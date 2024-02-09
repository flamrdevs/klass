import { describe, it } from "vitest";

import type { JSX } from "solid-js";

import { render, cleanup, fireEvent } from "@solidjs/testing-library";

import { clsx } from "@klass/core";

import * as expects from "./expects.ts";

import { shared } from "./../../core/test/exports.ts";

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
} from "./index.test.utils.tsx";

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
      expects.element(render(ui).getByTestId("root")).tagName("BUTTON").className(clsx(equal, PROPS.class)).textContent("children");
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
        expects
          .element(render(ui).getByTestId("root"))
          .tagName("BUTTON")
          .className(shared.customEnd(clsx(equal, PROPS.class)))
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
});

describe("reklassed", () => {
  it("type", () => {
    expects.reklassedComponent(ReklassedBoxBasic);
    expects.reklassedComponent(ReklassedBoxCustomAs);
  });

  describe("equal", () => {
    const expect = (ui: () => JSX.Element, equal: string) => {
      expects.element(render(ui).getByTestId("root")).tagName("DIV").className(clsx(equal, PROPS.class)).textContent("children");
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
        expects
          .element(render(ui).getByTestId("root"))
          .tagName("DIV")
          .className(shared.customEnd(clsx(equal, PROPS.class)))
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

    expects
      .element(element)
      .tagName("BUTTON")
      .className(clsx("color-red", ["extra", "classes"]));

    fireEvent.click(element);

    expects
      .element((element = getByTestId("reactive")))
      .tagName("A")
      .className(clsx("color-blue", ["extra", "classes", "reactive"]));
  });

  it("reklassed", () => {
    const { getByTestId } = render(() => <ReklassedBoxBasicReactive />);

    let element = getByTestId("reactive");

    expects
      .element(element)
      .tagName("BUTTON")
      .className(clsx("x-1", ["extra", "classes"]));

    fireEvent.click(element);

    expects
      .element((element = getByTestId("reactive")))
      .tagName("A")
      .className(clsx("x-2", ["extra", "classes", "reactive"]));
  });
});
