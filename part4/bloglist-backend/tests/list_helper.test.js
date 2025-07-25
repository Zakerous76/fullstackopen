const { test, describe } = require("node:test");
const assert = require("node:assert");
const {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
} = require("../utils/list_helper");
const blogs = [
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
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0,
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0,
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0,
  },
];

describe("dummy", () => {
  test("returns one", () => {
    const blogs = [];
    assert.strictEqual(dummy(blogs), 1);
  });
});

describe("totalLikes", () => {
  test("of empty list is zero", () => {
    assert.strictEqual(totalLikes([]), 0);
  });
  test("when list has only one blog equals the likes of that", () => {
    assert.strictEqual(totalLikes([].concat(blogs[0])), blogs[0].likes);
  });
});

describe("favoriteBlog", () => {
  test("should be blog[2]", () => {
    assert.deepStrictEqual(favoriteBlog(blogs), blogs[2]);
  });
});

describe("mostBlogs", () => {
  test("belong to Robert C. Martin with 3 blogs", () => {
    assert.deepStrictEqual(mostBlogs(blogs), {
      bestAuthor: "Robert C. Martin",
      bestAuthorBlogsCount: 3,
    });
  });
});

describe("mostLikes", () => {
  test("belong to Edsger W. Dijkstra with 17 blogs", () => {
    assert.deepStrictEqual(mostBlogs(blogs), {
      bestAuthor: "Robert C. Martin",
      bestAuthorBlogsCount: 3,
    });
  });
});
