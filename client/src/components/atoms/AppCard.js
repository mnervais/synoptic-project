const AppCard = ({ id, className, classNameBody, children }) => {
  return (
    <div id={`${id}`} className={`${className} card`}>
      <div className={`${classNameBody} card-body`}>{children}</div>
    </div>
  );
};

export default AppCard;
