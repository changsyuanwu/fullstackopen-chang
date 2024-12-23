import { render, screen } from "@testing-library/react";
import Blog from "./Blog";
import userEvent from "@testing-library/user-event";
import { describe, expect, vi } from "vitest";

describe("Blog", () => {
  let container;
  const user = {
    username: "testing user",
    name: "Testing User",
    id: "123",
  }
  const blog = {
    title: "Testing Blogs",
    author: "Testing Author",
    url: "https://testing.com",
    likes: 1,
    user: user
  };

  beforeEach(() => {
    container = render(<Blog blog={blog} curUser={user}/>).container;
  });

  test("renders title and author", () => {
    const blogEl = container.querySelector(".blog");
    expect(blogEl).toHaveTextContent(blog.title);
    expect(blogEl).toHaveTextContent(blog.author);

    const elementContainingURL = screen.queryByText(/https:\/\/testing\.com/);
    expect(elementContainingURL).toBeNull();
    const elementContainingLikes = screen.queryByText(/likes: 1/);
    expect(elementContainingLikes).toBeNull();
  });

  test("shows url and likes when button is clicked", async () => {
    // Check that they do not exist before the button is clicked
    const nonExistingElementWithURL = screen.queryByText(
      /https:\/\/testing\.com/
    );
    expect(nonExistingElementWithURL).toBeNull();
    const nonExistingElementWithLikes = screen.queryByText(/likes: 1/);
    expect(nonExistingElementWithLikes).toBeNull();

    // Click the button
    const user = userEvent.setup();
    const showButton = screen.getByText("view");
    await user.click(showButton);

    // Check that the elements are now present
    const elementContainingURL = screen.getByText(/https:\/\/testing\.com/);
    expect(elementContainingURL).toHaveTextContent(blog.url);
    const elementContainingLikes = screen.getByText(/likes: 1/);
    expect(elementContainingLikes).toHaveTextContent(blog.likes.toString());
  });
})
