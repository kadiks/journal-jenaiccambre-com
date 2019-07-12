import Document, { Html, Head, Main, NextScript } from "next/document";

import { GA_TRACKING_ID } from "../src/components/analytics";
import { Favicon } from "../src/components/core";
class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <meta charSet="utf8" />
          <meta
            name="viewport"
            content="width=device-width, user-scalable=no"
          />
          <Favicon />
          <link
            href="https://fonts.googleapis.com/css?family=Lato:300,300i|Raleway:600&display=swap"
            rel="stylesheet"
          />
          <link rel="stylesheet" href="/static/css/bootstrap-grid.min.css" />
          <link rel="stylesheet" href="/static/css/fontawesome.css" />
          <link rel="stylesheet" href="/static/css/styles.css" />
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            if (window.location.href.match(/localhost/i) === null) {
              gtag('js', new Date());
              gtag('config', '${GA_TRACKING_ID}');
            } else {
              console.log('Debug analytics');
            }
          `
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
