import * as SecureStore from 'expo-secure-store';

import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

import httpClient from './httpClient';
import { EventEmitter } from './utils/eventEmitter';

import { ACCESS_TOKEN } from '../shared/constants/accessToken';

export abstract class ApiService {
  protected httpClient: AxiosInstance;

  constructor() {
    this.httpClient = httpClient;
    this.removeExpiredJWT();
    this.addJwtInterceptor();
  }

  private removeExpiredJWT() {
    this.httpClient.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401) {
          await SecureStore.deleteItemAsync(ACCESS_TOKEN);
          EventEmitter.emitLogout(); // Notify AuthProvider to logout
        }
        console.log(error, 'error');
        return Promise.reject(error);
      },
    );
  }

  private async getJwtToken(): Promise<string | null> {
    try {
      const token = await SecureStore.getItemAsync(ACCESS_TOKEN);
      return token ? token : null;
    } catch (error) {
      console.error('Error retrieving JWT token:', error);
      return null;
    }
  }

  private addJwtInterceptor() {
    this.httpClient.interceptors.request.use(
      async (config) => {
        const token = await this.getJwtToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        console.error('Error adding JWT token to request:', error);
        return Promise.reject(error);
      },
    );
  }

  protected responseHandler<T = unknown>({ data }: AxiosResponse<T>) {
    return data;
  }

  protected async get<T = unknown>(url: string, config?: AxiosRequestConfig) {
    return await this.httpClient.get<T>(url, config);
  }

  protected async post<T = unknown, B = unknown>(url: string, body: B, config?: AxiosRequestConfig) {
    return await this.httpClient.post<T>(url, body, config);
  }

  protected async put<T = unknown, B = unknown>(url: string, body: B, config?: AxiosRequestConfig) {
    return await this.httpClient.put<T>(url, body, config);
  }

  protected async patch<T = unknown, B = unknown>(url: string, body?: B, config?: AxiosRequestConfig) {
    return await this.httpClient.patch<T>(url, body, config);
  }

  protected async delete<T = unknown>(url: string, config?: AxiosRequestConfig) {
    return await this.httpClient.delete<T>(url, config);
  }
}
