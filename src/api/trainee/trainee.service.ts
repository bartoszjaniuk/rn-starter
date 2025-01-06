import { API_URL } from 'src/shared/constants/apiUrl';

import {
  TraineeBodyMetricsGetV1Response,
  TraineeBodyMetricsPostV1Payload,
  TraineesGetV1Response,
} from './models/trainee.models';

import { ApiService } from '../baseApi';
import { queryKeys } from '../utils';

export class TraineeService extends ApiService {
  constructor() {
    super(API_URL);
  }

  getTraineeBodyMetrics = async (traineeId: string) => {
    return this.responseHandler(
      await this.httpClient.get<Promise<TraineeBodyMetricsGetV1Response>>(queryKeys.traineeBodyMetrics(traineeId)),
    );
  };

  getTrainee = async (traineeId: string) => {
    return this.responseHandler(
      await this.httpClient.get<Promise<TraineesGetV1Response>>(queryKeys.getTrainee(traineeId)),
    );
  };

  postTraineeBodyMetrics = async (trainee: string, payload: TraineeBodyMetricsPostV1Payload) => {
    return this.responseHandler(
      await this.httpClient.post<Promise<void>>(queryKeys.traineeBodyMetrics(trainee), payload),
    );
  };
}

export const traineeService = new TraineeService();
