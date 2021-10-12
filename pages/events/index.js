import { Fragment } from 'react';
import { getAllEvents } from '../../helpers/api-util';
import {useRouter} from 'next/router'
import EventList from '../../components/events/event-list';
import EventsSearch from '../../components/events/events-search';

function AllEventsPage(props) {
  const router = useRouter()
  const {events} = props 

  console.log("events", events)

  function findEventsHandler(year, month) {
    const fullPath = `/events/${year}/${month}`;
    
    router.push(fullPath);
  }

  return (
    <Fragment>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} /> 
    </Fragment>
  );
}


export const getStaticProps = async () => {

  const events = await getAllEvents();
  console.log("events", events)

  return {
    props: {
      events: events
    }, revalidate: 60
  }
}

export default AllEventsPage;
