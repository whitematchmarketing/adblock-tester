import "whatwg-fetch";
import "@babel/polyfill";
// @ts-ignore
import App from "./app.svelte";
import "./model";

const app = new App({
  target: document.getElementById("app"),
  hydrate: process.env.NODE_ENV === "production",
});

const $loader = document.getElementById("loader");
if ($loader) $loader.style.display = "none";

export default app;
