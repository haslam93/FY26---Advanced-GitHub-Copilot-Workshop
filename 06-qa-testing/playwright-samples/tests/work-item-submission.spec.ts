import { test, expect } from '@playwright/test';

test.describe('Work item submission', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('submits a valid work item', async ({ page }) => {
    await page.getByLabel('Title').fill('Improve the empty state');
    await page.getByLabel('Owner email').fill('developer@example.test');
    await page.getByLabel('Priority').selectOption('HIGH');
    await page.getByLabel('Description').fill('Add guidance when no work items are available.');
    await page.getByRole('button', { name: 'Submit work item' }).click();

    await expect(page.getByRole('heading', { name: 'Work item submitted' })).toBeVisible();
    await expect(page.getByTestId('confirmation-number')).toHaveText(/^W-\d{6}$/);
    await expect(page.locator('#work-item-form')).toBeHidden();
  });

  test('shows required field errors', async ({ page }) => {
    await page.getByRole('button', { name: 'Submit work item' }).click();

    await expect(page.getByText('Title is required')).toBeVisible();
    await expect(page.getByText('Owner email is required')).toBeVisible();
    await expect(page.getByText('Priority is required')).toBeVisible();
  });

  test('rejects an invalid email address', async ({ page }) => {
    await page.getByLabel('Title').fill('Improve the empty state');
    await page.getByLabel('Owner email').fill('not-an-email');
    await page.getByLabel('Priority').selectOption('LOW');
    await page.getByRole('button', { name: 'Submit work item' }).click();

    await expect(page.getByText('Enter a valid email address')).toBeVisible();
  });
});
