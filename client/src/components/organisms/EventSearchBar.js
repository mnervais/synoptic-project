import { useState, useEffect } from "react";
import { listEventsByTitle } from "../../util/API";
import { eventExpired } from "../../util/filter";

import SearchBar from "../molecules/SearchBar";
import EventList from "../molecules/EventList";
import EventCard from "../molecules/EventCard";

const EventSearch = ({
  event,
  setEvent,
  setFilteredEvents,
  id,
  className,
  onEventChange,
}) => {
  const [events, setEvents] = useState([]);

  const listEvents = async (title) => {
    try {
      const listEvents = await listEventsByTitle(title);

      for (var i = listEvents.length - 1; i >= 0; i--) {
        let event = listEvents[i];
        if (eventExpired(event)) listEvents.splice(i, 1);
      }

      setEvents(listEvents);
      setFilteredEvents(listEvents);
    } catch (err) {}
  };

  useEffect(() => {
    onEventChange(event);
  }, [event]);

  return (
    <div id={`${id}`} className={`${className}`}>
      <div>
        <SearchBar
          id="searchBar"
          className="searchBar"
          onChangeCallback={(value) => {
            listEvents(value);
            setEvent({});
          }}
        />
      </div>
      <div id="searchResults">
        <EventList
          events={events}
          id=""
          className="mt-2"
          onClick={(item) => {
            setEvent(item);
            setEvents([]);
          }}
        />
      </div>
      <div>
        <EventCard id="" className="mt-2" event={event} />
      </div>
    </div>
  );
};

export default EventSearch;
