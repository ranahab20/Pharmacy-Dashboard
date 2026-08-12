  import React from "react";
  import "./Button.css";

  const Button = ({ children, className, type, disabled, onChange, onClick }) => {
    return (
      <div>
        <button
          type={type}
          className={className}
          disabled={disabled}
          onClick={onClick}
          onChange={onChange}
        >
          {children}
        </button>
      </div>
    );
  };

  export default Button;
