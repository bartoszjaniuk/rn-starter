/* eslint-disable @typescript-eslint/no-unsafe-assignment */

/* eslint-disable @typescript-eslint/no-unsafe-return */

/* eslint-disable @typescript-eslint/no-var-requires */
// CAUTION: this file is automatically generated, do not edit it.
export const routeFirstLoginChooseRole = '/first-login/choose-role';
export const routeFirstLoginTrainee = '/first-login/trainee';
export const routeFirstLoginTrainer = '/first-login/trainer';
export const routeActivateAccountTraineeProfile = '/activate-account-trainee/profile';
export const routeActivateAccountTraineeTarget = '/activate-account-trainee/target';
export const routeActivateAccountTraineePhotos = '/activate-account-trainee/photos';
export const routeActivateAccountTrainerProfile = '/activate-account-trainer/profile';
export const routeActivateAccountTrainerContact = '/activate-account-trainer/contact';
export const routeActivateAccountTrainerOffer = '/activate-account-trainer/offer';
export const routeActivateAccountTrainerPhotos = '/activate-account-trainer/photos';
export const routeBottomTabsHome = '/bottom-tabs/home';
export const routeBottomTabsCalendar = '/bottom-tabs/calendar';
export const routeBottomTabsMyPlans = '/bottom-tabs/my-plans';
export const routeBottomTabsTrainerTrainees = '/bottom-tabs/trainer-trainees';
export const routeBottomTabsProfile = '/bottom-tabs/profile';
export const routeHomeTrainingList = '/home/training-list';
export const routeHomeTrainingDetails = '/home/training-details';
export const routeHomeUpdateParameters = '/home/update-parameters';
export const routeBookingDetails = '/booking/details';
export const routeSearchTrainersHome = '/search-trainers/home';
export const routeSearchTrainersList = '/search-trainers/list';
export const routeSearchTrainersProfileDetails = '/search-trainers/profile-details';
export const routeSearchTrainersAvailability = '/search-trainers/availability';
export const routeSearchTrainersListList = '/search-trainers-list/list';
export const routeSearchTrainersListFilters = '/search-trainers-list/filters';
export const routeSearchTrainersAvailabilityMonthly = '/search-trainers-availability/monthly';
export const routeSearchTrainersAvailabilityWeekly = '/search-trainers-availability/weekly';
export const routeSearchTrainersAvailabilityReservation = '/search-trainers-availability/reservation';
export const routeCalendarTrainerMonthly = '/calendar-trainer/monthly';
export const routeCalendarTrainerWeekly = '/calendar-trainer/weekly';
export const routeCalendarTrainerAddAvailability = '/calendar-trainer/add-availability';
export const routeAccountSettings = '/account/settings';
export const routeBottomTabsNavigator = '/bottom-tabs';
export const routeAccountNavigator = '/account';
export const routeSearchTrainersNavigator = '/search-trainers';
export const routeHomeNavigator = '/home';
export const routeBookingNavigator = '/booking';
export const routeActivateAccountTraineeNavigator = '/activate-account-trainee';
export const routeActivateAccountTrainerNavigator = '/activate-account-trainer';
export const routeFirstLoginNavigator = '/first-login';
export const toFirstLoginChooseRole = routeFirstLoginChooseRole as unknown as Route;
export const toFirstLoginTrainee = routeFirstLoginTrainee as unknown as Route;
export const toFirstLoginTrainer = routeFirstLoginTrainer as unknown as Route;
export const toActivateAccountTraineeProfile = routeActivateAccountTraineeProfile as unknown as Route;
export const toActivateAccountTraineeTarget = routeActivateAccountTraineeTarget as unknown as Route;
export const toActivateAccountTraineePhotos = routeActivateAccountTraineePhotos as unknown as Route;
export const toActivateAccountTrainerProfile = routeActivateAccountTrainerProfile as unknown as Route;
export const toActivateAccountTrainerContact = routeActivateAccountTrainerContact as unknown as Route;
export const toActivateAccountTrainerOffer = routeActivateAccountTrainerOffer as unknown as Route;
export const toActivateAccountTrainerPhotos = routeActivateAccountTrainerPhotos as unknown as Route;
export const toBottomTabsHome = [routeBottomTabsNavigator, routeBottomTabsHome] as unknown as Route;
export const toBottomTabsCalendar = [routeBottomTabsNavigator, routeBottomTabsCalendar] as unknown as Route;
export const toBottomTabsMyPlans = [routeBottomTabsNavigator, routeBottomTabsMyPlans] as unknown as Route;
export const toBottomTabsTrainerTrainees = [
  routeBottomTabsNavigator,
  routeBottomTabsTrainerTrainees,
] as unknown as Route;
export const toBottomTabsProfile = [routeBottomTabsNavigator, routeBottomTabsProfile] as unknown as Route;
export const toHomeTrainingList = routeHomeTrainingList as unknown as Route;
export const toHomeTrainingDetails = routeHomeTrainingDetails as unknown as Route;
export const toHomeUpdateParameters = routeHomeUpdateParameters as unknown as Route;

