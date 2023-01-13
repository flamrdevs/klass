import { useState } from "preact/hooks";
import { BoxReklassed } from "../index.test.shared";

const ReactiveReklassed = () => {
  const [m, setM] = useState<"1" | { base: "1"; md: "3" }>("1");
  const [p, setP] = useState<"1" | "2">("1");
  const [classes, setClasses] = useState<string | undefined>();

  const handleClick = () => {
    setM({ base: "1", md: "3" });
    setP("2");
    setClasses("reactive");
  };

  return (
    <BoxReklassed data-testid="reactive" as="button" m={m} p={p} className={["extra-reactive", "classes", classes]} onClick={handleClick}>
      ReactiveReklassed
    </BoxReklassed>
  );
};

export default ReactiveReklassed;
