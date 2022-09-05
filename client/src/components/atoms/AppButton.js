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
      onClick={() => {
        onClick();
        onClickCallback();
      }}
    >
      {children}
    </button>
  );
};

export default AppButton;
