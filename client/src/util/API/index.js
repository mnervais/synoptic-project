export const listEvents = async (long, lat, radius) => {
  let endpoint =
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_API_ENDPOINT_PRODUCTION
      : process.env.REACT_APP_API_ENDPOINT_DEV;
  endpoint += `/events?long=${long}&lat=${lat}&radius=${radius}`;

  try {
    const response = await fetch(endpoint);
    const events = await response.json();
    return events;
  } catch (err) {
    console.error(err.message);
  }
};
