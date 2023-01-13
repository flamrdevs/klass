import { createSignal } from "solid-js";
import { BoxKlassed } from "../index.test.shared";

const ReactiveKlassed = () => {
  const [m, setM] = createSignal<"1" | "2">("1");
  const [p, setP] = createSignal<"1" | "2">("1");
  const [classes, setClasses] = createSignal<string | null>(null);

  const handleClick = () => {
    setM("2");
    setP("2");
    setClasses("reactive");
  };

  return (
    <BoxKlassed data-testid="reactive" as="button" m={m()} p={p()} class={["extra-reactive", "classes", classes()]} onClick={handleClick}>
      ReactiveKlassed
    </BoxKlassed>
  );
};

export default ReactiveKlassed;
