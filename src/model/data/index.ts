import { normalize } from "./normalized";

let inputData = undefined;

if (process.env.LANG === "ru") inputData = require("./ru").default;
if (process.env.LANG === "en") inputData = require("./en").default;

console.info(`🔥 process.env.LANG`, process.env.LANG);
console.info(`🔥 inputData`, inputData);

export const { sectionsHash, servicesHash, checksHash } = normalize(inputData);
