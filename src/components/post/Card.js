import React from "react";
import Link from "next/link";
import styled from "styled-components";
import moment from "moment";

import { Styles } from "../../utils";
import Config from "../../Config";

const Container = styled.div`
  background-color: ${Styles.colors.background};
  color: ${Styles.colors.body},
  padding: 1px 15px;
  box-shadow: 10px 15px rgba(0, 0, 0, 0.2);
  margin-bottom: 25px;
`;

class Card extends React.Component {
  getAnchor(customLink, title) {
    return (
      <h3
        style={{
          color: Styles.colors.main,
          ...Styles.text.header,
          display: "inline-block"
        }}
      >
        <a
          href={customLink}
          style={{
            color: "inherit",
            fontSize: "inherit",
            textDecoration: "none",
            fontWeight: "inherit",
            fontFamily: "inherit"
          }}
        >
          {title.clean}
        </a>
      </h3>
    );
  }
  getFlag() {
    if (this.props.tags.indexOf(81) < 0) {
      return null;
    }
    return (
      <img
        style={{ display: "inline-block", paddingRight: 5 }}
        src={"/static/img/fr.png"}
        alt="france flag"
      />
    );
  }

  getLink() {
    const {
      title,
      excerpt,
      link,
      id,
      date,
      destLink,
      mainCategory
    } = this.props;
    // const customLink = `/posts/${id}${link.replace(Config.wordpress.host, "")}`;
    let customLink = destLink;
    let isExternal = false;
    if (process.env.SITE_ID === "jenaic" && mainCategory === "tip") {
      isExternal = true;
      customLink = `${Config.kyeda.site.protocol}://${
        Config.kyeda.site.host
      }${customLink}`;
    }

    if (isExternal) {
      return this.getAnchor(customLink, title);
    }
    return <Link href={customLink}>{this.getAnchor(customLink, title)}</Link>;
  }

  render() {
    const {
      title,
      excerpt,
      link,
      id,
      date,
      destLink,
      mainCategory
    } = this.props;
    return (
      <div
        style={{
          backgroundColor: Styles.colors.background,
          color: Styles.colors.body,
          padding: "1px 15px",
          boxShadow: "10px 15px rgba(0, 0, 0, 0.2)",
          marginBottom: 25,
          cursor: "pointer",
          borderStyle: "solid",
          borderColor: Styles.colors.main,
          borderWidth: 1,
          height: 170
        }}
      >
        {this.getFlag()}
        {this.getLink()}
        {this.props.isFeatured === false && (
          <p
            style={{
              margin: 0,
              fontStyle: "italic",
              fontSize: "0.8em",
              marginTop: -15
            }}
          >
            {moment(date).format(
              mainCategory === "journal" ? "ddd MMM, Do" : "MMM YYYY"
            )}
          </p>
        )}
        <div
          style={{
            ...Styles.text.body
          }}
          dangerouslySetInnerHTML={{
            __html: `${excerpt.rendered.slice(0, 100)}...`
          }}
        />
      </div>
    );
  }
}

Card.defaultProps = {
  isFeatured: false
};

export default Card;
