import React from "react";
import "./App.css";

const Input = ({ name, label, value, error, onChange }) => {
  return (
    <div className={name}>
      <label htmlFor={name}> {label}</label>
      <input
        value={value}
        id={name}
        type="text"
        name={name}
        onChange={onChange}
      />
      {error && <span className="error"> {error} </span>}
    </div>
  );
};

export default Input;
