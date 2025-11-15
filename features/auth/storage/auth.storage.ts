import type { LoginResponse } from '../types/auth-service.types';

const saveAuthSession = (data: LoginResponse['data']) => {
  const expiresAt = Date.now() + data.expires_in * 1000; // convert seconds → ms

  sessionStorage.setItem(
    'authSession',
    JSON.stringify({
      ...data,
      expires_at: expiresAt,
    }),
  );

  // Dispatch storage event for the same window
  window.dispatchEvent(new Event('storage'));
};

const getAuthSession = ():
  | (LoginResponse['data'] & { expires_at: number })
  | null => {
  if (typeof window === 'undefined') return null;

  const authSession = sessionStorage?.getItem('authSession');

  if (!authSession) return null;

  return JSON.parse(authSession);
};

const removeAuthSession = () => {
  sessionStorage.removeItem('authSession');
};

export const authStorage = {
  saveAuthSession,
  getAuthSession,
  removeAuthSession,
};
