'use client';

import { usePathname } from 'next/navigation';
import React from 'react';

import { useProtectedRoute } from '@/features/auth/hooks/useProtectedRoute';
import { NavBar } from '@/shared/components/ui/nav-bar';

export function AuthLayout({ children }: { children: React.ReactNode }) {
  useProtectedRoute();

  const pathname = usePathname();
  const protectedRoutes = ['/dashboard']; // add more as needed
  const showNavbar = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  return (
    <React.Fragment>
      {showNavbar && <NavBar />}
      {children}
    </React.Fragment>
  );
}
