// @ts-ignore
import App from "./app.svelte";
import "./model";

const app = new App({
  target: document.body,
  // props: { name: "world" },
});

window.onerror = (...args) => console.error(...args);
window.alert = (...args) => console.warn("alert", ...args);

export default app;
