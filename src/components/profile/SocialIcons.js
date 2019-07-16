import { SocialIcon } from "../core";
const socialIcons = [
  {
    name: "instagram",
    link:
      process.env.SITE_ID === "kyeda"
        ? "https://instagram.com/kyeda.app"
        : "https://instagram.com/jenaiccambre/"
  },
  {
    name: "youtube",
    link: "https://www.youtube.com/channel/UCk_jcw5WJA2krzIUSvixUYg"
  },
  {
    name: "twitter",
    link: "https://twitter.com/kryptonikco/"
  }
];
export default () => {
  return (
    <div className="row social-icons" style={{ paddingBottom: 20 }}>
      <div className="col-12 col-md-4 offset-md-4">
        <div className="row">
          {socialIcons.map((props, index) => (
            <SocialIcon key={index} color={"#B90000"} {...props} />
          ))}
        </div>
      </div>
    </div>
  );
};
