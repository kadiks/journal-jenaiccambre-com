import React from "react";
import Head from "next/head";
import Link from "next/link";

import { Api, Styles } from "../src/utils";
import { Header } from "../src/components/profile";

import { Featured, TwoColumns } from "../src/components/post";

import { BaseBar } from "../src/components/navigation";

class Home extends React.Component {
  static async getInitialProps({ query }) {
    // console.log(
    //   "pages/index#getInitialProps process.env.SITE_ID",
    //   process.env.SITE_ID
    // );
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
    // console.log("pages/index#render");
    // console.log("pages/index#render props", this.props.tips.length);
    // console.log("pages/index#render process.env.SITE_ID", process.env.SITE_ID);
    return (
      <div className="container-fluid">
        <Head>
          <title>
            {process.env.SITE_ID === "kyeda"
              ? "Kyeda's blog - Personal development - Know Yourself Embrace Discomfort and take Action"
              : "Journal - Jénaïc Cambré"}
          </title>
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
        <Featured
          posts={
            process.env.SITE_ID === "kyeda"
              ? this.props.tips
              : this.props.journals
          }
        />
        <TwoColumns
          columnOneTitle={"Essay"}
          columnOnePosts={this.props.essays}
          columnTwoTitle={process.env.SITE_ID === "kyeda" ? "Journal" : "Tips"}
          columnTwoPosts={
            process.env.SITE_ID === "kyeda"
              ? this.props.journals
              : this.props.tips
          }
        />
      </div>
    );
  }
}

export default Home;
