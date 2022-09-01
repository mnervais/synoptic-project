import { useState } from "react";

const AppInput = ({ label, id, className, name, type, defaultValue, min }) => {
  const [value, setValue] = useState(defaultValue);

  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        className={`form-control ${className}`}
        name={name}
        type={type}
        value={value}
        min={min}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
    </>
  );
};

export default AppInput;
