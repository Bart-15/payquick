'use client';

import { useRouter } from 'next/navigation';

import { authStorage } from '@/features/auth/storage/auth.storage';
import { useAuth } from '@/providers/auth-provider';
import { Button } from '@/shared/components/ui/button';
import { removeHeaderToken } from '@/shared/lib/axios-instance';

export const NavBar = () => {
  const router = useRouter();

  const { authSession } = useAuth();
  const user = authSession?.user;

  function handleLogout() {
    authStorage.removeAuthSession();
    removeHeaderToken();
    router.push('/login');
  }

  return (
    <nav className="flex w-full items-center justify-between bg-white px-6 py-4 shadow-md">
      <div className="text-lg font-semibold">Quick Pay</div>
      <div className="flex items-center gap-4">
        <span className="text-gray-700">Hi, {user?.full_name}</span>
        <Button
          onClick={handleLogout}
          className="rounded-md bg-red-500 px-4 py-2 text-white transition hover:bg-red-600"
        >
          Logout
        </Button>
      </div>
    </nav>
  );
};
