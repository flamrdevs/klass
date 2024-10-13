import { describe, it } from "vitest";

import { render } from "@testing-library/react";

import group from "@klass/core/group";

import * as mono from "./../../src/mono";

import * as expects from "./../~expects";
import * as tests from "./../../../tests";

import { Switch } from "@ark-ui/react";

describe("mono", () => {
  describe("Switch", () => {
    const variant = group({
      base: {
        root: "root-base",
        control: "control-base",
        thumb: "thumb-base",
        label: "label-base",
      },
      variants: {
        color: {
          red: {
            root: "root-color-red",
            control: "control-color-red",
            thumb: "thumb-color-red",
            label: "label-color-red",
          },
          green: {
            root: "root-color-green",
            control: "control-color-green",
            thumb: "thumb-color-green",
            label: "label-color-green",
          },
          blue: {
            root: "root-color-blue",
            control: "control-color-blue",
            thumb: "thumb-color-blue",
            label: "label-color-blue",
          },
        },
      },
      defaults: {
        color: "red",
      },
    });

    const KlassedRoot = mono.klassed(Switch.Root, variant.root);
    const KlassedControl = mono.klassed(Switch.Control, variant.control);
    const KlassedThumb = mono.klassed(Switch.Thumb, variant.thumb);
    const KlassedLabel = mono.klassed(Switch.Label, variant.label);

    it("type", () => {
      expects.klassedComponent(KlassedRoot);
      expects.klassedComponent(KlassedControl);
      expects.klassedComponent(KlassedThumb);
      expects.klassedComponent(KlassedLabel);
    });

    it("equal & own polymorphic", () => {
      const { getByTestId } = render(
        <KlassedRoot {...tests.DATA_TESTID_ROOT_PROPS}>
          <KlassedControl data-testid="control">
            <KlassedThumb data-testid="thumb" />
          </KlassedControl>
          <KlassedLabel data-testid="label" asChild>
            <p>label</p>
          </KlassedLabel>
        </KlassedRoot>
      );

      tests.expects.element(getByTestId("root")).tagName("LABEL").className("root-base root-color-red");
      tests.expects.element(getByTestId("control")).tagName("SPAN").className("control-base control-color-red");
      tests.expects.element(getByTestId("thumb")).tagName("SPAN").className("thumb-base thumb-color-red");
      tests.expects.element(getByTestId("label")).tagName("P").className("label-base label-color-red");
    });
  });
});
