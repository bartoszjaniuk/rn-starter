/* eslint-disable @typescript-eslint/no-unsafe-assignment */

/* eslint-disable @typescript-eslint/no-unsafe-return */

/* eslint-disable @typescript-eslint/no-var-requires */
// CAUTION: this file is automatically generated, do not edit it.
import * as React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import * as route from './routes';

import { BottomTabBar } from '../components';
import { BottomTabsCalendar } from '../screens/BottomTabs/Calendar';
import { BottomTabsHome } from '../screens/BottomTabs/Home';
import { BottomTabsMyPlans } from '../screens/BottomTabs/MyPlans';
import { BottomTabsProfile } from '../screens/BottomTabs/Profile';
import { BottomTabsTrainerTrainees } from '../screens/BottomTabs/TrainerTrainees';
import { FirstLoginChooseRole } from '../screens/FirstLogin/ChooseRole';
import { FirstLoginTrainee } from '../screens/FirstLogin/Trainee';
import { FirstLoginTrainer } from '../screens/FirstLogin/Trainer';

type Params = {
  params: Record<string, unknown>;
};

const FirstLoginNativeStack = createNativeStackNavigator();
const ActivateAccountTraineeNativeStack = createNativeStackNavigator();
const ActivateAccountTrainerNativeStack = createNativeStackNavigator();
const BottomTabsBottomTab = createBottomTabNavigator();
const HomeNativeStack = createNativeStackNavigator();
const SearchTrainersNativeStack = createNativeStackNavigator();
const SearchTrainersListNativeStack = createNativeStackNavigator();
const SearchTrainersAvailabilityNativeStack = createNativeStackNavigator();
const CalendarTrainerNativeStack = createNativeStackNavigator();
const AccountNativeStack = createNativeStackNavigator();
const ActivatedUserNativeStack = createNativeStackNavigator();

export const FirstLoginNavigator = () => {
  return (
    <FirstLoginNativeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <FirstLoginNativeStack.Screen
        name={route.routeFirstLoginChooseRole}
        initialParams={{
          meta: {
            presentation: 'card',
          },
        }}
        component={FirstLoginChooseRole}
      />
      <FirstLoginNativeStack.Screen
        name={route.routeFirstLoginTrainee}
        initialParams={{
          meta: {
            presentation: 'card',
          },
        }}
        component={FirstLoginTrainee}
      />
      <FirstLoginNativeStack.Screen
        name={route.routeFirstLoginTrainer}
        initialParams={{
          meta: {
            presentation: 'card',
          },
        }}
        component={FirstLoginTrainer}
      />
    </FirstLoginNativeStack.Navigator>
  );
};

export const ActivateAccountTraineeNavigator = () => {
  return (
    <ActivateAccountTraineeNativeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <ActivateAccountTraineeNativeStack.Screen
        name={route.routeActivateAccountTraineeProfile}
        initialParams={{
          meta: {
            presentation: 'card',
          },
        }}
        getComponent={() => require('../screens/ActivateAccount/Trainee/Profile').ActivateAccountTraineeProfile}
      />
      <ActivateAccountTraineeNativeStack.Screen
        name={route.routeActivateAccountTraineeTarget}
        initialParams={{
          meta: {
            presentation: 'card',
          },
        }}
        getComponent={() => require('../screens/ActivateAccount/Trainee/Target').ActivateAccountTraineeTarget}
      />
      <ActivateAccountTraineeNativeStack.Screen
        name={route.routeActivateAccountTraineePhotos}
        initialParams={{
          meta: {
            presentation: 'card',
          },
        }}
        getComponent={() => require('../screens/ActivateAccount/Trainee/Photos').ActivateAccountTraineePhotos}
      />
    </ActivateAccountTraineeNativeStack.Navigator>
  );
};

export const ActivateAccountTrainerNavigator = () => {
  return (
    <ActivateAccountTrainerNativeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <ActivateAccountTrainerNativeStack.Screen
        name={route.routeActivateAccountTrainerProfile}
        initialParams={{
          meta: {
            presentation: 'card',
          },
        }}
        getComponent={() => require('../screens/ActivateAccount/Trainer/Profile').ActivateAccountTrainerProfile}
      />
      <ActivateAccountTrainerNativeStack.Screen
        name={route.routeActivateAccountTrainerContact}
        initialParams={{
          meta: {
            presentation: 'card',
          },
        }}
        getComponent={() => require('../screens/ActivateAccount/Trainer/Contact').ActivateAccountTrainerContact}
      />
      <ActivateAccountTrainerNativeStack.Screen
        name={route.routeActivateAccountTrainerOffer}
        initialParams={{
          meta: {
            presentation: 'card',
          },
        }}
        getComponent={() => require('../screens/ActivateAccount/Trainer/Offer').ActivateAccountTrainerOffer}
      />
      <ActivateAccountTrainerNativeStack.Screen
        name={route.routeActivateAccountTrainerPhotos}
        initialParams={{
          meta: {
            presentation: 'card',
          },
        }}
        getComponent={() => require('../screens/ActivateAccount/Trainer/Photos').ActivateAccountTrainerPhotos}
      />
    </ActivateAccountTrainerNativeStack.Navigator>
  );
};

