import { renderHook } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { setHeaderToken } from '@/shared/lib/axios-instance';
import { createQueryClientWrapper } from '@/shared/testing/wrappers/test-wrappers';

import { login } from '../../services/auth.service';
import { authStorage } from '../../storage/auth.storage';
import { useLoginMutation } from '../useLoginMutation';

// Mock dependencies
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

jest.mock('@/shared/lib/axios-instance', () => ({
  setHeaderToken: jest.fn(),
}));

jest.mock('../../services/auth.service', () => ({
  login: jest.fn(),
}));

jest.mock('../../storage/auth.storage', () => ({
  authStorage: {
    saveAuthSession: jest.fn(),
  },
}));

describe('useLoginMutation', () => {
  const mockRouter = {
    push: jest.fn(),
  };

  const mockLoginData = {
    data: {
      access_token: 'mock-token',
      user: {
        id: 1,
        email: 'test@example.com',
      },
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  it('should handle successful login', async () => {
    (login as jest.Mock).mockResolvedValueOnce(mockLoginData);

    const { result } = renderHook(() => useLoginMutation(), {
      wrapper: createQueryClientWrapper(),
    });

    await result.current.mutateAsync({
      email: 'test@example.com',
      password: 'password123',
    });

    expect(login).toHaveBeenCalledWith(
      expect.objectContaining({
        email: 'test@example.com',
        password: 'password123',
      }),
      expect.anything(),
    );

    expect(authStorage.saveAuthSession).toHaveBeenCalledWith(
      mockLoginData.data,
    );

    expect(setHeaderToken).toHaveBeenCalledWith(
      mockLoginData.data.access_token,
    );

    expect(toast.success).toHaveBeenCalledWith('Login successful');
    expect(mockRouter.push).toHaveBeenCalledWith('/dashboard');
  });

  it('should handle when user enter invalid credentials', async () => {
    const mockError = {
      response: { status: 404 },
    };

    (login as jest.Mock).mockRejectedValueOnce(mockError);

    const { result } = renderHook(() => useLoginMutation(), {
      wrapper: createQueryClientWrapper(),
    });

    await result.current
      .mutateAsync({
        email: 'test@example.com',
        password: 'wrong-password',
      })
      .catch(() => {});

    expect(toast.error).toHaveBeenCalledWith('Invalid credentials');
    expect(mockRouter.push).not.toHaveBeenCalled();
  });

  it('should handle not found error', async () => {
    const mockError = {
      response: { status: 404 },
    };
    (login as jest.Mock).mockRejectedValueOnce(mockError);

    const { result } = renderHook(() => useLoginMutation(), {
      wrapper: createQueryClientWrapper(),
    });

    await result.current
      .mutateAsync({
        email: 'nonexistent@example.com',
        password: 'password123',
      })
      .catch(() => {});

    expect(toast.error).toHaveBeenCalledWith('Invalid credentials');
    expect(mockRouter.push).not.toHaveBeenCalled();
  });
});
