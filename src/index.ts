// @ts-ignore
import App from "./app.svelte";
import "./model";

const app = new App({
  target: document.getElementById("app"),
  hydrate: true,
});

window.onerror = error => console.trace("window.onerror", error);
window.alert = (...args) => console.warn("alert", ...args);

export default app;
