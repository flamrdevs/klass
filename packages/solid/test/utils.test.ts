import { describe, it, expect } from "vitest";

import { clsx } from "@klass/core";

import { getVariantKeys, classesProps } from "./../src/utils";

describe("getVariantKeys", () => {
  it("equals", () => {
    expect(getVariantKeys(["foo", "bar"])).toEqual(["foo", "bar"]);
    expect(getVariantKeys(["foo", "bar", "class", "baz", "classList"])).toEqual(["foo", "bar", "baz"]);
  });
});

describe("classesProps", () => {
  it("equals", () => {
    expect(clsx(classesProps({ class: "props-class" }))).toEqual("props-class");
    expect(
      clsx(
        classesProps(
          {
            classList: {
              "props-class-list": true,
            },
          },
          "default-class"
        )
      )
    ).toEqual("default-class props-class-list");
  });
});
