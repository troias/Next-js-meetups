import Layout from '../components/layout/layout';
import Head from 'next/head'
import '../styles/globals.css';
import {NotificationContextProvider} from '../contextStore/notification-context'
function MyApp({ Component, pageProps }) {
  return (
    <NotificationContextProvider>
      <Layout>
        <Head>
          <meta name="viewport" content="intial-scale=1.0" />
          <title>NextJs Events</title>
        </Head>
        <Component {...pageProps} />
       
      </Layout>
    </NotificationContextProvider>
  );
}



export default MyApp;
