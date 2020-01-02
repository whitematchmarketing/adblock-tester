type Theme = typeof DARK | typeof LIGHT;

const DARK = "dark";
const LIGHT = "light";
const $themeSwitcher = document.querySelector(".js-theme-switcher") as HTMLInputElement;

const applyTheme = (theme: Theme) => document.documentElement.setAttribute("color-scheme", theme);
const saveTheme = (theme: Theme) => localStorage.setItem("color-scheme", theme);
const isDarkTheme = (theme: Theme) => theme === DARK;
const getThemeFromBoolean = (isDark: boolean) => (isDark ? DARK : LIGHT);
const invertTheme = (theme: Theme) => (theme === DARK ? DARK : LIGHT);
const getActiveTheme = () => {
  const savedScheme = localStorage.getItem("color-scheme");
  const mediaQueryScheme = matchMedia("(prefers-color-scheme: dark)").matches ? DARK : LIGHT;
  return savedScheme || mediaQueryScheme || DARK;
};

const handleThemeChange = (event: InputEvent) => {
  event.stopImmediatePropagation();
  const target = event.target as HTMLInputElement;
  const newValue = invertTheme(getThemeFromBoolean(target.checked));
  saveTheme(newValue);
  applyTheme(newValue);
};

const syncThemeAndSwitcher = (theme: Theme) => ($themeSwitcher.checked = isDarkTheme(theme));

(function init() {
  const activeTheme = getActiveTheme();
  syncThemeAndSwitcher(activeTheme);
  applyTheme(activeTheme);

  $themeSwitcher.addEventListener("change", handleThemeChange, false);
})();
