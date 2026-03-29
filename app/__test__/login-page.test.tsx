import '@/shared/testing/__mocks__/navigation';

import { Toaster } from '@shared/components/ui/sonner';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {
  createAuthProviderWrapper,
  createComposedWrapper,
  createQueryClientWrapper,
} from '@/shared/testing/wrappers/test-wrappers';

import LoginPage from '../login/page';

const wrapper = createComposedWrapper([
  createAuthProviderWrapper(),
  createQueryClientWrapper(),
]);

describe('Login Page', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LoginPage />, { wrapper });
    expect(baseElement).toBeTruthy();
  });

  it('should show error message on invalid credentials', async () => {
    const user = userEvent.setup();
    const { getByRole, getByPlaceholderText } = render(
      <>
        <Toaster />
        <LoginPage />
      </>,
      { wrapper },
    );

    const emailInput = getByPlaceholderText(/email/i);
    const passwordInput = getByPlaceholderText(/password/i);
    const submitButton = getByRole('button', { name: 'Login' });

    await user.type(emailInput, 'invalid@example.com');
    await user.type(passwordInput, 'wrongpassword');
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Invalid credentials/i)).toBeInTheDocument();
    });
  });

  it('should show success message on invalid credentials', async () => {
    const user = userEvent.setup();
    const { getByRole, getByPlaceholderText } = render(
      <>
        <Toaster />
        <LoginPage />
      </>,
      { wrapper },
    );

    const emailInput = getByPlaceholderText(/email/i);
    const passwordInput = getByPlaceholderText(/password/i);
    const submitButton = getByRole('button', { name: 'Login' });

    await user.type(emailInput, 'smith@example.com');
    await user.type(passwordInput, 'pass123');
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Login successful/i)).toBeInTheDocument();
    });
  });
});
