import Head from "next/head";
import 'regenerator-runtime';

import "../styles/globals.css";
import "../styles/animation.css";

function MyApp({ Component, pageProps }) {
  

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, minimum-scale=1.0, user-scalable=no"
        />
      </Head>
			<Component {...pageProps} />
    </>
  );
}

export default MyApp;
