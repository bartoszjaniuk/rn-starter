/* eslint-disable @typescript-eslint/no-unsafe-assignment */

/* eslint-disable @typescript-eslint/no-unsafe-return */

/* eslint-disable @typescript-eslint/no-var-requires */
// CAUTION: this file is automatically generated, do not edit it.
import * as React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AuthorizedNavigator } from 'src/authorized';

import * as route from './routes';

const RootNativeStack = createNativeStackNavigator();
const AppRootNativeStack = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <RootNativeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <RootNativeStack.Screen
        name={route.routeRootAuthorizedNavigator}
        initialParams={{
          meta: {
            presentation: 'card',
          },
        }}
        component={AuthorizedNavigator}
      />
    </RootNativeStack.Navigator>
  );
};

export const AppRootNavigator = () => {
  return (
    <AppRootNativeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <AppRootNativeStack.Screen
        name={route.routeRootNavigator}
        initialParams={{
          meta: {
            presentation: 'card',
          },
        }}
        component={RootNavigator}
      />
    </AppRootNativeStack.Navigator>
  );
};
