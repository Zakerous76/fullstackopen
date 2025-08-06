import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material"
import { useSelector } from "react-redux"
import { Link } from "react-router"

const Users = () => {
  const allUsers = useSelector(({ allUsers }) => allUsers)
  return (
    <div>
      <h2>Users</h2>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Blogs Created</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                {" "}
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </TableCell>
              <TableCell>{user.blogs.length}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default Users
