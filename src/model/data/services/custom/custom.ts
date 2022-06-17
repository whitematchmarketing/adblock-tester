import sizes from "../../sizes.json";
import urls from "../../sizesUrls";
import html from "./html";

export const custom = {
  id: "ads:custom",
  titleKey: "services.custom.title",
  descriptionKey: "services.custom.description",
  visible: true,
  prevVisible: true,
  active: true,
  checks: [
    {
      id: "ads:custom:script",
      type: "script",
      url: urls.adsGoogle,
      approxSize: sizes[urls.adsGoogle],
      status: "pending",
    },
    {
      id: "ads:custom:size",
      type: "size",
      status: "pending",
      withApproval: true,
      include: html,
    },
  ],
};
