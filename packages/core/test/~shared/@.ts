export type Test<K extends string = string, V extends any = any> = {
  props: {
    [key in K]?: V;
  };
  equal: string;
};
