import { SocialIcons } from ".";
import { Styles } from "../../utils";

import { Avatar } from ".";

export default () => {
  return (
    <div className="container">
      <div className="row" style={{ paddingTop: 5 }}>
        <h2
          className="col"
          style={{
            ...Styles.text.header,
            color: Styles.colors.main,
            textAlign: "center"
            // color: Styles.colors.tertiary
          }}
        >
          Jénaïc Cambré
        </h2>
      </div>
      <div className="row">
        <div className="col">
          <Avatar imgPath={"/static/img/jenaic_cambre.jpg"} size={150} />
        </div>
      </div>
      <div className="row">
        <blockquote
          className="col"
          style={{
            fontFamily: "Georgia, serif",
            fontStyle: "italic",
            textAlign: "center",
            fontSize: ".9em"
            // color: Styles.colors.tertiary
          }}
        >
          “Evolving with technology” 🍃
        </blockquote>
      </div>
      <SocialIcons />
    </div>
  );
};
