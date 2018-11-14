const sass = require("@stencil/sass");
exports.config = {
  namespace: "warpview-editor-lite",
  plugins: [sass()],
  outputTargets: [
    {
      type: "dist"
    },
    {
      type: "www",
      serviceWorker: false
    }
  ]
};
