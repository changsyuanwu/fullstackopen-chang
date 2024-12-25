const { test, expect, describe, beforeEach } = require("@playwright/test");
const { loginWith } = require("./helper");

describe('Note app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post("http://localhost:3002/api/testing/reset");
    await request.post("http://localhost:3002/api/users", {
      data: {
        name: "Test User",
        username: "testing",
        password: "password",
      },
    });

    await page.goto("http://localhost:5173");
  });

  test("front page can be opened", async ({ page }) => {
    const locator = await page.getByText("Notes");
    await expect(locator).toBeVisible();
    await expect(
      page.getByText(
        "Note app, Department of Computer Science, University of Waterloo 2024"
      )
    ).toBeVisible();
  });

  test("login form can be opened and login completed", async ({ page }) => {
    // Open the login form
    await loginWith(page, "testing", "password");;
    await expect(page.getByText("Test User logged-in")).toBeVisible();
  });

  test("login fails with wrong password", async ({ page }) => {
    await loginWith(page, "testing", "wrong password");

    const errorDiv = await page.locator(".error");
    await expect(errorDiv).toContainText("Wrong credentials");
    await expect(errorDiv).toHaveCSS("border-style", "solid");
    await expect(errorDiv).toHaveCSS("color", "rgb(255, 0, 0)");

    await expect(
      page.getByText("Test User logged in")
    ).not.toBeVisible();
  });

  describe("when logged in", () => {
    beforeEach(async ({ page }) => {
      // Log in
      await loginWith(page, "testing", "password");
    });

    test("a new note can be created", async ({ page }) => {
      await page.getByRole("button", { name: "new note" }).click();
      await page
        .getByTestId("newNoteContent")
        .fill("a note created by playwright");
      await page.getByRole("button", { name: "save" }).click();
      await expect(
        page.getByText("a note created by playwright")
      ).toBeVisible();
    });

    describe("and a note exists", () => {
      beforeEach(async ({ page }) => {
        await page.getByRole("button", { name: "new note" }).click();
        await page.getByRole("textbox").fill("another note by playwright");
        await page.getByRole("button", { name: "save" }).click();
      });

      test("importance can be changed", async ({ page }) => {
        await page.getByRole("button", { name: "make not important" }).click();
        await expect(page.getByText("make important")).toBeVisible();
      });
    });
  });
});
