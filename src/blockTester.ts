import { t } from "./i18n";

export const blockTester = () => {
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.innerHTML = `
    function isInvisible (elem) {
      return !(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
    };
    var showed = false;
    setTimeout(function timer() {
      if (showed) return;
      if (isInvisible(document.documentElement) || isInvisible(document.body) || isInvisible(document.getElementById("app"))) {
        showed = true;
        var result = prompt('${t("page.blockedMessage")}', '${t("page.blockedUrl")}');
        if (result) location.href = "${t("page.blockedUrl")}";
      }
      setTimeout(timer, 500);
    }, 500);
  `;
  document.getElementsByTagName("head")[0].appendChild(script);
};
