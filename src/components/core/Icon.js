import React from "react";

class Icon extends React.Component {
  render() {
    const { color, name, size } = this.props;
    return (
      <i
        className={`fa fa-${name}`}
        style={{
          color,
          fontSize: size
        }}
      />
    );
  }
}

Icon.defaultProps = {
  name: "home",
  color: "black",
  size: 20
};

export default Icon;
