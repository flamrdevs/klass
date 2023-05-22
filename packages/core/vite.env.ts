type KEY = "UNMINIFY" | "WATCH";

const env = { true: (key: KEY) => process.env[key] === "true" };

export default env;
