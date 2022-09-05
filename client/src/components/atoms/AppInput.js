import { useState } from "react";

const AppInput = ({
  label,
  id,
  className,
  name,
  type,
  placeholder,
  defaultValue,
  min,
  onChangeCallback,
}) => {
  const [value, setValue] = useState(defaultValue);

  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        className={`form-control ${className} mb-1`}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        min={min}
        onChange={(e) => {
          setValue(e.target.value);
          onChangeCallback(e);
        }}
      />
    </>
  );
};

export default AppInput;
