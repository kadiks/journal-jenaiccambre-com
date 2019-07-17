require("dotenv").config();
const request = require("request-promise-native");
const qs = require("qs");
const _ = require("lodash");
const postCleaner = require("../../utils/cleaners/Post");
const postFilter = require("../../utils/filters/Post");

const HOST = process.env.WORDPRESS_HOST;
const API_ROOT = process.env.WORDPRESS_APIROOT;

const baseUrl = `${HOST}${API_ROOT}`;

const getAllUrls = async ({ postMaxCount = 100 } = {}) => {
  const posts = await getAllPosts({
    maxCount: postMaxCount
  });
  console.log("src/server/utils/post#getAllUrls posts", posts.length);
  const pages = [];
  let urls = ["/"];
  const postUrls = posts.map(p => ({ url: p.destLink }));
  const pagesUrls = pages.map(p => ({ url: p.destLink }));
  urls = urls.concat(postUrls);
  urls = urls.concat(pagesUrls);
  return urls;
};

const getAllPosts = async ({
  posts = [],
  curPage = 1,
  maxCount = 10,
  maxPage = 2
}) => {
  // console.log("curPage", curPage);
  // console.log("posts #1", posts.length);
  const curPosts = await getPosts({ count: maxCount, page: curPage });
  posts = posts.concat(curPosts);

  if (curPosts.length === maxCount && curPage < maxPage) {
    return await getAllPosts({ posts, maxCount, curPage: curPage + 1 });
  } else {
    const filtered = postFilter.excludeProtected({ posts });
    const clean = postCleaner.getAll({ posts: filtered });
    return clean;
  }
};

const getPosts = async ({ count = 10, page = 1 }) => {
  const query = {};
  if (!isNaN(count) && count > 0) {
    query.per_page = count;
  }
  if (!isNaN(page) && page > 0) {
    query.page = page;
  }
  const url = `${baseUrl}/posts?${qs.stringify(query)}`;
  console.log("src/server/utils/post#getPosts", url);
  const response = await request(url);

  const json = JSON.parse(response);
  if (_.get(json, "data.status") === 400) {
    return [];
  } else {
    return json;
  }
};

module.exports = {
  getAllPosts,
  getAllUrls
};
