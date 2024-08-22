/* eslint-disable @typescript-eslint/no-require-imports */
import * as React from 'react';
import { View } from 'react-native';

import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

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
          component={AppRootNavigator}
          // component={AuthNavigator}
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
      <FontLoader>
        <App />
      </FontLoader>
    </NavigationContainer>
  );
};

const FontLoader = ({ children }: React.PropsWithChildren) => {
  const [loaded, error] = useFonts({
    satoshiLight: require('../../assets/fonts/Satoshi-Light.otf'),
    satoshiLightItalic: require('../../assets/fonts/Satoshi-LightItalic.otf'),
    satoshiRegular: require('../../assets/fonts/Satoshi-Regular.otf'),
    satoshiItalic: require('../../assets/fonts/Satoshi-Italic.otf'),
    satoshiMedium: require('../../assets/fonts/Satoshi-Medium.otf'),
    satoshiMediumItalic: require('../../assets/fonts/Satoshi-MediumItalic.otf'),
    satoshiBold: require('../../assets/fonts/Satoshi-Bold.otf'),
    satoshiBoldItalic: require('../../assets/fonts/Satoshi-BoldItalic.otf'),
    satoshiBlack: require('../../assets/fonts/Satoshi-Black.otf'),
    satoshiBlackItalic: require('../../assets/fonts/Satoshi-BlackItalic.otf'),
  });

  React.useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  // eslint-disable-next-line react-native/no-inline-styles
  <View style={{ flex: 1 }}>{children}</View>;
};
