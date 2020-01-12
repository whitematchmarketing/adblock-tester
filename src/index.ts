// @ts-ignore
import App from "./app.svelte";
import "./model";

const app = new App({
  target: document.getElementById("app"),
  hydrate: true,
});

window.onerror = error => console.trace("onerror", error);
window.onunhandledrejection = event => console.error("onunhandledrejection", event.reason, event);
window.alert = (...args) => console.warn("alert", ...args);

export default app;
