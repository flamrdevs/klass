import { describe, it, expect } from "vitest";

import { getVariantKeys, splitRestProps } from "./../src/utils";

describe("getVariantKeys", () => {
  it("equals", () => {
    expect(getVariantKeys(["foo", "bar"])).toEqual(["foo", "bar"]);
    expect(getVariantKeys(["foo", "bar", "className", "baz"])).toEqual(["foo", "bar", "baz"]);
  });
});

describe("splitRestProps", () => {
  it("keys", () => {
    const { o, p } = splitRestProps({ foo: "foo", bar: "bar", baz: "baz" }, ["foo"]);

    expect(o).toEqual({ bar: "bar", baz: "baz" });
    expect(p).toEqual({ foo: "foo" });
  });

  it("keys + fkeys", () => {
    const { o, p } = splitRestProps({ foo: "foo", bar: "bar", baz: "baz" }, ["foo"], ["foo"]);

    expect(o).toEqual({ foo: "foo", bar: "bar", baz: "baz" });
    expect(p).toEqual({ foo: "foo" });
  });
});
