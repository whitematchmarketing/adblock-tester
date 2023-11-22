import sizes from "../../sizes.json";
import urls from "../../sizesUrls";
import { getHtml } from "./html";

const id = process.env.LANG === "ru" ? "UA-20899801-9" : "UA-20899801-10";

export const metricaGoogle = {
  id: "metrica:google",
  titleKey: "sections.analytics.google",
  visible: true,
  prevVisible: true,
  active: true,
  checks: [
    {
      id: "metrica:google:script",
      type: "script",
      url: urls.metricaGoogle,
      approxSize: sizes[urls.metricaGoogle],
      status: "pending",
    },
    {
      id: "metrica:google:eval",
      type: "eval",
      include: getHtml(id),
      evals: ["!window.gtag", "window.dataLayer.length > 0"],
      depends: "metrica:google:script",
      status: "pending",
    },
  ],
};
