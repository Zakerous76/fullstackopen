import { render, screen } from "@testing-library/react";
import { beforeEach, expect, vi } from "vitest";
import Blog from "../components/Blog";
import userEvent from "@testing-library/user-event";
// check wether the blog's title and author, but does not render its URL or number of likes by default.
describe("<Blog />", () => {
  const setBlogsMockFunc = vi.fn();
  const blogExample = {
    title: "Khabib Nurmagmedov",
    author: "Khabib Nurmagmedov",
    url: "www.example.com",
    likes: 200,
  };

  let container;

  beforeEach(() => {
    container = render(
      <Blog
        key={blogExample.id}
        blog={blogExample}
        setBlogs={setBlogsMockFunc}
      />
    ).container;
  });

  test("renders the blog's title and author but not its URL and the number of likes", () => {
    const div = container.querySelector(".shownByDefault");
    expect(div).toHaveTextContent(
      `${blogExample.title} ${blogExample.author} `
    );

    const div2 = container.querySelector(".hiddenByDefault");
    screen.debug(div2);
    expect(getComputedStyle(div2).display).toBe("none");
  });

  test("the blog's URL and number of likes are shown when the button controlling the shown details has been clicked", async () => {
    // Set up a user simulation instance
    const user = userEvent.setup();
    const div2 = container.querySelector(".hiddenByDefault");

    // Before clicking, URL and likes should not be in the DOM
    expect(getComputedStyle(div2).display).toBe("none");

    // Find and click the "View" button
    const viewButton = screen.getByRole("button", { name: /View/i });
    await user.click(viewButton);

    // After clicking, URL and likes should be visible
    expect(getComputedStyle(div2).display).not.toBe("none");
    expect(screen.getByText(blogExample.url)).toBeInTheDocument();
    expect(screen.getByText(String(blogExample.likes))).toBeInTheDocument();
  });
});
