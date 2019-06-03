import React from "react";
import Link from "next/link";
import styled from "styled-components";

import { Styles } from "../../utils";

const Container = styled.div`
  background-color: ${Styles.colors.background};
  color: ${Styles.colors.body},
  padding: 1px 15px;
  box-shadow: 10px 15px rgba(0, 0, 0, 0.2);
  margin-bottom: 25px;
`;

class Card extends React.Component {
  render() {
    const { title, excerpt } = this.props;
    const link = "";
    return (
      <div
        style={{
          backgroundColor: Styles.colors.background,
          color: Styles.colors.body,
          padding: "1px 15px",
          boxShadow: "10px 15px rgba(0, 0, 0, 0.2)",
          marginBottom: 25
        }}
      >
        <Link to={link} css={{ textDecoration: `none` }}>
          <h3
            style={{ color: Styles.colors.main }}
            dangerouslySetInnerHTML={{
              __html: title.rendered
            }}
          />
        </Link>
        <div
          dangerouslySetInnerHTML={{
            __html: `${excerpt.rendered.slice(0, 100)}...`
          }}
        />
      </div>
    );
  }
}

export default Card;
