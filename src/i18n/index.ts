import get from "lodash/get";

const storePath = process.env.LANG === "ru" ? "./ru.json" : "./en.json";
const store = (await import(storePath)).default;

const pluralizePath =
  process.env.LANG === "ru" ? "./pluralize-ru" : "./pluralize-en";
const pluralize = (await import(pluralizePath)).default;

export const t = (path: string, count?: number, withCount: boolean = true) => {
  const translation = get(store, path, "");
  const safeTranslation = typeof translation === "string" ? translation : "";
  return typeof count === "number"
    ? pluralize(count, translation, withCount)
    : safeTranslation;
};

export default t;
