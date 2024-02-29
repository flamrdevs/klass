import { describe, it, expect } from "vitest";

import group, { simplify } from "./../../src/group";

import * as shared from "./../shared";

import { options, expectResult, expectSimplifyResult } from "./shared";

describe("group", () => {
  it("basic", () => {
    expectResult(group(options));
  });

  it("custom end", () => {
    expectResult(group(options, { end: shared.customEnd }), shared.customEnd);
  });

  describe("simplify", () => {
    it("basic", () => {
      expectSimplifyResult(group(options));
    });

    it("custom end", () => {
      expectSimplifyResult(group(options, { end: shared.customEnd }), shared.customEnd);
    });
  });
});

describe("simplify", () => {
  it("simplified", () => {
    const fn = simplify(
      group({
        base: {
          parent: "parent-base",
          child: "child-base",
        },
        variants: {
          text: {
            foo: {
              parent: "parent-text-foo",
              child: "child-text-foo",
            },
            bar: {
              parent: "parent-text-bar",
              child: "child-text-bar",
            },
          },
        },
        defaults: {
          text: "foo",
        },
      })
    );

    expect(fn()).toEqual({
      parent: "parent-base parent-text-foo",
      child: "child-base child-text-foo",
    });

    expect(fn({ text: "bar" })).toEqual({
      parent: "parent-base parent-text-bar",
      child: "child-base child-text-bar",
    });
  });
});
