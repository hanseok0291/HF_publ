import Document, { Html, Head, Main, NextScript } from "next/document";
import { GA_TRACKING_ID, IS_PRD } from "../components/common/Properties";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <NextScript />
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          {IS_PRD && (
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
            />
          )}
          {IS_PRD && (
            <script
              dangerouslySetInnerHTML={{
                __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${GA_TRACKING_ID}');
          `,
              }}
            />
          )}
        </Head>

        <body>
          <Main />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
