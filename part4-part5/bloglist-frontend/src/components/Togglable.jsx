import React, { useState } from "react";
import { forwardRef } from "react";
import { useImperativeHandle } from "react";

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible === true ? "none" : "" };
  const showWhenVisible = { display: visible === true ? "" : "none" };

  const toggleVisible = () => {
    setVisible(!visible);
  };

  useImperativeHandle(refs, () => {
    return { toggleVisible };
  });

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
});

// I would have defined prop-types but they are depracted are not checked as of react 19

export default Togglable;
