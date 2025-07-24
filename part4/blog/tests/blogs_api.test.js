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
  await Blog.insertMany(helper.initialBlogs);
});

describe("SuperTest", () => {
  test("GET returns correct number of blogs", async () => {
    const response = await api.get("/api/blogs");
    const content = response.body;
    const contentLength = content.length;

    assert.strictEqual(contentLength, helper.initialBlogs.length);
    assert.deepStrictEqual(content, helper.initialBlogs);
  });
});

after(async () => {
  await mongoose.connection.close();
});
