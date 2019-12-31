export const CHECK_EVAL_ATTRIBUTE = "data-check-eval";
export const CHECK_SIZE_ATTRIBUTE = "data-check-size";
export const CHECK_LOADING_ATTRIBUTE = "data-check-loading";
export const CHECK_VAR_ATTRIBUTE = "data-check-variables";
export const ITEM_BLOCKED = "data-blocked";
export const ITEM_FINAL_BLOCKED = "data-final-blocked";

export const STATUS_LOADING_SUCCESS = "success";
export const STATUS_LOADING_FAILURE = "failure";

export const $finalScorePercent = document.querySelector(
  ".js-final-score-percent"
);
export const $finalScoreSuccess = document.querySelector(
  ".js-final-score-success"
);
export const $finalScoreCount = document.querySelector(".js-final-score-count");

export const $checkLoadings = [
  ...document.querySelectorAll(`[${CHECK_LOADING_ATTRIBUTE}]`)
];
export const $checkVars = [
  ...document.querySelectorAll(`[${CHECK_VAR_ATTRIBUTE}]`)
];
export const $checkSizes = [
  ...document.querySelectorAll(`[${CHECK_SIZE_ATTRIBUTE}]`)
];
export const $checkEvals = [
  ...document.querySelectorAll(`[${CHECK_EVAL_ATTRIBUTE}]`)
];
export const $itemResults = [...document.querySelectorAll(`[${ITEM_BLOCKED}]`)];
