const fs = require("fs-extra");
const moment = require("moment");
const path = require("path");
const sm = require("sitemap");
const Config = require("../Config");
const PostFetcher = require("./utils/post");

const renderHomepage = async (app, req, res, parsedUrl, cb) => {
  //console.log(" sitemap parsedUrl", parsedUrl);
  const filepath = "./static/seo/sitemap.xml";
  if (typeof parsedUrl.query !== "undefined") {
    if (parsedUrl.query.forceReload === "true") {
      await reRender(filepath, app, req, res, parsedUrl);
    }
  }
  if (fs.existsSync(filepath) === false) {
    await reRender(filepath, app, req, res, parsedUrl);
  }
  // console.log("#3");
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
  // console.log("rerendering sitemap parsedUrl", parsedUrl);
  //   const html = await app.renderToHTML(req, res, "/", parsedUrl);
  const urls = await PostFetcher.getAllUrls({ postMaxPage: 2 });
  console.log("src/server/renderSitemap#reRender urls", urls.length);
  const hostname =
    process.env.SITE_ID === "kyeda"
      ? `${Config.kyeda.site.protocol}://${Config.kyeda.site.host}`
      : `${Config.jenaic.site.protocol}://${Config.jenaic.site.host}`;
  const sitemap = sm.createSitemap({
    hostname,
    cacheTime: 24 * 60 * 60 * 1000, // one day
    urls
  });
  await fs.writeFile(filepath, sitemap.toString());
};

module.exports = renderHomepage;
