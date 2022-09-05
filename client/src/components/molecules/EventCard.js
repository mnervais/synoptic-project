import AppCard from "../atoms/AppCard";

const EventCard = ({ id, className, event }) => {
  let convertedEventdate = event.date;
  try {
    convertedEventdate = event.date.split("-").reverse().join("-");
  } catch (err) {}
  let date = new Date(convertedEventdate);
  let day = date.getUTCDate();
  let month = date.getUTCMonth() + 1;
  let year = date.getUTCFullYear();

  return (
    !event?.title || (
      <AppCard id={`${id}`} className={`${className}`} classNameBody="">
        <h3>
          {event.title}
          <small className="text-muted"> - </small>
          <small className="text-muted">
            {day}/{month}/{year}
          </small>
          <small className="text-muted"> @</small>
          <small className="text-muted">{event.time}</small>
        </h3>

        <dl className="row">
          <dt className="col-sm-3">Description</dt>
          <dd className="col-sm-9">{event.description}</dd>

          <dt className="col-sm-3">Contact info</dt>
          <dd className="col-sm-9">{event.contact}</dd>

          <hr className="mt-3" />

          <dt className="col-sm-3">Latitude</dt>
          <dd className="col-sm-9">{event.lat}</dd>

          <dt className="col-sm-3">Longitude</dt>
          <dd className="col-sm-9">{event.long}</dd>
        </dl>
      </AppCard>
    )
  );
};

export default EventCard;
