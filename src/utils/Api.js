import fetch from "isomorphic-unfetch";
import { Post as postFilter } from "./filters";
import { Post as postCleaner } from "./cleaners";

import Config from "../Config";

console.log("process.env", process.env.SITE_ID);

let wpRootUrl = "";

class Api {
  constructor() {
    // wpRootUrl = `${Config.wordpress.host}${Config.wordpress.apiRoot}`;
    // wpRootUrl = "http://blog.jenaiccambre.com//wp-json/wp/v2";
    wpRootUrl = `${process.env.WORDPRESS_HOST}${process.env.WORDPRESS_APIROOT}`;
  }
  async getRecentJournal() {
    return this.getRecentPostsByType({ type: "journal" });
  }

  async getRecentEssays() {
    return this.getRecentPostsByType({ type: "essay" });
  }
  async getRecentTips() {
    return this.getRecentPostsByType({ type: "tip" });
  }

  async getRecentPostByCategoryId({ categoryId }) {
    const res = await fetch(
      `${wpRootUrl}/posts?per_page=10&categories=${categoryId}`
    );

    const posts = await res.json();
    const filtered = postFilter.excludeProtected({ posts });
    const reduced = filtered.slice(0, 3);
    const cleaned = postCleaner.getAll({ posts: reduced });
    return cleaned;
  }

  async getRecentPostsByType({ type }) {
    let categoryId = 82; // 82 => journal
    if (type === "essay") {
      categoryId = 31;
    }
    if (type === "tip") {
      categoryId = 30;
    }
    return this.getRecentPostByCategoryId({ categoryId });
  }

  async getPost({ id }) {
    const res = await fetch(`${wpRootUrl}/posts/${id}?_embed`);
    const post = await res.json();
    const clean = postCleaner.getOne({ post });
    return clean;
  }

  async getCommentsByPost({ id }) {
    const res = await fetch(`${wpRootUrl}/comments?post=${id}`);
    const comments = await res.json();
    return comments;
  }

  async postComment({ name, email, message, postId }) {
    const res = await fetch(
      `${wpRootUrl}/comments?author_name=${encodeURI(
        name
      )}&author_email=${encodeURI(email)}&content=${encodeURI(
        message
      )}&post=${postId}`,
      { method: "POST" }
    );
    const comment = await res.json();
    return comment;
  }
}

export default new Api();
