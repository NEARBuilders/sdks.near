import { test, expect, Page } from "@playwright/test";
const WIDGET = `Examples.CryptoJS`;

test("it hashes text", async ({ page }: { page: Page }) => {
  test.setTimeout(60000);
  await page.goto(WIDGET);

  await hashText(page, "test");

  await expect(page.getByText("098f6bcd4621d373cade4e832627b4f6")).toBeVisible();
});

test("it hashes text multiple times", async ({ page }: { page: Page }) => {
  test.setTimeout(60000);
  await page.goto(WIDGET);

  await hashText(page, "test");
  await expect(page.getByText("098f6bcd4621d373cade4e832627b4f6")).toBeVisible();

  await hashText(page, "test2");
  await expect(page.getByText("ad0234829205b9033196ba818f7a872b")).toBeVisible();
});

async function hashText(page: Page, value: string) {
  test.setTimeout(60000);
  await page.getByRole("textbox").fill(value);
  await page.getByRole("button", { name: "Hash it!" }).click();
}
