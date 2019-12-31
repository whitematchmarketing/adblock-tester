import {
  CHECK_LOADING_ATTRIBUTE,
  STATUS_LOADING_SUCCESS,
  STATUS_LOADING_FAILURE
} from "./variables";
import { extendAttribute, flashSupported } from "./helpers";

declare global {
  interface Window {
    handleLoad: Function;
    handleError: Function;
    imageError: Function;
    isArray: Function;
    flashSupported: boolean;
  }
}

const handleFactory = (result: string) => ($el: Element) => {
  const $input = $el
    .closest("li")
    .querySelector(`[${CHECK_LOADING_ATTRIBUTE}]`);

  if (!$input) {
    console.warn(`No ${CHECK_LOADING_ATTRIBUTE} in parent`, $el);
    return;
  }

  extendAttribute($input, CHECK_LOADING_ATTRIBUTE, result);
};

window.isArray = Array.isArray;
window.flashSupported = flashSupported;
window.handleLoad = handleFactory(STATUS_LOADING_SUCCESS);
window.handleError = handleFactory(STATUS_LOADING_FAILURE);
window.imageError = (el: Element) => el.parentElement.removeChild(el);
