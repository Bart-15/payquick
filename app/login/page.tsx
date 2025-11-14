import { Metadata } from 'next';

import LoginForm from '@/features/auth/components/login-form';

export const metadata: Metadata = {
  title: 'Quick Pay - Login',
  description: 'Quick Pay - Login',
};

export default function Login() {
  return (
    <div className="flex h-screen items-center justify-center">
      <LoginForm />
    </div>
  );
}
