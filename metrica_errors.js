"use strict";

var getMetrica = function getMetrica() {
    var metrica = null;
    for (var key in window) {
        if (key.indexOf("yaCounter") === 0) {
            metrica = window[key];
            break;
        }
    }
    if (!metrica) throw new Error("Yandex Metrica not found!");
    return metrica;
};

var sendMessage = function sendMessage(message) {
    var metrica = getMetrica();
    metrica.hit(location.pathname, message);
};

var browserErrorHandler = function browserErrorHandler(errorMsg, url, lineNumber, column, errorObj) {
    var message = {
        "JavaScript errors": {
            where: url + " " + lineNumber + ":" + column,
            stacktrace: errorObj
        }
    };
    sendMessage(message);
};

var browserRejectionHandler = function browserRejectionHandler(event) {
    var message = {
        "JavaScript unhandled rejection": event
    };
    sendMessage(message);
};

var listeners = function listeners() {
    if (window.addEventListener) {
        window.addEventListener("error", browserErrorHandler);
        window.addEventListener("unhandledrejection", browserRejectionHandler);
    } else {
        window.onerror = browserErrorHandler;
    }
};

listeners();
