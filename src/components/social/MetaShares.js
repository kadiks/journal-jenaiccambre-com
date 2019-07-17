import { Fragment } from "react";
import { FB, Twitter, SEO } from ".";

export default ({ post }) => {
  return (
    <Fragment>
      <SEO post={post} />
      <FB post={post} />
      <Twitter post={post} />
    </Fragment>
  );
};
