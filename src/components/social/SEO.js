import { Fragment } from "react";
export default ({ post }) => {
  return (
    <Fragment>
      <meta name="description" content={post.meta.description} />
      <link rel="canonical" href={post.absoluteDestLink} />
    </Fragment>
  );
};
