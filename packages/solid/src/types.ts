import type { JSX } from "solid-js";

type PropsWithChildren<P = unknown> = P & {
  children?: JSX.Element;
};

export type { PropsWithChildren };
