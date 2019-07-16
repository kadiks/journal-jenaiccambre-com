require("dotenv").config();
const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const {
  toJpg,
  renderHomepage,
  renderPost,
  cacheViewer
} = require("./src/server");

const PORT = process.env.PORT || 3000;

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    // Be sure to pass `true` as the second argument to `url.parse`.
    // This tells it to parse the query portion of the URL.
    const parsedUrl = parse(req.url, true);
    const { pathname, query } = parsedUrl;

    if (pathname === "/") {
      renderHomepage(app, req, res, parsedUrl, filepath => {
        // console.log("pathname /");
        app.serveStatic(req, res, filepath);
      });
    } else if (pathname === "/posts") {
      app.render(req, res, "/allPosts", query);
    } else if (pathname.substr(0, 6) === "/posts") {
      const postId = pathname.split("/")[2];
      renderPost(postId, app, req, res, parsedUrl, filepath => {
        // app.render(req, res, "/post", query);
        app.serveStatic(req, res, filepath);
      });
    } else if (pathname.substr(0, 14) === "/static/posts/") {
      toJpg(pathname, () => {
        handle(req, res, parsedUrl);
      });
    } else if (pathname === "/caches/") {
      console.log("okokok");
      cacheViewer(filepath => {
        app.serveStatic(req, res, filepath);
      });
    } else {
      handle(req, res, parsedUrl);
    }
  }).listen(PORT, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${PORT}`);
  });
});
