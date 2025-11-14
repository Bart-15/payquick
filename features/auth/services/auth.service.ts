import { axiosInstance } from '@/shared/lib/axios-instance';

import { LoginResponse } from '../types/auth-service';
import { LoginFormData } from '../validations/login.validation';

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
