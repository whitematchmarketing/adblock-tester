// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"scripts/variables.ts":[function(require,module,exports) {
"use strict";

var __spreadArrays = this && this.__spreadArrays || function () {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) {
    s += arguments[i].length;
  }

  for (var r = Array(s), k = 0, i = 0; i < il; i++) {
    for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) {
      r[k] = a[j];
    }
  }

  return r;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CHECK_EVAL_ATTRIBUTE = "data-check-eval";
exports.CHECK_SIZE_ATTRIBUTE = "data-check-size";
exports.CHECK_LOADING_ATTRIBUTE = "data-check-loading";
exports.CHECK_FETCH_ATTRIBUTE = "data-check-fetch";
exports.CHECK_VAR_ATTRIBUTE = "data-check-variables";
exports.ITEM_BLOCKED = "data-blocked";
exports.ITEM_FINAL_BLOCKED = "data-final-blocked";
exports.STATUS_LOADING_SUCCESS = "success";
exports.STATUS_LOADING_FAILURE = "failure";
exports.$finalScorePercent = document.querySelector(".js-final-score-percent");
exports.$finalScoreSuccess = document.querySelector(".js-final-score-success");
exports.$finalScoreCount = document.querySelector(".js-final-score-count");
exports.$checkLoadings = __spreadArrays(document.querySelectorAll("[" + exports.CHECK_LOADING_ATTRIBUTE + "]"));
exports.$checkVars = __spreadArrays(document.querySelectorAll("[" + exports.CHECK_VAR_ATTRIBUTE + "]"));
exports.$checkSizes = __spreadArrays(document.querySelectorAll("[" + exports.CHECK_SIZE_ATTRIBUTE + "]"));
exports.$checkEvals = __spreadArrays(document.querySelectorAll("[" + exports.CHECK_EVAL_ATTRIBUTE + "]"));
exports.$checkFetchs = __spreadArrays(document.querySelectorAll("[" + exports.CHECK_FETCH_ATTRIBUTE + "]"));
exports.$itemResults = __spreadArrays(document.querySelectorAll("[" + exports.ITEM_BLOCKED + "]"));
},{}],"scripts/helpers.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var variables_1 = require("./variables");

var checkFlash = function checkFlash() {
  var flashAvailable = false;

  try {
    var flash = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");

    if (flash) {
      flashAvailable = true;
    }
  } catch (e) {
    if (navigator.mimeTypes["application/x-shockwave-flash"] != undefined) {
      flashAvailable = true;
    }
  }

  return flashAvailable;
};

exports.flashSupported = checkFlash();

exports.extendAttribute = function ($el, attrName, value) {
  var prevValue = $el.getAttribute(attrName);
  var optionalSlash = prevValue ? "/" : "";
  $el.setAttribute(attrName, prevValue + optionalSlash + value);
};

exports.updateResult = function ($el, blocked) {
  var $input = $el.closest("li").querySelector("[" + variables_1.ITEM_BLOCKED + "]");
  exports.extendAttribute($input, variables_1.ITEM_BLOCKED, blocked);
};

function deepFind(path, obj) {
  if (obj === void 0) {
    obj = window;
  }

  var paths = path.split("."),
      current = obj;

  for (var i = 0; i < paths.length; ++i) {
    if (current[paths[i]] == undefined) {
      return undefined;
    } else {
      current = current[paths[i]];
    }
  }

  return current;
}

