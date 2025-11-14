import type { AxiosInstance } from 'axios';
import axios from 'axios';

const baseURL = `${process.env.NEXT_PUBLIC_BASE_URI}`;

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: baseURL,
});
