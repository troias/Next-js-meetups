import { Fragment } from 'react';
import { getEventById, getAllEvents } from '../../helpers/api-util'
import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';
import ErrorAlert from '../../components/ui/error-alert';

function EventDetailPage(props) {
  const { event } = props;


  if (!event) {
    return (
      <div className="center">
        <p>Loading</p>
      </div>
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
export const getStaticPaths = async () => {

  const data = await getAllEvents()
  const paths = data.map(x => ({
    params: { eventId: x.id }
  }))

  return {
    paths: paths, fallback: "blocking"
  }
}

export const getStaticProps = async (ctx) => {

  const eventId = ctx.params.eventId
  const event = await getEventById(eventId)


  return {
    props: {
      event: {
        title: event.title,
        date: event.date,
        location: event.location,
        image: event.image,
        description: event.description
      }
    }, revalidate: 180
  }
}

export default EventDetailPage;
