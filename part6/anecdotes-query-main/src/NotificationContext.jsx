import { useReducer } from "react";
import { createContext } from "react";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SHOW":
      return action.payload;
    case "HIDE":
      return "";

    default:
      return state;
  }
};

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [notificationMessage, notificationDispatcher] = useReducer(
    notificationReducer,
    ""
  );
  return (
    <NotificationContext.Provider
      value={[notificationMessage, notificationDispatcher]}
    >
      {props.children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
