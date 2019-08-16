import React from "react";
import Head from "next/head";
import Link from "next/link";
import styled from "styled-components";
import moment from "moment";

import { Api, Styles } from "../src/utils";
import { Comments, Form } from "../src/components/comment";
import { BaseBar } from "../src/components/navigation";
import { MetaShares, ShareThisPost } from "../src/components/social";
import { Card } from "../src/components/post";

class ExtraordinaryLife extends React.Component {
  static async getInitialProps({ req }) {
    const posts = await Api.getFrenchExtraordinaryTips();
    return { posts };
  }
  render() {
    const { posts } = this.props;
    return (
      <div>
        <h1>100 astuces pour une vie extraordinaire</h1>
        <p>(avec des moyens ordinaires)</p>
        {posts.length < 100 && <p>{posts.length} pour le moment</p>}
        {posts.map((post, index) => {
          return <Card key={index} {...post} />;
        })}
      </div>
    );
  }
}

export default ExtraordinaryLife;
