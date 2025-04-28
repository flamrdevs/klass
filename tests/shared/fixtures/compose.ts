import { klass, reklass } from "@klass/core";
import type { KlassOptions, ReklassOptions } from "@klass/core";

type Options = KlassOptions<Record<string, Record<string, string>>> | ReklassOptions<Record<"initial" | "sm" | "md" | "lg", string>, Record<string, Record<string, string>>>;

type Test<O extends Options> = {
	props: {
		[key in keyof O["variants"]]?: any;
	};
	equal: string;
};

const options = {
	color: {
		variants: {
			color: {
				red: "color-red",
				green: "color-green",
				blue: "color-blue",
			},
		},
		defaults: {
			color: "red" as any,
		},
	} satisfies Options,
	disabled: {
		variants: {
			disabled: {
				true: "disabled-true",
				false: "disabled-false",
			},
		},
	} satisfies Options,
	weight: {
		variants: {
			weight: {
				300: "weight-300",
				400: "weight-400",
				500: "weight-500",
			},
		},
	} satisfies Options,
	box: {
		base: "box",
		variants: {
			block: {
				true: "",
				inline: "",
			},
			flex: {
				true: "",
				inline: "",
			},
			hidden: {
				true: "",
				false: "",
			},
		},
		defaults: {
			hidden: false as any,
		},
		compounds: [
			[
				{
					block: true as any,
					hidden: false as any,
				},
				"box-block",
			],
			[
				{
					block: "inline" as any,
					hidden: false as any,
				},
				"box-block-inline",
			],
			[
				{
					flex: true as any,
					hidden: false as any,
				},
				"box-flex",
			],
			[
				{
					flex: "inline" as any,
					hidden: false as any,
				},
				"box-flex-inline",
			],
		],
	} satisfies Options,
	spacing: {
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
			margin: {
				sm: "margin-sm",
				md: "margin-md",
				lg: "margin-lg",
			},
			padding: {
				sm: "padding-sm",
				md: "padding-md",
				lg: "padding-lg",
			},
		},
	} satisfies Options,
};

const fx = {
	color: klass(options.color),
	disabled: klass(options.disabled),
	weight: klass(options.weight),
	box: klass(options.box),
	spacing: reklass(options.spacing),
};

export const compose = {
	options,
	fx,
	test: [
		{
			props: {},
			equal: "color-red box",
		},
		{
			props: {
				color: "green",
				disabled: false,
				weight: 500,
				flex: "inline",
				margin: "md",
				padding: {
					initial: "sm",
					md: "lg",
				},
			},
			equal: "color-green disabled-false weight-500 box box-flex-inline margin-md padding-sm md:padding-lg",
		},
	] satisfies Test<typeof options.color | typeof options.disabled | typeof options.weight | typeof options.box | typeof options.spacing>[],
};
