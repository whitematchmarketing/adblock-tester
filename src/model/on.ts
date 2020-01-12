import {
  changeSectionActive,
  changeSectionVisible,
  changeServiceActive,
  changeServiceVisible,
  loadScript,
  checkEval,
  checkSize,
  proveSize,
} from "./actions";
import { sections, services, checks } from "./store";
import { EStatus, IEvalCheck, ISizeCheck, IScriptCheck } from "./types";
import { scriptLoader, isFileSizeAcceptable, produce, flashAvailable, safeEval } from "../utils";
import { merge } from "effector";
import { saveActiveAndVisible } from "./storage";

const visibilityHandler = (state, { id, value }) =>
  produce(state, draftState => {
    draftState[id].visible = value;
    draftState[id].prevVisible = value;
  });

const activeHandler = (state, { id, value }) => {
  return produce(state, draftState => {
    draftState[id].active = value;
    if (!value) {
      draftState[id].visible = value;
    } else {
      draftState[id].visible = draftState[id].prevVisible;
    }
  });
};
sections.on(changeSectionActive, activeHandler);
sections.on(changeSectionVisible, visibilityHandler);

services.on(changeServiceActive, activeHandler);
services.on(changeServiceVisible, visibilityHandler);

// @ts-ignore
loadScript.use(({ id }) => {
  const { url } = checks.getState()[id] as IScriptCheck;
  return scriptLoader(url);
});
checks.on(loadScript, (state, { id }) =>
  produce(state, draftState => (draftState[id].status = EStatus.pending)),
);
checks.on(loadScript.done, (state, { params: { id }, result: textSize }) => {
  const acceptable = isFileSizeAcceptable(textSize, (state[id] as IScriptCheck).approxSize);
  const status = acceptable ? EStatus.likelyUnblocked : EStatus.likelyBlocked;
  return produce(state, draftState => (draftState[id].status = status));
});
checks.on(loadScript.fail, (state, { params: { id }, error }) => {
  let status = EStatus.unknown;
  if (error.message === "fetch failed") status = EStatus.unknown;
  if (error.message === "script tag failed") status = EStatus.blocked;
  if (error.message === "time out") status = EStatus.likelyBlocked;
  return produce(state, draftState => (draftState[id].status = status));
});
checks.on(proveSize, (state, { id, proved }) => {
  return produce(state, draftState => ((draftState[id] as ISizeCheck).proved = proved));
});
checks.on(checkSize, (state, { id, element }) => {
  const isFlash = (state[id] as ISizeCheck).flash;
  const notEmpty = element.clientHeight > 10 && element.clientWidth > 10;
  const status = isFlash && !flashAvailable ? false : notEmpty;
  return produce(state, draftState => ((draftState[id] as ISizeCheck).visible = status));
});
checks.on(checkEval, (state, { id }) => {
  let status = EStatus.unknown;
  const check = state[id] as IEvalCheck;
  const results = check.evals.map(safeEval);
  const countTrues = results.filter(Boolean).length;

  if (check.depends && state[check.depends] && state[check.depends].status === EStatus.blocked)
    status = EStatus.blocked;
  else if (countTrues === 0) status = EStatus.blocked;
  else if (countTrues === results.length) status = EStatus.unblocked;
  else if (countTrues <= results.length / 2) status = EStatus.likelyBlocked;
  else if (countTrues > results.length / 2) status = EStatus.likelyUnblocked;
  return produce(state, draftState => (draftState[id].status = status));
});
checks.on(merge([checkSize, proveSize]), (state, { id }) => {
  const { visible, proved, external } = state[id] as ISizeCheck;
  let status = EStatus.unknown;
  if (external) {
    if (visible && proved === true) status = EStatus.blocked;
    else if (visible && proved === false) status = EStatus.unblocked;
    else if (visible) status = EStatus.likelyUnblocked;
    else status = EStatus.blocked;
  } else {
    status = visible ? EStatus.unblocked : EStatus.blocked;
  }
  return produce(state, draftState => ((draftState[id] as ISizeCheck).status = status));
});

merge([sections, services]).watch(saveActiveAndVisible);
