import { UseMutationOptions, useMutation } from '@tanstack/react-query';

import { queryKeys } from 'src/api';

import { uploadService } from '../upload.service';

export const useUploadImagesMutation = (options?: UseMutationOptions<void, Error, any, unknown>) => {
  return useMutation({ mutationKey: [queryKeys.login()], mutationFn: uploadService.postUploadImages, ...options });
};
