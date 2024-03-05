import { describe, it, expect } from "vitest";

import type { ReactElement } from "react";

import { render, cleanup } from "@testing-library/react";

import { clsx } from "@klass/core";

import * as expects from "./../~expects";

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
} from "./~res";

const PROPS = {
  "data-testid": "root",
  className: ["extra", "classes"],
};

describe("klassed", () => {
  it("type", () => {
    expects.mono.klassedComponent(KlassedButtonBasic);
    expects.mono.klassedComponent(KlassedButtonBase);
    expects.mono.klassedComponent(KlassedButtonDefaults);
    expects.mono.klassedComponent(KlassedButtonCompounds);
  });

  describe("equal", () => {
    const expect = (ui: ReactElement, equal: string) => {
      expects.element(render(ui).getByTestId("root")).tagName("BUTTON").className(clsx(equal, PROPS.className)).textContent("children");
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
      expects.mono.klassedComponent(KlassedButtonBasicCustomEnd);
      expects.mono.klassedComponent(KlassedButtonBaseCustomEnd);
      expects.mono.klassedComponent(KlassedButtonDefaultsCustomEnd);
      expects.mono.klassedComponent(KlassedButtonCompoundsCustomEnd);
    });

    describe("equal", () => {
      const expect = (ui: ReactElement, equal: string) => {
        expects
          .element(render(ui).getByTestId("root"))
          .tagName("BUTTON")
          .className(shared.custom.end(clsx(equal, PROPS.className)))
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
      const attrs = (ui: ReactElement) => {
        const element = render(ui).getByTestId("root");
        expect(element.hasAttribute("type")).toBeTruthy();
        expect(element.getAttribute("type")).toEqual("button");
        expect(element.hasAttribute("color")).toBeTruthy();
        expect(element.getAttribute("color")).toEqual("blue");
        expect(element.hasAttribute("size")).toBeFalsy();
        expect(element.getAttribute("size")).toBeNull();
      };

      it("basic", () => {
        attrs(<KlassedButtonBasicCustomEnd data-testid="root" color="blue" />);
      });

      it("base", () => {
        attrs(<KlassedButtonBaseCustomEnd data-testid="root" color="blue" />);
      });

      it("defaults", () => {
        attrs(<KlassedButtonDefaultsCustomEnd data-testid="root" color="blue" />);
      });

      it("compounds", () => {
        attrs(<KlassedButtonCompoundsCustomEnd data-testid="root" color="blue" />);
      });
    });
  });
});

describe("reklassed", () => {
  it("type", () => {
    expects.mono.reklassedComponent(ReklassedBoxBasic);
    expects.mono.reklassedComponent(ReklassedBoxCustomAs);
  });

  describe("equal", () => {
    const expect = (ui: ReactElement, equal: string) => {
      expects.element(render(ui).getByTestId("root")).tagName("DIV").className(clsx(equal, PROPS.className)).textContent("children");
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
      expects.mono.reklassedComponent(ReklassedBoxBasicCustomEnd);
      expects.mono.reklassedComponent(ReklassedBoxCustomAsCustomEnd);
    });

    describe("equal", () => {
      const expect = (ui: ReactElement, equal: string) => {
        expects
          .element(render(ui).getByTestId("root"))
          .tagName("DIV")
          .className(shared.custom.end(clsx(equal, PROPS.className)))
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
