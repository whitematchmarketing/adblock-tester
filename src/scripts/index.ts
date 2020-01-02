import {
  CHECK_SCRIPT_LOADING_ATTRIBUTE,
  CHECK_EVAL_ATTRIBUTE,
  CHECK_SIZE_ATTRIBUTE,
  ITEMS_RESULS_ATTRIBUTE,
  STATUS_LOADING_SUCCESS,
  $finalScorePercent,
  $finalScoreSuccess,
  $finalScoreCount,
  $checkSizes,
  $checkEvals,
  getAllResults,
  LOADING_URL_ATTRIBUTE,
  STATUS_LOADING_FAILURE,
  CHECK_SUCESS_ATTRIBUTE,
  CHECK_FAILURE_ATTRIBUTE,
  CHECK_SIZE_ID_ATTRIBUTE,
  SIZE_ID_ATTRIBUTE,
  $checkScriptLoadings,
  $checkImageLoadings,
  CHECK_IMAGE_LOADING_ATTRIBUTE,
} from "./variables";
import { loadScript, loadImage } from "./helpers";
import "./darkMode";

const makeResult = (
  $item: Element,
  blocked: boolean,
  successText = "",
  failureText = "",
  additionalInfo = "",
) => {
  const newText = blocked ? `✅ ${successText}` : `❌ ${failureText}`;
  $item.innerHTML = `<b>${newText}</b>`;
  $item.classList.remove(blocked ? "red" : "green");
  $item.classList.add(blocked ? "green" : "red");
  $item.setAttribute(ITEMS_RESULS_ATTRIBUTE, blocked + "");
  if (additionalInfo) {
    $item.innerHTML += ` <small class="small">${additionalInfo}</small>`;
  }
};

const syncCheckSize = () => {
  $checkSizes.forEach($item => {
    const sizeId = $item.getAttribute(CHECK_SIZE_ID_ATTRIBUTE);
    const $adsBlock = $item.parentElement
      .closest("li")
      .querySelector(
        !sizeId ? ".ads_container" : `.ads_container[${SIZE_ID_ATTRIBUTE}="${sizeId}"]`,
      );
    const empty = $adsBlock.clientHeight === 0;
    $item.setAttribute(CHECK_SIZE_ATTRIBUTE, empty ? "empty" : "full");
    if (!empty) {
      $item.parentElement.closest("ul").classList.add("not-empty");
    }
    const successText = $item.getAttribute(CHECK_SUCESS_ATTRIBUTE) || "рекламный блок скрыт";
    const failureText = $item.getAttribute(CHECK_FAILURE_ATTRIBUTE) || "рекламный блок показан";
    makeResult($item, empty, successText, failureText);
  });
};

const syncEvals = () => {
  $checkEvals.forEach($item => {
    const evalString = $item.getAttribute(CHECK_EVAL_ATTRIBUTE);
    let result = true;
    try {
      result = eval(evalString);
    } catch (e) {}
    const additionalInfo = `(<span>проверка:</span> <code>${evalString})</code>`;
    const successText = $item.getAttribute(CHECK_SUCESS_ATTRIBUTE) || "не работает";
    const failureText = $item.getAttribute(CHECK_FAILURE_ATTRIBUTE) || "работает";
    makeResult($item, result, successText, failureText, additionalInfo);
  });
};

const preloadLoadingStuff = () => {
  const factory = ($items: Element[], attribute: string, loadingFunction: Function) => {
    $items.forEach($item => {
      const url = $item.getAttribute(LOADING_URL_ATTRIBUTE);
      loadingFunction(url)
        .then(() => $item.setAttribute(attribute, STATUS_LOADING_SUCCESS))
        .catch(() => $item.setAttribute(attribute, STATUS_LOADING_FAILURE));
    });
  };

  factory($checkScriptLoadings, CHECK_SCRIPT_LOADING_ATTRIBUTE, loadScript);
  factory($checkImageLoadings, CHECK_IMAGE_LOADING_ATTRIBUTE, loadImage);
};

const syncLoading = () => {
  const factory = ($items: Element[], attribute: string) => {
    $items.forEach($item => {
      const url = $item.getAttribute(LOADING_URL_ATTRIBUTE);
      const status = $item.getAttribute(attribute) || "pending";
      const blocked = status !== STATUS_LOADING_SUCCESS;
      const successText = $item.getAttribute(CHECK_SUCESS_ATTRIBUTE) || "файл не загружен";
      const failureText = $item.getAttribute(CHECK_FAILURE_ATTRIBUTE) || "файл загружен";

      makeResult(
        $item,
        blocked,
        successText,
        failureText,
        `(<span>адрес:</span> <code>${url}</code>)`,
      );
    });
  };
  factory($checkScriptLoadings, CHECK_SCRIPT_LOADING_ATTRIBUTE);
  factory($checkImageLoadings, CHECK_IMAGE_LOADING_ATTRIBUTE);
};

const countSuccesResults = results => {
  return results.reduce((acc: number, $result: Element) => {
    const blockedAsNumber = $result.getAttribute(ITEMS_RESULS_ATTRIBUTE) === "true" ? 1 : 0;
    return acc + blockedAsNumber;
  }, 0);
};

const syncFinalScore = () => {
  const $allResults = getAllResults();
  const successCount = countSuccesResults($allResults);
  const allCount = $allResults.length;

  $finalScoreSuccess.textContent = "" + successCount;
  $finalScoreCount.textContent = "" + allCount;
  $finalScorePercent.textContent =
    (successCount == 0 ? 0 : Math.round((successCount / allCount) * 10000) / 100) + "% ";
};

const clearResults = () =>
  getAllResults().forEach($el => $el.removeAttribute(ITEMS_RESULS_ATTRIBUTE));

const appCycle = (delay: number) => {
  clearResults();
  syncCheckSize();
  syncEvals();
  syncLoading();
  syncFinalScore();

  const newDelay = delay + delay * 0.5;
  setTimeout(() => appCycle(newDelay), newDelay);
};

preloadLoadingStuff();
appCycle(50);
