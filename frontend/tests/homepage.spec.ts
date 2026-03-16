import { expect, test } from '@playwright/test';

test('測試首頁的載入、文章列表、側邊欄、標籤顯示，以及文章內頁導向', async ({ page }) => {
  await page.goto('/zh');

  // 確認首頁元素存在
  await expect(page.getByTestId('home-page')).toBeVisible();
  await expect(page.getByTestId('home-list-title')).toHaveText('最新文章');

  // 確認文章列表存在且有文章項目
  const postList = page.getByTestId('home-post-list');
  const postCards = page.locator('[data-testid^="home-post-card-"]');

  // 確認文章列表可見且至少有一篇文章
  await expect(postList).toBeVisible();
  await expect(postCards.first()).toBeVisible();
  expect(await postCards.count()).toBeGreaterThan(0);
  await expect(page.getByTestId('home-list-count')).not.toHaveText('共 0 篇');

  // 確認側邊欄元素存在
  await expect(page.getByTestId('home-sidebar')).toBeVisible();
  await expect(page.getByTestId('sidebar-author-card')).toBeVisible();
  await expect(page.getByTestId('sidebar-search')).toBeVisible();
  await expect(page.getByTestId('sidebar-categories')).toBeVisible();
  await expect(page.getByTestId('sidebar-tags')).toBeVisible();
  await expect(page.getByTestId('sidebar-recent-posts')).toBeVisible();

  // 確認側邊欄分類和標籤至少有一項
  const categoryItems = page.locator('[data-testid^="sidebar-category-item-"]');
  const tagItems = page.locator('[data-testid^="sidebar-tag-item-"]');

  await expect.poll(async () => categoryItems.count()).toBeGreaterThan(0);
  await expect.poll(async () => tagItems.count()).toBeGreaterThan(0);
  await expect(categoryItems.first()).toBeVisible();
  await expect(tagItems.first()).toBeVisible();

  const firstCategoryLink = categoryItems.first().locator('a');
  const firstTagLink = tagItems.first().locator('a');

  await expect(firstCategoryLink).toContainText(/.+/);
  await expect(firstTagLink).toContainText(/^#.+/);

  const firstPostLink = page.locator('[data-testid^="home-post-link-"]').first();
  const firstPostTitle = await firstPostLink.locator('[data-testid^="home-post-title-"]').textContent();
  const firstPostHref = await firstPostLink.getAttribute('href');

  expect(firstPostHref).toMatch(/^\/zh\/blog\//);
  await firstPostLink.scrollIntoViewIfNeeded();
  await Promise.all([
    page.waitForURL(`**${firstPostHref}`),
    firstPostLink.click(),
  ]);

  await expect(page.getByTestId('blog-detail-page')).toBeVisible();
  await expect(page.getByTestId('blog-detail-title')).toHaveText((firstPostTitle || '').trim());
});