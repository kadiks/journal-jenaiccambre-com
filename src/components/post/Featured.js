import React from "react";

import { Card } from ".";

class Featured extends React.Component {
  render() {
    return (
      <div className="row">
        {this.props.posts.map(post => {
          return (
            <div className="col-4" key={post.id}>
              <Card {...post} />
            </div>
          );
        })}
      </div>
    );
  }
}

export default Featured;
