import sizes from "../../sizes.json";
import urls from "../../sizesUrls";
import metricaHotjarHtml from "./html";

export const metricaHotjar = {
  id: "metrica:hotjar",
  titleKey: "sections.analytics.hotjar",
  visible: true,
  prevVisible: true,
  active: true,
  checks: [
    {
      id: "metrica:hotjar:script",
      type: "script",
      url: urls.metricaHotjar,
      approxSize: sizes[urls.metricaHotjar],
      status: "pending",
    },
    {
      id: "metrica:hotjar:eval",
      type: "eval",
      include: metricaHotjarHtml,
      evals: [
        "window.hj",
        "window.hjSiteSettings.site_id > 0",
        "window.hjSiteSettings.features.length > 0",
      ],
      depends: "metrica:hotjar:script",
      status: "pending",
    },
  ],
};
