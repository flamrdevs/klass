import { describe, it } from "vitest";

import { createKlass } from "./../../src/create";
import { createGroup } from "./../../src/group/create";
import { createSlots } from "./../../src/slots/create";

import * as shared from "./../~shared";

import { options, expectResult } from "./shared";

describe("slots/create", () => {
  const klass = createKlass(shared.custom.endProps);
  const group = createGroup(klass);
  const slots = createSlots(group);

  it("basic", () => {
    expectResult(slots(options), shared.custom.end);
  });
});
