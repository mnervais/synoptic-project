export const listEventsByBounds = async (north, east, south, west) => {
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

export const listEventsByTitle = async (title) => {
  let endpoint =
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_API_ENDPOINT_PRODUCTION
      : process.env.REACT_APP_API_ENDPOINT_DEV;
  endpoint += `/events?title=${title}`;

  try {
    const response = await fetch(endpoint);
    const events = await response.json();
    return events;
  } catch (err) {
    console.error(err.message);
  }
};

export const listEvents = async () => {
  let endpoint =
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_API_ENDPOINT_PRODUCTION
      : process.env.REACT_APP_API_ENDPOINT_DEV;
  endpoint += `/events`;

  try {
    const response = await fetch(endpoint);
    const events = await response.json();
    return events;
  } catch (err) {
    console.error(err.message);
  }
};

export const addEvent = async (
  title,
  date,
  time,
  description,
  contact,
  long,
  lat
) => {
  let endpoint =
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_API_ENDPOINT_PRODUCTION
      : process.env.REACT_APP_API_ENDPOINT_DEV;
  endpoint += `/events`;

  let xhr = new XMLHttpRequest();
  xhr.open("PUT", endpoint);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      console.log(xhr.status);
      console.log(xhr.responseText);
    }
  };

  let data = `{
    "title":       ${title},
    "date":        ${date},
    "time":        ${time},
    "description": ${description},
    "contact":     ${contact},
    "long":        ${long},
    "lat":         ${lat}
  }`;
  xhr.send(data);
};
