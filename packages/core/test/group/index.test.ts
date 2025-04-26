import { describe, expect, it } from "vitest";

import group, { simplify } from "./../../src/group";

import { expectResult, expectSimplifyResult, options } from "./shared";

describe("group", () => {
	it("basic", () => {
		expectResult(group(options));
	});

	describe("simplify", () => {
		it("basic", () => {
			expectSimplifyResult(group(options));
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
