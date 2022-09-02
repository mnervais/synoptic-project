import { useState, useCallback } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { Marker } from "@react-google-maps/api";

import "./App.css";
import { listEvents } from "./util/API";
// import AppInput from "./components/atoms/AppInput";
// import AppButton from "./components/atoms/AppButton";
// import AppCard from "./components/atoms/AppCard";
// import AppModal from "./components/molecules/AppModal";

const containerStyle = {
  width: "100vw",
  height: "100vh",
};
const center = {
  lat: 51.5073219,
  lng: -0.1276474,
};

function App() {
  const [map, setMap] = useState(null);
  const [events, setEvents] = useState([]);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const onLoad = useCallback(async function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);

    // load events
    const initalEvents = await listEvents(-0.664654, 51.864922, 5);
    console.log(initalEvents);
    setEvents(initalEvents);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  return (
    !isLoaded || (
      <div className="App">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={2}
          onLoad={onLoad}
          onUnmount={onUnmount}
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
        {/* <form>
        <div className="form-group">
          <AppInput
            label="label"
            id="titleInput"
            className=""
            name="title"
            type="text"
            defaultValue=""
          />
        </div>
        <AppButton
          id="button"
          className=""
          type="button"
          onClick={() => {}}
          onClickCallback={() => {}}
        >
          Hello
        </AppButton>
      </form>

      <AppCard>Hello</AppCard>

      <AppModal defaultOpen={true}>
        <AppModal.Header>
          <>Title</>
        </AppModal.Header>
        <AppModal.Body>
          <div>hello</div>
        </AppModal.Body>
        <AppModal.Footer>
          <div>hello</div>
        </AppModal.Footer>
      </AppModal> */}
      </div>
    )
  );
}

export default App;
