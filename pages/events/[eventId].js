import { Fragment } from 'react';
import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';
import ErrorAlert from '../../components/ui/error-alert';

function EventDetailPage(props) {
  const {event} = props;
  console.log("EventDetailPageProps", props)
   // const event = getEventById(eventId);
 
  

  if (!props.event) {
    return (
      <ErrorAlert>
        <p>No event found!</p>
      </ErrorAlert>
    );
  }

  return (
    <Fragment>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
}
export const getStaticPaths = async  (ctx) => {
  return {
    paths: [
      {params: {eventId: "e1"}},
      {params: {eventId: "e2"}}
    ],  fallback: false
  }
}

export const getStaticProps = async (ctx) => {
 
  const eventId = ctx.params.eventId
  const req = await fetch(`https://next-js-example-8e3b6-default-rtdb.firebaseio.com/events.json?orderBy="$key"&equalTo="${eventId}"`)
  const res = await req.json()
  const event = res[`${eventId}`]
  

  return {
    props: {
      event: {
        title: event.title,
        date: event.date,
        location: event.location,
        image: event.image,
        description: event.description
      }
    },
  }
}

export default EventDetailPage;
