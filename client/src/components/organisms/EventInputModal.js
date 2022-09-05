import { useState, useEffect } from "react";
import { addEvent as AddEvent } from "../../util/API";

import AppModal from "../molecules/AppModal";
import AppInput from "../atoms/AppInput";
import AppButton from "../atoms/AppButton";

let currentDateTime = new Date(new Date().toString().split("GMT")[0] + " UTC")
  .toISOString()
  .split(".")[0];
currentDateTime = currentDateTime.substring(0, currentDateTime.length - 3);

const EventInputModal = ({
  id,
  className,
  onAddEventCallback,
  setEventInputModalOpen,
  ddClickLong,
  ddClickLat,
}) => {
  const [inputs, setInputs] = useState({
    title: "",
    date: currentDateTime,
    description: "",
    contact: "",
    long: ddClickLong,
    lat: ddClickLat,
  });

  const onChangeCallback = (e) => {
    let value = e.target.value;
    let id = e.target.id;
    let newInputs = inputs;

    newInputs[id] = value;
    setInputs(newInputs);
  };

  const addEvent = async () => {
    // add event
    try {
      await AddEvent(inputs, (res) => {
        try {
          onAddEventCallback(JSON.parse(res));
          setEventInputModalOpen(false);
        } catch (err) {
          console.log(err);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div id={`${id}`} className={`${className}`}>
      <AppModal
        onClick={() => setEventInputModalOpen(false)}
        onClickCallback={() => {}}
      >
        <AppModal.Header>
          <h3>Add new event</h3>
        </AppModal.Header>
        <AppModal.Body>
          <form>
            <div className="form-group">
              <AppInput
                label="Title"
                id="title"
                className=""
                name="title"
                type="text"
                defaultValue={inputs.title}
                onChangeCallback={(e) => onChangeCallback(e)}
              />
            </div>

            <div className="form-group">
              <AppInput
                label="Date"
                id="date"
                className=""
                name="date"
                type="datetime-local"
                defaultValue={inputs.date}
                min={inputs.date}
                onChangeCallback={(e) => onChangeCallback(e)}
              />
            </div>

            <div className="form-group">
              <AppInput
                label="Description"
                id="description"
                className=""
                name="description"
                type="text"
                defaultValue={inputs.description}
                onChangeCallback={(e) => onChangeCallback(e)}
              />
            </div>

            <div className="form-group">
              <AppInput
                label="Contact"
                id="contact"
                className=""
                name="contact"
                type="text"
                defaultValue={inputs.contact}
                onChangeCallback={(e) => onChangeCallback(e)}
              />
            </div>

            <div className="form-group">
              <AppInput
                label="Longitude"
                id="long"
                className=""
                name="long"
                type="number"
                defaultValue={inputs.long}
                onChangeCallback={(e) => onChangeCallback(e)}
              />
            </div>

            <div className="form-group">
              <AppInput
                label="Latitude"
                id="lat"
                className=""
                name="lat"
                type="number"
                defaultValue={inputs.lat}
                onChangeCallback={(e) => onChangeCallback(e)}
              />
            </div>
          </form>
        </AppModal.Body>
        <AppModal.Footer>
          <AppButton
            id="button"
            className="btn-light"
            type="button"
            onClick={() => setEventInputModalOpen(false)}
            onClickCallback={() => {}}
          >
            Cancel
          </AppButton>
          <AppButton
            id="button"
            className=""
            type="button"
            onClick={() => addEvent()}
            onClickCallback={() => {}}
          >
            Save
          </AppButton>
        </AppModal.Footer>
      </AppModal>
    </div>
  );
};

export default EventInputModal;
