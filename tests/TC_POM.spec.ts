import { test, expect } from '@playwright/test';
import { LoginPage } from '../models/loginPage';

test('user can log in successfully', async ({ page }) => {
  const loginPage = new LoginPage(page);

  // High-level actions
  await loginPage.goto();
  await loginPage.login('student', 'Password123');

  // Verify the result
  await expect(page).toHaveURL(/logged-in-successfully/);
});
