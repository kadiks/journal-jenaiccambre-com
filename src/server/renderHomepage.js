const fs = require("fs-extra");
const moment = require("moment");
const path = require("path");

const renderHomepage = async (app, req, res, parsedUrl, cb) => {
  const filepath = "./static/posts/homepage.html";
  if (fs.existsSync(filepath) === false) {
    await reRender(filepath, app, req, res, parsedUrl);
  }
  console.log("#3");
  const stats = await fs.stat(filepath);
  //   console.log("src/server/renderHP stats", stats);
  const past24hoursTimestamp =
    moment()
      .subtract(24, "hours")
      .unix() * 1000;
  //   console.log("stats.mtimeMs", stats.mtimeMs);
  //   console.log("past24hoursTimestamp", past24hoursTimestamp);
  if (stats.mtimeMs < past24hoursTimestamp) {
    await reRender(filepath, app, req, res, parsedUrl);
  }
  cb(path.resolve(filepath));
};

const reRender = async (filepath, app, req, res, parsedUrl) => {
  console.log("rerendering homepage");
  const html = await app.renderToHTML(req, res, "/", parsedUrl);
  fs.writeFile(filepath, html);
};

module.exports = renderHomepage;
