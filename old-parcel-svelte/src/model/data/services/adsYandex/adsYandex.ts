import sizes from "../../sizes.json";
import urls from "../../sizesUrls";
import adsYandexHtml from "./html";

export const adsYandex = {
  id: "ads:yandex",
  titleKey: "services.yametrica.title",
  descriptionKey: "services.yametrica.description",
  visible: true,
  prevVisible: true,
  active: true,
  checks: [
    {
      id: "ads:yandex:script",
      type: "script",
      url: urls.adsYandex,
      approxSize: sizes[urls.adsYandex],
      status: "pending",
    },
    {
      id: "ads:yandex:size",
      type: "size",
      status: "pending",
      withApproval: true,
      include: adsYandexHtml,
    },
  ],
};
