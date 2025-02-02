import * as SecureStore from 'expo-secure-store';

import axios, { AxiosInstance } from 'axios';

import { API_URL } from 'src/shared/constants/apiUrl';
import { useAuthStore } from 'src/store/auth';

import { ACCESS_TOKEN } from '../shared/constants/accessToken';

const httpClient: AxiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

httpClient.interceptors.request.use(
  async (config) => {
    const token = await SecureStore.getItemAsync(ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      useAuthStore.getState().signOut();
    }
    return Promise.reject(error);
  },
);

export default httpClient;
