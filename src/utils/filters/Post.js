const excludeProtected = ({ posts = [] }) => {
  const notProtectedPosts = posts.filter(post => {
    return post.excerpt.protected !== true;
  });
  return notProtectedPosts;
};

module.exports = { excludeProtected };
