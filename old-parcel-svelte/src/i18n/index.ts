import get from "lodash/get";

let store, pluralize;
if (process.env.LANG === "ru") {
  store = require("./ru.json");
  pluralize = require("./pluralize-ru").pluralizeRu;
} else {
  store = require("./en.json");
  pluralize = require("./pluralize-en").pluralizeEn;
}

export const t = (path: string, count?: number, withCount: boolean = true) => {
  const translation = get(store, path, "");
  const safeTranslation = typeof translation === "string" ? translation : "";
  return typeof count === "number" ? pluralize(count, translation, withCount) : safeTranslation;
};

export default t;
