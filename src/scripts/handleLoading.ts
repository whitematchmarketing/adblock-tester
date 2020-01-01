import { checkFlash } from "./helpers";

declare global {
  interface Window {
    // handleLoad: Function;
    // handleError: Function;
    // imageError: Function;
    // handleScriptLoad: Function;
    isArray: Function;
    isUndefined: Function;
    noFlashSupport: boolean;
  }
}

window.isArray = Array.isArray;
window.isUndefined = (value: any) => value === undefined;
window.noFlashSupport = !checkFlash();
// window.handleLoad = handleFactory(STATUS_LOADING_SUCCESS);
// window.handleError = handleFactory(STATUS_LOADING_FAILURE);
// window.imageError = (el: Element) => el.parentElement.removeChild(el);
