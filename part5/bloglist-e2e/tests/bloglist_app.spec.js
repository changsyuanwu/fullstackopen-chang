const { test, expect, beforeEach, describe } = require("@playwright/test");
const { loginWith, createBlog } = require("./helper");

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("/api/testing/reset");
    await request.post("/api/users", {
      data: {
        name: "Test User",
        username: "testing",
        password: "password",
      },
    });

    await page.goto("/");
  });

  test("Login form is shown", async ({ page }) => {
    await expect(page.getByRole("button", { name: "login" })).toBeVisible();
    await expect(page.getByText("Username")).toBeVisible();
    await expect(page.getByText("Password")).toBeVisible();
    await expect(page.getByTestId("username")).toBeVisible();
    await expect(page.getByTestId("password")).toBeVisible();
  });

  describe("Login", () => {
    test("succeeds with correct credentials", async ({ page }) => {
      await loginWith(page, "testing", "password");
      const successDiv = page.locator(".success")
      await expect(successDiv).toContainText("Logged in as Test User");
      page.locator()
      await expect(page.locator(
        "span",
        { hasText: "Logged in as Test User" })
      ).toBeVisible();
    });

    test("fails with incorrect credentials", async ({ page }) => {
      await loginWith(page, "testing", "wrong password");
      await expect(
        page.getByText("Invalid username or password")
      ).toBeVisible();
    });
  });

  describe("When logged in", () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, "testing", "password");
    });

    test.only("a new blog can be created", async ({ page }) => {
      await createBlog(
        page,
        "a blog created by playwright",
        "Playwright",
        "https://playwright.dev/"
      );

      await expect(page.locator(
        ".blog",
        { hasText: "a blog created by playwright" }
      )).toBeVisible();
    });
  });
});
