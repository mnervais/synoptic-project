const AppButton = ({
  id,
  className,
  type,
  onClick,
  onClickCallback,
  children,
}) => {
  return (
    <button
      id={id}
      className={`btn btn-primary ${className}`}
      type={type}
      onClick={(e) => {
        onClick();
        onClickCallback();
      }}
    >
      {children}
    </button>
  );
};

export default AppButton;
