import Layout from '../components/layout/layout';
import Head from 'next/head'
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <meta name="viewport" content="intial-scale=1.0" />
        <title>NextJs Events</title>
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}



export default MyApp;
