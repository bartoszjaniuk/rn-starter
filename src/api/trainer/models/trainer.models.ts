export type TrainerSpecializations = {
  data: string[];
};

export type Trainer = {
  id: string;
  email: string;
  name: string;
  phoneNumber: string;
  city: string;
  specializations: string[];
  rating?: number;
  profileImage?: string;
};

export type TrainersGetV1Response = {
  data: Trainer[];
  total: number;
};
