import React, { Fragment } from "react";
import moment from "moment";

import { Styles } from "../../utils";
import { Card } from ".";

class Featured extends React.Component {
  render() {
    const dateFormat = "ddd MMM, Do";
    return (
      <div
        className="row"
        style={{
          backgroundColor: Styles.colors.main,
          paddingTop: 5,
          paddingBottom: 15
        }}
      >
        <h3 className="col-12" style={{ textAlign: "center" }}>
          Journal
        </h3>
        {this.props.posts.map(post => {
          return (
            <div className="col-12 col-md-4" key={post.id}>
              <h2
                style={{
                  ...Styles.text.header
                }}
              >
                {moment(post.date).format(dateFormat)}
              </h2>
              <Card {...post} />
            </div>
          );
        })}
      </div>
    );
    return (
      <Fragment>
        <div className="row" style={{ backgroundColor: Styles.colors.main }}>
          {this.props.posts.map(post => {
            return (
              <div className="col-4" key={post.id}>
                <Card {...post} />
              </div>
            );
          })}
        </div>
        {/* <div
          className="row"
          style={{
            textAlign: "right",
            backgroundColor: Styles.colors.main
          }}
        >
          <div className="col">
            <Link href="/posts">
              <a style={{ ...Styles.text.body, color: Styles.colors.tertiary }}>
                See all articles
              </a>
            </Link>
          </div>
        </div> */}
      </Fragment>
    );
  }
}

export default Featured;
