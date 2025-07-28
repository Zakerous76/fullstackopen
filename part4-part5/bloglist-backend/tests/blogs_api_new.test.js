const supertest = require("supertest");
const { test, before, after, describe, beforeEach } = require("node:test");
const assert = require("node:assert");
const app = require("../app");
const blogsRouter = require("../controllers/blogsRouter");
const helper = require("./test_helper");
const mongoose = require("mongoose");
const Blog = require("../models/blog");
const deepClone = require("../utils/tools").deepClone;
const User = require("../models/user");

const api = supertest(app);

before(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});
});

describe("API Tests", () => {
  let aUserToken = null;
  let aUserUsername = null;
  let theBlogId = null;
  describe("Single User/Blog", () => {
    test("a used is created", async () => {
      const usersInDbBefore = await helper.usersInDB();
      const userInfo = {
        username: helper.singleUser.username,
        password: helper.singleUser.passwordHash,
      };
      const response = await api.post("/api/users").send(userInfo).expect(201);

      const usersInDbAfter = await helper.usersInDB();
      assert.strictEqual(usersInDbAfter.length, usersInDbBefore.length + 1);
      assert.strictEqual(response.body.username, userInfo.username);
    });

    test("the user has logged in", async () => {
      const response = await api
        .post("/api/login")
        .send({
          username: helper.singleUser.username,
          password: helper.singleUser.passwordHash,
        })
        .expect(200);

      aUserToken = response.body.userToken;
      aUserUsername = response.body.username;
    });

    test("the user created a blog", async () => {
      const blogsBefore = await helper.blogsInDB();
      const aBlog = deepClone(helper.blogExample);
      const response = await api
        .post("/api/blogs")
        .set("Authorization", `Bearer ${aUserToken}`)
        .send(aBlog)
        .expect(201);
      theBlogId = response.body.id;
      const blogsAfter = await helper.blogsInDB();
      assert.strictEqual(blogsAfter.length, blogsBefore.length + 1);
      assert.strictEqual(response.body.title, aBlog.title);
    });

    test("the user deleted that blog", async () => {
      const blogsBefore = await helper.blogsInDB();
      const response = await api
        .delete(`/api/blogs/${theBlogId}`)
        .set("Authorization", `Bearer ${aUserToken}`)
        .expect(204);
      const blogsAfter = await helper.blogsInDB();
      assert.strictEqual(blogsAfter.length, blogsBefore.length - 1);
    });
  });
  describe("Many Users/Blogs", () => {
    test("the user creates 3 blogs", async () => {
      const blogsBefore = await helper.blogsInDB();
      const blogs = deepClone(helper.initialBlogsToJSON);

      for (const blog of blogs) {
        const response = await api
          .post("/api/blogs")
          .set("Authorization", `Bearer ${aUserToken}`)
          .send(blog)
          .expect(201);
      }
      const blogsAfter = await helper.blogsInDB();
      assert.strictEqual(blogsAfter.length, blogsBefore.length + blogs.length);
    });
    test("all blogs from the user are returned", async () => {
      const blogsLocal = await helper.blogsInDB();
      const blogsInDB = (await api.get("/api/blogs").expect(200)).body;
      assert.strictEqual(blogsInDB.length, blogsLocal.length);
    });
  });
});

after(async () => {
  await mongoose.connection.close();
});
