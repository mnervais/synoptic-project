import { useState, useCallback } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { Marker } from "@react-google-maps/api";
import { listEventsByBounds as ListEventsByBounds } from "./util/API";

import EventSearchBar from "./components/organisms/EventSearchBar";

import "./App.css";

const containerStyle = {
  width: "100vw",
  height: "100vh",
};

function App() {
  const [map, setMap] = useState(null);
  const [center, setCenter] = useState({
    lng: -0.664654,
    lat: 51.916249,
  });
  const [zoom, setZoom] = useState(12);
  const [events, setEvents] = useState([]);

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
      const initalEvents = await ListEventsByBounds(
        map.getBounds().getNorthEast().lat(),
        map.getBounds().getNorthEast().lng(),
        map.getBounds().getSouthWest().lat(),
        map.getBounds().getSouthWest().lng()
      );
      setEvents(initalEvents);
    } catch (err) {}
  };

  return (
    !isLoaded || (
      <div className="App">
        <EventSearchBar
          id=""
          className=""
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

        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={zoom}
          onLoad={onLoad}
          onUnmount={onUnmount}
          onIdle={listEventsByBounds}
        >
          {events.map(function (item, i) {
            return (
              <Marker
                key={i}
                position={{
                  lng: item.long,
                  lat: item.lat,
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
