export const eventExpired = (event) => {
  let date = new Date();
  let today = new Date(date.toISOString().split("T")[0]).getTime() / 1000;

  let convertedEventdate = event.date.split("-").reverse().join("-");
  let eventDate = new Date(convertedEventdate).getTime() / 1000;

  return today > eventDate;
};
