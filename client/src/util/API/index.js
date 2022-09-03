export const listEvents = async (north, east, south, west) => {
  let endpoint =
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_API_ENDPOINT_PRODUCTION
      : process.env.REACT_APP_API_ENDPOINT_DEV;
  endpoint += `/events?north=${north}&east=${east}&south=${south}&west=${west}`;

  try {
    const response = await fetch(endpoint);
    const events = await response.json();
    return events;
  } catch (err) {
    console.error(err.message);
  }
};
