import { Fragment } from 'react';
import Head from 'next/head'
import { useRouter } from 'next/router';
import { getFilteredEvents } from '../../helpers/api-util';
import EventList from '../../components/events/event-list';
import ResultsTitle from '../../components/events/results-title';
import Button from '../../components/ui/button';
import ErrorAlert from '../../components/ui/error-alert';

function FilteredEventsPage(props) {
  const { numYear, numMonth, filteredEvents } = props
  const router = useRouter();

  const filterData = router.query.slug;

  if (!filterData) {
    return <p className='center'>Loading...</p>;
  }

  const date = new Date(numYear, numMonth - 1)
  const pageHeadData = <Head>
    <title>Events from {numYear}/{numMonth}</title>
    <meta name="description" content="Find A lot of NextJS events" />
  </Head>
  
  if (props.hasError) {
    return (
      <Fragment>
        {pageHeadData}
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>
        <div className='center'>
          <Button link='/events'>Show All Events</Button>
        </div>
      </Fragment>
    );
  }



  return (
    <Fragment>
      {pageHeadData}
   
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </Fragment>
  );
}

export const getServerSideProps = async (context) => {

  const { params } = context
  const filteredData = params.slug

  console.log("filteredData", filteredData)

  const filteredYear = filteredData[0];
  const filteredMonth = filteredData[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;



  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return {
      props: {
        hasError: true,
      },
      // notFound: true,
    }
  }



  const dateFilter = {
    year: numYear,
    month: numMonth,
  }

  const filteredEvents = await getFilteredEvents(dateFilter);


  return {
    props: {
      numYear,
      numMonth,
      filteredEvents: filteredEvents
    }
  }
}

export default FilteredEventsPage;
