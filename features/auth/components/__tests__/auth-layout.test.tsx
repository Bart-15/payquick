import { render, screen } from '@testing-library/react';
import { usePathname, useRouter } from 'next/navigation';

import { useProtectedRoute } from '@/features/auth/hooks/useProtectedRoute';

import { AuthLayout } from '../auth-layout';

// Mock dependencies
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));

jest.mock('@/features/auth/hooks/useProtectedRoute', () => ({
  useProtectedRoute: jest.fn(),
}));

jest.mock('@/shared/components/ui/nav-bar', () => ({
  NavBar: jest.fn(() => <div data-testid="nav-bar" />),
}));

describe('AuthLayout', () => {
  const mockRouter = {
    push: jest.fn(),
    usePathname: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  it('should render children correctly', () => {
    const { container } = render(<AuthLayout>Test</AuthLayout>);
    expect(container).toHaveTextContent('Test');
  });

  it('should render navbar on protected routes', () => {
    (usePathname as jest.Mock).mockReturnValue('/dashboard');

    render(<AuthLayout>Test</AuthLayout>);

    expect(screen.getByTestId('nav-bar')).toBeInTheDocument();
  });

  it('should not render navbar on non-protected routes', () => {
    (usePathname as jest.Mock).mockReturnValue('/login');

    render(<AuthLayout>Test</AuthLayout>);

    expect(screen.queryByTestId('nav-bar')).not.toBeInTheDocument();
  });

  it('should useProtectedRoute hook properly', () => {
    (usePathname as jest.Mock).mockReturnValue('/login');
    render(<AuthLayout>Test</AuthLayout>);
    expect(useProtectedRoute).toHaveBeenCalled();
  });
});
