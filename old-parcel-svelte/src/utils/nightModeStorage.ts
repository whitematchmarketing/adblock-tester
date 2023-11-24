import { logger } from "./logger";

export const log = logger("🌗 night mode");
const STORAGE_KEY = "night-mode";

export const getActiveTheme = () => {
  const isDarkMode = JSON.parse(localStorage.getItem(STORAGE_KEY));
  const mediaQueryValue = matchMedia("(prefers-color-scheme: dark)").matches;
  const returnValue = typeof isDarkMode === "boolean" ? isDarkMode : mediaQueryValue;
  log("getActiveTheme", { isDarkMode, returnValue, mediaQueryValue });
  return returnValue;
};

export const saveTheme = (value: boolean) => {
  log("saveTheme", { KEY: STORAGE_KEY, value });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
};
