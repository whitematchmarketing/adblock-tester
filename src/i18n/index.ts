import get from "lodash/get";
import { isDev } from "/utils";

if (process.env.LANG === "ru" || isDev) {
  var store = require("./ru.json");
} else {
  var store = require("./en.json");
}

export const t = (path: string) => get(store, path, "");
export default t;
