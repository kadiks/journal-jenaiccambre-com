import Config from "../Config";

const mainColor = "#B90000";
const secondaryColor = "#AAA";
const tertiaryColor = "#FFF";
const kryptonikColor = "#1C9838";
const kyedaColor = "#374976";

const jenaic = {
  text: {
    body: {
      fontFamily: "Lato",
      fontWeight: 300
    },
    header: {
      fontFamily: "Raleway",
      fontWeight: 400
    }
  },
  colors: {
    main: mainColor,
    secondary: secondaryColor,
    tertiary: tertiaryColor,
    background: "#FFF",
    body: "#333",
    kryptonik: kryptonikColor,
    kyeda: kyedaColor
  },
  topBar: {
    height: 5,
    backgroundColor: mainColor,
    marginBottom: 10
  }
};

const kyeda = {
  text: {
    body: {
      fontFamily: "Lato",
      fontWeight: 300
    },
    header: {
      fontFamily: "Raleway",
      fontWeight: 400
    }
  },
  colors: {
    main: kyedaColor,
    secondary: secondaryColor,
    tertiary: tertiaryColor,
    background: "#FFF",
    body: "#333",
    kryptonik: kryptonikColor,
    kyeda: kyedaColor
  },
  topBar: {
    height: 5,
    backgroundColor: mainColor,
    marginBottom: 10
  }
};

const Styles = {
  jenaic,
  kyeda
};

export default Styles[Config.id];
