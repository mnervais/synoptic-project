export const eventExpired = (event) => {
  let today = new Date().getTime() / 1000;
  let date = new Date(event.date.split("T")[0]).getTime() / 1000;
  return today > date;
};
