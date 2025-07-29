const loginWith = async (page, username, password) => {
  await page.getByRole("textbox", { name: "Username" }).fill(username);
  await page.getByRole("textbox", { name: "Password" }).fill(password);
  await page.getByRole("button", { name: "Log in" }).click();
};

const createNote = async (page, title, author, url) => {
  await page.getByRole("button", { name: "New Note" }).click();
  await page.getByRole("textbox", { name: "Title:" }).fill(title);
  await page.getByRole("textbox", { name: "Author:" }).fill(author);
  await page.getByRole("textbox", { name: "URL:" }).fill(url);
  await page.getByRole("button", { name: "Create" }).click();

  // ✅ Wait for the newly created blog to appear on the page
  await page.waitForSelector(`text=${title}`);
  await page.waitForLoadState("networkidle"); // wait for fetch/XHR to finish
};

export { loginWith, createNote };
