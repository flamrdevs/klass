export type OverrideProps<O, W> = Omit<O, keyof W> & W;
