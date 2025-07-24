const supertest = require("supertest");
const { test, before, after, describe } = require("node:test");
const assert = require("node:assert");
const app = require("../app");
const blogsRouter = require("../controllers/blogsRouter");
const helper = require("./test_helper");
const mongoose = require("mongoose");
const Blog = require("../models/blog");
const deepClone = require("../utils/tools");

const api = supertest(app);

before(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogsBefore);
});

describe("GET Tests", () => {
  test("GET returns correct number of blogs", async () => {
    const response = await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
    const content = response.body;
    const contentLength = content.length;

    assert.strictEqual(contentLength, helper.initialBlogsToJSON.length);
    assert.deepStrictEqual(content, helper.initialBlogsToJSON);
  });
  test("unique identifier property of the blog posts is named id", async () => {
    const response = await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
    const blog = response.body[0];
    // console.log(Object.keys(blog));
    // console.log(Object.keys(helper.initialBlogsToJSON[0]));
    assert.deepStrictEqual(
      Object.keys(blog)[4],
      Object.keys(helper.initialBlogsToJSON[0])[0]
    );
  });
});
describe("POST Tests", () => {
  test("HTTP POST request to the /api/blogs URL successfully creates a new blog post", async () => {
    const newPost = deepClone(helper.blogExample);
    const response = await api
      .post("/api/blogs")
      .send(newPost)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsInDB = await helper.blogsInDB();
    assert.strictEqual(blogsInDB.length, helper.initialBlogsBefore.length + 1);

    assert.deepStrictEqual(response.body, helper.blogExampleToJSON);
  });

  test("if the likes property is missing from the request, it will default to the value 0", async () => {
    const newPost = deepClone(helper.blogExample);
    delete newPost._id;
    delete newPost.__v;
    delete newPost.likes;

    const response = await api.post("/api/blogs").send(newPost);
    assert.strictEqual(response.body.likes, 0);
  });

  test("if the title or url properties are missing from the request data, the backend responds with the status code 400", async () => {
    const newPost = deepClone(helper.blogExample);
    delete newPost._id;
    delete newPost.__v;

    const newPost1 = deepClone(newPost);
    delete newPost1.title;

    await api.post("/api/blogs").send(newPost1).expect(400);

    const newPost2 = deepClone(newPost);
    delete newPost2.url;
    await api.post("/api/blogs").send(newPost2).expect(400);

    const newPost3 = deepClone(newPost);
    delete newPost3.url;
    delete newPost3.title;
    await api.post("/api/blogs").send(newPost3).expect(400);

    const newPost4 = deepClone(newPost);
    await api.post("/api/blogs").send(newPost4).expect(201);
  });
});
describe("DELETE Tests", () => {
  test("deleting a single post", async () => {
    const newPost = deepClone(helper.blogExample);
    delete newPost._id;

    const response = await api.post("/api/blogs").send(newPost).expect(201);
    const id = response.body.id;

    await api.delete(`/api/blogs/${id}`).expect(204);
  });
});
describe("UPDATE Tests", () => {
  test("udpating a test", async () => {
    const newPost = deepClone(helper.initialBlogsBefore[0]);
    const id = newPost._id;
    newPost.likes = 100;
    const response = await api
      .put(`/api/blogs/${id}`)
      .send(newPost)
      .expect(200);

    assert.strictEqual(response.body.likes, newPost.likes);
  });
});
after(async () => {
  await mongoose.connection.close();
});
