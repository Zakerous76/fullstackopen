import { useSelector } from "react-redux"
import { Link } from "react-router"

const Users = () => {
  const allUsers = useSelector(({ allUsers }) => allUsers)
  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Blogs Created</th>
          </tr>
        </thead>
        <tbody>
          {allUsers.map((user) => (
            <tr key={user.id}>
              <td>
                {" "}
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users
