import "whatwg-fetch";
import "@babel/polyfill";
// @ts-ignore
import App from "./app.svelte";
import "./model";

if (!process.env.LANG) throw "process.env.LANG is undefined"

const app = new App({
  target: document.getElementById("app"),
  hydrate: process.env.NODE_ENV === "production",
});

export default app;
