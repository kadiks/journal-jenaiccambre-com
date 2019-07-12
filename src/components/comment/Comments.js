import React from "react";

import { Api, Styles } from "../../utils";

import moment from "moment";

class Comments extends React.Component {
  // state = {
  //   comments: []
  // };
  // async componentDidMount() {
  //   const comments = await Api.getCommentsByPost({ id: this.props.postId });

  //   console.log("cmp/comment/Comments#cmpDM comments", comments);
  //   comments.sort((a, b) => moment(a.date).unix() - moment(b.date).unix());
  //   this.setState({
  //     comments
  //   });
  // }
  render() {
    const { comments } = this.props;
    if (comments.length === 0) {
      return (
        <div
          className="row comments"
          style={{
            backgroundColor: Styles.colors.main
          }}
        >
          <div className="col-10 offset-1 col-lg-8 offset-lg-2">
            <h3 style={{ color: Styles.colors.tertiary }}>
              No comments yet. Be the first to write one.
            </h3>
          </div>
        </div>
      );
    }
    return (
      <div
        className="row comments"
        style={{
          backgroundColor: Styles.colors.main,
          paddingBottom: 15
        }}
      >
        <div className="col">
          <h2 style={{ textAlign: "center", color: Styles.colors.tertiary }}>
            Comments ({comments.length})
          </h2>
          {comments.map(comment => {
            return (
              <div key={comment.id} className="row">
                <div
                  className="col-10 offset-1 col-lg-8 offset-lg-2"
                  style={{
                    backgroundColor: Styles.colors.tertiary,
                    marginTop: 15
                  }}
                >
                  <div className="row">
                    <div className="col-2">
                      <img
                        style={{ paddingTop: 15, paddingBottom: 15 }}
                        src={comment.author_avatar_urls["96"]}
                        alt={comment.author_name}
                      />
                    </div>
                    <div className="col-10">
                      <h3>{comment.author_name}</h3>
                      <p style={{ marginTop: -15 }}>
                        {moment(comment.date).format("ddd MMM, Do - HH:mm:ss")}
                      </p>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: comment.content.rendered
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Comments;
