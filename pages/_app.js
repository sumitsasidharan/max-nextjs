import Head from 'next/head';

import Layout from '../components/layout/layout';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
   return (
      <Layout>
         <Head>
            {/* generic title for every page unless it's overwritten */}
            <title>NextJS Events</title>
            <meta name='description' content='NextJS Events' />
            <meta name='viewport' content='initial-scale=1.0, width=device-width' />
         </Head>
         <Component {...pageProps} />
      </Layout>
   );
}

export default MyApp;
