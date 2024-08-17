import { ColorValue, Platform } from 'react-native';

import * as NavigationBar from 'expo-navigation-bar';

import { colord } from 'colord';

export const setNavigationBarBackgroundColor = (backgroundColor: ColorValue) => {
  if (Platform.OS !== 'android') return;

  try {
    const isDark = colord(backgroundColor as string).isDark();
    NavigationBar.setButtonStyleAsync(isDark ? 'light' : 'dark');
    return NavigationBar.setBackgroundColorAsync(backgroundColor);
  } catch {
    console.log('setNavigationBarBackgroundColor error');
  }
};
