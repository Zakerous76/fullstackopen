const Blog = require("../models/blog");
const User = require("../models/user");

const initialBlogsBefore = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0,
  },
];

const initialBlogsToJSON = [
  {
    id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
  {
    id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  },
  {
    id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
  },
];

const blogExample = {
  _id: "5a422bc61b54a676234d17fc",
  title: "Type wars",
  author: "Robert C. Martin",
  url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
  likes: 2,
  __v: 0,
};

const blogExampleToJSON = {
  title: "Type wars",
  author: "Robert C. Martin",
  url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
  likes: 2,
  id: "5a422bc61b54a676234d17fc",
};

const nonExistingID = async () => {
  const newBlog = new Blog(initialBlogsBefore[0]);
  await newBlog.save();
  await newBlog.deleteOne();
  return newBlog._id.toString();
};

const blogsInDB = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInfo = [
  {
    username: "rootTest",
    name: "test",
    passwordHash: "hiddenpassword",
  },
  {
    username: "rootTest1",
    name: "test1",
    passwordHash: "hiddenpassword",
  },
  {
    username: "rootTest2",
    name: "test2",
    passwordHash: "hiddenpassword",
  },
];

const singleUser = {
  username: "rootTest3",
  name: "test3",
  passwordHash: "hiddenpassword",
  blogs: [],
};

const usersInDB = async () => {
  const result = await User.find({});
  const usersJSON = result.map((user) => {
    return {
      username: user.username,
      name: user.name,
      passwordHash: user.passwordHash,
    };
  });
  return usersJSON;
};

module.exports = {
  initialBlogsBefore,
  initialBlogsToJSON,
  nonExistingID,
  blogsInDB,
  blogExample,
  blogExampleToJSON,
  usersInfo,
  singleUser,
  usersInDB,
};
