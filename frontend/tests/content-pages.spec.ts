import { expect, test } from '@playwright/test';

test('測試關於頁面內容顯示', async ({ page }) => {
  await page.goto('/zh/about');

  await expect(page.getByTestId('about-page')).toBeVisible();
  await expect(page.getByTestId('about-title')).toHaveText('about');
  await expect(page.getByTestId('about-history-section')).toBeVisible();
  await expect(page.getByTestId('timeline-root')).toBeVisible();
  await expect(page.locator('[data-testid^="timeline-group-"]')).toHaveCount(3);

  await expect(page.getByTestId('about-works-section')).toBeVisible();
  await expect(page.getByTestId('about-works-grid')).toBeVisible();
  await expect(page.locator('[data-testid^="about-work-card-"]')).toHaveCount(6);
});

test('測試文章列表頁面並導向文章內頁', async ({ page }) => {
  await page.goto('/zh/articles');

  await expect(page.getByTestId('articles-page')).toBeVisible();
  await expect(page.getByTestId('articles-title')).toHaveText('文章列表');

  const articleItems = page.locator('[data-testid^="articles-item-"]');
  await expect(articleItems.first()).toBeVisible();
  expect(await articleItems.count()).toBeGreaterThan(0);

  const firstArticleLink = page.locator('[data-testid="articles-link-20260226_cicd"]').first();
  await expect(firstArticleLink).toBeVisible();
  await expect(firstArticleLink).toHaveText('CI/CD 介紹');
  await expect(page.getByTestId('articles-category-20260226_cicd')).toHaveText('CI/CD');

  const href = await firstArticleLink.getAttribute('href');
  expect(href).toBe('/zh/blog/20260226_cicd');

  await Promise.all([
    page.waitForURL('**/zh/blog/20260226_cicd'),
    firstArticleLink.click(),
  ]);

  await expect(page.getByTestId('blog-detail-page')).toBeVisible();
  await expect(page.getByTestId('blog-detail-title')).toHaveText('CI/CD 介紹');
  await expect(page.getByTestId('blog-detail-category-link')).toHaveText('CI/CD');
});

test('測試文章內頁可直接載入並顯示分類與標籤', async ({ page }) => {
  await page.goto('/zh/blog/20260223_Web_SSR%E5%89%8D%E7%AB%AF%E6%A1%86%E6%9E%B6(Next.js%2C%20Nuxt3%2C%20Vike)%E5%B0%8D%E6%AF%94');

  await expect(page.getByTestId('blog-detail-page')).toBeVisible();
  await expect(page.getByTestId('blog-detail-title')).toHaveText('Web SSR前端框架(Next.js, Nuxt3, Vike)對比');
  await expect(page.getByTestId('blog-detail-date')).toHaveText('2026-02-23');
  await expect(page.getByTestId('blog-detail-category-link')).toHaveText('Frontend');
  await expect(page.getByTestId('blog-detail-tags')).toBeVisible();
  await expect(page.getByTestId('blog-detail-tag-Next.js')).toHaveText('#Next.js');
  await expect(page.getByTestId('blog-detail-tag-Nuxt3')).toHaveText('#Nuxt3');
  await expect(page.getByTestId('blog-detail-tag-vike')).toHaveText('#vike');
  await expect(page.getByTestId('blog-detail-article')).toContainText('2026 Web SSR前端框架對比');
});