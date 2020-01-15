let hostUrl = "";

if (process.env.LANG === "ru") {
  hostUrl = `https://checkadblock.ru`;
} else if (process.env.LANG === "en") {
  hostUrl = `https://adblock-tester.com`;
}

export default { hostUrl };
