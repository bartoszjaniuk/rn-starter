import { API_URL } from 'src/shared/constants/apiUrl';

import {
  TrainerAvailabilitiesGetV1Params,
  TrainerAvailabilitiesGetV1Response,
  TrainerBookTrainingPostV1Payload,
  TrainerSpecializations,
  TrainersGetV1Response,
} from './models/trainer.models';

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
    return this.responseHandler(
      await this.httpClient.get<Promise<TrainersGetV1Response>>(queryKeys.getTrainers(params)),
    );
  };

  getTrainerAvailabilities = async (params: TrainerAvailabilitiesGetV1Params) => {
    return this.responseHandler(
      await this.httpClient.get<Promise<TrainerAvailabilitiesGetV1Response>>(
        queryKeys.getTrainerAvailabilities(params),
      ),
    );
  };

  postTrainerBookTraining = async (trainerId: string, payload: TrainerBookTrainingPostV1Payload) => {
    return this.responseHandler(
      await this.httpClient.post<Promise<void>>(queryKeys.postTrainerBookTraining(trainerId), payload),
    );
  };
}

export const trainerService = new TrainerService();
