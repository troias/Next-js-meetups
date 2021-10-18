
export const getAllEvents = async () => {

    const req = await fetch("https://next-js-example-8e3b6-default-rtdb.firebaseio.com/events.json?")
    const res = await req.json()

    let transformedData = []

    for (const x in res) {
        transformedData.push({
            id: x,
            ...res[x],
        })
    }
  
    return transformedData
}

export const getEventById = async (eventId) => {
    const req = await fetch(`https://next-js-example-8e3b6-default-rtdb.firebaseio.com/events.json?orderBy="$key"&equalTo="${eventId}"`)
    const res = await req.json()
    const event = res[`${eventId}`]
    return event
}
export const getFeaturedEvents =  (allEvents) => {
    return allEvents.filter(event => event.isFeatured)
}

export const getFilteredEvents = async (dateFilter) => {
    const { year, month } = dateFilter;
    const allEvents = await  getAllEvents()

    let filteredEvents = allEvents.filter((event) => {
      const eventDate = new Date(event.date);
      return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1;
    });
  
    return filteredEvents;
  }