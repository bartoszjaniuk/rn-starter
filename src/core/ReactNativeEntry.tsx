/* eslint-disable react-native/no-inline-styles */
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { enableFreeze } from 'react-native-screens';

import { preventAutoHideAsync } from 'expo-splash-screen';

import { AppProviders } from 'src/providers';

import { MainNavigator } from './MainNavigator';
import './styles/unistyles';

preventAutoHideAsync();
enableFreeze(true);

export const ReactNativeEntry = () => {
  return (
    <GestureHandlerRootView style={styles.root}>
      <AppProviders>
        <MainNavigator />
      </AppProviders>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  root: {
    flexGrow: 1,
  },
});
