import get from "lodash/get";

const store = (
  await import(process.env.LANG === "ru" ? "./ru.json" : "./en.json")
).default;
const pluralize = (
  await import(process.env.LANG === "ru" ? "./pluralize-ru" : "./pluralize-en")
).default;

export const t = (path: string, count?: number, withCount: boolean = true) => {
  const translation = get(store, path, "");
  const safeTranslation = typeof translation === "string" ? translation : "";
  return typeof count === "number"
    ? pluralize(count, translation, withCount)
    : safeTranslation;
};

export default t;
