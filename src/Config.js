const id = process.env.SITE_ID;

const configs = {
  jenaic: {
    id: "jenaic",
    site: {
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

module.exports = { ...configs[id], ...configs };
