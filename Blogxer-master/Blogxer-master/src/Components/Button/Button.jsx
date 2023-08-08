import React from "react";

const Button = (props) => {
  return (
    <button type="button" className={`${props.className} px-3 py-2 rounded-md`}>
      {props.children}
    </button>
  );
};

export default Button;
