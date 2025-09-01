import React from "react"

interface ErrorPropType {
  message: string
  setMessage: React.Dispatch<React.SetStateAction<string>>
}

const Error = (props: ErrorPropType) => {
  if (!props.message || props.message === "") {
    return null
  }
  setTimeout(() => {
    props.setMessage("")
  }, 5000)
  return <div style={{ color: "red" }}>{props.message}</div>
}

export default Error
