'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { authStorage } from '@/features/auth/storage/auth.storage';
import { useAuth } from '@/providers';
import { setHeaderToken } from '@/shared/lib/axios-instance';

import { refreshAccessToken } from '../services/auth.service';

let refreshTimeout: NodeJS.Timeout;

/**
 * Hook for managing automatic token refresh
 * Schedules token refresh 5 seconds before expiration
 * Handles token refresh failure by logging out user
 * Cleans up refresh timer on unmount
 */
export const useTokenRefresh = () => {
  const auth = useAuth();
  const router = useRouter();

  const currentAuth = auth.authSession;
  useEffect(() => {
    const scheduleTokenRefresh = () => {
      if (!currentAuth || !currentAuth.expires_at) return;

      const now = Date.now();
      const expiresIn = currentAuth.expires_at - now;

      // Refresh 5 seconds before expiration, minimum 1 second
      const timeout = expiresIn > 5000 ? expiresIn - 5000 : 1000;

      clearTimeout(refreshTimeout);
      refreshTimeout = setTimeout(async () => {
        try {
          const { data } = await refreshAccessToken(currentAuth.refresh_token);

          if (!data) {
            // Refresh failed → logout
            authStorage.removeAuthSession();
            setHeaderToken('');
            router.push('/login');
            return;
          }

          // Save new token and update axios header
          authStorage.saveAuthSession(data);
          setHeaderToken(data.access_token);

          // Schedule next refresh
          scheduleTokenRefresh();
        } catch (error) {
          if (error instanceof Error) {
            // On error → logout
            authStorage.removeAuthSession();
            setHeaderToken('');
            router.push('/login');
          }
        }
      }, timeout);
    };

    scheduleTokenRefresh();

    // Cleanup timer on unmount
    return () => clearTimeout(refreshTimeout);
  }, [router, currentAuth]);
};
