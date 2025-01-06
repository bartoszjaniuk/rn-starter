export type BodyMetrics = {
  height: number;
  weight: number;
  chest: number;
  biceps: number;
  waist: number;
  hip: number;
  thigh: number;
  calf: number;
  measurementDate: string;
};

export type TraineeBodyMetricsGetV1Response = {
  data: BodyMetrics[];
  meta: {
    total: number;
  };
};

export type TraineeBodyMetricsPostV1Payload = BodyMetrics;

export type Trainee = {
  id: string;
  email: string;
  name: string;
  phoneNumber: string;
  city: string;
  specializations: string[];
  rating?: number;
  images: string[];
};

export type TraineesGetV1Response = {
  data: Trainee[];
  meta: {
    total: number;
  };
};
