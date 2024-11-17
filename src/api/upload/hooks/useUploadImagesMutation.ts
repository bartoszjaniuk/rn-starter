import { UseMutationOptions, useMutation } from '@tanstack/react-query';

import { queryKeys } from 'src/api';

import { PostUploadImagesResponse } from '../models/upload';
import { uploadService } from '../upload.service';

export const useUploadImagesMutation = (
  options?: UseMutationOptions<PostUploadImagesResponse, Error, FormData, unknown>,
) => {
  return useMutation<PostUploadImagesResponse, Error, FormData>({
    mutationKey: [queryKeys.postUploadImages()],
    mutationFn: uploadService.postUploadImages,
    ...options,
  });
};
