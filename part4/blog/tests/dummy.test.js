const assert = require("node:assert");
const { test, describe } = require("node:test");
const dummy = require("../utils/list_helper").dummy;

test("dummy returns one", () => {
  const blogs = [];
  assert.strictEqual(dummy(blogs), 1);
});
