import { Fragment } from "react";
export default ({ post }) => {
  return (
    <Fragment>
      <meta property="og:url" content={post.absoluteDestLink} />
      <meta property="og:type" content="article" />
      <meta property="og:title" content={post.title.clean} />
      <meta property="og:description" content={post.meta.description} />
      <meta property="og:image" content={post.shareImageLink} />
    </Fragment>
  );
};
