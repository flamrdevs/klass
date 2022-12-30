import { createSignal } from "solid-js";
import { ButtonKlassed } from "../index.test.shared";

const Reactive = () => {
  const [classes, setClasses] = createSignal<string | undefined>();

  const handleClick = () => {
    setClasses("reactive");
  };

  return (
    <ButtonKlassed data-testid="reactive" class={["extra-reactive", "classes", classes()]} onClick={handleClick}>
      Reactive
    </ButtonKlassed>
  );
};

export default Reactive;
