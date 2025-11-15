import { renderHook, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';

import { authStorage } from '@/features/auth/storage/auth.storage';
import { setHeaderToken } from '@/shared/lib/axios-instance';

import { useProtectedRoute } from '../useProtectedRoute';
import { useTokenRefresh } from '../useTokenRefresh';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/features/auth/storage/auth.storage', () => ({
  authStorage: {
    getAuthSession: jest.fn(),
    saveAuthSession: jest.fn(),
  },
}));

jest.mock('@/shared/lib/axios-instance', () => ({
  setHeaderToken: jest.fn(),
}));

jest.mock('../useTokenRefresh', () => ({
  useTokenRefresh: jest.fn(),
}));

describe('useProtectedRoute', () => {
  const routerPushMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useRouter as jest.Mock).mockReturnValue({
      push: routerPushMock,
    });
  });

  it('redirects to /login when user is not authenticated', async () => {
    (authStorage.getAuthSession as jest.Mock).mockReturnValue(null);

    renderHook(() => useProtectedRoute());

    await waitFor(() => {
      expect(setHeaderToken).toHaveBeenCalledWith('');
      expect(routerPushMock).toHaveBeenCalledWith('/login');
    });
  });

  it('redirects to /dashboard when user is authenticated', async () => {
    (authStorage.getAuthSession as jest.Mock).mockReturnValue({
      access_token: 'test',
    });

    renderHook(() => useProtectedRoute());

    await waitFor(() => {
      expect(setHeaderToken).toHaveBeenCalledWith('test');
      expect(routerPushMock).toHaveBeenCalledWith('/dashboard');
    });
  });

  it('calls useTokenRefresh on mount', () => {
    renderHook(() => useProtectedRoute());
    expect(useTokenRefresh).toHaveBeenCalledTimes(1);
  });
});
