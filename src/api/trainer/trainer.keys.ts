export const trainerQueryKeys = {
  pathname: () => 'trainer',
  getTrainerSpecializations: () => `${trainerQueryKeys.pathname()}/specializations`,
  getTrainers: () => 'trainers',
};
