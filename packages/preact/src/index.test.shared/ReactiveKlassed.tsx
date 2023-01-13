import { useState } from "preact/hooks";
import { BoxKlassed } from "../index.test.shared";

const ReactiveKlassed = () => {
  const [m, setM] = useState<"1" | "2">("1");
  const [p, setP] = useState<"1" | "2">("1");
  const [classes, setClasses] = useState<string | null>(null);

  const handleClick = () => {
    setM("2");
    setP("2");
    setClasses("reactive");
  };

  return (
    <BoxKlassed data-testid="reactive" as="button" m={m} p={p} className={["extra-reactive", "classes", classes]} onClick={handleClick}>
      ReactiveKlassed
    </BoxKlassed>
  );
};

export default ReactiveKlassed;
