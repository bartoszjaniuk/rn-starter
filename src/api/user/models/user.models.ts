export type Role = 'role_not_set' | 'trainee' | 'trainer';

export type UserInfoResponse = {
  id: string;
  traineeId: string;
  trainerId: string;
  email: string;
  name: string | null;
  role: Role;
  gender: string | null;
};

export type ProfileCompletion = {
  name: string;
  role: string;
  phoneNumber: string;
  city: string;
  specializations: string[];
  gender: string;
};
