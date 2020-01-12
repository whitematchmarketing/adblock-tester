const fs = require("@parcel/fs");
const babel = require("@babel/core");
const JSAsset = require("parcel-bundler/src/assets/JSAsset");

// Only run Babel on Svelte source files
const babelConfig = {
  include: ["node_modules/svelte"],
  plugins: ["@babel/plugin-transform-classes"],
};

module.exports = class ForceBabel extends JSAsset {
  constructor(...args) {
    super(...args);
  }
  // This overloads the JSAsset's`load` function.
  // It transforms the JS file immediately after reading it,
  // before Parcel has done anything.
  async load() {
    const code = await fs.readFile(this.name, this.encoding);
    const transformed = babel.transformSync(code, {
      filename: this.name,
      ...babelConfig,
    }).code;
    return transformed;
  }
};
