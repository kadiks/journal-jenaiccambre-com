import { Fragment } from "react";
export default ({ post }) => {
  const creator =
    process.env.SITE_ID === "kyeda" ? "@kyeda_app" : "@jenaiccambre";
  return (
    <Fragment>
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={creator} />
      <meta name="twitter:creator" content={creator} />
      <meta name="twitter:title" content={post.title.clean} />
      <meta name="twitter:description" content={post.meta.description} />
      <meta name="twitter:image" content={post.shareImageLink} />
    </Fragment>
  );
};
