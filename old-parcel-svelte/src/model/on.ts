import { merge } from "effector";

import {
  fetchMediaFileSize,
  isDefined,
  isFileSizeAcceptable,
  produce,
  safeEval,
  scriptLoader,
} from "../utils";
import {
  changeSectionActive,
  changeSectionVisible,
  changeServiceActive,
  changeServiceVisible,
  checkEval,
  checkSize,
  fetchMediaSize,
  loadScript,
  proveSize,
} from "./actions";
import { saveActiveAndVisible } from "./storage";
import { checks, sections, services } from "./store";
import { EStatus, IEvalCheck, ISizeCheck } from "./types";

const ifDependedCheckBlocked = (state: any, check: IEvalCheck | ISizeCheck) => {
  if (state[check.depends]) return state[check.depends].status === EStatus.blocked;
  return undefined;
};

const visibilityHandler = (state, { id, value }) =>
  produce(state, (draftState) => {
    draftState[id].visible = value;
    draftState[id].prevVisible = value;
  });

const activeHandler = (state, { id, value }) => {
  return produce(state, (draftState) => {
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

// Script loader
// @ts-ignore
loadScript.use(({ url }) => scriptLoader(url));
checks.on(loadScript, (state, { id }) =>
  produce(state, (draftState) => (draftState[id].status = EStatus.pending)),
);
checks.on(loadScript.done, (state, { params: { id, approxSize }, result: fileSize }) => {
  const acceptable = isFileSizeAcceptable(approxSize, fileSize);
  const status = acceptable ? EStatus.likelyUnblocked : EStatus.likelyBlocked;
  return produce(state, (draftState) => (draftState[id].status = status));
});
checks.on(loadScript.fail, (state, { params: { id }, error }) => {
  let status = EStatus.unknown;
  if (error.message === "fetch failed") status = EStatus.unknown;
  if (error.message === "script tag failed") status = EStatus.blocked;
  if (error.message === "time out") status = EStatus.likelyBlocked;
  return produce(state, (draftState) => (draftState[id].status = status));
});
// fetchMediaSize loader
fetchMediaSize.use(({ url }) => fetchMediaFileSize(url));
checks.on(fetchMediaSize.done, (state, { params: check, result: fileSize }) => {
  const acceptable = isFileSizeAcceptable(check.approxSize, fileSize);
  const status = acceptable ? EStatus.unblocked : EStatus.likelyBlocked;
  return produce(state, (draftState) => (draftState[check.id].status = status));
});
checks.on(fetchMediaSize.fail, (state, { params: check, error }) => {
  return produce(state, (draftState) => (draftState[check.id].status = EStatus.blocked));
});
checks.on(proveSize, (state, { check, proved }) => {
  return produce(state, (draftState) => {
    const draftCheck = draftState[check.id] as ISizeCheck;
    draftCheck.proved = proved;
    draftCheck.status = proved ? EStatus.blocked : EStatus.unblocked;
  });
});
checks.on(checkSize, (state, { check, element }) => {
  const { id, proved, withApproval } = check;
  const wasAlreadyProoved = isDefined(proved);
  if (wasAlreadyProoved) return;

  const visible = element.clientHeight > 10 && element.clientWidth > 10;
  let status = EStatus.unknown;

  if (withApproval) status = visible ? EStatus.likelyUnblocked : EStatus.blocked;
  else status = visible ? EStatus.unblocked : EStatus.blocked;

  return produce(state, (draftState) => {
    const draftCheck = draftState[id] as ISizeCheck;
    draftCheck.visible = visible;
    draftCheck.status = status;
  });
});
checks.on(checkEval, (state, check) => {
  let status = EStatus.unknown;
  const results = check.evals.map(safeEval);
  const countTrues = results.filter(Boolean).length;
  const halfCount = Math.round(results.length / 2);

  if (ifDependedCheckBlocked(state, check)) status = EStatus.blocked;
  else if (countTrues === 0) status = EStatus.blocked;
  else if (countTrues === results.length) status = EStatus.unblocked;
  else if (countTrues >= halfCount) status = EStatus.likelyUnblocked;
  else if (countTrues <= halfCount) status = EStatus.likelyBlocked;
  return produce(state, (draftState) => (draftState[check.id].status = status));
});
// checks.on(merge([checkSize, proveSize]), (state, { check }) => {});

merge([sections, services]).watch(saveActiveAndVisible);
