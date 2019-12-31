import {
  CHECK_LOADING_ATTRIBUTE,
  CHECK_VAR_ATTRIBUTE,
  CHECK_EVAL_ATTRIBUTE,
  ITEM_BLOCKED,
  ITEM_FINAL_BLOCKED,
  STATUS_LOADING_SUCCESS,
  STATUS_LOADING_FAILURE,
  $finalScorePercent,
  $finalScoreSuccess,
  $finalScoreCount,
  $checkSizes,
  $checkLoadings,
  $checkVars,
  $itemResults,
  $checkEvals
} from "./variables";
import {
  updateResult,
  deepFind,
  extendAttribute,
  flashSupported
} from "./helpers";

const syncCheckSize = () => {
  $checkSizes.forEach($block => {
    const empty = $block.clientWidth === 0 || $block.clientHeight === 0;
    $block.parentElement.setAttribute("data-size", empty ? "empty" : "full");
    updateResult($block, empty);
  });
};

const syncLoading = () => {
  $checkLoadings.forEach($el => {
    const result = $el.getAttribute(CHECK_LOADING_ATTRIBUTE);

    if (result === "") {
      extendAttribute($el, CHECK_LOADING_ATTRIBUTE, STATUS_LOADING_FAILURE);
      updateResult($el, true);
    } else {
      result
        .split("/")
        .forEach(res =>
          updateResult($el, res === STATUS_LOADING_SUCCESS ? false : true)
        );
    }
  });
};

const syncVariables = () => {
  $checkVars.forEach($el => {
    const variables = $el.getAttribute(CHECK_VAR_ATTRIBUTE).split("/");
    const noVariable = variables.reduce((acc, variablePath) => {
      if (deepFind(variablePath) === undefined) {
        return true;
      }
      return acc;
    }, false);
    updateResult($el, noVariable);
  });
};

const syncEvals = () => {
  $checkEvals.forEach($el => {
    const evalString = $el.getAttribute(CHECK_EVAL_ATTRIBUTE);
    const result = eval(evalString);
    updateResult($el, result);
  });
};

const syncItemResults = () => {
  $itemResults.forEach($itemResult => {
    const results = $itemResult.getAttribute(ITEM_BLOCKED).split("/");
    const blocked = results
      .map((item: string) => item === "true")
      .reduce((acc, result) => (acc === false ? false : result));

    const successText =
      $itemResult.getAttribute("data-success-text") || "заблокирован";
    const failureText =
      $itemResult.getAttribute("data-failute-text") || "загружен";

    $itemResult.setAttribute(ITEM_FINAL_BLOCKED, blocked + "");
    $itemResult.textContent = blocked
      ? `✅ ${successText}`
      : `❌ ${failureText}`;
    $itemResult.classList.remove(blocked ? "red" : "green");
    $itemResult.classList.add(blocked ? "green" : "red");
  });
};

const syncFinalScore = () => {
  var successCount = $itemResults.reduce((acc, $result) => {
    const blockedAsNumber =
      $result.getAttribute(ITEM_FINAL_BLOCKED) === "true" ? 1 : 0;
    return acc + blockedAsNumber;
  }, 0);

  $finalScoreSuccess.textContent = "" + successCount;
  $finalScoreCount.textContent = "" + $itemResults.length;
  $finalScorePercent.textContent =
    (successCount == 0
      ? 0
      : Math.round((successCount / $itemResults.length) * 10000) / 100) + "% ";
};

const clearResults = () =>
  $itemResults.forEach($el => $el.setAttribute(ITEM_BLOCKED, ""));

const appCycle = (delay: number) => {
  clearResults();
  syncCheckSize();
  syncLoading();
  syncVariables();
  syncEvals();
  syncItemResults();
  syncFinalScore();

  const newDelay = delay + delay * 0.5;
  setTimeout(() => appCycle(newDelay), newDelay);
};

appCycle(250);
