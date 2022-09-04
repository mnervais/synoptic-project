const AppListItem = ({ id, className, onClickCallback, children }) => {
  return (
    <li
      id={id}
      className={`list-group-item ${className} `}
      onClick={() => {
        onClickCallback();
      }}
      role="button"
    >
      {children}
    </li>
  );
};

export default AppListItem;
