import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { setHeaderToken } from '@/shared/lib/axios-instance';

import { login } from '../services/auth.service';
import { authStorage } from '../storage/auth.storage';

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
