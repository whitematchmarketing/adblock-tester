// @ts-ignore
import App from "./app.svelte";
import "./model";
import { isProd } from "./utils";

const app = new App({
  target: document.getElementById("app"),
  hydrate: isProd,
});

window.onerror = error => console.trace("onerror", error);
window.onunhandledrejection = event => console.error("onunhandledrejection", event.reason, event);
window.alert = (...args) => console.warn("alert", ...args);

const $loader = document.getElementById("loader");
if ($loader) $loader.style.display = "none";

export default app;
