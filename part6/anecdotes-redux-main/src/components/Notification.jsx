import { useSelector } from "react-redux";
const Notification = () => {
  const notification = useSelector(({ notification }) => {
    return notification;
  });
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };
  return notification.show ? (
    <div style={style}>{notification.message}</div>
  ) : (
    <div></div>
  );
};

export default Notification;
