const { test, expect, beforeEach, describe } = require("@playwright/test");

describe("Blog app", () => {
  beforeEach(async ({ page }) => {
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
      await page.getByRole("textbox", { name: "Username" }).fill("wrongUser");
      await page
        .getByRole("textbox", { name: "Password" })
        .fill("wrongPassword");
      await expect(
        page.getByRole("button", { name: "New Note" })
      ).not.toBeVisible();
    });
    test("succeeds with correct credentials", async ({ page }) => {
      await page.getByRole("textbox", { name: "Username" }).fill("rootTest3");
      await page
        .getByRole("textbox", { name: "Password" })
        .fill("hiddenpassword");
      await page.getByRole("button", { name: "Log in" }).click();
      await expect(page.getByText("Welcome, undefined!")).toBeVisible();
      await expect(page.getByText("is logged in Log out")).toBeVisible();
      await expect(
        page.getByRole("button", { name: "New Note" })
      ).toBeVisible();
    });
  });
});
