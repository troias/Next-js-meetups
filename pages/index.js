import { useEffect, useState } from 'react';
import EventList from '../components/events/event-list';
import {getAllEvents} from '../helpers/api-util'
import {getFeaturedEvents} from '../helpers/api-util'

function HomePage(props) {
 const {featuredEvents} = props;
  return (
    <div>
      <EventList items={featuredEvents} />
    </div>
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
