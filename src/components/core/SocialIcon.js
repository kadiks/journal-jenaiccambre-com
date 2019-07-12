import React from "react";
import Icon from "./Icon";
import Styles from "../../utils/Styles";

class SocialIcon extends React.Component {
  render() {
    const { link, name } = this.props;
    return (
      <div className="col" style={{ textAlign: "center" }}>
        <a href={link} target="_blank">
          <Icon name={name} color={Styles.colors.main} />
        </a>
      </div>
    );
  }
}

export default SocialIcon;
