import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
    await page.goto('https://www.ups.com/us/en/supplychain/home');
    const page1Promise = page.waitForEvent('popup');
    await page.getByRole('link', { name: 'Ship Your Freight' }).click();

    const page1 = await page1Promise;
    // Define the locators using your XPaths
    // const cookiePopup = page1.locator('//div[@id="onetrust-button-group"]/button');
    // const closeBtn = page1.locator('//div[@id="onetrust-close-btn-container"]/button');

    
    // await expect(page1.locator('//div[@id="onetrust-button-group"]/button'))
    //     .toBeVisible({ timeout: 10000 });
    
    // if (await cookiePopup.isVisible()) {
    //     console.log('Cookie popup detected. Closing...');
    //     await closeBtn.click();

    //     await expect(closeBtn).toBeHidden();
    // }

    //   await expect(page1.locator('//h1[contains(normalize-space(), "Freight Forwarding")]')).toBeVisible();
    //   await page1.getByRole('heading', { name: 'Freight Forwarding Made Easy' }).isVisible();
    //   await expect(page1.getByRole('heading', { name : 'Freight Forwarding Made Easy' })).toBeVisible();

    // This will wait up to 10 seconds for the heading to appear
    // const heading = page1.getByRole('heading', { name: 'Freight Forwarding Made Easy' })
    // await expect(heading).toBeVisible({ timeout: 10000 });

    // Replace line 33 with this:
    await page1.getByRole('link', { name: 'Get a Freight Quote' }).click();
    // await page1.locator('//input[@id="fromCountry"]/following-sibling::button').click();
    await page1.locator('#fromCountry').fill('ind');
    await page1.getByRole('option', { name: 'India', exact: true }).click();
    // await page.waitForTimeout(15000); 
    // await page1.locator('//input[@id="toCountry"]/following-sibling::button').click();
    await page1.locator('#toCountry').fill('aus');
    await page1.getByRole('option', { name: 'Australia', exact: true }).click();

    // address
    await page1.locator('(//input[@id="city"])[1]/following-sibling::button').click({ timeout: 10000 });
    await page1.locator('(//input[@id="city"])[1]').fill('chennai');
    await page1.getByRole('option', { name: 'CHENNAI, TN 502255' }).click({ timeout: 10000 });

    await page1.locator('(//input[@id="city"])[2]/following-sibling::button').click({ timeout: 10000 });
    await page1.locator('(//input[@id="city"])[2]').fill('syd');
    await page1.getByRole('option', { name: 'SYDNEY, NSW', exact: true }).click({ timeout: 10000 });
    await page1.getByRole('button', { name: 'Submit' }).click({ timeout: 10000 });

});


