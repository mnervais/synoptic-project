import { useState, useCallback } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { Marker } from "@react-google-maps/api";
import { listEventsByBounds as ListEventsByBounds } from "./util/API";
import { eventExpired } from "./util/filter";

import EventSearchBar from "./components/organisms/EventSearchBar";
import EventInputModal from "./components/organisms/EventInputModal";

import "./App.css";

function App() {
  const [map, setMap] = useState(null);
  const [center, setCenter] = useState({
    lng: -0.664654,
    lat: 51.916249,
  });
  const [zoom, setZoom] = useState(12);
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [event, setEvent] = useState({});
  const [eventInputModalOpen, setEventInputModalOpen] = useState(false);
  const [ddClickLong, setDdClickLong] = useState(0.0);
  const [ddClickLat, setDdClickLat] = useState(0.0);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const onLoad = useCallback(async function callback(map) {
    map.setZoom(zoom);
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  const listEventsByBounds = async () => {
    // load events
    try {
      let initalEvents = await ListEventsByBounds(
        map.getBounds().getNorthEast().lat(),
        map.getBounds().getNorthEast().lng(),
        map.getBounds().getSouthWest().lat(),
        map.getBounds().getSouthWest().lng()
      );

      for (var i = initalEvents.length - 1; i >= 0; i--) {
        let event = initalEvents[i];
        if (eventExpired(event)) initalEvents.splice(i, 1);
      }

      setEvents(initalEvents);
    } catch (err) {}
  };

  return (
    !isLoaded || (
      <div id="App">
        <div className="map-controls">
          <EventSearchBar
            id=""
            className="event-search"
            event={event}
            setEvent={setEvent}
            setFilteredEvents={setFilteredEvents}
            onEventChange={(event) => {
              if (event?.title) {
                setCenter({
                  lng: event.long,
                  lat: event.lat,
                });
                setZoom(15);
              }
            }}
          />

          {!eventInputModalOpen || (
            <EventInputModal
              id=""
              className="event-inputModal"
              onAddEventCallback={(event) => {
                setCenter({
                  lng: event.long,
                  lat: event.lat,
                });
                setZoom(15);
                setEvent(event);
              }}
              setEventInputModalOpen={setEventInputModalOpen}
              ddClickLong={ddClickLong}
              ddClickLat={ddClickLat}
            />
          )}
        </div>

        <GoogleMap
          id="map"
          mapContainerStyle={{
            width: "100vw",
            height: "100vh",
          }}
          center={center}
          clickableIcons={false}
          zoom={zoom}
          onLoad={onLoad}
          onUnmount={onUnmount}
          onIdle={listEventsByBounds}
          options={{ disableDoubleClickZoom: true }}
          onDblClick={(e) => {
            setDdClickLong(e.latLng.lng());
            setDdClickLat(e.latLng.lat());
            setEventInputModalOpen(true);
          }}
        >
          {filteredEvents.length > 0 ||
            events.map(function (item, i) {
              return (
                <Marker
                  key={i}
                  clickable={true}
                  position={{
                    lng: item.long,
                    lat: item.lat,
                  }}
                  onClick={(e) => {
                    setEvent(item);
                    setZoom(15);
                  }}
                />
              );
            })}
          {!filteredEvents.length > 0 ||
            filteredEvents.map(function (item, i) {
              return (
                <Marker
                  key={i}
                  clickable={true}
                  position={{
                    lng: item.long,
                    lat: item.lat,
                  }}
                  onClick={(e) => {
                    setEvent(item);
                    setZoom(15);
                  }}
                />
              );
            })}
        </GoogleMap>
      </div>
    )
  );
}

export default App;
