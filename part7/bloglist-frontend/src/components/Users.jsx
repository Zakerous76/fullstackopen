import React from "react"
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import User from "./User"

const Users = () => {
  const allUsers = useSelector(({ allUsers }) => allUsers)
  console.log("Users.jsx - allUsers:", allUsers)
  return (
    <div>
      <h2>Users</h2>
      <table>
        <tr>
          <th></th>
          <th>Blogs Created</th>
        </tr>
        {allUsers.map((user) => (
          <User user={user} />
        ))}
      </table>
    </div>
  )
}

export default Users
