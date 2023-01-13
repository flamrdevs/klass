import { createSignal } from "solid-js";
import { BoxReklassed } from "../index.test.shared";

const ReactiveReklassed = () => {
  const [m, setM] = createSignal<"1" | { base: "1"; md: "3" }>("1");
  const [p, setP] = createSignal<"1" | "2">("1");
  const [classes, setClasses] = createSignal<string | undefined>();

  const handleClick = () => {
    setM({ base: "1", md: "3" });
    setP("2");
    setClasses("reactive");
  };

  return (
    <BoxReklassed data-testid="reactive" as="button" m={m()} p={p()} class={["extra-reactive", "classes", classes()]} onClick={handleClick}>
      ReactiveReklassed
    </BoxReklassed>
  );
};

export default ReactiveReklassed;
