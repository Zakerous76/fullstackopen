const { test, expect, beforeEach, describe } = require("@playwright/test");
const { loginWith, createNote } = require("./helper");

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("/api/testing/reset");
    await request.post("/api/users", {
      data: {
        name: "Matti Luukkainen",
        username: "mluukkai",
        password: "salainen",
      },
    });

    await page.goto("/");
  });

  test("Login form is shown", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Log in to application" })
    ).toBeVisible();
    await expect(page.getByText("Username Password Log in")).toBeVisible();
  });

  describe("Login", () => {
    test("fails with wrong credentials", async ({ page }) => {
      await loginWith(page, "wrongUser", "wrongPassword");

      await expect(
        page.getByRole("button", { name: "New Note" })
      ).not.toBeVisible();
    });
    test("succeeds with correct credentials", async ({ page }) => {
      await loginWith(page, "mluukkai", "salainen");

      await expect(page.getByText("Welcome, Matti Luukkainen!")).toBeVisible();
      await expect(page.getByText("is logged in Log out")).toBeVisible();
      await expect(
        page.getByRole("button", { name: "New Note" })
      ).toBeVisible();
    });
    describe("When logged in", () => {
      beforeEach(async ({ page }) => {
        await loginWith(page, "mluukkai", "salainen");
      });

      test("a new blog can be created", async ({ page }) => {
        await createNote(
          page,
          "test blog title",
          "test author",
          "test-url.com"
        );

        await expect(
          page.getByText("A new Blog added: test blog")
        ).toBeVisible();
        await expect(
          page.getByText("test blog title test author")
        ).toBeVisible();
      });
    });
  });
});
