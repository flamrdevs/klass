import { describe, it } from "vitest";

import { createKlass } from "./../../src/create";
import { createGroup } from "./../../src/group/create";

import * as shared from "./../~shared";

import { options, expectResult, expectSimplifyResult } from "./shared";

describe("group/create", () => {
  const klass = createKlass(shared.custom.endProps);
  const group = createGroup(klass);

  it("basic", () => {
    expectResult(group(options), shared.custom.end);
  });

  describe("simplify", () => {
    it("basic", () => {
      expectSimplifyResult(group(options), shared.custom.end);
    });
  });
});
