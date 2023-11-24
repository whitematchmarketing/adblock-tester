let debug = (...args: any[]) => (...args: any[]) => {};

if (process.env.NODE_ENV !== "production") {
  debug = require("debug");
}

export const logger = (name1: string) => {
  const log = debug(name1);
  return (name2: string, ...args: any[]) => {
    const argsClone = JSON.parse(JSON.stringify(args.filter(arg => arg !== undefined)));
    log(`%c${name2}`, "font-weight: bold", ...argsClone);
  };
};
