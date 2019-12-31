import { ITEM_BLOCKED } from "./variables";

const checkFlash = () => {
  var flashAvailable = false;
  try {
    var flash = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
    if (flash) {
      flashAvailable = true;
    }
  } catch (e) {
    if (navigator.mimeTypes["application/x-shockwave-flash"] != undefined) {
      flashAvailable = true;
    }
  }
  return flashAvailable;
};

export const flashSupported = checkFlash();

export const extendAttribute = (
  $el: Element,
  attrName: string,
  value: string | boolean
) => {
  const prevValue = $el.getAttribute(attrName);
  const optionalSlash = prevValue ? "/" : "";
  $el.setAttribute(attrName, prevValue + optionalSlash + value);
};

export const updateResult = ($el: Element, blocked: boolean) => {
  const $input = $el.closest("li").querySelector(`[${ITEM_BLOCKED}]`);
  extendAttribute($input, ITEM_BLOCKED, blocked);
};

export function deepFind(path: string, obj: object = window) {
  var paths = path.split("."),
    current = obj;

  for (var i = 0; i < paths.length; ++i) {
    if (current[paths[i]] == undefined) {
      return undefined;
    } else {
      current = current[paths[i]];
    }
  }
  return current;
}
