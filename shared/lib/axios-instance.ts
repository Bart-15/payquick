import type { AxiosInstance } from 'axios';
import axios from 'axios';

const apiVersion = process.env.NEXT_PUBLIC_API_VERSION;

const baseURL = `${process.env.NEXT_PUBLIC_BASE_URL}/${apiVersion}`;

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: baseURL,
});

export const setHeaderToken = (token: string) => {
  axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const removeHeaderToken = () => {
  delete axiosInstance.defaults.headers.common.Authorization;
};
