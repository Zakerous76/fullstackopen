import { useSelector } from "react-redux"
const NotificationComponent = () => {
  const message = useSelector(({ notification }) => {
    return notification
  })

  if (message.message === null) {
    return null
  }
  return <div className={message.type}>{message.message}</div>
}

export default NotificationComponent
