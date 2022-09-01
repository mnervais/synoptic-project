const AppListItem = ({ id, className, onClick, children }) => {
  return (
    <li
      id={id}
      className={`list-group-item ${className}`}
      onClick={() => {
        onClick();
      }}
    >
      {children}
    </li>
  );
};

export default AppListItem;
