import { app } from "./store";
import { IScriptCheck, IFetchMediaSizeCheck, IEvalCheck, ISizeCheck } from "./types";

type IParams = { id: string; value: boolean };
export const changeSectionActive = app.createEvent<IParams>("change section active");
export const changeSectionVisible = app.createEvent<IParams>("change section visible");

export const changeServiceActive = app.createEvent<IParams>("change service active");
export const changeServiceVisible = app.createEvent<IParams>("change service visible");

export const proveSize = app.createEvent<{ check: ISizeCheck; proved: boolean }>("prove size");
export const checkSize = app.createEvent<{ check: ISizeCheck; element: HTMLElement }>("check size");
export const checkEval = app.createEvent<IEvalCheck>("check eval");

export const loadScript = app.createEffect<IScriptCheck, number, Error>("load script");
export const fetchMediaSize = app.createEffect<IFetchMediaSizeCheck, number, Error>(
  "load local image",
);
