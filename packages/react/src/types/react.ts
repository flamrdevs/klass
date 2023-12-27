type Classes = "className";
type ClassesProps = Partial<Record<Classes, string>>;

type BaseComponent = {
  displayName?: string;
};

export type { Classes, ClassesProps, BaseComponent };
