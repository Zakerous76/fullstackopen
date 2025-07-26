import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (user) => {
  token = `Bearer ${user.userToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (blog) => {
  const config = {
    headers: {
      authorization: token,
    },
  };
  try {
    const response = await axios.post(baseUrl, blog, config);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export default { getAll, create, setToken };
