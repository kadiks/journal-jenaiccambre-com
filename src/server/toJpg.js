const { createCanvas, loadImage } = require("canvas-prebuilt");
const path = require("path");
const request = require("request-promise-native");
const Config = require("../Config");
const Entities = require("html-entities");

const entities = new Entities.AllHtmlEntities();

const WIDTH = 600;
const HEIGHT = 400;
const PADDING = 15;

const fs = require("fs-extra");

const getPost = async ({ id }) => {
  const wpRootUrl = `${process.env.WORDPRESS_HOST}${
    process.env.WORDPRESS_APIROOT
  }`;

  const req = await request(`${wpRootUrl}/posts/${id}?_embed`);
  const json = JSON.parse(req);
  return json;
};

// https://stackoverflow.com/a/4478894
const printAt = (context, text, x, y, lineHeight, fitWidth) => {
  fitWidth = fitWidth || 0;

  if (fitWidth <= 0) {
    context.fillText(text, x, y);
    return;
  }
  var words = text.split(" ");
  var currentLine = 0;
  var idx = 1;
  while (words.length > 0 && idx <= words.length) {
    var str = words.slice(0, idx).join(" ");
    var w = context.measureText(str).width;
    if (w > fitWidth) {
      if (idx == 1) {
        idx = 2;
      }
      context.fillText(
        words.slice(0, idx - 1).join(" "),
        x,
        y + lineHeight * currentLine
      );
      currentLine++;
      words = words.splice(idx - 1);
      idx = 1;
    } else {
      idx++;
    }
  }
  if (idx > 0)
    context.fillText(words.join(" "), x, y + lineHeight * currentLine);
};

const generate = async (pathname, cb) => {
  const postId = path.basename(pathname, ".jpg");

  const filepath = pathname.replace("/", "");

  if (fs.existsSync(filepath) === true) {
    console.log("src/server/toJpg Already exists");
    cb();
    return;
  }

  console.log("src/server/toJpg Will be generated");

  const post = await getPost({ id: postId });

  const canvas = createCanvas(WIDTH, HEIGHT);
  const ctx = canvas.getContext("2d");
  let image = null;

  if (typeof post._embedded["wp:featuredmedia"] !== "undefined") {
    const featuredmedia = post._embedded["wp:featuredmedia"][0];
    const imageUrl = featuredmedia.source_url;
    console.log("imageUrl", imageUrl);
    image = await loadImage(imageUrl);

    const oriWidth = featuredmedia.media_details.width;
    const oriHeight = featuredmedia.media_details.height;

    const heightRatio = (WIDTH / oriWidth) * oriHeight;
    console.log("heightRatio", heightRatio);
    ctx.drawImage(image, 0, 0, WIDTH, heightRatio);
  } else {
    const str =
      entities.decode(post.title.rendered) || "Personal development blog";

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    // Write "Awesome!"
    ctx.font = "30px Arial";
    ctx.fillStyle = "black";
    // ctx.fillText(str, 50, 100);
    printAt(ctx, str, 230, 100, 45, 355);

    ctx.fillStyle = process.env.SITE_ID === "kyeda" ? "#374976" : "#B90000";
    ctx.font = "20px Arial";
    const sitename =
      process.env.SITE_ID === "kyeda" ? "kyeda.app" : "jenaiccambre.com";
    const sitenameMeasure = ctx.measureText(sitename);
    ctx.fillText(
      sitename,
      WIDTH - PADDING - sitenameMeasure.width,
      HEIGHT - PADDING - 20
    );

    image = await loadImage(
      process.env.SITE_ID === "kyeda"
        ? "static/img/kyeda.png"
        : "static/img/jenaic_cambre.jpg"
    );
    ctx.drawImage(image, 15, 50, 200, 200);
  }

  const buf = canvas.toBuffer("image/jpeg", { quality: 0.95 });
  await fs.writeFile(filepath, buf);
  cb();
};

module.exports = generate;
