NodeList.prototype.forEach = Array.prototype.forEach;

let appTimer = null;
const REZULT_SELECTOR = '.js-result';
const ADS_BLOCKS_SELECTOR = '.js-ads-block';
const allCount = document.querySelector('.js-all');
const successCount = document.querySelector('.js-success');
const successPercent = document.querySelector('.js-success-percent');

app();
window.onload = function() {
  setTimeout(function() {
    clearTimeout(appTimer);
  }, 2000);
};

function app(noTimer) {
  checkBanners();
  checkVariables();
  showFinallCount(allCount, successCount, successPercent);

  appTimer = setTimeout(app, 250);
}

function showFinallCount(allCount, successCount, successPercent) {
  const all = document.querySelectorAll(REZULT_SELECTOR).length;
  const success = document.querySelectorAll(REZULT_SELECTOR + '.green').length;

  allCount.innerHTML = all;
  successCount.innerHTML = success;
  successPercent.innerHTML =
    (success == 0 ? 0 : Math.round(success / all * 10000) / 100) + '%';
}

function checkBanners() {
  const $ads = document.querySelectorAll(ADS_BLOCKS_SELECTOR);

  $ads.forEach($ad => {
    const hasAds = $ad.clientWidth !== 0 && $ad.clientHeight !== 0;
    const $rez = $ad.parentElement.querySelector(REZULT_SELECTOR);
    updateRez($rez, hasAds);
  });
}

function checkVariables() {
  const $checkVars = document.querySelectorAll('.js-variable-exist');
  $checkVars.forEach($var => {
    const variable = deepFind(window, $var.dataset.var);
    const hasVariable = variable !== undefined;
    const $rez = $var.parentElement.querySelector(REZULT_SELECTOR);
    updateRez($rez, hasVariable);
  });
}

function deepFind(obj, path) {
  var paths = path.split('.'),
    current = obj,
    i;

  for (i = 0; i < paths.length; ++i) {
    if (current[paths[i]] == undefined) {
      return undefined;
    } else {
      current = current[paths[i]];
    }
  }
  return current;
}

function updateRez($rez, value) {
  $rez.innerHTML = value ? 'загружен' : 'заблокирован';
  $rez.classList.remove(value ? 'green' : 'red');
  $rez.classList.add(value ? 'red' : 'green');
}
