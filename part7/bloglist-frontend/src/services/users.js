import axios from "axios"

const baseURL = "/api/users"

const getAllUsers = async () => {
  try {
    const users = await (await axios.get(baseURL)).data
    return users
  } catch (error) {
    console.log("/services/users.js - error: ", error)
  }
}

export default {
  getAllUsers,
}
