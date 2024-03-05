import { describe, it, expect } from "vitest";

import type { JSXOutput } from "@builder.io/qwik";

import { clsx } from "@klass/core";

import * as expects from "./../~expects";

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
} from "./~res";

const PROPS = {
  "data-testid": "root",
  class: ["extra", "classes"],
};

describe("klassed", () => {
  it("type", () => {
    expects.mono.klassedComponent(KlassedButtonBasic);
    expects.mono.klassedComponent(KlassedButtonBase);
    expects.mono.klassedComponent(KlassedButtonDefaults);
    expects.mono.klassedComponent(KlassedButtonCompounds);
  });

  describe("equal", () => {
    const expect = async (ui: JSXOutput, equal: string) => {
      const { cleanup, getByTestId } = await render(ui);
      expects.element(getByTestId("root")).tagName("BUTTON").className(clsx(equal, PROPS.class)).textContent("children");
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
      expects.mono.klassedComponent(KlassedButtonBasicCustomEnd);
      expects.mono.klassedComponent(KlassedButtonBaseCustomEnd);
      expects.mono.klassedComponent(KlassedButtonDefaultsCustomEnd);
      expects.mono.klassedComponent(KlassedButtonCompoundsCustomEnd);
    });

    describe("equal", () => {
      const expect = async (ui: JSXOutput, equal: string) => {
        const { cleanup, getByTestId } = await render(ui);
        expects
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
    expects.mono.reklassedComponent(ReklassedBoxBasic);
    expects.mono.reklassedComponent(ReklassedBoxCustomAs);
  });

  describe("equal", () => {
    const expect = async (ui: JSXOutput, equal: string) => {
      const { cleanup, getByTestId } = await render(ui);
      expects.element(getByTestId("root")).tagName("DIV").className(clsx(equal, PROPS.class)).textContent("children");
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
      expects.mono.reklassedComponent(ReklassedBoxBasicCustomEnd);
      expects.mono.reklassedComponent(ReklassedBoxCustomAsCustomEnd);
    });

    describe("equal", () => {
      const expect = async (ui: JSXOutput, equal: string) => {
        const { cleanup, getByTestId } = await render(ui);
        expects
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
