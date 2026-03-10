import { expect, test } from '@playwright/test';

test('homepage article open, category and tag navigation', async ({ page }) => {
  await page.goto('/zh');

  await expect(page.getByRole('heading', { name: '最新文章' })).toBeVisible();

  const articleLink = page.getByRole('link', { name: /MarkDownTEST\.md/i });
  await expect(articleLink).toBeVisible();
  await articleLink.click();

  await expect(page.getByRole('heading', { name: 'MarkDownTEST.md' })).toBeVisible();

  const categoryLink = page.getByRole('link', { name: 'markdown' }).first();
  await categoryLink.click();
  await expect(page.getByRole('heading', { name: 'markdown分類列表' })).toBeVisible();

  await page.goBack();
  await expect(page.getByRole('heading', { name: 'MarkDownTEST.md' })).toBeVisible();

  await page.getByRole('link', { name: '#markdown' }).click();
  await expect(page.getByRole('heading', { name: '#markdown 標籤列表' })).toBeVisible();
});