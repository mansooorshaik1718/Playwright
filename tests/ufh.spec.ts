import { test, expect } from '@playwright/test';

test('has title', async ({ page, context }) => {
    await page.goto('https://www.ups.com/us/en/supplychain/home');

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/UPS Supply Chain Solutions - Freight Shipping and Logistics - United States/);

    // Set up the listener for the new tab
    const pagePromise = context.waitForEvent('page');

    // Click the get started link.
    await page.getByRole('link', { name: 'Ship Your Freight' }).click();

    // Switch focus to the new tab
  const newPage = await pagePromise;
  await newPage.waitForLoadState(); // Good practice to wait for the new page to load

  // Verify the heading on the NEW page
  await expect(newPage.locator('//h1[contains(normalize-space(), "Freight Forwarding")]')).toBeVisible();

  // Click the quote button on the NEW page
  await newPage.getByRole('link', { name: 'Get a Freight Quote' }).click();
});

