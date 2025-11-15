import '@/shared/testing/__mocks__/navigation';
import '@testing-library/jest-dom';

import { zodResolver } from '@hookform/resolvers/zod';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { loginValidationSchema } from '@/features/auth/validations/login.validation';
import {
  createAuthProviderWrapper,
  createComposedWrapper,
  createFormProviderWrapper,
  createQueryClientWrapper,
} from '@/shared/testing/wrappers/test-wrappers';

import LoginForm from '../login-form';

jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

const wrapper = createComposedWrapper([
  createAuthProviderWrapper(),
  createQueryClientWrapper(),
  createFormProviderWrapper({
    mode: 'all',
    resolver: zodResolver(loginValidationSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  }),
]);

describe('LoginForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the login form properly', () => {
    render(<LoginForm />, { wrapper });

    const heading = screen.getByRole('heading', { name: 'Login' });
    const loginButton = screen.getByRole('button', { name: 'Login' });
    const emailInput = screen.getByRole('textbox', { name: 'Email' });
    const passwordInput = screen.getByLabelText('Password');

    expect(heading).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  it('should render error message for email and password when user submit the form without entering any data', async () => {
    render(<LoginForm />, { wrapper });
    const loginButton = screen.getByRole('button', { name: 'Login' });
    await userEvent.click(loginButton);

    const emailError = screen.getByText('Email is required');
    const passwordError = screen.getByText('Password is required');

    expect(emailError).toBeInTheDocument();
    expect(passwordError).toBeInTheDocument();
  });

  it('should not render error message for email and password when user submit the form with valid data', async () => {
    render(<LoginForm />, { wrapper });

    const emailInput = screen.getByRole('textbox', { name: 'Email' });
    const passwordInput = screen.getByLabelText('Password');

    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, 'password');

    const loginButton = screen.getByRole('button', { name: 'Login' });
    await userEvent.click(loginButton);

    const emailError = screen.queryByText('Email is required');
    const passwordError = screen.queryByText('Password is required');

    expect(emailError).not.toBeInTheDocument();
    expect(passwordError).not.toBeInTheDocument();
  });
});
