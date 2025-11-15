import { Metadata } from 'next';

import LoginForm from '@/features/auth/components/login-form';

export const metadata: Metadata = {
  title: 'PayQuick - Login',
  description:
    'A mobile and web app that allows users to send and receive money securely.',
};

export default function Login() {
  return (
    <div className="flex h-screen items-center justify-center">
      <LoginForm />
    </div>
  );
}
