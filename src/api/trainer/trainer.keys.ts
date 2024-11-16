export const trainerQueryKeys = {
  pathname: () => 'trainer',
  getTrainerSpecializations: () => `${trainerQueryKeys.pathname()}/specializations`,
  getTrainers: (params?: string) => `trainers${params}`,
};
