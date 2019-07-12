import React from "react";
import Head from "next/head";
import Link from "next/link";
import styled from "styled-components";
import moment from "moment";

import { Api, Styles } from "../src/utils";
import { Comments, Form } from "../src/components/comment";
import { BaseBar } from "../src/components/navigation";

class Post extends React.Component {
  static async getInitialProps({ req }) {
    console.log("pages/post req.url", req.url);
    const matches = req.url.replace("/posts/", "").match(/^\d+/i);

    console.log("matches", matches);
    console.log("id", id);
    const id = parseInt(matches[0]);
    const post = await Api.getPost({ id });

    const comments = await Api.getCommentsByPost({ id });

    //   console.log("cmp/comment/Comments#cmpDM comments", comments);
    comments.sort((a, b) => moment(a.date).unix() - moment(b.date).unix());
    //   this.setState({
    //     comments
    //   });

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
    const { title, content, id } = this.props.post;
    return (
      <div className="container-fluid">
        <Head>
          <title>{title.rendered}</title>
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
                  background: rgba(185, 0, 0, .3);
                  padding: 1px 0 1px 10px;
                }
                
            `}
          </style>
        </Head>
        <BaseBar />
        <div className="row">
          <div className="col-10 offset-1 col-md-8 offset-md-2">
            <h1
              style={{
                ...Styles.text.header,
                color: Styles.colors.main,
                textAlign: "center"
              }}
            >
              {title.rendered}
            </h1>
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
