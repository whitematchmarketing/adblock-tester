import sizes from "../../sizes.json";
import urls from "../../sizesUrls";
import metricaYandexHtml from "./html";

export const metricaYandex = {
  id: "metrica:yandex",
  titleKey: "sections.analytics.yandex",
  visible: true,
  prevVisible: true,
  active: true,
  checks: [
    {
      id: "metrica:yandex:script",
      type: "script",
      url: urls.metricaYandex,
      approxSize: sizes[urls.metricaYandex],
      status: "pending",
    },
    {
      id: "metrica:yandex:eval",
      type: "eval",
      include: metricaYandexHtml,
      evals: ["!ym", "yaCounter43211979._inited"],
      depends: "metrica:yandex:script",
      status: "pending",
    },
  ],
};
