import { forwardRef } from "react";

import type { PropsWithoutRef } from "react";

const LinkComponent = forwardRef<HTMLAnchorElement, PropsWithoutRef<JSX.IntrinsicElements["a"]>>((props, ref) => (
  <a ref={ref} {...props} />
));

export default LinkComponent;
