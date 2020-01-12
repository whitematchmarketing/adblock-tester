import debug from "debug";

import { isProd } from "./env";

export const safeLogger = isProd ? () => () => {} : debug;

export const logger = (name1: string) => {
  const log = safeLogger(name1);
  return (name2: string, ...args: any[]) => {
    const argsClone = JSON.parse(JSON.stringify(args.filter(arg => arg !== undefined)));
    log(`%c${name2}`, "font-weight: bold", ...argsClone);
  };
};
