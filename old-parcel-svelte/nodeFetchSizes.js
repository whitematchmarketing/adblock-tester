const fetch = require("node-fetch");
const fs = require("fs");
const urls = require("./src/model/data/sizesUrls.js");

const promises = Object.values(urls).map(url =>
  fetch(url)
    .then(res => res.text())
    .then(text => ({ url, text })),
);

Promise.all(promises).then(data => {
  let writeData = {};
  data.forEach(({ url, text }) => (writeData[url] = text.length));
  fs.writeFileSync("./src/model/data/sizes.json", JSON.stringify(writeData));
});
