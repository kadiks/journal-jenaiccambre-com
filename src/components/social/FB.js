import { Fragment } from "react";
export default ({ post }) => {
  return (
    <Fragment>
      <meta property="og:url" content={post.destLink} />
      <meta property="og:type" content="article" />
      <meta property="og:title" content={post.title.rendered} />
      <meta property="og:description" content={post.excerpt.clean} />
      <meta property="og:image" content={post.shareImageLink} />
    </Fragment>
  );
};
