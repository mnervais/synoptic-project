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
  lng: -0.664654,
  lat: 51.916249,
};
const zoom = 12;

function App() {
  const [map, setMap] = useState(null);
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

  return (
    !isLoaded || (
      <div className="App">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={zoom}
          onLoad={onLoad}
          onUnmount={onUnmount}
          onIdle={async () => {
            // load events
            try {
              const initalEvents = await listEvents(
                map.getBounds().getNorthEast().lat(),
                map.getBounds().getNorthEast().lng(),
                map.getBounds().getSouthWest().lat(),
                map.getBounds().getSouthWest().lng()
              );
              setEvents(initalEvents);
            } catch (err) {}
          }}
          onZoomChanged={() => {
            try {
            } catch (error) {
              console.log(error);
            }
          }}
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
