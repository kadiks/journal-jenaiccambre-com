import { SocialIcon } from "../core";
const socialIcons = [
  {
    name: "twitter",
    link: "http://twitter.com/kryptonikco/"
  },
  {
    name: "youtube",
    link: "https://www.youtube.com/channel/UCk_jcw5WJA2krzIUSvixUYg"
  },
  {
    name: "linkedin",
    link: "https://www.linkedin.com/in/jenaiccambre/"
  }
];
export default () => {
  return (
    <div className="row social-icons" style={{ paddingBottom: 20 }}>
      <div className="col-4 offset-4">
        <div className="row">
          {socialIcons.map((props, index) => (
            <SocialIcon key={index} color={"#B90000"} {...props} />
          ))}
        </div>
      </div>
    </div>
  );
};
