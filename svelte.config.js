const sveltePreprocess = require("svelte-preprocess");

module.exports = {
  compiler: {
    hydratable: process.env.NODE_ENV === "production",
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
