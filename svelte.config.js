const sveltePreprocess = require("svelte-preprocess");

module.exports = {
  compiler: {
    hydratable: true,
  },
  preprocess: sveltePreprocess({
    scss: true,
    postcss: true,
    typescript: {
      tsconfigDirectory: ".",
      tsconfigFile: "./tsconfig.json",
      transpileOnly: true,
    },
  }),
};
