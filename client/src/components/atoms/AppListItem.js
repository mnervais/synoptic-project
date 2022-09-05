const AppListItem = ({ id, className, role, onClickCallback, children }) => {
  return (
    <li
      id={id}
      className={`list-group-item ${className} `}
      role={role}
      onClick={() => {
        onClickCallback();
      }}
    >
      {children}
    </li>
  );
};

export default AppListItem;
