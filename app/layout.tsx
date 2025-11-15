import './globals.css';

import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import { AuthLayout } from '@/features/auth/components/auth-layout';
import { AuthProvider, ReactQueryProvider } from '@/providers';
import { Toaster } from '@/shared/components/ui/sonner';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'PayQuick',
  description:
    'A web app that allows users to send and receive money securely.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <AuthLayout>
            <ReactQueryProvider>
              <Toaster />
              {children}
            </ReactQueryProvider>
          </AuthLayout>
        </AuthProvider>
      </body>
    </html>
  );
}
