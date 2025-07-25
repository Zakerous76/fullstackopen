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

  const user = await Blog.insertMany(helper.initialBlogsBefore);
});

describe("Blogs", () => {
  // describe("GET  Tests", () => {
  //   test("GET returns correct number of blogs", async () => {
  //     const response = await api
  //       .get("/api/blogs")
  //       .expect(200)
  //       .expect("Content-Type", /application\/json/);
  //     const content = response.body;
  //     const contentLength = content.length;

  //     assert.strictEqual(contentLength, helper.initialBlogsToJSON.length);
  //     assert.deepStrictEqual(content, helper.initialBlogsToJSON);
  //   });
  //   test("unique identifier property of the blog posts is named id", async () => {
  //     const response = await api
  //       .get("/api/blogs")
  //       .expect(200)
  //       .expect("Content-Type", /application\/json/);
  //     const blog = response.body[0];
  //     // console.log(Object.keys(blog));
  //     // console.log(Object.keys(helper.initialBlogsToJSON[0]));
  //     assert.deepStrictEqual(
  //       Object.keys(blog)[4],
  //       Object.keys(helper.initialBlogsToJSON[0])[0]
  //     );
  //   });
  // });

  describe("POST Tests", () => {
    test("HTTP POST request to the /api/blogs URL successfully creates a new blog post", async () => {
      const user = (await helper.usersInDB())[0];
      const userLoggedIn = await api
        .post("/api/login")
        .send({ username: user.username, password: user.passwordHash });
      console.log("userLoggedIn:", userLoggedIn);
      return;
      const newPost = deepClone(helper.blogExample);
      const response = await api
        .post("/api/blogs")
        .send(newPost)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const blogsInDB = await helper.blogsInDB();
      assert.strictEqual(
        blogsInDB.length,
        helper.initialBlogsBefore.length + 1
      );

      assert.deepStrictEqual(response.body, helper.blogExampleToJSON);
    });

    // test("if the likes property is missing from the request, it will default to the value 0", async () => {
    //   const newPost = deepClone(helper.blogExample);
    //   delete newPost._id;
    //   delete newPost.__v;
    //   delete newPost.likes;

    //   const response = await api.post("/api/blogs").send(newPost);
    //   assert.strictEqual(response.body.likes, 0);
    // });

    // test("if the title or url properties are missing from the request data, the backend responds with the status code 400", async () => {
    //   const newPost = deepClone(helper.blogExample);
    //   delete newPost._id;
    //   delete newPost.__v;

    //   const newPost1 = deepClone(newPost);
    //   delete newPost1.title;

    //   await api.post("/api/blogs").send(newPost1).expect(400);

    //   const newPost2 = deepClone(newPost);
    //   delete newPost2.url;
    //   await api.post("/api/blogs").send(newPost2).expect(400);

    //   const newPost3 = deepClone(newPost);
    //   delete newPost3.url;
    //   delete newPost3.title;
    //   await api.post("/api/blogs").send(newPost3).expect(400);

    //   const newPost4 = deepClone(newPost);
    //   await api.post("/api/blogs").send(newPost4).expect(201);
    // });
  });
  // describe("DELETE Tests", () => {
  //   test("deleting a single post", async () => {
  //     const newPost = deepClone(helper.blogExample);
  //     delete newPost._id;

  //     const response = await api.post("/api/blogs").send(newPost).expect(201);
  //     const id = response.body.id;

  //     await api.delete(`/api/blogs/${id}`).expect(204);
  //   });
  // });
  // describe("UPDATE Tests", () => {
  //   test("udpating a test", async () => {
  //     const newPost = deepClone(helper.initialBlogsBefore[0]);
  //     const id = newPost._id;
  //     newPost.likes = 100;
  //     const response = await api
  //       .put(`/api/blogs/${id}`)
  //       .send(newPost)
  //       .expect(200);

  //     assert.strictEqual(response.body.likes, newPost.likes);
  //   });
  // });
});

// describe("Users", () => {
//   before(async () => {
//     await User.deleteMany({});
//     await User.insertMany(helper.usersInfo);
//   });

//   test("all users returned", async () => {
//     const users = (await api.get("/api/users").expect(200)).body;
//     assert.strictEqual(users.length, helper.usersInfo.length);
//   });

//   test("a user is added", async () => {
//     const usersInDbBefore = await helper.usersInDB();
//     const user = deepClone(helper.singleUser);

//     const addedUser = (
//       await api
//         .post("/api/users")
//         .set("Content-Type", "application/json")
//         .send(user)
//     ).body;
//     delete addedUser.id;
//     delete user.passwordHash;

//     const usersInDbAfter = await helper.usersInDB();
//     assert.deepStrictEqual(addedUser, user);
//     assert.strictEqual(usersInDbAfter.length, usersInDbBefore.length + 1);
//   });

//   describe("invalid users are not added", () => {
//     test(" (wrong username)", async () => {
//       const usersInDbBefore = await helper.usersInDB();
//       const user = deepClone(helper.singleUser);
//       user.username = "ak";

//       await api.post("/api/users").send(user).expect(400);
//       const usersInDbAfter = await helper.usersInDB();

//       assert.strictEqual(usersInDbBefore.length, usersInDbAfter.length);
//     });

//     test("(wrong password)", async () => {
//       const usersInDbBefore = await helper.usersInDB();
//       const user = deepClone(helper.singleUser);
//       user.username = "ak";

//       await api.post("/api/users").send(user).expect(400);
//       const usersInDbAfter = await helper.usersInDB();

//       assert.strictEqual(usersInDbBefore.length, usersInDbAfter.length);
//     });
//   });

//   test("a user is deleted", async () => {
//     const usersInDbBefore = await helper.usersInDB();
//     const userId = (await User.findOne({}))._id.toString();
//     await api.delete(`/api/users/${userId}`).expect(204);
//     const usersInDbAfter = await helper.usersInDB();
//     assert.strictEqual(usersInDbAfter.length, usersInDbBefore.length - 1);
//   });
// });

after(async () => {
  await mongoose.connection.close();
});
