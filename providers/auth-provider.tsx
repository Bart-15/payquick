'use client';

import { createContext, useContext, useEffect, useState } from 'react';

import { authStorage } from '@/features/auth/storage/auth.storage';

type AuthContextValue = {
  authSession: ReturnType<typeof authStorage.getAuthSession>;
  setAuthSession: (value: AuthContextValue['authSession']) => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authSession, setAuthSession] =
    useState<ReturnType<typeof authStorage.getAuthSession>>(null); // SSR-safe

  // init auth session, and fix hydration mismatch and run only on client
  useEffect(() => {
    function init() {
      const storedAuth = authStorage.getAuthSession();
      setAuthSession(storedAuth);
    }

    init();
  }, []);

  return (
    <AuthContext.Provider value={{ authSession, setAuthSession }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};
