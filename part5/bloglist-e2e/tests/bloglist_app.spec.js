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
    await request.post("/api/users", {
      data: {
        name: "Test User 2",
        username: "testing2",
        password: "password2",
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

    test("a new blog can be created", async ({ page }) => {
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

    describe("and a blog exists", () => {
      beforeEach(async ({ page }) => {
        await createBlog(
          page,
          "a blog created by playwright",
          "Playwright",
          "https://playwright.dev/"
        );
      });

      test("it can be deleted by its creator", async ({ page }) => {
        await page.getByRole("button", { name: "view" }).click();
        // Register a dialog handler before clicking the button
        page.on("dialog", (dialog) => dialog.accept());
        await page.getByRole("button", { name: "remove" }).click();

        await expect(
          page.locator(".blog", { hasText: "a blog created by playwright" })
        ).not.toBeVisible();
      });

      test("its remove button is not shown to users who are not its creator", async ({ page }) => {
        // Switch users
        await page.getByRole("button", { name: "logout" }).click();
        await loginWith(page, "testing2", "password2");
        await page.getByRole("button", { name: "view" }).click();

        await expect(page.getByRole("button", { name: "remove" })).not.toBeVisible();
      });

      test("it can be liked", async ({ page }) => {
        await page.getByRole("button", { name: "view" }).click();
        await expect(page.getByText("likes: 0")).toBeVisible();
        await page.getByRole("button", { name: "like" }).click();
        await expect(page.getByText("likes: 1")).toBeVisible();
      });
    });

    describe("and multiple blog exists", () => {
      beforeEach(async ({ page }) => {
        await createBlog(
          page,
          "first blog",
          "Playwright",
          "https://playwright.dev/"
        );
        await createBlog(
          page,
          "second blog",
          "Playwright",
          "https://playwright.dev/"
        );
        await createBlog(
          page,
          "third blog",
          "Playwright",
          "https://playwright.dev/"
        );
      });

      test("they are ordered by likes", async ({ page }) => {
        // Check that blogs are ordered by creation date descending by default
        const initialBlogEntries = await page.locator(".blog").allTextContents();
        expect(initialBlogEntries).toEqual([
          "first blog by Playwrightview",
          "second blog by Playwrightview",
          "third blog by Playwrightview",
        ]);

        // Like the second blog twice and third blog once
        const secondBlog = await page.locator(".blog", { hasText: "second blog" });
        await secondBlog.getByText("view").click();
        const secondBlogLikeButton = await secondBlog
          .getByRole("button", { name: "like" });
        await secondBlogLikeButton.click();
        await page.getByText("likes: 1").waitFor();
        await secondBlogLikeButton.click();
        const thirdBlog = await page.locator(".blog", { hasText: "third blog" });
        await thirdBlog.getByText("view").click();
        await thirdBlog.getByRole("button", { name: "like" }).click();

        // Reload page and wait until the blogs have loaded
        await page.reload();
        await page.locator(".blog", { hasText: "second blog" }).waitFor();

        // Now blogs should be ordered by likes descending
        const orderedBlogEntries = await page.locator(".blog").allTextContents();
        expect(orderedBlogEntries).toEqual([
          "second blog by Playwrightview", // 2 likes
          "third blog by Playwrightview", // 1 like
          "first blog by Playwrightview", // 0 likes
        ]);
      });
    });
  });
});
