import React from "react";
import Head from "next/head";
import Link from "next/link";
import styled from "styled-components";
import moment from "moment";

import { Api, Styles } from "../src/utils";
import { Comments, Form } from "../src/components/comment";
import { BaseBar } from "../src/components/navigation";
import { MetaShares } from "../src/components/social";

class Post extends React.Component {
  static async getInitialProps({ req }) {
    console.log("pages/post req.url", req.url);
    const matches = req.url.replace("/posts/", "").match(/^\d+/i);

    console.log("matches", matches);
    const id = parseInt(matches[0]);
    console.log("id", id);
    const post = await Api.getPost({ id });

    const comments = await Api.getCommentsByPost({ id });

    //   console.log("cmp/comment/Comments#cmpDM comments", comments);
    comments.sort((a, b) => moment(a.date).unix() - moment(b.date).unix());
    //   this.setState({
    //     comments
    //   });

    // console.log("pages/post#getInitialProps post", Object.keys(post).length);
    // console.log("pages/post#getInitialProps post.title", post.title.rendered);
    // console.log(
    //   "pages/post#getInitialProps comments",
    //   Object.keys(comments).length
    // );

    return {
      post,
      comments
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      comments: props.comments
    };

    this.onAddComment = this.onAddComment.bind(this);
  }

  onAddComment({ comment }) {
    const comments = this.state.comments;
    comments.push(comment);
    this.setState({
      comments
    });
  }

  render() {
    // console.log("pages/post#render");
    // console.log("pages/post#render props", this.props);

    const { title, content, id, date } = this.props.post;
    return (
      <div className="container-fluid">
        <Head>
          <title>{title.clean}</title>
          <MetaShares post={this.props.post} />
          <style>
            {`
                 h1, h2, h3, h4, h5, h6 {
                    color: ${Styles.colors.main}
                }
                h2 {
                    font-size: 20px;
                }
                h3 {
                    font-size: 18px;
                }
                h4, h5, h6 {
                    font-size: 14px;
                }
                blockquote {
                  border-left-width: 1px;
                  border-left-color: ${Styles.colors.main};
                  border-left-style: solid;
                  margin: 0 0 0 20px;
                  padding: 1px 0 1px 10px;
                }
                body.jenaic blockquote {
                  background: rgba(185, 0, 0, .3);
                }
                body.kyeda blockquote {
                  background: rgba(55, 73, 118, .3);
                }
                
            `}
          </style>
        </Head>
        <BaseBar />
        <div className="row" style={{ marginTop: 10 }}>
          <div className="col-10 offset-1 col-md-8 offset-md-2">
            <h1
              style={{
                ...Styles.text.header,
                color: Styles.colors.main,
                textAlign: "center"
              }}
            >
              {title.clean}
            </h1>
          </div>
        </div>
        <div className="row">
          <div className="col-10 offset-1 col-md-8 offset-md-2">
            <time dateTime={moment(date).format("YYYY-MM-DD")}>
              {moment(date).format("ddd MMM, Do")}
            </time>
          </div>
        </div>
        <div className="row">
          <div className="col-10 offset-1 col-md-8 offset-md-2">
            <div
              style={{
                ...Styles.text.body
              }}
              dangerouslySetInnerHTML={{ __html: content.rendered }}
            />
          </div>
        </div>
        <Comments postId={id} comments={this.state.comments} />
        <div className="row">
          <div className="col-10 offset-1 col-md-8 offset-md-2">
            <Form postId={id} onSubmit={this.onAddComment} />
          </div>
        </div>
      </div>
    );
  }
}

export default Post;
