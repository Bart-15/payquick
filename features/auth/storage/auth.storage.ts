import { LoginResponse } from '../types/auth-service.types';

const saveAuthSession = (data: LoginResponse['data']) => {
  const expiresAt = Date.now() + data.expires_in * 1000; // convert seconds → ms

  sessionStorage.setItem(
    'auth',
    JSON.stringify({
      ...data,
      expires_at: expiresAt,
    }),
  );
};

const getAuthSession = ():
  | (LoginResponse['data'] & { expires_at: number })
  | null => {
  if (typeof window === 'undefined') return null;

  const auth = sessionStorage?.getItem('auth');

  if (!auth) return null;

  return JSON.parse(auth);
};

const removeAuthSession = () => {
  sessionStorage.removeItem('auth');
};

export const authStorage = {
  saveAuthSession,
  getAuthSession,
  removeAuthSession,
};
