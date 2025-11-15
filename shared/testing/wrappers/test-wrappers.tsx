import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { JSX, ReactNode } from 'react';
import type { UseFormProps } from 'react-hook-form';
import { FormProvider, useForm } from 'react-hook-form';

import { AuthProvider } from '@/providers/auth-provider';

type WrapperProps = {
  children: ReactNode;
};

/* ------------------------------------------
 * React Hook Form Wrapper Factory
 * ------------------------------------------ */
export const createFormProviderWrapper = (formConfig: UseFormProps) => {
  return function FormProviderWrapper({ children }: WrapperProps) {
    const methods = useForm(formConfig);
    return <FormProvider {...methods}>{children}</FormProvider>;
  };
};

/* ------------------------------------------
 * Auth Provider Wrapper Factory
 * ------------------------------------------ */
export const createAuthProviderWrapper = () => {
  return function AuthProviderWrapper({ children }: WrapperProps) {
    return <AuthProvider>{children}</AuthProvider>;
  };
};

/* ------------------------------------------
 * React Query Wrapper Factory
 * ------------------------------------------ */
export const createQueryClientWrapper = (customClient?: QueryClient) => {
  const queryClient =
    customClient ??
    new QueryClient({
      defaultOptions: {
        queries: { retry: false },
      },
    });

  return function QueryWrapper({ children }: WrapperProps) {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  };
};

/* ------------------------------------------
 * Composer for multiple wrappers
 * ------------------------------------------ */
export const createComposedWrapper = (
  wrappers: Array<(props: WrapperProps) => JSX.Element>,
) => {
  return function ComposedWrapper({ children }: WrapperProps) {
    return wrappers.reduceRight(
      (acc, Wrapper) => <Wrapper>{acc}</Wrapper>,
      children,
    );
  };
};
