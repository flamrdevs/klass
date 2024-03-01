import { forwardRef } from "react";
import type { JSX, PropsWithoutRef } from "react";

export const A = forwardRef<HTMLAnchorElement, PropsWithoutRef<JSX.IntrinsicElements["a"]>>((props, ref) => <a ref={ref} {...props} />);
export const Button = forwardRef<HTMLButtonElement, PropsWithoutRef<JSX.IntrinsicElements["button"]>>((props, ref) => <button ref={ref} {...props} />);
export const Div = forwardRef<HTMLDivElement, PropsWithoutRef<JSX.IntrinsicElements["div"]>>((props, ref) => <div ref={ref} {...props} />);

type WithRequiredProps<P> = Omit<P, "id"> & { id: string };

export const RequiredA = forwardRef<HTMLAnchorElement, WithRequiredProps<PropsWithoutRef<JSX.IntrinsicElements["a"]>>>((props, ref) => <a ref={ref} {...props} />);
export const RequiredButton = forwardRef<HTMLButtonElement, WithRequiredProps<PropsWithoutRef<JSX.IntrinsicElements["button"]>>>((props, ref) => <button ref={ref} {...props} />);
export const RequiredDiv = forwardRef<HTMLDivElement, WithRequiredProps<PropsWithoutRef<JSX.IntrinsicElements["div"]>>>((props, ref) => <div ref={ref} {...props} />);
