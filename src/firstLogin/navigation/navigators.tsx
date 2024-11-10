/* eslint-disable @typescript-eslint/no-unsafe-assignment */

/* eslint-disable @typescript-eslint/no-unsafe-return */

/* eslint-disable @typescript-eslint/no-var-requires */
// CAUTION: this file is automatically generated, do not edit it.
import * as React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import * as route from './routes';

import { FirstLoginChooseRole } from '../screens/ChooseRole';
import { FirstLoginTrainee } from '../screens/Trainee';
import { FirstLoginTrainer } from '../screens/Trainer';

type Params = {
  params: Record<string, unknown>;
};

const FirstLoginNativeStack = createNativeStackNavigator();
const ActivateAccountForTraineeNativeStack = createNativeStackNavigator();
const ActivateAccountForTrainerNativeStack = createNativeStackNavigator();

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

export const ActivateAccountForTraineeNavigator = (props: Params) => {
  const { params } = props;

  return (
    <ActivateAccountForTraineeNativeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <ActivateAccountForTraineeNativeStack.Screen
        name={route.routeActivateAccountForTraineeProfile}
        initialParams={{
          ...params,

          meta: {
            presentation: 'card',
          },
        }}
        getComponent={() =>
          require('../screens/ActivateAccount/ActivateAccountForTraineeNavigator/Profile')
            .ActivateAccountForTraineeProfile
        }
      />
      <ActivateAccountForTraineeNativeStack.Screen
        name={route.routeActivateAccountForTraineeTarget}
        initialParams={{
          meta: {
            presentation: 'card',
          },
        }}
        getComponent={() =>
          require('../screens/ActivateAccount/ActivateAccountForTraineeNavigator/Target')
            .ActivateAccountForTraineeTarget
        }
      />
      <ActivateAccountForTraineeNativeStack.Screen
        name={route.routeActivateAccountForTraineePhotos}
        initialParams={{
          meta: {
            presentation: 'card',
          },
        }}
        getComponent={() =>
          require('../screens/ActivateAccount/ActivateAccountForTraineeNavigator/Photos')
            .ActivateAccountForTraineePhotos
        }
      />
    </ActivateAccountForTraineeNativeStack.Navigator>
  );
};

export const ActivateAccountForTrainerNavigator = (props: Params) => {
  const { params } = props;

  return (
    <ActivateAccountForTrainerNativeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <ActivateAccountForTrainerNativeStack.Screen
        name={route.routeActivateAccountForTrainerProfile}
        initialParams={{
          ...params,

          meta: {
            presentation: 'card',
          },
        }}
        getComponent={() =>
          require('../screens/ActivateAccount/ActivateAccountForTrainerNavigator/Profile')
            .ActivateAccountForTrainerProfile
        }
      />
      <ActivateAccountForTrainerNativeStack.Screen
        name={route.routeActivateAccountForTrainerContact}
        initialParams={{
          meta: {
            presentation: 'card',
          },
        }}
        getComponent={() =>
          require('../screens/ActivateAccount/ActivateAccountForTrainerNavigator/Contact')
            .ActivateAccountForTrainerContact
        }
      />
      <ActivateAccountForTrainerNativeStack.Screen
        name={route.routeActivateAccountForTrainerOffer}
        initialParams={{
          meta: {
            presentation: 'card',
          },
        }}
        getComponent={() =>
          require('../screens/ActivateAccount/ActivateAccountForTrainerNavigator/Offer').ActivateAccountForTrainerOffer
        }
      />
      <ActivateAccountForTrainerNativeStack.Screen
        name={route.routeActivateAccountForTrainerPhotos}
        initialParams={{
          meta: {
            presentation: 'card',
          },
        }}
        getComponent={() =>
          require('../screens/ActivateAccount/ActivateAccountForTrainerNavigator/Photos')
            .ActivateAccountForTrainerPhotos
        }
      />
    </ActivateAccountForTrainerNativeStack.Navigator>
  );
};