import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { authStorage } from '@/features/auth/storage/auth.storage';
import { setHeaderToken } from '@/shared/lib/axios-instance';

import { useTokenRefresh } from './useTokenRefresh';

export const useProtectedRoute = () => {
  const router = useRouter();
  useTokenRefresh(); // start token refresh cycle

  useEffect(() => {
    const auth = authStorage.getAuthSession();

    // redirect to login if no auth or no access token
    if (!auth || !auth.access_token) {
      setHeaderToken('');
      router.push('/login');
      return;
    }

    // redirect to dashboard
    setHeaderToken(auth.access_token);
    router.push('/dashboard');
  }, [router]);
};
