import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { setHeaderToken } from '@/shared/lib/axios-instance';

import { login } from '../services/auth.service';
import { authStorage } from '../storage/auth.storage';

/**
 * Hook for handling user login mutation
 * @returns {UseMutationResult} Mutation object for login with success/error handlers
 * @example
 * const { mutate } = useLoginMutation()
 * mutate({ email: 'user@example.com', password: '123456' })
 */
export const useLoginMutation = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: login,

    onSuccess: (data) => {
      const authUser = data?.data;
      authStorage.saveAuthSession(authUser);
      toast.success('Login successful');
      setHeaderToken(authUser?.access_token);
      router.push('/dashboard');
    },

    onError: (error: AxiosError) => {
      if (error.response?.status === 404) {
        toast.error('Invalid credentials');
      }
    },
  });
};
