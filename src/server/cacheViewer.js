const fs = require("fs-extra");
const path = require("path");

const dirpath = "./static/posts";

const listPosts = async () => {
  const files = await fs.readdir(dirpath);
  const data = [];
  for (const file of files) {
    const filepath = path.join(dirpath, file);
    const stat = await fs.stat(filepath);
    const ext = path.extname(filepath);
    const id = path.basename(filepath);
    data.push({
      filepath,
      type: ext === "html" ? "post" : "image",
      id,
      creation: stat.ctimeMs,
      modified: stat.mtimeMs
    });
  }
  // await files.forEach(async file => {
  //   const filepath = path.join(dirpath, file);
  //   const stat = await fs.stat(filepath);
  //   data.push({
  //     filepath,
  //     creation: stat.ctimeMs,
  //     modified: stat.mtimeMs
  //   });
  // });
  return data;
};

const deletePost = async id => {
  const filepath = path.join(dirpath, `${id}.html`);
  if (fs.existsSync(filepath)) {
    fs.unlinkSync(filepath);
  }
};

module.exports = async cb => {
  const filepath = "./static/cache.json";

  const data = await listPosts();

  console.log("data", data);

  await fs.writeFile(filepath, JSON.stringify(data));

  cb(path.resolve(filepath));
};
