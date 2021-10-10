import { useEffect, useState } from 'react';
import { getFeaturedEvents } from '../dummy-data';
import EventList from '../components/events/event-list';

function HomePage(props) {
 
  // const featuredEvents = getFeaturedEvents();
  const [ featuredEvents, setFeaturedEvents] = useState([])
 
  useEffect(() => {

    let transformedData = []
    for (const x in props ) {
      transformedData.push({
        id: x,
        description: props[x].description,
        image: props[x].image,
        isFeatured: props[x].isFeatured,
        location: props[x].location,
        title: props[x].title,
      })
    }
    setFeaturedEvents(transformedData)
    console.log("transformedData", transformedData)
  }, [])



  return (
    <div>
      <EventList items={featuredEvents} />
    </div>
  );
}

export const getStaticProps = async (ctx) => {

  const req = await fetch("https://next-js-example-8e3b6-default-rtdb.firebaseio.com/events.json")
  const res = await req.json()

  return {
    props: res
  }
}
export default HomePage;
