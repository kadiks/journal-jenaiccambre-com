import React from "react";
import Link from "next/link";

import { Styles } from "../../utils";
import { Icon } from "../core";

class BaseBar extends React.Component {
  displayHome() {
    const { isHome } = this.props;
    if (isHome === false) {
      return null;
    }
    return (
      <div className="col-10 offset-1 col-md-8 offset-md-2">
        <div
          style={{
            backgroundColor: Styles.colors.main,
            padding: 5,
            borderRadius: 3,
            top: -5,
            position: "absolute",
            width: 30,
            cursor: "pointer"
          }}
        >
          <Link href={"/"}>
            <a>
              <Icon name="home" color={Styles.colors.tertiary} size={20} />
            </a>
          </Link>
        </div>
      </div>
    );
  }

  displayExternals() {
    const externals = ["photos", "cv"];
    const details = {
      photos: {
        link: "https://jenaiccambre.pixieset.com",
        name: "Photos",
        icon: "camera"
      },
      cv: {
        link: "http://cv.jenaiccambre.com",
        name: "CV",
        icon: "user"
      }
    };
    return externals.map(ext => {
      const detail = details[ext];
      return (
        <Link href={detail.link} key={ext}>
          <a
            target="_blank"
            style={{
              backgroundColor: Styles.colors.main,
              padding: 5,
              position: "relative",
              color: Styles.colors.tertiary,
              textDecoration: "none",
              marginLeft: 5,
              borderRadius: 5
            }}
          >
            <Icon name={detail.icon} color={Styles.colors.tertiary} />{" "}
            {detail.name}
          </a>
        </Link>
      );
    });
  }
  render() {
    return (
      <div className="row">
        <div
          style={{
            height: 5,
            width: "100%",
            backgroundColor: Styles.colors.main
          }}
        />
        {this.displayHome()}
        <div
          className="col-10 offset-1 col-md-8 offset-md-2"
          style={{ textAlign: "right" }}
        >
          {this.displayExternals()}
        </div>
      </div>
    );
  }
}

BaseBar.defaultProps = {
  isHome: true
};

export default BaseBar;
