import sizes from "../../sizes.json";
import urls from "../../sizesUrls";
import errorsSentryHtml from "./html";

export const errorsSentry = {
  id: "errors:sentry",
  titleKey: "sections.errorCatchers.sentry",
  visible: true,
  prevVisible: true,
  active: true,
  checks: [
    {
      id: "errors:sentry:loading",
      type: "script",
      status: "pending",
      url: urls.errorsSentry,
      approxSize: sizes[urls.errorsSentry],
    },
    {
      id: "errors:sentry:eval",
      type: "eval",
      include: errorsSentryHtml,
      evals: ["Sentry.init"],
      depends: "errors:sentry:loading",
      status: "pending",
    },
  ],
};
