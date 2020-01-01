export const CHECK_EVAL_ATTRIBUTE = "data-check-eval";
export const CHECK_SIZE_ATTRIBUTE = "data-check-size";
export const CHECK_SIZE_ID_ATTRIBUTE = "data-check-size-id";
export const SIZE_ID_ATTRIBUTE = "data-size-id";
export const CHECK_SCRIPT_LOADING_ATTRIBUTE = "data-check-script-loading";
export const CHECK_IMAGE_LOADING_ATTRIBUTE = "data-check-image-loading";
export const CHECK_SUCESS_ATTRIBUTE = "data-check-success";
export const CHECK_FAILURE_ATTRIBUTE = "data-check-failure";
export const LOADING_URL_ATTRIBUTE = "data-loading-url";
export const ITEMS_RESULS_ATTRIBUTE = "data-result";

export const STATUS_LOADING_SUCCESS = "success";
export const STATUS_LOADING_FAILURE = "failure";

export const $finalScorePercent = document.querySelector(
  ".js-final-score-percent"
);
export const $finalScoreSuccess = document.querySelector(
  ".js-final-score-success"
);
export const $finalScoreCount = document.querySelector(".js-final-score-count");

export const $checkScriptLoadings = [
  ...document.querySelectorAll(`[${CHECK_SCRIPT_LOADING_ATTRIBUTE}]`)
];
export const $checkImageLoadings = [
  ...document.querySelectorAll(`[${CHECK_IMAGE_LOADING_ATTRIBUTE}]`)
];
export const $checkSizes = [
  ...document.querySelectorAll(`[${CHECK_SIZE_ATTRIBUTE}]`)
];
export const $checkEvals = [
  ...document.querySelectorAll(`[${CHECK_EVAL_ATTRIBUTE}]`)
];
export const getAllResults = () => [
  ...document.querySelectorAll(`[${ITEMS_RESULS_ATTRIBUTE}]`)
];
