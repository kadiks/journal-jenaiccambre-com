import Config from "../../Config";

export const GA_TRACKING_ID = Config.analytics.google.code;

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = url => {
  if (url.match(/localhost/i) !== null) {
    console.log("DEBUG pageview analytics:", url);
    return;
  }
  window.gtag("config", GA_TRACKING_ID, {
    page_path: url
  });
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }) => {
  if (url.match(/localhost/i) !== null) {
    console.log("DEBUG event analytics:", action, {
      event_category: category,
      event_label: label,
      value: value
    });
    return;
  }
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value
  });
};
