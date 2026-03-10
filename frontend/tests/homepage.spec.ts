import { expect, test } from '@playwright/test';

test('homepage load, list, sidebar, tags, and article navigation', async ({ page }) => {
  await page.goto('/zh');

  await expect(page.getByTestId('home-page')).toBeVisible();
  await expect(page.getByTestId('home-list-title')).toHaveText('最新文章');

  const postList = page.getByTestId('home-post-list');
  const postCards = page.locator('[data-testid^="home-post-card-"]');

  await expect(postList).toBeVisible();
  await expect(postCards.first()).toBeVisible();
  expect(await postCards.count()).toBeGreaterThan(0);
  await expect(page.getByTestId('home-list-count')).not.toHaveText('共 0 篇');

  await expect(page.getByTestId('home-sidebar')).toBeVisible();
  await expect(page.getByTestId('sidebar-author-card')).toBeVisible();
  await expect(page.getByTestId('sidebar-search')).toBeVisible();
  await expect(page.getByTestId('sidebar-categories')).toBeVisible();
  await expect(page.getByTestId('sidebar-tags')).toBeVisible();
  await expect(page.getByTestId('sidebar-recent-posts')).toBeVisible();

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