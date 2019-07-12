import Config from "../../Config";
export default () => {
  const path =
    Config.id === "jenaic"
      ? "/static/img/favicon_jenaic.ico"
      : "/static/img/favicon_kyeda.ico";
  return <link rel="shortcut icon" type="image/x-icon" href={path} />;
};
