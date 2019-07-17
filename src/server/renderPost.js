const fs = require("fs-extra");
const moment = require("moment");
const path = require("path");

const renderPost = async (postId, app, req, res, parsedUrl, cb) => {
  const filepath = `./static/posts/${postId}.html`;
  // console.log("src/server/renderPost filepath", filepath);

  if (typeof parsedUrl.query !== "undefined") {
    if (parsedUrl.query.forceReload === "true") {
      await reRender(filepath, postId, app, req, res, parsedUrl);
    }
  }

  if (fs.existsSync(filepath) === false) {
    await reRender(filepath, postId, app, req, res, parsedUrl);
  }

  // console.log("src/server/renderPost go to cb");
  cb(path.resolve(filepath));
};

const reRender = async (filepath, postId, app, req, res, parsedUrl) => {
  console.log("rerendering postId", postId);
  const html = await app.renderToHTML(req, res, "/post", parsedUrl);
  await fs.writeFile(filepath, html);
};

module.exports = renderPost;
