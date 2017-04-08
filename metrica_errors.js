"use strict";

function getMetrica() {
    var m = null;
    for (var key in window) {
        if (key.indexOf("yaCounter") === 0) {
            m = window[key];
            break;
        }
    }
    if (!m) throw new Error("Yandex Metrica not found!");
    return m;
};

function sendMessage(message) {
    getMetrica().hit(location.pathname, message);
};

function browserErrorHandler(errorMsg, url, lineNumber, column, errorObj) {
    sendMessage({
        "JavaScript errors": {
            where: url + " " + lineNumber + ":" + column,
            stacktrace: errorObj
        }
    });
};

function browserRejectionHandler(event) {
    sendMessage({ "Unhandled rejection": event });
};

function listeners() {
    if (window.addEventListener) {
        window.addEventListener("error", browserErrorHandler);
        window.addEventListener("unhandledrejection", browserRejectionHandler);
    } else {
        window.onerror = browserErrorHandler;
    }
};

listeners();
