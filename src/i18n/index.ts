import get from "lodash/get";
import { pluralize } from "./pluralize";
import { isDev } from "/utils";

if (process.env.LANG === "ru" || isDev) {
  var store = require("./ru.json");
} else {
  var store = require("./en.json");
}

export const t = (path: string, count?: number, withCount: boolean = true) => {
  const translation = get(store, path, "");
  return typeof count === "number" ? pluralize(count, translation, withCount) : translation;
};
export default t;