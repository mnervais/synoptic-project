import AppCard from "../atoms/AppCard";

const EventCard = ({ id, className, event }) => {
  return (
    !event?.title || (
      <AppCard id={`${id}`} className={`${className}`} classNameBody="">
        {event.title}
        {event.date}
      </AppCard>
    )
  );
};

export default EventCard;
