import { normalize } from "./normalized";

let inputData = undefined;

if (process.env.LANG === "ru") inputData = require("./ru").default;
if (process.env.LANG === "en") inputData = require("./en").default;

export const { sectionsHash, servicesHash, checksHash } = normalize(inputData);
