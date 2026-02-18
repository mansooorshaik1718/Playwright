import { test, expect } from '@playwright/test';

test('navigate and validate new tab title', async ({ page, context }) => {
    // Navigate to the UPS Supply Chain home page
    await page.goto('https://www.ups.com/us/en/supplychain/home');

    // Listen for the new page (tab) event
    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        // Click on "Ship Your Freight" (adjust selector as needed)
        page.getByRole('link', { name: /ship your freight/i }).click(),
    ]);

    // Wait for the new page to load
    await newPage.waitForLoadState('domcontentloaded');

    // Validate the title of the new tab
    await expect(newPage).toHaveTitle(
        'UPS Forwarding Hub | UPS Supply Chain Solutions'
    );
});


test('test2', async ({ page }) => {
    // Navigate to the UPS Supply Chain home page
    // await page.goto('https://www.ups.com/us/en/supplychain/home');

    // Listen for the new page (tab) event
    // const [newPage] = await Promise.all([
    //     context.waitForEvent('page'),
    //     page.getByRole('link', { name: /ship your freight/i }).click(),
    // ]);

    await page.goto('https://scsappsuat.ups.com/forwardinghub/us/en/quotes/ngflow?tx=17707199563291016')

    // Wait for the new page to load
    await page.waitForLoadState('domcontentloaded');

    // Click on "Get a Freight Quote"
    // await page.getByRole('link', { name: /Get a Freight Quote/i }).click();

    // Wait for the quote page to load
    // await page.waitForLoadState('domcontentloaded');

    // Close the cookie popup
    await page.locator('//div[@id="onetrust-close-btn-container"]/button').click();

    // Select the "Ocean FCL" radio button
    await page.locator('//p-radiobutton[@automationdata_id="quotefclid"]').click();

    // Fill in the "From Country" field
    await page.locator('//input[@id="fromCountry"]').fill('india');
    await page.locator('//li[@aria-label="India"]').click({ timeout: 50000 });

    // select state - city - zip
    await page.locator('(//input[@aria-label="Enter City, State or Zip Code"])[1]').fill('chennai')
    await page.locator('//li[@aria-label="CHENNAI, TN 600003"]').click({ timeout: 50000 });

    // Fill the "To Country" field
    await page.locator('//input[@id="toCountry"]').fill('united states');
    await page.locator('//li[@aria-label="United States Of America"]').click({ timeout: 50000 });

    // select state - city - zip
    await page.locator('(//input[@aria-label="Enter City, State or Zip Code"])[2]').fill('new york')
    await page.locator('//li[@aria-label="NEW YORK, NY 10001"]').click({ timeout: 50000 });

    // commodity information
    await page.locator('//input[@id="comDesc"]').fill('cotton');
    await page.locator('//li[@aria-label="Bags, Jute or Cotton"]').click()
    
    //cargo value
    await page.locator('//input[@automationdata_id="cargotextid"]').fill('100')

    
    await page.locator('//input[@automationdata_id="palletsid"]').fill('10')

    await page.locator('//p-radiobutton[@automationdata_id="generalcargoid"]').click()

    await page.locator('//button[@automationdata_id="savetemplatebuttonid"]').click()
});