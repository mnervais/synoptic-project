import { useState, useEffect } from "react";
import { addEvent } from "../../util/API";

const EventInputModal = ({ id, className, onEventChange }) => {
  return <div id={`${id}`} className={`${className}`}></div>;
};

export default EventInputModal;
