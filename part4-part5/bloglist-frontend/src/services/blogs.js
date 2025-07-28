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

const updateBlogLikes = async (blog) => {
  const blogId = blog.id;
  const newBlog = { ...blog, likes: blog.likes + 1, creator: blog.creator.id };
  try {
    const response = await axios.put(`${baseUrl}/${blogId}`, newBlog);
  } catch (error) {
    console.log(error);
  }
};

const deleteBlog = async (blog) => {
  const config = {
    headers: {
      authorization: token,
    },
  };
  try {
    const response = await axios.delete(`${baseUrl}/${blog.id}`, config);
  } catch (error) {
    console.log(error);
  }
};

export default { getAll, create, updateBlogLikes, deleteBlog, setToken };
