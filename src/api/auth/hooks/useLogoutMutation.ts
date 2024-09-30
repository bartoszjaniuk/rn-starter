import * as SecureStore from 'expo-secure-store';

import { UseMutationOptions, useMutation } from '@tanstack/react-query';

import { queryKeys } from 'src/api';
import { ACCESS_TOKEN } from 'src/providers';

import { authService } from '../auth.service';

export const useLogoutMutation = (options?: UseMutationOptions<void, Error, void, unknown>) => {
  return useMutation({ mutationKey: [queryKeys.logout()], mutationFn: authService.logout, ...options });
};

export const onTemporaryLogout = async () => await SecureStore.deleteItemAsync(ACCESS_TOKEN);
