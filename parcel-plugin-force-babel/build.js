const path = require.resolve("./forceBabel.js");

module.exports = bundler => {
  bundler.addAssetType("js", path);
  bundler.addAssetType("mjs", path);
};
