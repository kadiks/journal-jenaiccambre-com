import React from "react";

import { Styles } from "../../utils";
import Card from "./Card";

const redBg = {
  backgroundColor: Styles.colors.main
};

class Column extends React.Component {
  render() {
    const { title, posts, tileOrder } = this.props;
    return (
      <div className="row">
        <h3
          className="col-12"
          style={{
            color: Styles.colors.main,
            textAlign: "center"
          }}
        >
          {title}
        </h3>
        {posts.map((post, index) => {
          const modulo = tileOrder === "even" ? 0 : 1;
          let cardBg = {
            padding: 10
          };
          if (index % 2 === modulo) {
            cardBg = {
              ...cardBg,
              ...redBg
            };
          }
          return (
            <div key={post.id} className="col-12" style={cardBg}>
              <div className="row">
                <div className="col-12 col-lg-8 offset-lg-2">
                  <Card {...post} displayDate={true} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

Column.defaultProps = {
  posts: [],
  title: "",
  tileOrder: "even"
};

export default Column;
