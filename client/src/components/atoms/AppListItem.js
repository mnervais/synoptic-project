const AppListItem = ({ id, className, role, onClick, children }) => {
  return (
    <li
      id={id}
      className={`list-group-item ${className} `}
      role={role}
      onClick={() => {
        onClick();
      }}
    >
      {children}
    </li>
  );
};

export default AppListItem;
