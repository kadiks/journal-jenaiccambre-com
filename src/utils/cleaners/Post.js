const Entities = require("html-entities");
const sanitizeHtml = require("sanitize-html");
const _ = require("lodash");

const Config = require("../../Config");

const entities = new Entities.AllHtmlEntities();

const getOne = ({ post }) => {
  const baseUrl = `${Config.site.protocol}://${Config.site.host}`;
  const baseLink = post.link.replace(process.env.WORDPRESS_HOST, "");
  post.destLink = `/posts/${post.id}${baseLink}`;
  post.absoluteDestLink = `${baseUrl}${post.destLink}`;
  post.shareImageLink = `${baseUrl}/static/posts/${post.id}.jpg`;
  post.title.clean = entities.decode(post.title.rendered);
  post.excerpt.clean = sanitizeHtml(post.excerpt.rendered, {
    allowedTags: false
  });
  post.meta = {};
  post.yoast_meta.forEach(meta => {
    post.meta[meta.name || meta.property] = meta.content;
  });
  post.mainCategory =
    post.categories.indexOf(82) >= 0
      ? "journal"
      : post.categories.indexOf(30) >= 0
      ? "tip"
      : "essay";
  return post;
};

const getAll = ({ posts = [] }) => {
  const cleanPosts = posts.map(post => getOne({ post }));
  return cleanPosts;
};

module.exports = { getOne, getAll };
