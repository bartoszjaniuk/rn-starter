import { authQueryKeys } from '../auth/auth.keys';
import { trainerQueryKeys } from '../trainer/trainer.keys';
import { uploadQueryKeys } from '../upload/upload.keys';
import { userQueryKeys } from '../user/user.keys';

export const queryKeys = {
  ...authQueryKeys,
  ...trainerQueryKeys,
  ...uploadQueryKeys,
  ...userQueryKeys,
  ...uploadQueryKeys,
};
