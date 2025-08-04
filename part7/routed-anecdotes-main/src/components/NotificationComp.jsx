/* eslint-disable react/prop-types */
const NotificationComp = ({ notification }) => {
  const style = {
    background: "lightgrey",
    borderStyle: "solid",
    borderRadius: 2,
    padding: 10,
    margin: 10,
  };
  return <div style={style}>{notification}</div>;
};

export default NotificationComp;
