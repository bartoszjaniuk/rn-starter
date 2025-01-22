import { TrainerAvailabilitiesGetV1Params } from './models';

export const trainerQueryKeys = {
  pathname: () => 'trainer',
  getTrainerSpecializations: () => `${trainerQueryKeys.pathname()}/specializations`,
  getTrainers: (params?: string) => `trainers${params}`,
  getTrainerAvailabilities: (params: TrainerAvailabilitiesGetV1Params) =>
    `${trainerQueryKeys.pathname()}/${params.trainerId}/availabilities?from=${params.date.from}&to=${params.date.to}`,
  postTrainerBookTraining: (id: string) => `${trainerQueryKeys.pathname()}/${id}/book-training`,
  postTrainerSetAvailability: (id: string) => `${trainerQueryKeys.pathname()}/${id}/availabilities`,
  deleteTrainerAvailability: (id: string) => `${trainerQueryKeys.pathname()}/${id}/availabilities`,
};
