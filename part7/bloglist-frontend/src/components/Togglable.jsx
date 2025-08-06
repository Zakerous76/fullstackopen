import { Button } from "@mui/material"
import React, { useState } from "react"
import { forwardRef } from "react"
import { useImperativeHandle } from "react"

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible === true ? "none" : "" }
  const showWhenVisible = { display: visible === true ? "" : "none" }

  const toggleVisible = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return { toggleVisible }
  })

  return (
    <div>
      <div style={showWhenVisible}>
        {props.children}
        <Button variant="contained" color="gray" onClick={toggleVisible}>
          Cancel
        </Button>
      </div>
      <div style={hideWhenVisible}>
        <Button variant="contained" color="primary" onClick={toggleVisible}>
          {props.buttonLabel}
        </Button>
      </div>
    </div>
  )
})

// I would have defined prop-types but they are depracted are not checked as of react 19

export default Togglable
