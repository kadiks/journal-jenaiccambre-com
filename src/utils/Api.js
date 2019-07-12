import fetch from "isomorphic-unfetch";
import { Post as postFilter } from "./filters";

import Config from "../Config";

const wpRootUrl = `${Config.wordpress.host}${Config.wordpress.apiRoot}`;

class Api {
  async getRecentJournal() {
    // const res = await fetch(
    //   `${wpRootUrl}/posts?per_page=10&categories=4&exclude_tags=81`
    // );

    // const posts = await res.json();
    // const filtered = postFilter.excludeProtected({ posts });
    // return filtered.slice(0, 3);
    return this.getRecentPostsByType({ type: "journal" });
  }

  async getRecentEssays() {
    // const res = await fetch(
    //   `${wpRootUrl}/posts?per_page=10&categories=31&exclude_tags=81`
    // );

    // const posts = await res.json();
    // const filtered = postFilter.excludeProtected({ posts });
    // return filtered.slice(0, 3);
    return this.getRecentPostsByType({ type: "essay" });
  }
  async getRecentTips() {
    // const res = await fetch(
    //   `${wpRootUrl}/posts?per_page=10&categories=30&exclude_tags=81`
    // );

    // const posts = await res.json();
    // const filtered = postFilter.excludeProtected({ posts });
    // return filtered.slice(0, 3);
    return this.getRecentPostsByType({ type: "tip" });
  }

  async getRecentPostByCategoryId({ categoryId }) {
    const res = await fetch(
      `${wpRootUrl}/posts?per_page=10&categories=${categoryId}`
    );

    const posts = await res.json();
    const filtered = postFilter.excludeProtected({ posts });
    return filtered.slice(0, 3);
  }

  async getRecentPostsByType({ type }) {
    let categoryId = 82; // 4 => journal
    if (type === "essay") {
      categoryId = 31;
    }
    if (type === "tip") {
      categoryId = 30;
    }
    return this.getRecentPostByCategoryId({ categoryId });
  }

  async getPost({ id }) {
    const res = await fetch(`${wpRootUrl}/posts/${id}`);
    const post = await res.json();
    return post;
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
