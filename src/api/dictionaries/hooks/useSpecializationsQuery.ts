import { useQuery } from '@tanstack/react-query';

import { queryKeys } from 'src/api/utils';

import { dictionaryService } from '../dictionaries.service';

export const useSpecializationsQuery = () => {
  return useQuery({
    queryKey: [queryKeys.getSpecializations()],
    queryFn: () => dictionaryService.getSpecializations(),
  });
};
