import { API_URL } from 'src/shared/constants/apiUrl';

import { SpecializationsGetV1Response } from './models/specializations.model';

import { ApiService } from '../baseApi';
import { queryKeys } from '../utils';

export class DictionaryService extends ApiService {
  constructor() {
    super(API_URL);
  }

  getSpecializations = async () => {
    return this.responseHandler(
      await this.httpClient.get<Promise<SpecializationsGetV1Response>>(queryKeys.getSpecializations()),
    );
  };
}

export const dictionaryService = new DictionaryService();
