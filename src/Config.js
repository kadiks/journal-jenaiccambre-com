const id = process.env.SITE_ID;

const configs = {
  jenaic: {
    id: "jenaic",
    site: {
      name: "Journal - Jénaïc Cambré",
      protocol: "https",
      host: "jenaiccambre.com"
    },
    analytics: {
      google: {
        code: "UA-12326200-2"
      }
    }
  },
  kyeda: {
    id: "kyeda",
    site: {
      name: "Kyeda",
      protocol: "https",
      host: "kyeda.app"
    },
    analytics: {
      google: {
        code: "UA-111706521-1"
      }
    }
  }
};

const selectedConfig = JSON.parse(JSON.stringify(configs[id]));

if (process.env.NODE_ENV !== "production") {
  selectedConfig.site.protocol = "http";
  selectedConfig.site.host = `localhost:${process.env.PORT}`;
}

module.exports = { ...selectedConfig, ...configs };
