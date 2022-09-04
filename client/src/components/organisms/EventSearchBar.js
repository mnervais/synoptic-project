import { useState, useEffect } from "react";
import { listEventsByTitle } from "../../util/API";

import SearchBar from "../molecules/SearchBar";
import EventList from "../molecules/EventList";
import EventCard from "../molecules/EventCard";

const EventSearch = ({ id, className, onEventChange }) => {
  const [events, setEvents] = useState([]);
  const [event, setEvent] = useState({});

  const listEvents = async (title) => {
    try {
      const listEvents = await listEventsByTitle(title);
      setEvents(listEvents);
    } catch (err) {}
  };

  useEffect(() => {
    onEventChange(event);
  }, [event]);

  return (
    <div id={`${id}`} className={`${className}`}>
      <SearchBar
        id="searchBar"
        className="searchBar position-fixed z-1 m-2"
        onChangeCallback={(value) => {
          listEvents(value);
          setEvent({});
        }}
      />
      <EventList
        events={events}
        id=""
        className="position-fixed z-1 m-2"
        onClickCallback={(item) => {
          setEvent(item);
        }}
      />
      <EventCard
        id=""
        className="position-fixed z-1 float-right"
        event={event}
      />
    </div>
  );
};

export default EventSearch;
