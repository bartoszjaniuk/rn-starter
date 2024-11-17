import { authQueryKeys } from '../auth';
import { trainerQueryKeys } from '../trainer/trainer.keys';
import { uploadQueryKeys } from '../upload/upload.keys';
import { userQueryKeys } from '../user';

export const queryKeys = {
  ...authQueryKeys,
  ...trainerQueryKeys,
  ...uploadQueryKeys,
  ...userQueryKeys,
  ...uploadQueryKeys,
};
