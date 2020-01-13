// @ts-nocheck
import googleAds from "../includes/ads_google.html";
import yandexAds from "../includes/ads_yandex.html";
import bannerFlash from "../includes/banner_flash.html";
import bannerImage from "../includes/banner_image.html";
import bannerGif from "../includes/banner_gif.html";
import metricaYandex from "../includes/metrica_yandex.html";
import metricaGoogle from "../includes/metrica_google.html";
import metricaHotjar from "../includes/metrica_hotjar.html";
import metricaHotjar from "../includes/metrica_hotjar.html";
import errorsSentry from "../includes/errors_sentry.html";
import errorsBugsnag from "../includes/errors_bugsnag.html";
// @ts-check

const sizes = require("./sizes.json");
const urls = require("./sizesUrls.js");

export const sections = [
  {
    id: "context",
    visible: true,
    prevVisible: true,
    active: true,
    priority: "critical",
    titleKey: "sections.context.title",
    descriptionKey: "sections.context.description",
    services: [
      {
        titleKey: "services.adsense.title",
        descriptionKey: "services.adsense.description",
        visible: true,
        prevVisible: true,
        active: true,
        checks: [
          {
            type: "script",
            url: urls.adsGoogle,
            approxSize: sizes[urls.adsGoogle],
            status: "pending",
          },
          {
            type: "size",
            status: "pending",
            withApproval: true,
            include: googleAds,
          },
        ],
      },
      {
        titleKey: "services.yametrica.title",
        descriptionKey: "services.yametrica.description",
        visible: true,
        prevVisible: true,
        active: true,
        checks: [
          {
            type: "script",
            url: urls.adsYandex,
            approxSize: sizes[urls.adsYandex],
            status: "pending",
          },
          {
            type: "size",
            status: "pending",
            withApproval: true,
            include: yandexAds,
          },
        ],
      },
    ],
  },
  {
    id: "analytics",
    visible: true,
    prevVisible: true,
    active: true,
    priority: "medium",
    titleKey: "sections.analytics.title",
    descriptionKey: "sections.analytics.description",
    services: [
      {
        titleKey: "sections.analytics.google",
        visible: true,
        prevVisible: true,
        active: true,
        checks: [
          {
            id: "loadingGoogleMetrica",
            type: "script",
            url: urls.metricaGoogle,
            approxSize: sizes[urls.metricaGoogle],
            status: "pending",
          },
          {
            type: "eval",
            include: metricaGoogle,
            evals: ["ga.answer"],
            depends: "loadingGoogleMetrica",
            status: "pending",
          },
        ],
      },
      {
        titleKey: "sections.analytics.hotjar",
        visible: true,
        prevVisible: true,
        active: true,
        checks: [
          {
            id: "loadingHootjarMetrica",
            type: "script",
            url: urls.metricaHotjar,
            approxSize: sizes[urls.metricaHotjar],
            status: "pending",
          },
          {
            type: "eval",
            include: metricaHotjar,
            evals: ["!hj", "hjSiteSettings.site_id > 0", "hjSiteSettings.features.length === 2"],
            depends: "loadingHootjarMetrica",
            status: "pending",
          },
        ],
      },
      {
        titleKey: "sections.analytics.yandex",
        visible: true,
        prevVisible: true,
        active: true,
        checks: [
          {
            id: "loadingYandexMetrica",
            type: "script",
            url: urls.metricaYandex,
            approxSize: sizes[urls.metricaYandex],
            status: "pending",
          },
          {
            type: "eval",
            include: metricaYandex,
            evals: ["!ym", "yaCounter43211979._inited"],
            depends: "loadingYandexMetrica",
            status: "pending",
          },
        ],
      },
    ],
  },
  {
    id: "banners",
    visible: true,
    prevVisible: true,
    active: true,
    priority: "low",
    titleKey: "sections.banners.title",
    descriptionKey: "sections.banners.description",
    services: [
      {
        titleKey: "sections.banners.flash",
        visible: true,
        prevVisible: true,
        active: true,
        checks: [
          {
            type: "localLoading",
            url: "/banners/pr_advertising_ads_banner.swf",
            approxSize: 46325,
            status: "pending",
          },
          {
            type: "size",
            include: bannerFlash,
            status: "pending",
            withApproval: true,
          },
        ],
      },
      {
        titleKey: "sections.banners.staticImage",
        visible: true,
        prevVisible: true,
        active: true,
        checks: [
          {
            type: "localLoading",
            url: "/banners/pr_advertising_ads_banner.png",
            approxSize: 17761,
            status: "pending",
          },
          {
            type: "size",
            include: bannerImage,
            status: "pending",
          },
        ],
      },
      {
        titleKey: "sections.banners.gifImage",
        visible: true,
        prevVisible: true,
        active: true,
        checks: [
          {
            type: "localLoading",
            url: "/banners/pr_advertising_ads_banner.gif",
            approxSize: 2134987,
            status: "pending",
          },
          {
            type: "size",
            include: bannerGif,
            status: "pending",
          },
        ],
      },
    ],
  },
  {
    id: "errorCatchers",
    visible: true,
    prevVisible: true,
    active: true,
    priority: "low",
    titleKey: "sections.errorCatchers.title",
    descriptionKey: "sections.errorCatchers.description",
    services: [
      {
        titleKey: "sections.errorCatchers.sentry",
        visible: true,
        prevVisible: true,
        active: true,
        checks: [
          {
            id: "loadingSentry",
            type: "script",
            status: "pending",
            url: urls.errorsSentry,
            approxSize: sizes[urls.errorsSentry],
          },
          {
            type: "eval",
            include: errorsSentry,
            evals: ["Sentry.init"],
            depends: "loadingSentry",
            status: "pending",
          },
        ],
      },
      {
        titleKey: "sections.errorCatchers.bugsnag",
        visible: true,
        prevVisible: true,
        active: true,
        checks: [
          {
            id: "loadingBugsnag",
            type: "script",
            status: "pending",
            url: urls.errrorsBugsnag,
            approxSize: sizes[urls.errrorsBugsnag],
          },
          {
            type: "eval",
            include: errorsBugsnag,
            evals: ["bugsnag"],
            depends: "loadingBugsnag",
            status: "pending",
          },
        ],
      },
    ],
  },
];
