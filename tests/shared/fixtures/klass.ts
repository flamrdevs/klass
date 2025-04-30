import type { KlassOptions } from "@klass/core";

type Options = KlassOptions<Record<string, Record<string, string>>>;

type Test<O extends Options> = {
	props: {
		[key in keyof O["variants"]]?: any;
	};
	equal: string;
};

const abstract = {
	variants: {
		print: {
			foo: "print-foo",
			bar: "print-bar",
			baz: "print-baz",
		},
	},
} satisfies Options;

const shared = {
	variants: {
		string: {
			one: "string-one",
			two: "string-two",
			three: "string-three",
		},
		boolean: {
			true: "boolean-true",
			false: "boolean-false",
		},
		number: {
			1: "number-1",
			2: "number-2",
			3: "number-3",
		},
	},
} satisfies Options;

export const klass = {
	abstract: {
		options: {
			variants: abstract.variants,
		} satisfies Options,
		test: [
			{
				props: {},
				equal: "",
			},
			{
				props: {
					print: "foo",
				},
				equal: "print-foo",
			},
			{ props: { print: undefined }, equal: "" },
		] satisfies Test<typeof abstract>[],
	},
	basic: {
		options: {
			variants: shared.variants,
		} satisfies Options,
		test: [
			{
				props: {},
				equal: "",
			},
			{
				props: {
					string: "one",
					boolean: false,
					number: 3,
				},
				equal: "string-one boolean-false number-3",
			},
			{ props: { string: undefined, boolean: undefined, number: undefined }, equal: "" },
		] satisfies Test<typeof shared>[],
	},
	withBase: {
		options: {
			base: "base",
			variants: shared.variants,
		} satisfies Options,
		test: [
			{
				props: {},
				equal: "base",
			},
			{
				props: {
					string: "one",
					boolean: false,
					number: 3,
				},
				equal: "base string-one boolean-false number-3",
			},
			{ props: { string: undefined, boolean: undefined, number: undefined }, equal: "base" },
		] satisfies Test<typeof shared>[],
	},
	withBaseDefaults: {
		options: {
			base: "base",
			variants: shared.variants,
			defaults: {
				string: "two" as any,
			},
		} satisfies Options,
		test: [
			{
				props: {},
				equal: "base string-two",
			},
			{
				props: {
					string: "one",
					boolean: false,
					number: 3,
				},
				equal: "base string-one boolean-false number-3",
			},
			{ props: { string: undefined, boolean: undefined, number: undefined }, equal: "base string-two" },
		] satisfies Test<typeof shared>[],
	},
	withBaseDefaultsCompounds: {
		options: {
			base: "base",
			variants: shared.variants,
			defaults: {
				string: "two" as any,
			},
			compounds: [
				[
					{
						string: "one" as any,
						boolean: true as any,
					},
					"one-true",
				],
				[
					{
						string: "one" as any,
						boolean: false as any,
					},
					"one-false",
				],
			],
		} satisfies Options,
		test: [
			{
				props: {},
				equal: "base string-two",
			},
			{
				props: {
					string: "three",
					boolean: true,
					number: 2,
				},
				equal: "base string-three boolean-true number-2",
			},
			{
				props: {
					string: "three",
					boolean: false,
					number: 2,
				},
				equal: "base string-three boolean-false number-2",
			},
			{
				props: {
					string: "one",
					boolean: true,
					number: 3,
				},
				equal: "base string-one boolean-true number-3 one-true",
			},
			{
				props: {
					string: "one",
					boolean: false,
					number: 3,
				},
				equal: "base string-one boolean-false number-3 one-false",
			},
			{ props: { string: undefined, boolean: undefined, number: undefined }, equal: "base string-two" },
		] satisfies Test<typeof shared>[],
	},
};
