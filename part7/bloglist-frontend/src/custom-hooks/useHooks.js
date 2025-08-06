import { useState } from "react"
export const useField = (type, id = null) => {
  const [value, setValue] = useState("")

  const onChange = (event) => {
    setValue(event.target.value)
  }
  const reset = () => {
    setValue("")
  }

  return {
    inputProps: {
      type,
      value,
      id,
      onChange,
    },
    reset,
  }
}
