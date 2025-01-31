import * as SecureStore from 'expo-secure-store';

import axios, { AxiosInstance } from 'axios';

import { API_URL } from 'src/shared/constants/apiUrl';

import { getGlobalDispatch } from './utils/setGlobalDispatch';

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
  async (error) => {
    if (error.response?.status === 401) {
      await SecureStore.deleteItemAsync(ACCESS_TOKEN);
      const dispatch = getGlobalDispatch();
      dispatch({ type: 'SIGN_OUT' });
    }
    return Promise.reject(error);
  },
);

export default httpClient;
