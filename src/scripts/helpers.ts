export const checkFlash = () => {
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

export const loadScript = (url: string) => {
  if (!url) throw "No url";

  return new Promise((res, rej) => {
    const $firstScript = document.getElementsByTagName("script")[0];
    const $script = document.createElement("script");
    $script.src = url;
    $script.async = true;
    $firstScript.parentNode.insertBefore($script, $firstScript);
    $script.onload = res;
    $script.onerror = rej;
  });
};

export const loadImage = (url: string) => {
  if (!url) throw "No url";

  return new Promise((res, rej) => {
    const $image = document.createElement("img");
    $image.hidden = true;
    $image.src = url;
    $image.onload = res;
    $image.onerror = rej;
    document.body.appendChild($image);
  });
};
