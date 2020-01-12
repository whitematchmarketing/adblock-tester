module.exports = {
  locals: {
    isProd: process.env.NODE_ENV === "prod",
    isDev: process.env.NODE_ENV === "dev",
    meta: {
      title:
        "Сайт с рекламой для проверки блокировщиков рекламы: AdBlock, AdBlock Plus, AdGuard, Ghostery…",
      description:
        "Сайт с рекламой, сервисами аналитики, метрики и сбора ошибок, счетчиками посещений. Проверьте ваш блокировщик: AdBlock, AdBlock Plus, AdGuard, Ghostery, uBlock Origin, AdBlocker Ultimate и другие.",
    },
    title: "Сайт с рекламой",
    versionLabel: "версия",
    nightModeLabel: "Ночной режим",
    description:
      "Выбираете блокировщик рекламы, но не знаете где его протестировать? <br> На этом сайте собраны различные рекламные сервисы и сервисы для сбора аналитики, чтобы вы могли проверить на них эффективность вашего блокировщика. <br> AdBlock, AdBlock Plus, AdGuard, Ghostery, uBlock Origin, AdBlocker Ultimate и другие.",
  },
};
