const supertest = require("supertest");
const { test, before, after, describe } = require("node:test");
const assert = require("node:assert");
const app = require("../app");
const blogsRouter = require("../controllers/blogsRouter");
const helper = require("./test_helper");
const mongoose = require("mongoose");
const Blog = require("../models/blog");

const api = supertest(app);

before(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogsBefore);
});

describe("SuperTest", () => {
  test("GET returns correct number of blogs", async () => {
    const response = await api.get("/api/blogs");
    const content = response.body;
    const contentLength = content.length;

    assert.strictEqual(contentLength, helper.initialBlogsToJSON.length);
    assert.deepStrictEqual(content, helper.initialBlogsToJSON);
  });
  test("unique identifier property of the blog posts is named id", async () => {
    const response = await api.get("/api/blogs");
    const blog = response.body[0];
    // console.log(Object.keys(blog));
    // console.log(Object.keys(helper.initialBlogsToJSON[0]));
    assert.deepStrictEqual(
      Object.keys(blog)[4],
      Object.keys(helper.initialBlogsToJSON[0])[0]
    );
  });

  test("HTTP POST request to the /api/blogs URL successfully creates a new blog post", async () => {
    const newPost = helper.blogExample;
    const response = await api
      .post("/api/blogs")
      .send(newPost)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsInDB = await helper.blogsInDB();
    assert.strictEqual(blogsInDB.length, helper.initialBlogsBefore.length + 1);

    assert.deepStrictEqual(response.body, helper.blogExampleToJSON);
  });
});

after(async () => {
  await mongoose.connection.close();
});
