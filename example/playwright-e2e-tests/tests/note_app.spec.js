const { test, expect, describe, beforeEach } = require("@playwright/test");

describe('Note app', () => {
  beforeEach(async ({ page }) => {
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
    await page.getByRole("button", { name: "login" }).click();
    await page.getByTestId("username").fill("admin");
    await page.getByTestId("password").fill("password");
    await page.getByRole("button", { name: "login" }).click();
    await expect(page.getByText("Bob logged-in")).toBeVisible();
  });

  describe("when logged in", () => {
    beforeEach(async ({ page }) => {
      // Log in
      await page.getByRole("button", { name: "login" }).click();
      await page.getByTestId("username").fill("admin");
      await page.getByTestId("password").fill("password");
      await page.getByRole("button", { name: "login" }).click();
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
  });
});
