import { describe, it } from "vitest";

import type { ButtonHTMLAttributes } from "react";

import { render } from "@testing-library/react";

import group from "@klass/core/group";

import * as mono from "./../../src/mono";

import * as expects from "./../~expects";
import * as utils from "./../~utils";
import * as tests from "./../../../tests";

import { Separator } from "@radix-ui/react-separator";
import * as Switch from "@radix-ui/react-switch";
import { Slot } from "@radix-ui/react-slot";

describe("mono", () => {
  describe("Separator", () => {
    const Klassed = mono.klassed(Separator, {
      base: "base",
      variants: {
        color: {
          red: "color-red",
          green: "color-green",
          blue: "color-blue",
        },
      },
      defaults: {
        color: "red",
      },
    });

    it("type", () => {
      expects.klassedComponent(Klassed);
    });

    it("equal", () => {
      utils
        .expectElementRoot(<Klassed {...tests.DATA_TESTID_ROOT_PROPS} />)
        .tagName("DIV")
        .className("base color-red");
    });

    it("equal - own polymorphic", () => {
      utils
        .expectElementRoot(
          <Klassed asChild {...tests.DATA_TESTID_ROOT_PROPS} color="blue">
            <span className="as-child"></span>
          </Klassed>
        )
        .tagName("SPAN")
        .className("base color-blue as-child");
    });
  });

  describe("Switch", () => {
    const variant = group({
      base: {
        root: "root-base",
        thumb: "thumb-base",
      },
      variants: {
        color: {
          red: {
            root: "root-color-red",
            thumb: "thumb-color-red",
          },
          green: {
            root: "root-color-green",
            thumb: "thumb-color-green",
          },
          blue: {
            root: "root-color-blue",
            thumb: "thumb-color-blue",
          },
        },
      },
      defaults: {
        color: "red",
      },
    });

    const KlassedRoot = mono.klassed(Switch.Root, variant.root);
    const KlassedThumb = mono.klassed(Switch.Thumb, variant.thumb);

    it("type", () => {
      expects.klassedComponent(KlassedRoot);
      expects.klassedComponent(KlassedThumb);
    });

    it("equal & own polymorphic", () => {
      const { getByTestId } = render(
        <KlassedRoot {...tests.DATA_TESTID_ROOT_PROPS}>
          <KlassedThumb data-testid="thumb" asChild>
            <div />
          </KlassedThumb>
        </KlassedRoot>
      );

      tests.expects.element(getByTestId("root")).tagName("BUTTON").className("root-base root-color-red");
      tests.expects.element(getByTestId("thumb")).tagName("DIV").className("thumb-base thumb-color-red");
    });
  });

  describe("Slot", () => {
    const Component = ({ asChild, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean }) => {
      const Element = asChild ? Slot : "button";
      return <Element {...(props as any)} />;
    };

    const Klassed = mono.klassed(Component, {
      base: "base",
      variants: {
        color: {
          red: "color-red",
          green: "color-green",
          blue: "color-blue",
        },
      },
      defaults: {
        color: "red",
      },
    });

    it("type", () => {
      expects.klassedComponent(Klassed);
    });

    it("equal", () => {
      utils
        .expectElementRoot(<Klassed {...tests.DATA_TESTID_ROOT_PROPS} />)
        .tagName("BUTTON")
        .className("base color-red");
    });

    it("equal - own polymorphic", () => {
      utils
        .expectElementRoot(
          <Klassed asChild {...tests.DATA_TESTID_ROOT_PROPS} color="blue">
            <a className="as-child"></a>
          </Klassed>
        )
        .tagName("A")
        .className("base color-blue as-child");
    });
  });
});
