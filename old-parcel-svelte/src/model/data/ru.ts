import { custom } from "./services/custom";
import { adsGoogle } from "./services/adsGoogle";
import { adsYandex } from "./services/adsYandex";
import { metricaGoogle } from "./services/metricaGoogle";
import { metricaHotjar } from "./services/metricaHotjar";
import { metricaYandex } from "./services/metricaYandex";
import { bannerFlash } from "./services/bannerFlash";
import { bannerGif } from "./services/bannerGif";
import { bannerImage } from "./services/bannerImage";
import { errorsSentry } from "./services/errorsSentry";
import { errorsBugsnag } from "./services/errorsBugsnag";

export default [
  {
    id: "context",
    visible: true,
    prevVisible: true,
    active: true,
    priority: "medium",
    titleKey: "sections.context.title",
    descriptionKey: "sections.context.description",
    services: [adsGoogle, adsYandex, custom],
  },
  {
    id: "analytics",
    visible: true,
    prevVisible: true,
    active: true,
    priority: "medium",
    titleKey: "sections.analytics.title",
    descriptionKey: "sections.analytics.description",
    services: [metricaGoogle, metricaHotjar, metricaYandex],
  },
  {
    id: "banners",
    visible: true,
    prevVisible: true,
    active: true,
    priority: "low",
    titleKey: "sections.banners.title",
    descriptionKey: "sections.banners.description",
    services: [bannerFlash, bannerGif, bannerImage],
  },
  {
    id: "errorCatchers",
    visible: true,
    prevVisible: true,
    active: true,
    priority: "low",
    titleKey: "sections.errorCatchers.title",
    descriptionKey: "sections.errorCatchers.description",
    services: [errorsSentry, errorsBugsnag],
  },
];
