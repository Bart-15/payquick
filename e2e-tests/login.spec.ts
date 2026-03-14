import { expect, test } from '@playwright/test';

test.describe('Login Page', () => {
  // Clear storage before each test
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await page.context().clearCookies();
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
  });

  test('should display login form', async ({ page }) => {
    const emailInput = page.getByRole('textbox', { name: 'Email' });
    const passwordInput = page.getByLabel('Password');
    const loginButton = page.getByRole('button', { name: 'Login' });

    await expect(emailInput).toBeVisible();
    await expect(passwordInput).toBeVisible();
    await expect(loginButton).toBeVisible();
  });

  test('should show error messages when submitting empty form', async ({
    page,
  }) => {
    const loginButton = page.getByRole('button', { name: 'Login' });

    await loginButton.click();

    const emailError = page.getByText('Email is required');
    const passwordError = page.getByText('Password is required');

    await expect(emailError).toBeVisible();
    await expect(passwordError).toBeVisible();
  });

  test('should redirect to dashboard after successful login', async ({
    page,
  }) => {
    const emailInput = page.getByRole('textbox', { name: 'Email' });
    const passwordInput = page.getByLabel('Password');
    const loginButton = page.getByRole('button', { name: 'Login' });

    await emailInput.fill('smith@example.com');
    await passwordInput.fill('pass123');
    await loginButton.click();

    await page.waitForURL(`/dashboard`, { timeout: 10000 });
    await expect(page).toHaveURL(`/dashboard`);
  });

  test('should show toast for invalid credentials', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Email' }).fill('bart@mail.com');
    await page.getByLabel('Password').fill('password123');
    await page.getByRole('button', { name: 'Login' }).click();

    // Target the Sonner toast
    const toast = page.locator(
      'li[data-sonner-toast] >> text=Invalid credentials',
    );
    await toast.waitFor({ state: 'visible', timeout: 5000 });

    await expect(toast).toBeVisible();
  });
});
