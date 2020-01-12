import { app } from "./store";

type IParams = { id: string; value: boolean };
export const changeSectionActive = app.createEvent<IParams>("change section active");
export const changeSectionVisible = app.createEvent<IParams>("change section visible");

export const changeServiceActive = app.createEvent<IParams>("change service active");
export const changeServiceVisible = app.createEvent<IParams>("change service visible");

export const proveSize = app.createEvent<{ id: string; proved: boolean }>("prove size");
export const checkSize = app.createEvent<{ id: string; element: HTMLElement }>("check size");
export const checkEval = app.createEvent<{ id: string }>("check eval");
export const loadScript = app.createEffect<{ id: string }, number, Error>("load script");
