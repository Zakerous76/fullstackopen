import { useReducer, createContext } from "react"
import config from "../utils/config"

const userReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      // action.payload is expected to be the user object
      window.localStorage.setItem(
        config.localStorageUserKey,
        JSON.stringify(action.payload)
      )
      return action.payload

    case "LOGOUT":
      window.localStorage.removeItem(config.localStorageUserKey)
      return null

    default:
      return state
  }
}

const UserContext = createContext()

export const UserContextProvider = (props) => {
  const [user, userDispatcher] = useReducer(userReducer, null) // use null as default
  return (
    <UserContext.Provider value={[user, userDispatcher]}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserContext
