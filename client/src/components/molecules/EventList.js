import AppListItem from "../atoms/AppListItem";

const EventList = ({ id, className, events, onClick }) => {
  return (
    !events.length > 0 || (
      <ul id={`${id}`} className={`${className} list-group`}>
        <AppListItem
          id=""
          className="list-group-item-success"
          onClick={() => {}}
        >
          Results
        </AppListItem>
        {events.map(function (item, i) {
          return (
            <AppListItem
              key={i}
              id=""
              className=""
              role="button"
              onClick={() => {
                onClick(item);
              }}
            >
              {item.title}
            </AppListItem>
          );
        })}
      </ul>
    )
  );
};

export default EventList;
