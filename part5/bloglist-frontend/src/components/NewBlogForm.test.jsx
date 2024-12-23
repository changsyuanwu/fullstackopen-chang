import { render, screen } from "@testing-library/react";
import NewBlogForm from "./NewBlogForm";
import userEvent from "@testing-library/user-event";
import { describe, expect, vi, test } from "vitest";

describe("<NewBlogForm />", () => {
  test("calls event handler with correct details", async () => {
    const mockCreateBlog = vi.fn();
    render(<NewBlogForm createBlog={mockCreateBlog} />);
    const user = userEvent.setup();

    const title = screen.getByPlaceholderText("An exciting title...");
    const author = screen.getByPlaceholderText("The amazing author...");
    const url = screen.getByPlaceholderText("https://www.example.com");

    await user.type(title, "Testing Blogs");
    await user.type(author, "Testing Author");
    await user.type(url, "https://testing.com");

    expect(title).toHaveValue("Testing Blogs");
    expect(author).toHaveValue("Testing Author");
    expect(url).toHaveValue("https://testing.com");
    const button = screen.getByText("create");
    await user.click(button);

    expect(mockCreateBlog.mock.calls).toHaveLength(1);
    expect(mockCreateBlog.mock.calls[0][0]).toEqual({
      title: "Testing Blogs",
      author: "Testing Author",
      url: "https://testing.com"
    });
  });
});