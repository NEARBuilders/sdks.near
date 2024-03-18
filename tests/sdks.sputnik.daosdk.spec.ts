import { test, expect, Page } from "@playwright/test";
const WIDGET = `Examples.DaoDetailsPage`;
const daoId = "build.sputnik-dao.near";

test("input dao id and fetch DAO details", async ({ page }: { page: Page }) => {
  await page.goto(WIDGET);
  let inputSelector = `input[data-testid="dao-input"]`;
  await page.waitForSelector(inputSelector, {
    state: "visible",
  });
  await page.locator(inputSelector).click();
  await page.locator(inputSelector).fill(daoId);
  await page.getByRole("button", { name: "Fetch Dao details" }).click();

  // wait for reponse
  await page.waitForTimeout(2000);
  const daoID = await page.textContent("p:nth-child(1)");
  const version = await page.textContent("p:nth-child(2)");
  const members = await page.textContent("p:nth-child(8)");
  // to ignore whitespace
  const councilMembersPattern =
    /Members\s+by\s+group\s+ID:\s+"council":\s+\["plugrel\.near","efiz\.near","james\.near"\]/;

  expect(daoID).toContain(`${daoID}`);
  expect(version).toContain("Version : 2.0.0");
  expect(councilMembersPattern.test(members ?? "")).toBeTruthy();
});
