const env = require("./environment");
const fs = require("fs");
const path = require("path");

module.exports = (app) => {
    if (env.name === "development") {
  app.locals.assetPath = function (filePath) {
      return filePath;
    }
    const manifestPath = path.join(
      __dirname,
      "../public/assets/rev.manifest.json"
    );
    const manifestContent = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
    return manifestContent[filePath] || filePath;
  };
};
