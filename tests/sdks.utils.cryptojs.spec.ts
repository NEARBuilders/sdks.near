import { test, expect, Page } from '@playwright/test';
import 'dotenv/config';

const WIDGET_URL = `${process.env.GATEWAY_URL}/${process.env.ACCOUNT_ID}/widget/Examples.CryptoJS`;

test('it hashes text', async ({ page }: { page: Page }) => {
  await page.goto(WIDGET_URL);

  await hashText(page, "test");

  await expect(page.getByText('098f6bcd4621d373cade4e832627b4f6')).toBeVisible();
});

test('it hashes text multiple times', async ({ page }: { page: Page }) => {
  await page.goto(WIDGET_URL);

  await hashText(page, "test");
  await expect(page.getByText('098f6bcd4621d373cade4e832627b4f6')).toBeVisible();

  await hashText(page, "test2");
  await expect(page.getByText('ad0234829205b9033196ba818f7a872b')).toBeVisible();
});

async function hashText(page: Page, value: string) {
  await page.getByRole('textbox').fill(value);
  await page.getByRole('button', { name: 'Hash it!' }).click();
}