export * as expects from "./expects";

const createDataTestId = <T extends string>(id: T) => [id, { "data-testid": id }] as const;
export const [DATA_TESTID_ROOT, DATA_TESTID_ROOT_PROPS] = createDataTestId("root");
export const [DATA_TESTID_REACTIVE, DATA_TESTID_REACTIVE_PROPS] = createDataTestId("reactive");
