import { axiosInstance } from '@/shared/lib/axios-instance';

import type { LoginResponse } from '../types/auth-service.types';
import type { LoginFormData } from '../validations/login.validation';

export const login = async (payload: LoginFormData) => {
  const { data } = await axiosInstance.post<LoginResponse>('/login', payload);

  return data;
};

export const refreshAccessToken = async (refreshToken: string) => {
  const { data } = await axiosInstance.post<LoginResponse>('/token/refresh', {
    refresh_token: refreshToken,
  });
  return data;
};
