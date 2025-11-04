import { test, expect } from '@playwright/test';

// This test intercepts the backend API and serves mock coffees to verify rendering
// without relying on the .NET API to be running.

test('renders coffees on the home page', async ({ page }) => {
  await page.route('http://localhost:5000/api/coffees', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([
        {
          id: 1,
          name: 'Ethiopian Yirgacheffe',
          origin: 'Ethiopia',
          tastingNotes: 'Floral, citrus, bergamot',
          roast: 'Light',
          acidity: 'Bright',
          body: 3,
          bitterness: 2,
          bestFor: 'Pour-over'
        },
        {
          id: 2,
          name: 'Colombian Supremo',
          origin: 'Colombia',
          tastingNotes: 'Chocolate, caramel, nutty',
          roast: 'Medium',
          acidity: 'Balanced',
          body: 4,
          bitterness: 3,
          bestFor: 'Drip'
        }
      ])
    });
  });

  await page.goto('/');

  await expect(page.getByText('Coffee2Live')).toBeVisible();
  await expect(page.locator('.coffee-card')).toHaveCount(2);
  await expect(page.getByRole('heading', { level: 5, name: 'Ethiopian Yirgacheffe' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 5, name: 'Colombian Supremo' })).toBeVisible();
});
