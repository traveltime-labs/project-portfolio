import { expect, test } from '@playwright/test';

test('測試分類列表頁面和分類詳情頁面', async ({ page }) => {
  await page.goto('/zh/category');

  // 確認分類列表頁面元素存在
  await expect(page.getByTestId('category-page')).toBeVisible();
  await expect(page.getByTestId('category-title')).toHaveText('分類列表');

  // 確認至少有一個分類項目存在
  const categoryItems = page.locator('[data-testid^="category-item-"]');
  await expect(categoryItems.first()).toBeVisible();
  expect(await categoryItems.count()).toBeGreaterThan(0);

  // 點擊第一個分類連結
  const firstCategoryLink = categoryItems.first().locator('[data-testid^="category-link-"]');
  await expect(firstCategoryLink).toBeVisible();

  // 從連結文字中提取分類名稱和文章數量
  const firstCategoryText = (await firstCategoryLink.textContent())?.trim() ?? '';
  expect(firstCategoryText).toMatch(/^.+\s\(\d+\)$/);

  // 使用正則表達式從連結文字中提取分類名稱和文章數量
  const matched = firstCategoryText.match(/^(.*)\s\((\d+)\)$/);
  expect(matched).not.toBeNull();

  // 從連結文字中提取分類名稱和文章數量
  const categoryName = matched?.[1] ?? '';
  const categoryCount = Number(matched?.[2] ?? '0');
  const firstCategoryHref = await firstCategoryLink.getAttribute('href');

  expect(categoryName).not.toBe('');
  expect(categoryCount).toBeGreaterThan(0);
  expect(firstCategoryHref).toMatch(/^\/zh\/category\/.+/);

  await Promise.all([
    page.waitForURL(`**${firstCategoryHref}`),
    firstCategoryLink.click(),
  ]);

  await expect(page.getByTestId('category-detail-page')).toBeVisible();
  await expect(page.getByTestId('category-detail-title')).toHaveText(`${categoryName}分類列表`);

  // 確認分類詳情頁面文章列表
  const detailPosts = page.locator('[data-testid^="category-detail-post-link-"]');
  await expect(detailPosts.first()).toBeVisible();
  await expect(detailPosts).toHaveCount(categoryCount);
});

test('測試分類詳情頁面可直接載入並導向文章頁', async ({ page }) => {
  await page.goto('/zh/category/Frontend');

  // 確認分類詳情頁面元素存在
  await expect(page.getByTestId('category-detail-page')).toBeVisible();
  await expect(page.getByTestId('category-detail-title')).toHaveText('Frontend分類列表');

  // 確認至少有一個文章連結存在
  const detailPosts = page.locator('[data-testid^="category-detail-post-link-"]');
  await expect(detailPosts).toHaveCount(1);

  // 點擊第一個文章連結
  const firstPostLink = detailPosts.first();
  await expect(firstPostLink).toHaveText('Web SSR前端框架(Next.js, Nuxt3, Vike)對比');

  // 確認連結正確導向文章內頁
  const firstPostHref = await firstPostLink.getAttribute('href');
  expect(firstPostHref).toBe('/zh/blog/20260223_Web_SSR%E5%89%8D%E7%AB%AF%E6%A1%86%E6%9E%B6(Next.js%2C%20Nuxt3%2C%20Vike)%E5%B0%8D%E6%AF%94');

  // 點擊連結並等待導向文章內頁
  await Promise.all([
    page.waitForURL('**/zh/blog/**'),
    firstPostLink.click(),
  ]);

  await expect(page.getByTestId('blog-detail-page')).toBeVisible();
  await expect(page.getByTestId('blog-detail-title')).toHaveText('Web SSR前端框架(Next.js, Nuxt3, Vike)對比');
  await expect(page.getByTestId('blog-detail-category-link')).toHaveText('Frontend');
});