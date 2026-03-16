import { expect, test } from '@playwright/test';

test('測試標籤列表頁面和標籤詳情頁面', async ({ page }) => {
  await page.goto('/zh/tags');

  await expect(page.getByTestId('tags-page')).toBeVisible();
  await expect(page.getByTestId('tags-title')).toHaveText('標籤列表');

  const tagItems = page.locator('[data-testid^="tags-item-"]');
  await expect(tagItems.first()).toBeVisible();
  expect(await tagItems.count()).toBeGreaterThan(0);

  const firstTagLink = tagItems.first().locator('[data-testid^="tags-link-"]');
  await expect(firstTagLink).toBeVisible();

  const firstTagText = (await firstTagLink.textContent())?.trim() ?? '';
  expect(firstTagText).toMatch(/^.+\s\(\d+\)$/);

  const matched = firstTagText.match(/^(.*)\s\((\d+)\)$/);
  expect(matched).not.toBeNull();

  const tagName = matched?.[1] ?? '';
  const tagCount = Number(matched?.[2] ?? '0');
  const firstTagHref = await firstTagLink.getAttribute('href');

  expect(tagName).not.toBe('');
  expect(tagCount).toBeGreaterThan(0);
  expect(firstTagHref).toMatch(/^\/zh\/tags\/.+/);

  await Promise.all([
    page.waitForURL(`**${firstTagHref}`),
    firstTagLink.click(),
  ]);

  await expect(page.getByTestId('tag-detail-page')).toBeVisible();
  await expect(page.getByTestId('tag-detail-title')).toHaveText(`#${tagName} 標籤列表`);

  const detailPosts = page.locator('[data-testid^="tag-detail-post-link-"]');
  await expect(detailPosts.first()).toBeVisible();
  await expect(detailPosts).toHaveCount(tagCount);
});

test('測試標籤詳情頁面可直接載入並導向文章頁', async ({ page }) => {
  await page.goto('/zh/tags/markdown');

  await expect(page.getByTestId('tag-detail-page')).toBeVisible();
  await expect(page.getByTestId('tag-detail-title')).toHaveText('#markdown 標籤列表');

  const detailPosts = page.locator('[data-testid^="tag-detail-post-link-"]');
  await expect(detailPosts).toHaveCount(1);

  const firstPostLink = detailPosts.first();
  await expect(firstPostLink).toHaveText('MarkDown語法紀錄');

  const firstPostHref = await firstPostLink.getAttribute('href');
  expect(firstPostHref).toBe('/zh/blog/20260225_markdown%E8%AA%9E%E6%B3%95%E7%B4%80%E9%8C%84');

  await Promise.all([
    page.waitForURL('**/zh/blog/**'),
    firstPostLink.click(),
  ]);

  await expect(page.getByTestId('blog-detail-page')).toBeVisible();
  await expect(page.getByTestId('blog-detail-title')).toHaveText('MarkDown語法紀錄');
  await expect(page.getByTestId('blog-detail-tag-markdown')).toHaveText('#markdown');
});