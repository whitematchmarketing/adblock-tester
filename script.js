NodeList.prototype.forEach = Array.prototype.forEach;

var appTimer = null;
var REZULT_SELECTOR = '.js-result';
var ADS_BLOCKS_SELECTOR = '.js-ads-block';
var allCount = document.querySelector('.js-all');
var successCount = document.querySelector('.js-success');
var successPercent = document.querySelector('.js-success-percent');

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
  var all = document.querySelectorAll(REZULT_SELECTOR).length;
  var success = document.querySelectorAll(REZULT_SELECTOR + '.green').length;

  allCount.innerHTML = all;
  successCount.innerHTML = success;
  successPercent.innerHTML =
    (success == 0 ? 0 : Math.round(success / all * 10000) / 100) + '%';
}

function checkBanners() {
  var $ads = document.querySelectorAll(ADS_BLOCKS_SELECTOR);

  $ads.forEach(function($ad) {
    var hasAds = $ad.clientWidth !== 0 && $ad.clientHeight !== 0;
    var $rez = $ad.parentElement.querySelector(REZULT_SELECTOR);
    updateRez($rez, hasAds);
  });
}

function checkVariables() {
  var $checkVars = document.querySelectorAll('.js-variable-exist');
  $checkVars.forEach(function($var) {
    var variable = deepFind(window, $var.dataset.var);
    var hasVariable = variable !== undefined;
    var $rez = $var.parentElement.querySelector(REZULT_SELECTOR);
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
