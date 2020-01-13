// should be imported to the body separetely
// for quicker night-mode application

import { getActiveTheme, saveTheme } from "./utils";

window.onerror = error => console.trace("onerror", error);
window.onunhandledrejection = event => console.error("onunhandledrejection", event.reason, event);
window.alert = (...args) => console.warn("alert", ...args);

window.addEventListener("DOMContentLoaded", () => {
  let isNightMode = getActiveTheme();
  let html = document.documentElement;
  html.classList.add(isNightMode ? "night-mode-on" : "night-mode-off");
  html.classList.remove(isNightMode ? "night-mode-off" : "night-mode-on");
  saveTheme(isNightMode);
});
