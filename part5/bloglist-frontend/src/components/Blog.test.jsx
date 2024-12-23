import { render, screen } from "@testing-library/react";
import Blog from "./Blog";
import userEvent from "@testing-library/user-event";
import { expect, vi } from "vitest";

test("renders title and author", () => {
  const blog = {
    title: "Testing Blogs",
    author: "Testing Author",
    url: "https://testing.com",
    likes: 1,
  };

  const { container } = render(<Blog blog={blog} />);

  const blogEl = container.querySelector(".blog");
  expect(blogEl).toHaveTextContent(blog.title);
  expect(blogEl).toHaveTextContent(blog.author);

  const elementContainingURL = screen.queryByText(blog.url);
  expect(elementContainingURL).toBeNull();
  const elementContainingLikes = screen.queryByText(blog.likes.toString());
  expect(elementContainingLikes).toBeNull();
});