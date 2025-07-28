import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, test, vi } from "vitest";
import BlogForm from "../components/BlogForm";

describe("<BlogForm />", () => {
  const handleBlogSubmitMock = vi.fn();
  let container;
  beforeEach(() => {
    container = render(
      <BlogForm handleBlogSubmit={handleBlogSubmitMock} />
    ).container;
  });

  test("the form calls the event handler it received as props with the right details when a new blog is created", async () => {
    const user = userEvent.setup();
    const inputTitle = container.querySelector("#title");
    const inputAuthor = container.querySelector("#author");
    const inputUrl = container.querySelector("#url");
    const sendButton = screen.getByRole("button", { name: /Create/i });

    await user.type(inputTitle, "my day so far");
    await user.type(inputAuthor, "zaker");
    await user.type(inputUrl, "zaker.com");
    await user.click(sendButton);

    expect(handleBlogSubmitMock.mock.calls).toHaveLength(1);
    screen.debug(handleBlogSubmitMock.mock.calls[0][0].content);
  });
});
