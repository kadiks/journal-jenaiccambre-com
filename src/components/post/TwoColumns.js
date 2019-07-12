import React, { Fragment } from "react";

import Column from "./Column";

class TwoColumns extends React.Component {
  render() {
    const {
      columnOnePosts,
      columnTwoPosts,
      columnOneTitle,
      columnTwoTitle
    } = this.props;
    return (
      <div className="row">
        <div className="col-12 col-md-6">
          <Column
            tileOrder="odd"
            posts={columnOnePosts}
            title={columnOneTitle}
          />
        </div>
        <div className="col-12 col-md-6">
          <Column posts={columnTwoPosts} title={columnTwoTitle} />
        </div>
      </div>
    );
  }
}

TwoColumns.defaultProps = {
  columnOnePosts: [],
  columnTwoPosts: [],
  columnOneTitle: "Placeholder title",
  columnTwoTitle: "Placeholder title"
};

export default TwoColumns;
