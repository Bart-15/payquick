import { LoginResponse } from '../types/auth-service';

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

const getAuthSession = () => {
  const auth = sessionStorage.getItem('auth');

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
