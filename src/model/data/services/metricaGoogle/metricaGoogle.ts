import sizes from "../../sizes.json";
import urls from "../../sizesUrls";
import metricaGoogleHtml from "./html";

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
      include: metricaGoogleHtml,
      evals: ["ga.answer"],
      depends: "metrica:google:script",
      status: "pending",
    },
  ],
};