const BottomTabsNavigator = () => {
  return (
    <BottomTabsBottomTab.Navigator
      screenOptions={{
        headerShown: false,
        lazy: true,
      }}
      tabBar={(props) => <BottomTabBar {...props} />}
    >
      <BottomTabsBottomTab.Screen
        name={route.routeBottomTabsHome}
        initialParams={{
          meta: {
            presentation: 'card',
          },
        }}
        component={BottomTabsHome}
      />
      <BottomTabsBottomTab.Screen
        name={route.routeBottomTabsCalendar}
        initialParams={{
          meta: {
            presentation: 'card',
          },
        }}
        component={BottomTabsCalendar}
      />
      <BottomTabsBottomTab.Screen
        name={route.routeBottomTabsMyPlans}
        initialParams={{
          meta: {
            presentation: 'card',
          },
        }}
        component={BottomTabsMyPlans}
      />
      <BottomTabsBottomTab.Screen
        name={route.routeBottomTabsTrainerTrainees}
        initialParams={{
          meta: {
            presentation: 'card',
          },
        }}
        component={BottomTabsTrainerTrainees}
      />
      <BottomTabsBottomTab.Screen
        name={route.routeBottomTabsProfile}
        initialParams={{
          meta: {
            presentation: 'card',
          },
        }}
        component={BottomTabsProfile}
      />
    </BottomTabsBottomTab.Navigator>
  );
};

export const HomeNavigator = (props: Params) => {
  const { params } = props;

  return (
    <HomeNativeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <HomeNativeStack.Screen
        name={route.routeHomeTrainingList}
        initialParams={{
          ...params,

          meta: {
            presentation: 'card',
          },
        }}
        getComponent={() => require('../screens/BottomTabs/Home/HomeNavigator/TrainingList').HomeTrainingList}
      />
      <HomeNativeStack.Screen
        name={route.routeHomeTrainingDetails}
        initialParams={{
          meta: {
            presentation: 'card',
          },
        }}
        getComponent={() => require('../screens/BottomTabs/Home/HomeNavigator/TrainingDetails').HomeTrainingDetails}
      />
      <HomeNativeStack.Screen
        options={{
          presentation: 'modal',
        }}
        name={route.routeHomeUpdateParameters}
        initialParams={{
          meta: {
            presentation: 'modal',
          },
        }}
        getComponent={() => require('../screens/BottomTabs/Home/HomeNavigator/UpdateParameters').HomeUpdateParameters}
      />
    </HomeNativeStack.Navigator>
  );
};

const SearchTrainersNavigator = () => {
  return (
    <SearchTrainersNativeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <SearchTrainersNativeStack.Screen
        name={route.routeSearchTrainersHome}
        initialParams={{
          meta: {
            presentation: 'card',
          },
        }}
        getComponent={() => require('../screens/SearchTrainers/Home').SearchTrainersHome}
      />
      <SearchTrainersNativeStack.Screen
        name={route.routeSearchTrainersList}
        initialParams={{
          meta: {
            presentation: 'card',
          },
        }}
        getComponent={() => require('../screens/SearchTrainers/List').SearchTrainersList}
      />
      <SearchTrainersNativeStack.Screen
        name={route.routeSearchTrainersProfileDetails}
        initialParams={{
          meta: {
            presentation: 'card',
          },
        }}
        getComponent={() => require('../screens/SearchTrainers/ProfileDetails').SearchTrainersProfileDetails}
      />
      <SearchTrainersNativeStack.Screen
        name={route.routeSearchTrainersAvailability}
        initialParams={{
          meta: {
            presentation: 'card',
          },
        }}
        getComponent={() => require('../screens/SearchTrainers/Availability').SearchTrainersAvailability}
      />
    </SearchTrainersNativeStack.Navigator>
  );
};

export const SearchTrainersListNavigator = (props: Params) => {
  const { params } = props;

  return (
    <SearchTrainersListNativeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <SearchTrainersListNativeStack.Screen
        options={{
          headerShown: false,
        }}
        name={route.routeSearchTrainersListList}
        initialParams={{
          ...params,

          meta: {
            presentation: 'card',
          },
        }}
        getComponent={() =>
          require('../screens/SearchTrainers/SearchTrainersListNavigator/List').SearchTrainersListList
        }
      />
      <SearchTrainersListNativeStack.Screen
        options={{
          presentation: 'modal',
        }}
        name={route.routeSearchTrainersListFilters}
        initialParams={{
          meta: {
            presentation: 'modal',
          },
        }}
        getComponent={() =>
          require('../screens/SearchTrainers/SearchTrainersListNavigator/Filters').SearchTrainersListFilters
        }
      />
    </SearchTrainersListNativeStack.Navigator>
  );
};

