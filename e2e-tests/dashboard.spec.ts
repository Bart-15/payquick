import { expect, test } from '@playwright/test';

test.describe('Dashboard Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');

    await page
      .getByRole('textbox', { name: 'Email' })
      .fill('smith@example.com');
    await page.getByLabel('Password').fill('pass123');
    await page.getByRole('button', { name: 'Login' }).click();

    await page.waitForURL(`/dashboard`, { timeout: 10000 });
    await expect(page).toHaveURL(`/dashboard`);
  });

  test("should navigate to dashboard, display user's name, heading", async ({
    page,
  }) => {
    const userName = page.getByText('Hi, Paul Smith');
    await expect(userName).toBeVisible();
    await expect(
      page.getByRole('heading', { name: 'Transactions' }),
    ).toBeVisible();
  });

  test('should navigate to login page when logout button is clicked', async ({
    page,
  }) => {
    const logoutButton = page.getByRole('button', { name: 'Logout' });
    await logoutButton.click();

    await page.waitForURL(`/login`, { timeout: 10000 });
    await expect(page).toHaveURL(`/login`);
  });
});
