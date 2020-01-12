import { createStore, createEvent } from "effector";
import { getActiveTheme, saveTheme } from "./utils";

const $html = document.documentElement;
const $themeSwitcher = document.querySelector(".js-theme-switcher") as HTMLInputElement;

const store = createStore(getActiveTheme());
const switchNightMode = createEvent("switch night mode");

store.on(switchNightMode, state => !state);
store.watch(isNightMode => {
  $themeSwitcher.checked = isNightMode;
  $html.classList.add(isNightMode ? "night-mode-on" : "night-mode-off");
  $html.classList.remove(isNightMode ? "night-mode-off" : "night-mode-on");
  saveTheme(isNightMode);
});

$themeSwitcher.addEventListener("change", () => switchNightMode(), false);
