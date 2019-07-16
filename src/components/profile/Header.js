import { SocialIcons } from ".";
import { Styles } from "../../utils";

import { Avatar } from ".";

const KyedaHeader = () => {
  const letterHead = {
    ...Styles.text.header,
    color: Styles.colors.main,
    fontSize: "1.3em"
  };
  return (
    <div className="container">
      <div className="row" style={{ paddingTop: 5 }}>
        <div className="col-6 col-md-2 offset-md-4">
          <h2
            className="col"
            style={{
              ...Styles.text.header,
              color: Styles.colors.main,
              textAlign: "center"
              // color: Styles.colors.tertiary
            }}
          >
            KYEDA
          </h2>
          <Avatar imgPath={"/static/img/kyeda.png"} size={150} />
        </div>
        <div className="col-6 col-md-4">
          <div className="row">
            <blockquote
              className="col"
              style={{
                fontFamily: "Georgia, serif",
                fontSize: ".9em"
              }}
            >
              <p>
                <span style={letterHead}>K</span>
                now
              </p>
              <p>
                <span style={letterHead}>Y</span>
                ourself
              </p>
              <p>
                <span style={letterHead}>E</span>
                mbrace
              </p>
              <p>
                <span style={letterHead}>D</span>
                iscomfort
              </p>
              <p>and take</p>
              <p>
                <span style={letterHead}>A</span>
                ction
              </p>
            </blockquote>
          </div>
        </div>
      </div>
      <SocialIcons />
    </div>
  );
};
const JenaicHeader = () => {
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

export default () =>
  process.env.SITE_ID === "kyeda" ? <KyedaHeader /> : <JenaicHeader />;
