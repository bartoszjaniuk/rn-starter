import { useMutation } from '@tanstack/react-query';

import { uploadService } from '../upload.service';

export const useDeleteImageMutation = () => {
  return useMutation({
    mutationFn: uploadService.postDeleteImage,
  });
};
