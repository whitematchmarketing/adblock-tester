import bannerFlashHtml from "./html";

export const bannerFlash = {
  id: "banner:flash",
  titleKey: "sections.banners.flash",
  visible: true,
  prevVisible: true,
  active: true,
  checks: [
    {
      id: "banner:flash:loading",
      type: "localLoading",
      url: "/banners/pr_advertising_ads_banner.swf",
      approxSize: 46325,
      status: "pending",
    },
    {
      id: "banner:flash:size",
      type: "size",
      include: bannerFlashHtml,
      status: "pending",
      withApproval: true,
    },
  ],
};
