const fetch = require("node-fetch");
const fs = require("fs");
const urls = require("./src/model/sizesUrls.js");

const promises = Object.values(urls).map(url =>
  fetch(url)
    .then(res => res.text())
    .then(text => ({ url, text })),
);
Promise.all(promises).then(data => {
  let writeData = {};
  data.forEach(({ url, text }) => {
    writeData[url] = text.length;
  });
  fs.writeFileSync("./src/model/sizes.json", JSON.stringify(writeData));
});
//     .then(body => console.log(body));
