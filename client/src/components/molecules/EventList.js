import AppListItem from "../atoms/AppListItem";

const EventList = ({ id, className, events, onClickCallback }) => {
  return (
    !events.length > 0 || (
      <ul id={`${id}`} className={`${className} list-group`}>
        <AppListItem
          id=""
          className="list-group-item-success"
          onClickCallback={() => {}}
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
              onClickCallback={() => {
                onClickCallback(item);
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
