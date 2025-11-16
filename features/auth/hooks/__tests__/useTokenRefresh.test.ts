import { act, renderHook } from '@testing-library/react';
import { useRouter } from 'next/navigation';

import { authStorage } from '@/features/auth/storage/auth.storage';
import { setHeaderToken } from '@/shared/lib/axios-instance';
import { createAuthProviderWrapper } from '@/shared/testing/wrappers/test-wrappers';

import { refreshAccessToken } from '../../services/auth.service';
import { useTokenRefresh } from '../useTokenRefresh';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('../../services/auth.service', () => ({
  refreshAccessToken: jest.fn(),
}));

jest.mock('@/features/auth/storage/auth.storage', () => ({
  authStorage: {
    getAuthSession: jest.fn(),
    saveAuthSession: jest.fn(),
    removeAuthSession: jest.fn(),
  },
}));

jest.mock('@/shared/lib/axios-instance', () => ({
  setHeaderToken: jest.fn(),
}));

describe('useTokenRefresh', () => {
  const routerPush = jest.fn();

  const renderUseTokenRefresh = () =>
    renderHook(() => useTokenRefresh(), {
      wrapper: createAuthProviderWrapper(),
    });

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers(); // fake timers for setTimeout
    jest.spyOn(global, 'setTimeout');
    (useRouter as jest.Mock).mockReturnValue({ push: routerPush });
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('schedules token refresh correctly', () => {
    const now = Date.now();
    const expiresAt = now + 10000; // 10 seconds in future
    (authStorage.getAuthSession as jest.Mock).mockReturnValue({
      access_token: 'abc',
      refresh_token: 'refresh',
      expires_at: expiresAt,
    });

    renderUseTokenRefresh();

    // expect setTimeout called with 10s - 5s = 5000ms
    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 5000);
  });

  it('refreshes token successfully and reschedules', async () => {
    const now = Date.now();
    const expiresAt = now + 10000;
    const oldSession = {
      access_token: 'abc',
      refresh_token: 'refresh',
      expires_at: expiresAt,
    };
    const newSession = {
      access_token: 'new-token',
      refresh_token: 'new-refresh',
      expires_at: Date.now() + 15000,
    };

    (authStorage.getAuthSession as jest.Mock).mockReturnValue(oldSession);
    (refreshAccessToken as jest.Mock).mockResolvedValue({ data: newSession });

    renderUseTokenRefresh();

    // trigger refresh
    await act(async () => {
      jest.runOnlyPendingTimers();
      // wait for promise to resolve
      await Promise.resolve();
    });

    expect(refreshAccessToken).toHaveBeenCalledWith('refresh');
    expect(authStorage.saveAuthSession).toHaveBeenCalledWith(newSession);
    expect(setHeaderToken).toHaveBeenCalledWith('new-token');

    // Should schedule next refresh
    expect(setTimeout).toHaveBeenCalledTimes(2);
  });

  it('logs out user if refresh returns null', async () => {
    const now = Date.now();
    const expiresAt = now + 10000;
    const session = {
      access_token: 'abc',
      refresh_token: 'refresh',
      expires_at: expiresAt,
    };

    (authStorage.getAuthSession as jest.Mock).mockReturnValue(session);
    (refreshAccessToken as jest.Mock).mockResolvedValue({ data: null });

    renderUseTokenRefresh();

    await act(async () => {
      jest.runOnlyPendingTimers();
      await Promise.resolve();
    });

    expect(authStorage.removeAuthSession).toHaveBeenCalled();
    expect(setHeaderToken).toHaveBeenCalledWith('');
    expect(routerPush).toHaveBeenCalledWith('/login');
  });

  it('logs out user if refresh throws error', async () => {
    const now = Date.now();
    const expiresAt = now + 10000;
    const session = {
      access_token: 'abc',
      refresh_token: 'refresh',
      expires_at: expiresAt,
    };

    (authStorage.getAuthSession as jest.Mock).mockReturnValue(session);
    (refreshAccessToken as jest.Mock).mockRejectedValue(new Error('fail'));

    renderUseTokenRefresh();

    await act(async () => {
      jest.runOnlyPendingTimers();
      await Promise.resolve();
    });

    expect(authStorage.removeAuthSession).toHaveBeenCalled();
    expect(setHeaderToken).toHaveBeenCalledWith('');
    expect(routerPush).toHaveBeenCalledWith('/login');
  });
});
