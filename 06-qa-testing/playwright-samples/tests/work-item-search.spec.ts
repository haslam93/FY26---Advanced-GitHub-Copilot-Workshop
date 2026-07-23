import { test, expect } from '@playwright/test';

const knownWorkItems = [
  { id: 'W-000001', status: 'OPEN' },
  { id: 'W-000002', status: 'IN PROGRESS' },
  { id: 'W-000003', status: 'COMPLETED' },
];

test.describe('Work item search', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  for (const workItem of knownWorkItems) {
    test(`shows ${workItem.status} for ${workItem.id}`, async ({ page }) => {
      await page.getByLabel('Work item ID').fill(workItem.id);
      await page.getByRole('button', { name: 'Search' }).click();

      await expect(page.getByTestId('work-item-status')).toHaveText(workItem.status);
    });
  }

  test('shows a message for an unknown ID', async ({ page }) => {
    await page.getByLabel('Work item ID').fill('W-UNKNOWN');
    await page.getByRole('button', { name: 'Search' }).click();

    await expect(page.getByText('No work item found with this ID')).toBeVisible();
  });
});
