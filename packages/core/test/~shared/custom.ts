import { EndFn, EndFnProps, AsFn, AsFnProps } from "./../../src/types";

export const end: EndFn = (value) => `end( ${value} )`;
export const as: AsFn = (condition, className) => `${className}${condition}`;

export const endProps = { end } satisfies EndFnProps;
export const asProps = { as } satisfies AsFnProps;

export const configEndAsProps = { end, as } satisfies EndFnProps & AsFnProps;
