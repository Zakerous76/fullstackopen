import { useContext } from "react"
import NotificationContext from "../contexts/NotificationContext"
const NotificationComponent = () => {
  const [message, _] = useContext(NotificationContext)

  if (message.message === null) {
    return null
  }
  return <div className={message.type}>{message.message}</div>
}

export default NotificationComponent
