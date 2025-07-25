import React, { useState } from "react";

const Togglable = (props) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible === true ? "none" : "" };
  const showWhenVisible = { display: visible === true ? "" : "none" };

  const toggleVisible = () => {
    setVisible(!visible);
  };

  return (
    <div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisible}>Cancel</button>
      </div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisible}>{props.buttonLabel}</button>
      </div>
    </div>
  );
};

export default Togglable;
