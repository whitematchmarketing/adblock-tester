export const isDefined = (smt: any) => typeof smt !== "undefined";
export const isUndefined = (smt: any) => typeof smt === "undefined";
export const isBoolean = (smt: any) => typeof smt === "boolean";
export const isNumber = (smt: any) => typeof smt === "number" && !isNaN(smt) && isFinite(smt);
