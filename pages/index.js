import React from "react";
import Head from "next/head";
import Link from "next/link";

import { Api, Styles } from "../src/utils";
import { Header } from "../src/components/profile";

import { Featured, TwoColumns } from "../src/components/post";

import { BaseBar } from "../src/components/navigation";

class Home extends React.Component {
  static async getInitialProps({ query }) {
    const journals = await Api.getRecentJournal();
    const essays = await Api.getRecentEssays();
    const tips = await Api.getRecentTips();

    return {
      journals,
      essays,
      tips
    };
  }
  render() {
    console.log("pages/index#render");
    console.log("pages/index#render props", this.props.tips.length);
    return (
      <div className="container-fluid">
        <Head>
          <title>Journal - Jénaïc Cambré</title>
          <style>
            {`
              body {
                margin: 0;
              }
            `}
          </style>
        </Head>
        <BaseBar isHome={false} />
        <Header />
        <Featured posts={this.props.journals} />
        <TwoColumns
          columnOneTitle={"Essay"}
          columnOnePosts={this.props.essays}
          columnTwoTitle={"Tips"}
          columnTwoPosts={this.props.tips}
        />
      </div>
    );
  }
}

export default Home;
