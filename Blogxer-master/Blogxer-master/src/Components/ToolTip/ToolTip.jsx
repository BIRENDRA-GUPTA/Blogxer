import React from "react";

const ToolTip = (props) => {
  return (
    <div>
      {" "}
      <div className="text-center">
        <p>
          <a
            href="#"
            className="transititext-primary text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600"
            data-te-toggle="tooltip"
            title={`${props.title}`}
          ></a>
        </p>
      </div>
    </div>
  );
};

export default ToolTip;
