/* eslint-disable @typescript-eslint/no-require-imports */
import * as React from 'react';

import * as SplashScreen from 'expo-splash-screen';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AuthNavigator } from 'src/auth/navigation/navigators';
import { navigationRef } from 'src/navigation/navigation';

import { AppRootNavigator } from './navigation/navigators';

const NativeStack = createNativeStackNavigator();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  //   Wave.useSubscription(services.device.isInternetReachable(), (isInternetReachable) => {
  //     if (!isInternetReachable) {
  //       toast.show({
  //         variant: 'internet',
  //         title: t('WELCOME.NO_INTERNET_CONNETION.TITLE'),
  //         position: 'top',
  //         autoHide: false,
  //       });
  //       return;
  //     }
  //     toast.hide();
  //   });

  return (
    <NativeStack.Navigator>
      {isLoggedIn ? (
        <NativeStack.Screen
          name="AppRootNavigator"
          component={AppRootNavigator}
          options={{
            headerShown: false,
            animationTypeForReplace: 'pop',
            animation: 'fade',
          }}
        />
      ) : (
        <NativeStack.Screen
          name="AuthNavigator"
          component={AuthNavigator}
          options={{
            headerShown: false,
            animationTypeForReplace: 'push',
            animation: 'fade_from_bottom',
          }}
        />
      )}
    </NativeStack.Navigator>
  );
};

export const MainNavigator = () => {
  const routeNameRef = React.useRef('');

  const handleReady = React.useCallback(() => {
    SplashScreen.hideAsync();
    // routingInstrumentation.registerNavigationContainer(navigationRef);
    routeNameRef.current = navigationRef.current?.getCurrentRoute()?.name ?? '';
  }, []);

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={handleReady}
      onStateChange={() => {
        const currentRouteName = navigationRef.current?.getCurrentRoute()?.name;
        routeNameRef.current = currentRouteName ?? '';
      }}
    >
      <App />
    </NavigationContainer>
  );
};
