import "whatwg-fetch";
import "@babel/polyfill";
// @ts-ignore
import App from "./app.svelte";
import "./model";
import { isProd } from "./utils";

const app = new App({
  target: document.getElementById("app"),
  hydrate: isProd,
});

const $loader = document.getElementById("loader");
if ($loader) $loader.style.display = "none";

export default app;
