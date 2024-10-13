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
    expect(clsx(classesProps({ class: "p-class", classList: { "p-class-list": true } }))).toEqual("p-class p-class-list");
    expect(clsx(classesProps({ class: "p-class" }, undefined, { "d-class-list": true }))).toEqual("p-class d-class-list");
    expect(clsx(classesProps({ classList: { "p-class-list": true } }, "d-class", undefined))).toEqual("p-class-list d-class");
  });
});
