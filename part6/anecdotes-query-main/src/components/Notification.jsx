import { useContext } from "react";
import NotificationContext from "../NotificationContext";

const Notification = () => {
  const [notificationMessage, notificationDispatcher] =
    useContext(NotificationContext);
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  };

  return notificationMessage === "" ? null : (
    <div style={style}>{notificationMessage}</div>
  );
};

export default Notification;
