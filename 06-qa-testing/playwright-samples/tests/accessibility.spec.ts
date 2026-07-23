import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility', () => {
  test('has no WCAG 2.1 A or AA violations', async ({ page }) => {
    await page.goto('/');

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();

    expect(results.violations).toEqual([]);
  });

  test('required fields are keyboard reachable', async ({ page }) => {
    await page.goto('/');

    await page.keyboard.press('Tab');
    await expect(page.getByLabel('Title')).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(page.getByLabel('Owner email')).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(page.getByLabel('Priority')).toBeFocused();
  });

  test('validation errors use alert semantics', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Submit work item' }).click();

    await expect(page.locator('[role="alert"].visible')).toHaveCount(3);
  });
});
