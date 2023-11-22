export let hostUrl = "";

if (process.env.LANG === "ru") {
  hostUrl = `https://checkadblock.ru`;
} else if (process.env.LANG === "en") {
  hostUrl = `https://adblock-tester.com`;
}

export const alternateUrls = [
  { locale: "ru", url: "https://checkadblock.ru" },
  { locale: "en", url: "https://adblock-tester.com" },
].filter(({ url }) => url !== hostUrl);
