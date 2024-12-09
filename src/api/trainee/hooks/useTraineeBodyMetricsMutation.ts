import { useMutation, useQueryClient } from '@tanstack/react-query';

import { queryKeys } from 'src/api/utils';
import { goBack } from 'src/navigation';

import { TraineeBodyMetricsPostV1Payload } from '../models/trainee.models';
import { traineeService } from '../trainee.service';

export const useTraineeBodyMetricsMutation = (traineeId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [queryKeys.traineeBodyMetrics(traineeId)],
    mutationFn: (payload: TraineeBodyMetricsPostV1Payload) => traineeService.postTraineeBodyMetrics(traineeId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.traineeBodyMetrics(traineeId)],
      });
      goBack();
    },
  });
};
