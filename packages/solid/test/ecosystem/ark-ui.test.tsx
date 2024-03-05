import { describe, it } from "vitest";

import { render } from "@solidjs/testing-library";

import group from "@klass/core/group";

import { klassed } from "./../../src/mono";

import * as expects from "./../~expects";

import { Avatar } from "@ark-ui/solid";

describe("Separator", () => {
  const variant = group({
    base: {
      root: "root-base",
      fallback: "fallback-base",
      image: "image-base",
    },
    variants: {
      color: {
        red: {
          root: "root-color-red",
          fallback: "fallback-color-red",
          image: "image-color-red",
        },
        green: {
          root: "root-color-green",
          fallback: "fallback-color-green",
          image: "image-color-green",
        },
        blue: {
          root: "root-color-blue",
          fallback: "fallback-color-blue",
          image: "image-color-blue",
        },
      },
    },
    defaults: {
      color: "red",
    },
  });

  const KlassedRoot = klassed(Avatar.Root, variant.root);
  const KlassedFallback = klassed(Avatar.Fallback, variant.fallback);
  const KlassedImage = klassed(Avatar.Image, variant.image);

  it("type", () => {
    expects.klassedComponent(KlassedRoot);
    expects.klassedComponent(KlassedFallback);
    expects.klassedComponent(KlassedImage);
  });

  it("equal", () => {
    const { getByTestId } = render(() => (
      <KlassedRoot data-testid="root">
        <KlassedFallback data-testid="fallback" />
        <KlassedImage data-testid="image" />
      </KlassedRoot>
    ));

    const root = getByTestId("root");
    const fallback = getByTestId("fallback");
    const image = getByTestId("image");

    expects.element(root).tagName("DIV").className("root-base root-color-red");
    expects.element(fallback).tagName("SPAN").className("fallback-base fallback-color-red");
    expects.element(image).tagName("IMG").className("image-base image-color-red");
  });

  it("equal - own polymorphic", () => {
    const { getByTestId } = render(() => (
      <KlassedRoot data-testid="root" as="a" color="blue" class="as">
        <KlassedFallback data-testid="fallback" color="blue" />
        <KlassedImage data-testid="image" color="blue" />
      </KlassedRoot>
    ));

    const root = getByTestId("root");
    const fallback = getByTestId("fallback");
    const image = getByTestId("image");

    expects.element(root).tagName("A").className("root-base root-color-blue as");
    expects.element(fallback).tagName("SPAN").className("fallback-base fallback-color-blue");
    expects.element(image).tagName("IMG").className("image-base image-color-blue");
  });
});
