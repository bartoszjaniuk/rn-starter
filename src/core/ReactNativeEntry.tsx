/* eslint-disable react-native/no-inline-styles */
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { AppProviders } from 'src/providers';

import { MainNavigator } from './MainNavigator';
import './styles/unistyles';

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
