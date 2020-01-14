import bannerGifHtml from "./html";

export const bannerGif = {
  id: "banner:gif",
  titleKey: "sections.banners.gifImage",
  visible: true,
  prevVisible: true,
  active: true,
  checks: [
    {
      id: "banner:gif:loading",
      type: "localLoading",
      url: "/banners/pr_advertising_ads_banner.gif",
      approxSize: 2134987,
      status: "pending",
    },
    {
      id: "banner:gif:size",
      type: "size",
      include: bannerGifHtml,
      status: "pending",
    },
  ],
};
