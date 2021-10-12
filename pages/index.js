import { useEffect, useState } from 'react';
import Head from 'next/head'
import EventList from '../components/events/event-list';
import { getAllEvents } from '../helpers/api-util'
import { getFeaturedEvents } from '../helpers/api-util'

function HomePage(props) {
  const { featuredEvents } = props;
  return (
    <>
      <Head>
        <title>Next JS Events</title>
        <meta name="description" content="Find A lot of NextJS events" />
      </Head>
      <div>
        <EventList items={featuredEvents} />
      </div>
    </>
  );
}

export const getStaticProps = async () => {

  const allEvents = await getAllEvents()
  const featuredEvents = getFeaturedEvents(allEvents)


  return {
    props: {
      featuredEvents: featuredEvents
    }, revalidate: 1800
  }
}
export default HomePage;
