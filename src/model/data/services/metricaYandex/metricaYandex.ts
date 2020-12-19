import sizes from "../../sizes.json";
import urls from "../../sizesUrls";
import getMetricaYandexHtml from "./html";

const metricaId = process.env.LANG === "ru" ? 43211979 : 70659823;

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
      include: getMetricaYandexHtml(metricaId),
      evals: ["!ym", `yaCounter${metricaId}._inited`],
      depends: "metrica:yandex:script",
      status: "pending",
    },
  ],
};
