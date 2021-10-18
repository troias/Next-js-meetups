import { Fragment } from 'react';
import {useRouter} from 'next/router'
import Head from 'next/head'
import { getEventById, getAllEvents } from '../../helpers/api-util'
import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';
import ErrorAlert from '../../components/ui/error-alert';
import Comments from '../../components/inputs/comment'
function EventDetailPage(props) {
  const router = useRouter()
  const eventId = router.query.eventId
 
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
       <Head>
        <title>{event.title}</title>
        <meta name="description" content="Find A lot of NextJS events" />
      </Head>
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
      <Comments eventId={eventId} />
    
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
