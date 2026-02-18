import { test, expect } from '@playwright/test';

test('submit air quote', async ({ page }) => {
    // Step 1: Navigate to the specified URL
    await page.goto('https://scsappsuat.ups.com/forwardinghub/us/en/quotes/ngflow?tx=17707199563291016');

    // Close the cookie popup
    await page.locator('//div[@id="onetrust-close-btn-container"]/button').click();

    // Fill in the "From Country" field
    await page.locator('//input[@id="fromCountry"]').fill('india');
    await page.locator('//li[@aria-label="India"]').click();

    // select state - city - zip
    await page.locator('(//input[@aria-label="Enter City, State or Zip Code"])[1]').fill('bengaluru')
    await page.locator('//li[@aria-label="BENGALURU, KA 560001"]').click({ timeout: 50000 });

    // Fill the "To Country" field
    await page.locator('//input[@id="toCountry"]').fill('indonesia');
    await page.locator('//li[@aria-label="Indonesia"]').click({ timeout: 50000 });

    // select state - city - zip
    await page.locator('(//input[@aria-label="Enter City, State or Zip Code"])[2]').fill('jakarta')
    await page.locator('//li[@aria-label="JAKARTA, 10002"]').click({ timeout: 50000 });

    // commodity information
    await page.locator('//input[@id="comDesc" and @role="combobox"]').click();
    await page.locator('//input[@id="comDesc" and @role="combobox"]').fill('cotton');
    await page.locator('//li[@aria-label="Bags, Jute Or Cotton"]').click({ timeout: 50000 });
    
    //cargo value
    await page.locator('//input[@automationdata_id="cargotextid"]').fill('1000')

    await page.locator('//input[@automationdata_id="palletsid"]').fill('10')
    await page.locator('//input[@automationdata_id="weightid"]').fill('100')
    await page.locator('//input[@automationdata_id="lengthid"]').fill('50');
    await page.locator('//input[@automationdata_id="widthid"]').fill('50');
    await page.locator('//input[@automationdata_id="heightid"]').fill('50');

    await page.locator('//p-radiobutton[@automationdata_id="generalcargoid"]').click();
    await page.locator('//button[@automationdata_id="savetemplatebuttonid"]').click();

});