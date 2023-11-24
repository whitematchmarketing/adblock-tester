import bannerImageHtml from "./html";

export const bannerImage = {
  id: "banner:image",
  titleKey: "sections.banners.staticImage",
  visible: true,
  prevVisible: true,
  active: true,
  checks: [
    {
      id: "banner:image:loading",
      type: "localLoading",
      url: "/banners/pr_advertising_ads_banner.png",
      approxSize: 17761,
      status: "pending",
    },
    {
      id: "banner:image:size",
      type: "size",
      include: bannerImageHtml,
      status: "pending",
    },
  ],
};
