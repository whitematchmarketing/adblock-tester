import sizes from "../../sizes.json";
import urls from "../../sizesUrls";
import adsGoogleHtml from "./html";

export const adsGoogle = {
  id: "ads:google",
  titleKey: "services.adsense.title",
  descriptionKey: "services.adsense.description",
  visible: true,
  prevVisible: true,
  active: true,
  checks: [
    {
      id: "ads:google:script",
      type: "script",
      url: urls.adsGoogle,
      approxSize: sizes[urls.adsGoogle],
      status: "pending",
    },
    {
      id: "ads:google:size",
      type: "size",
      status: "pending",
      withApproval: true,
      include: adsGoogleHtml,
    },
  ],
};
