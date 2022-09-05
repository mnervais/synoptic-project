import { useState, useEffect } from "react";
import AppCard from "../atoms/AppCard";
import AppInput from "../atoms/AppInput";

const SearchBar = ({ id, className, onChangeCallback }) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      onChangeCallback(value);
    }, 500);

    return () => clearTimeout(timer);
  }, [value]);

  return (
    <AppCard id={`${id}`} className={`${className}`} classNameBody="">
      <div className="form-group">
        <div className="input-group">
          <AppInput
            label=""
            id="titleInput"
            className=""
            name="title"
            type="search"
            placeholder="Search..."
            defaultValue={value}
            onChangeCallback={(e) => {
              setValue(e.target.value);
            }}
          />
          <div className="input-group-append">
            <span className="input-group-text">
              <i className="bi bi-search">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-search"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg>
              </i>
            </span>
          </div>
        </div>
      </div>
    </AppCard>
  );
};

export default SearchBar;
