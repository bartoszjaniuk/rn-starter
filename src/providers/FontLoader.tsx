/* eslint-disable react-native/no-inline-styles */

/* eslint-disable @typescript-eslint/no-require-imports */
import * as React from 'react';
import { View } from 'react-native';

import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

export const FontLoader = ({ children }: React.PropsWithChildren) => {
  const [areFontsLoaded] = useFonts({
    300: require('../../assets/fonts/Satoshi-Light.otf'),
    '300_italic': require('../../assets/fonts/Satoshi-LightItalic.otf'),
    400: require('../../assets/fonts/Satoshi-Regular.otf'),
    '400_italic': require('../../assets/fonts/Satoshi-Italic.otf'),
    500: require('../../assets/fonts/Satoshi-Medium.otf'),
    '500_italic': require('../../assets/fonts/Satoshi-MediumItalic.otf'),
    700: require('../../assets/fonts/Satoshi-Bold.otf'),
    '700_italic': require('../../assets/fonts/Satoshi-BoldItalic.otf'),
    900: require('../../assets/fonts/Satoshi-Black.otf'),
    '900_italic': require('../../assets/fonts/Satoshi-BlackItalic.otf'),
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

export const typographyKeys = [
  '300',
  '300_italic',
  '400',
  '400_italic',
  '500',
  '500_italic',
  '700',
  '700_italic',
  '900',
  '900_italic',
] as const;

export type TypographyKey = (typeof typographyKeys)[number];
