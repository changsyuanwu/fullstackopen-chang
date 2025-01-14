import { render, screen } from "@testing-library/react";
import Blog from "./Blog";
import userEvent from "@testing-library/user-event";
import { describe, expect, vi, test } from "vitest";

describe("<Blog />", () => {
  const curUser = {
    username: "testing user",
    name: "Testing User",
    id: "123",
  };

  const blog = {
    title: "Testing Blogs",
    author: "Testing Author",
    url: "https://testing.com",
    likes: 1,
    user: curUser,
  };

  test("renders title and author", () => {
    const container = render(<Blog blog={blog} curUser={curUser} />).container;
    const blogEl = container.querySelector(".blog");
    expect(blogEl).toHaveTextContent(blog.title);
    expect(blogEl).toHaveTextContent(blog.author);

    const elementContainingURL = screen.queryByText(/https:\/\/testing\.com/);
    expect(elementContainingURL).toBeNull();
    const elementContainingLikes = screen.queryByText(/likes: 1/);
    expect(elementContainingLikes).toBeNull();
  });

  test("shows url and likes when button is clicked", async () => {
    const container = render(<Blog blog={blog} curUser={curUser} />).container;

    // Check that they do not exist before the button is clicked
    const nonExistingElementWithURL = screen.queryByText(
      /https:\/\/testing\.com/,
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

  test("clicking the like button twice calls event handler twice", async () => {
    const mockUpdate = vi.fn();
    const container = render(
      <Blog blog={blog} curUser={curUser} updateBlog={mockUpdate} />,
    ).container;
    const user = userEvent.setup();

    // Need to open the details first
    const showButton = screen.getByText("view");
    await user.click(showButton);

    // Click the like button twice
    const likeButton = screen.getByText("like");
    await user.click(likeButton);
    await user.click(likeButton);

    expect(mockUpdate.mock.calls).toHaveLength(2);
  });
});