export const SearchTrainersAvailabilityNavigator = (props: Params) => {
  const { params } = props;

  return (
    <SearchTrainersAvailabilityNativeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <SearchTrainersAvailabilityNativeStack.Screen
        name={route.routeSearchTrainersAvailabilityMonthly}
        initialParams={{
          ...params,

          meta: {
            presentation: 'card',
          },
        }}
        getComponent={() =>
          require('../screens/SearchTrainers/SearchTrainersAvailabilityNavigator/Monthly')
            .SearchTrainersAvailabilityMonthly
        }
      />
      <SearchTrainersAvailabilityNativeStack.Screen
        name={route.routeSearchTrainersAvailabilityWeekly}
        initialParams={{
          meta: {
            presentation: 'card',
          },
        }}
        getComponent={() =>
          require('../screens/SearchTrainers/SearchTrainersAvailabilityNavigator/Weekly')
            .SearchTrainersAvailabilityWeekly
        }
      />
      <SearchTrainersAvailabilityNativeStack.Screen
        options={{
          presentation: 'modal',
        }}
        name={route.routeSearchTrainersAvailabilityReservation}
        initialParams={{
          meta: {
            presentation: 'modal',
          },
        }}
        getComponent={() =>
          require('../screens/SearchTrainers/SearchTrainersAvailabilityNavigator/Reservation')
            .SearchTrainersAvailabilityReservation
        }
      />
    </SearchTrainersAvailabilityNativeStack.Navigator>
  );
};

export const CalendarTrainerNavigator = (props: Params) => {
  const { params } = props;

  return (
    <CalendarTrainerNativeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <CalendarTrainerNativeStack.Screen
        name={route.routeCalendarTrainerMonthly}
        initialParams={{
          ...params,

          meta: {
            presentation: 'card',
          },
        }}
        getComponent={() =>
          require('../screens/BottomTabs/Calendar/CalendarTrainerNavigator/Monthly').CalendarTrainerMonthly
        }
      />
      <CalendarTrainerNativeStack.Screen
        name={route.routeCalendarTrainerWeekly}
        initialParams={{
          meta: {
            presentation: 'card',
          },
        }}
        getComponent={() =>
          require('../screens/BottomTabs/Calendar/CalendarTrainerNavigator/Weekly').CalendarTrainerWeekly
        }
      />
      <CalendarTrainerNativeStack.Screen
        options={{
          presentation: 'modal',
        }}
        name={route.routeCalendarTrainerAddAvailability}
        initialParams={{
          meta: {
            presentation: 'modal',
          },
        }}
        getComponent={() =>
          require('../screens/BottomTabs/Calendar/CalendarTrainerNavigator/AddAvailability')
            .CalendarTrainerAddAvailability
        }
      />
    </CalendarTrainerNativeStack.Navigator>
  );
};

const AccountNavigator = () => {
  return (
    <AccountNativeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <AccountNativeStack.Screen
        name={route.routeAccountSettings}
        initialParams={{
          meta: {
            presentation: 'card',
          },
        }}
        getComponent={() => require('../screens/Account/Settings').AccountSettings}
      />
    </AccountNativeStack.Navigator>
  );
};

export const ActivatedUserNavigator = () => {
  return (
    <ActivatedUserNativeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <ActivatedUserNativeStack.Screen
        name={route.routeBottomTabsNavigator}
        initialParams={{
          meta: {
            presentation: 'card',
          },
        }}
        component={BottomTabsNavigator}
      />
      <ActivatedUserNativeStack.Screen
        name={route.routeAccountNavigator}
        initialParams={{
          meta: {
            presentation: 'card',
          },
        }}
        component={AccountNavigator}
      />
      <ActivatedUserNativeStack.Screen
        name={route.routeSearchTrainersNavigator}
        initialParams={{
          meta: {
            presentation: 'card',
          },
        }}
        component={SearchTrainersNavigator}
      />
      <ActivatedUserNativeStack.Screen
        name={route.routeActivateAccountTraineeNavigator}
        initialParams={{
          meta: {
            presentation: 'card',
          },
        }}
        component={ActivateAccountTraineeNavigator}
      />
      <ActivatedUserNativeStack.Screen
        name={route.routeActivateAccountTrainerNavigator}
        initialParams={{
          meta: {
            presentation: 'card',
          },
        }}
        component={ActivateAccountTrainerNavigator}
      />
      <ActivatedUserNativeStack.Screen
        name={route.routeFirstLoginNavigator}
        initialParams={{
          meta: {
            presentation: 'card',
          },
        }}
        component={FirstLoginNavigator}
      />
    </ActivatedUserNativeStack.Navigator>
  );
};
