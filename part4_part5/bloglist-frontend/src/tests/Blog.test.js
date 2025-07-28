import { render, screen } from "@testing-library/react";
import { expect, vi } from "vitest";
import Blog from "../components/Blog";
// check wether the blog's title and author, but does not render its URL or number of likes by default.
test("renders the blog's title and author but not its URL and the number of likes", () => {
  const setBlogsMockFunc = vi.fn();
  const blogExample = {
    title: "Khabib Nurmagmedov",
    author: "Khabib Nurmagmedov",
    url: "www.example.com",
    likes: 200,
  };

  const container = render(
    <Blog key={blogExample.id} blog={blogExample} setBlogs={setBlogsMockFunc} />
  ).container;
  const div = container.querySelector(".defaultBlogView");
  screen.debug(div);
  screen.debug(setBlogsMockFunc.call);
  expect(div).toHaveTextContent(`${blogExample.title} ${blogExample.author} `);
});
