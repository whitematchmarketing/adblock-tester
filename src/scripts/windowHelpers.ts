import { checkFlash } from "./helpers";

declare global {
  interface Window {
    isArray: Function;
    isUndefined: Function;
    noFlashSupport: boolean;
  }
}

window.isArray = Array.isArray;
window.isUndefined = (value: any) => value === undefined;
window.noFlashSupport = !checkFlash();
window.alert = (...args) => {
  console.info(...args);
  console.trace();
};
