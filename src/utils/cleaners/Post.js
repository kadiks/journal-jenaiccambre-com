import Entities from "html-entities";
import sanitizeHtml from "sanitize-html";

import Config from "../../Config";

const entities = new Entities.AllHtmlEntities();

const getOne = ({ post }) => {
  const baseUrl = `${Config.site.protocol}://${Config.site.host}`;
  const baseLink = post.link.replace(process.env.WORDPRESS_HOST, "");
  post.destLink = `/posts/${post.id}${baseLink}`;
  post.shareImageLink = `${baseUrl}/static/posts/${post.id}.jpg`;
  post.title.clean = entities.decode(post.title.rendered);
  post.excerpt.clean = sanitizeHtml(post.excerpt.rendered, {
    allowedTags: false
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

export default { getOne, getAll };
