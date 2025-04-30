import type { ReklassOptions } from "@klass/core";

type Options = ReklassOptions<Record<"initial" | "sm" | "md" | "lg", string>, Record<string, Record<string, string>>>;

type Test<O extends Options> = {
	props: {
		[key in keyof O["variants"]]?: any;
	};
	equal: string;
};

const shared = {
	conditions: [
		{
			initial: "",
			sm: "sm:",
			md: "md:",
			lg: "lg:",
		},
		"initial",
	],
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

export const reklass = {
	basic: {
		options: shared satisfies Options,
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
			{
				props: {
					string: {
						initial: "one",
						sm: "two",
					},
					boolean: {
						md: false,
					},
					number: {
						lg: 3,
					},
				},
				equal: "string-one sm:string-two md:boolean-false lg:number-3",
			},
			{ props: { string: {}, boolean: {}, number: {} }, equal: "" },
			{ props: { string: undefined, boolean: undefined, number: undefined }, equal: "" },
		] satisfies Test<typeof shared>[],
	},
};
