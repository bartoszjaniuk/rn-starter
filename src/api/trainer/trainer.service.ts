import { API_URL } from 'src/providers';

import { TrainerSpecializations, TrainersGetV1Response } from './models/trainer.models';

import { ApiService } from '../baseApi';
import { queryKeys } from '../utils';

export class TrainerService extends ApiService {
  constructor() {
    super(API_URL);
  }

  getTrainerSpecializations = async () => {
    return this.responseHandler(
      await this.httpClient.get<Promise<TrainerSpecializations>>(queryKeys.getTrainerSpecializations()),
    );
  };

  getTrainers = async (params?: string) => {
    console.log('getTrainers params', params);
    return this.responseHandler(
      await this.httpClient.get<Promise<TrainersGetV1Response>>(queryKeys.getTrainers(params)),
    );
  };
}

export const trainerService = new TrainerService();
