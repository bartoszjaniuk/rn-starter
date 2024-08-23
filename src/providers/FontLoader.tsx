/* eslint-disable react-native/no-inline-styles */

/* eslint-disable @typescript-eslint/no-require-imports */
import * as React from 'react';
import { View } from 'react-native';

import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

export const FontLoader = ({ children }: React.PropsWithChildren) => {
  const [areFontsLoaded] = useFonts({
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

  const onLayoutRootView = React.useCallback(async () => {
    if (areFontsLoaded) return await SplashScreen.hideAsync();
  }, [areFontsLoaded]);

  if (!areFontsLoaded) return null;

  return (
    <View onLayout={onLayoutRootView} style={{ flex: 1 }}>
      {children}
    </View>
  );
};
