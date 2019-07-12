import { Styles } from "../../utils";

export default ({ imgPath, size }) => {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.5,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: Styles.colors.main,
        margin: "0 auto",
        textAlign: "center"
      }}
    >
      <img
        src={imgPath}
        style={{
          width: size - 8,
          height: size - 8,
          borderRadius: (size - 8) * 0.5,
          top: 3,
          position: "relative",
          borderWidth: 1,
          borderColor: Styles.colors.main
        }}
      />
    </div>
  );
};
