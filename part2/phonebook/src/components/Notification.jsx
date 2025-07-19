import React from "react";

const Notification = ({ notification }) => {
  if (notification.message === null) {
    return null;
  }
  const classNameAtt = notification.success ? "success" : "error";
  return <div className={classNameAtt}>{notification.message}</div>;
};

export default Notification;
