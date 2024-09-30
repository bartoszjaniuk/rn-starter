import { API_URL } from 'src/providers';

import { TrainerSpecializations } from './models/trainer.models';

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
}

export const trainerService = new TrainerService();
