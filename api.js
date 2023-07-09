import axios from 'axios';
import { useGlobalStore } from './src/useGlobalStore';

const setIsLoading = useGlobalStore.getState().setIsLoading;

export const api = axios.create({
  baseURL: 'https://notepads.eduardovelho.com',
});

api.interceptors.request.use((config) => {
  setIsLoading(true);
  return config;
});

api.interceptors.response.use((response) => {
  setIsLoading(false);
  return response;
});