exports.deepFind = deepFind;
},{"./variables":"scripts/variables.ts"}],"scripts/index.ts":[function(require,module,exports) {
"use strict"; // and/or
// check variable
// block size
// loading status cover

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = this && this.__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var variables_1 = require("./variables");

var helpers_1 = require("./helpers");

var syncCheckSize = function syncCheckSize() {
  variables_1.$checkSizes.forEach(function ($block) {
    var hasUnsupportedFlashItem = false; // if (!flashSupported) {
    //   const children = [...$block.children];
    //   hasUnsupportedFlashItem = children.reduce((acc, child) => {
    //     if (child.tagName === "OBJECT" || child.tagName === "EMBED") {
    //       return true;
    //     }
    //     return acc;
    //   }, false);
    // }

    var empty = $block.clientWidth === 0 || $block.clientHeight === 0;
    $block.parentElement.setAttribute("data-size", empty ? "empty" : "full");
    $block.parentElement.setAttribute("data-unsupported-flash", hasUnsupportedFlashItem + "");
    helpers_1.updateResult($block, empty || hasUnsupportedFlashItem);
  });
};

var syncLoading = function syncLoading() {
  variables_1.$checkLoadings.forEach(function ($el) {
    var result = $el.getAttribute(variables_1.CHECK_LOADING_ATTRIBUTE);

    if (result === "") {
      helpers_1.extendAttribute($el, variables_1.CHECK_LOADING_ATTRIBUTE, variables_1.STATUS_LOADING_FAILURE);
      helpers_1.updateResult($el, true);
    } else {
      result.split("/").forEach(function (res) {
        return helpers_1.updateResult($el, res === variables_1.STATUS_LOADING_SUCCESS ? false : true);
      });
    }
  });
};

var syncVariables = function syncVariables() {
  variables_1.$checkVars.forEach(function ($el) {
    var variables = $el.getAttribute(variables_1.CHECK_VAR_ATTRIBUTE).split("/");
    var noVariable = variables.reduce(function (acc, variablePath) {
      if (helpers_1.deepFind(variablePath) === undefined) {
        return true;
      }

      return acc;
    }, false);
    helpers_1.updateResult($el, noVariable);
  });
};

var syncEvals = function syncEvals() {
  variables_1.$checkEvals.forEach(function ($el) {
    var evalString = $el.getAttribute(variables_1.CHECK_EVAL_ATTRIBUTE);
    var result = eval(evalString);
    helpers_1.updateResult($el, result);
  });
};

var syncFetch = function syncFetch() {
  variables_1.$checkFetchs.forEach(function ($el) {
    return __awaiter(void 0, void 0, void 0, function () {
      var url, e_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            url = $el.getAttribute(variables_1.CHECK_FETCH_ATTRIBUTE);
            _a.label = 1;

          case 1:
            _a.trys.push([1, 3,, 4]);

            return [4
            /*yield*/
            , fetch(url)];

          case 2:
            _a.sent();

            helpers_1.updateResult($el, false);
            return [3
            /*break*/
            , 4];

          case 3:
            e_1 = _a.sent();
            helpers_1.updateResult($el, true);
            return [3
            /*break*/
            , 4];

          case 4:
            return [2
            /*return*/
            ];
        }
      });
    });
  });
};

var syncItemResults = function syncItemResults() {
  variables_1.$itemResults.forEach(function ($itemResult) {
    var results = $itemResult.getAttribute(variables_1.ITEM_BLOCKED).split("/");
    var blocked = results.map(function (item) {
      return item === "true";
    }).reduce(function (acc, result) {
      return acc === false ? false : result;
    });
    var successText = $itemResult.getAttribute("data-success-text") || "заблокирован";
    var failureText = $itemResult.getAttribute("data-failute-text") || "загружен";
    $itemResult.setAttribute(variables_1.ITEM_FINAL_BLOCKED, blocked + "");
    $itemResult.textContent = blocked ? "\u2705 " + successText : "\u274C " + failureText;
    $itemResult.classList.remove(blocked ? "red" : "green");
    $itemResult.classList.add(blocked ? "green" : "red");
  });
};

var syncFinalScore = function syncFinalScore() {
  var successCount = variables_1.$itemResults.reduce(function (acc, $result) {
    var blockedAsNumber = $result.getAttribute(variables_1.ITEM_FINAL_BLOCKED) === "true" ? 1 : 0;
    return acc + blockedAsNumber;
  }, 0);
  variables_1.$finalScoreSuccess.textContent = "" + successCount;
  variables_1.$finalScoreCount.textContent = "" + variables_1.$itemResults.length;
  variables_1.$finalScorePercent.textContent = (successCount == 0 ? 0 : Math.round(successCount / variables_1.$itemResults.length * 10000) / 100) + "% ";
};

var clearResults = function clearResults() {
  return variables_1.$itemResults.forEach(function ($el) {
    return $el.setAttribute(variables_1.ITEM_BLOCKED, "");
  });
};

var appCycle = function appCycle(delay) {
  return __awaiter(void 0, void 0, void 0, function () {
    var newDelay;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          return [4
          /*yield*/
          , syncFetch()];

        case 1:
          _a.sent();

          clearResults();
          syncCheckSize();
          syncLoading();
          syncVariables();
          syncEvals();
          syncItemResults();
          syncFinalScore();
          newDelay = delay + delay * 0.5;
          setTimeout(function () {
            return appCycle(newDelay);
          }, newDelay);
          return [2
          /*return*/
          ];
      }
    });
  });
};

window.onload = function () {
  return appCycle(500);
};
},{"./variables":"scripts/variables.ts","./helpers":"scripts/helpers.ts"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "54783" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","scripts/index.ts"], null)
//# sourceMappingURL=/scripts.2ed900e3.js.map