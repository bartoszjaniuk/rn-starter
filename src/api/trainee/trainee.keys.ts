export const traineeQueryKeys = {
  pathname: () => 'trainee',
  traineeBodyMetrics: (traineeId: string) => `${traineeQueryKeys.pathname()}/${traineeId}/body-metrics`,
};
