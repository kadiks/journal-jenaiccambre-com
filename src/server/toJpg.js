const { createCanvas, loadImage } = require("canvas-prebuilt");
const path = require("path");
const request = require("request-promise-native");
const Config = require("../Config");

const WIDTH = 600;
const HEIGHT = 315;
const PADDING = 15;

const fs = require("fs-extra");

const getPost = (id, cb) => {
  const wpRootUrl = `${process.env.WORDPRESS_HOST}${
    process.env.WORDPRESS_APIROOT
  }`;

  request(`${wpRootUrl}/posts/${id}`).then(req => {
    const json = JSON.parse(req);
    // console.log("json", json);
    cb(json);
  });
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

const generate = (pathname, cb) => {
  const postId = path.basename(pathname, ".jpg");

  const filepath = pathname.replace("/", "");

  if (fs.existsSync(filepath) === true) {
    console.log("src/server/toJpg Already exists");
    cb();
    return;
  }

  console.log("src/server/toJpg Will be generated");

  const post = getPost(postId, post => {
    const str = post.title.rendered || "Personal development blog";

    const canvas = createCanvas(WIDTH, HEIGHT);
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    // Write "Awesome!"
    ctx.font = "30px Arial";
    ctx.fillStyle = "black";
    // ctx.fillText(str, 50, 100);
    printAt(ctx, str, 230, 50, 45, 355);

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

    // Draw line under text
    // var text = ctx.measureText(str);
    // // ctx.strokeStyle = "rgba(0,0,0,0.5)";
    // // ctx.beginPath();
    // // ctx.lineTo(50, 102);

    // // ctx.lineTo(50 + text.width, 102);
    // // ctx.stroke();

    // Draw cat with lime helmet
    loadImage(
      process.env.SITE_ID === "kyeda"
        ? "static/img/kyeda.png"
        : "static/img/jenaic_cambre.jpg"
    ).then(async image => {
      ctx.drawImage(image, 15, 50, 200, 200);

      //   console.log('<img src="' + canvas.toDataURL() + '" />');

      const buf = canvas.toBuffer("image/jpeg", { quality: 0.95 });
      fs.writeFile(filepath, buf, () => {
        cb();
      });
    });
  });
};

module.exports = generate;
