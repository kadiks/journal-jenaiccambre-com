import React from "react";
import { Api } from "../src/utils";

import { Featured } from "../src/components/post";

import "bootstrap/dist/css/bootstrap-grid.min.css";

class Home extends React.Component {
  static async getInitialProps({ query }) {
    const posts = await Api.getRecentPosts();
    return {
      posts
    };
  }
  render() {
    console.log("pages/index#render");
    // console.log("pages/index#render props", this.props);
    return (
      <div className="container">
        <Featured posts={this.props.posts} />
      </div>
    );
  }
}

export default Home;