export const toBookingDetails = [routeBookingNavigator, routeBookingDetails] as unknown as Route<{
  readonly bookingId: string;
  readonly bookingName: string;
  readonly bookingDescription: string;
  readonly trainerName: string;
  readonly timeStart: string;
  readonly timeEnd: string;
  readonly city: string;
  readonly date: string;
  readonly isPastTraining?: boolean;
  readonly trainerNote?: string;
  readonly specializations?: string[];
}>;

export const toSearchTrainersHome = [routeSearchTrainersNavigator, routeSearchTrainersHome] as unknown as Route;
export const toSearchTrainersList = [routeSearchTrainersNavigator, routeSearchTrainersList] as unknown as Route;

export const toSearchTrainersProfileDetails = [
  routeSearchTrainersNavigator,
  routeSearchTrainersProfileDetails,
] as unknown as Route<{
  readonly id: string;
  readonly trainerId: string;
  readonly name: string;
  readonly city: string;
  readonly email: string;
  readonly phoneNumber: string;
  readonly specializations: string[];
  readonly images: string[];
  readonly averageBookingRating: string;
}>;

export const toSearchTrainersAvailability = [
  routeSearchTrainersNavigator,
  routeSearchTrainersAvailability,
] as unknown as Route<{
  readonly trainerId: string;
}>;

export const toSearchTrainersListList = routeSearchTrainersListList as unknown as Route;
export const toSearchTrainersListFilters = routeSearchTrainersListFilters as unknown as Route;
export const toSearchTrainersAvailabilityMonthly = routeSearchTrainersAvailabilityMonthly as unknown as Route;

export const toSearchTrainersAvailabilityWeekly = routeSearchTrainersAvailabilityWeekly as unknown as Route<{
  readonly weekDate: string;
}>;

export const toSearchTrainersAvailabilityReservation = routeSearchTrainersAvailabilityReservation as unknown as Route<{
  readonly dateTime: string;
  readonly traineeId: string;
}>;

export const toCalendarTrainerMonthly = routeCalendarTrainerMonthly as unknown as Route;

export const toCalendarTrainerWeekly = routeCalendarTrainerWeekly as unknown as Route<{
  readonly weekDate: string;
}>;

export const toCalendarTrainerAddAvailability = routeCalendarTrainerAddAvailability as unknown as Route;
export const toAccountSettings = [routeAccountNavigator, routeAccountSettings] as unknown as Route;
export const toBottomTabsNavigator = routeBottomTabsNavigator as unknown as Route;
export const toAccountNavigator = routeAccountNavigator as unknown as Route;
export const toSearchTrainersNavigator = routeSearchTrainersNavigator as unknown as Route;
export const toHomeNavigator = routeHomeNavigator as unknown as Route;
export const toBookingNavigator = routeBookingNavigator as unknown as Route;
export const toActivateAccountTraineeNavigator = routeActivateAccountTraineeNavigator as unknown as Route;
export const toActivateAccountTrainerNavigator = routeActivateAccountTrainerNavigator as unknown as Route;
export const toFirstLoginNavigator = routeFirstLoginNavigator as unknown as Route;
