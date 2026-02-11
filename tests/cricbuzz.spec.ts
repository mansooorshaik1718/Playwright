import { test, expect } from '@playwright/test';

test('Cricbuzz application Header Validation', async ({ page }) => {
    await page.goto('https://www.cricbuzz.com/');
    await expect(page).toHaveTitle(/Cricbuzz/);
    const headerItems = [
        { text: 'Live Scores', selector: 'a[title="Live Cricket Score"]' },
        { text: 'Schedule', selector: 'a[title="Cricket Schedule"]' },
        { text: 'Archives', selector: 'a[title="Cricket Scorecard Archives"]' },
        { text: 'News', selector: 'a[title="News"]' },
        { text: 'Series', selector: 'a[title="Cricket Series"]' },
        { text: 'Teams', selector: 'a[title="Cricket Teams"]' },
        { text: 'Videos', selector: 'a[title="Cricket Videos"]' },
        { text: 'Rankings', selector: 'a[title="Cricket Rankings"]' },
        { text: 'More', selector: 'a[title="More Options"]' }
    ];

    for (const item of headerItems) {
        const element = page.locator(item.selector);
        await expect(element).toBeVisible();
        await expect(element).toHaveText(item.text);
    }
});

test('Cricbuzz application Header Navigation', async ({ page }) => {
    await page.goto('https://www.cricbuzz.com/');
    const headerTabs = [
        { text: 'Live Scores', selector: 'a[title="Live Cricket Score"]', expectedUrl: '/cricket-match/live-scores' },
        { text: 'Schedule', selector: 'a[title="Cricket Schedule"]', expectedUrl: '/cricket-schedule/upcoming-series/international' },
        { text: 'Archives', selector: 'a[title="Cricket Scorecard Archives"]', expectedUrl: '/cricket-scorecard-archives' },
        { text: 'News', selector: 'a[title="News"]', expectedUrl: '/cricket-news' },
        { text: 'Series', selector: 'a[title="Cricket Series"]', expectedUrl: '/series/all' },
        { text: 'Teams', selector: 'a[title="Cricket Teams"]', expectedUrl: '/cricket-team' },
        { text: 'Videos', selector: 'a[title="Cricket Videos"]', expectedUrl: '/cricket-videos' },
        { text: 'Rankings', selector: 'a[title="Cricket Rankings"]', expectedUrl: '/cricket-stats/icc-rankings/men/batting' },
        { text: 'More', selector: 'a[title="More Options"]', expectedUrl: null }
    ];

    for (const tab of headerTabs) {
        const element = page.locator(tab.selector);
        await element.click();
        if (tab.expectedUrl) {
            await expect(page).toHaveURL(new RegExp(tab.expectedUrl));
        }
        // Navigate back to home for next iteration
        await page.goto('https://www.cricbuzz.com/');
    }
});

test('Cricbuzz Live Scores - Active Match Subtabs Validation', async ({ page }) => {
    await page.goto('https://www.cricbuzz.com/');
    page.locator('a[title="Live Cricket Score"]').click();

    // Click on the first active match link
    const firstMatch = page.locator('((//div[@class="flex flex-col gap-px"])[1]/div/a)[1]');
    await firstMatch.click();

    // Wait for the match page to load
    await expect(page).toHaveURL(/live-cricket-scores/);

    // Subtabs to verify
    const subtabs = [
        { text: 'Info', selector: 'a[title="Info"]' },
        { text: 'Live', selector: 'a[title="Live"]' },
        { text: 'Scorecard', selector: 'a[title="Scorecard"]' },
        { text: 'Squads', selector: 'a[title="Squads"]' },
        { text: 'Overs', selector: 'a[title="Overs"]' },
        { text: 'Highlights', selector: 'a[title="Highlights"]' },
        { text: 'Full Commentary', selector: 'a[title="Full Commentary"]' },
        { text: 'News', selector: '(//a[@title="News"])[2]' }
    ];

    for (const subtab of subtabs) {
        const element = page.locator(subtab.selector);
        await expect(element).toBeVisible();
        await expect(element).toHaveText(subtab.text);
    }
});

