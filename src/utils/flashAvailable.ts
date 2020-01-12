let flashAvailable = false;
try {
  const flash = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
  if (flash) {
    flashAvailable = true;
  }
} catch (e) {
  if (navigator.mimeTypes["application/x-shockwave-flash"] != undefined) {
    flashAvailable = true;
  }
}

export { flashAvailable };
