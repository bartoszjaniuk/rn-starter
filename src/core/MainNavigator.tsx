/* eslint-disable @typescript-eslint/no-require-imports */
import * as React from 'react';

import * as SplashScreen from 'expo-splash-screen';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AuthNavigator } from 'src/auth/navigation/navigators';
import { navigationRef } from 'src/navigation/navigation';
import { useAuth } from 'src/providers/AuthContext';
import { Text } from 'src/shared';

import { LoadingScreen } from './components/LoadingScreen';
import { AppRootNavigator } from './navigation/navigators';

const NativeStack = createNativeStackNavigator();

SplashScreen.preventAutoHideAsync();

const App = () => {
  const auth = useAuth();
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

  // if (auth.isLoading) return <LoadingScreen />;

  return (
    <NativeStack.Navigator>
      {auth.session ? (
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
    routeNameRef.current = navigationRef.current?.getCurrentRoute()?.name ?? '';
  }, []);

  const linking = {
    prefixes: ['https://fitapka.netlify.app', 'fitapka://'], // Add your domain and scheme
    config: {
      screens: {
        ActivateAccount: {
          path: 'activate-account', // Matches the path in the URL
          parse: {
            token: (token: string) => `${token}`,
            email: (email: string) => `${email}`,
          },
        },
      },
    },
  };

  return (
    <NavigationContainer
      linking={linking}
      ref={navigationRef}
      fallback={<Text>This is fallback</Text>}
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
