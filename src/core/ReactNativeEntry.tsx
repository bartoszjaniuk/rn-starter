/* eslint-disable react-native/no-inline-styles */
import { StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { AppProviders } from 'src/providers';

import './styles/unistyles';

export const ReactNativeEntry = () => {
  return (
    <GestureHandlerRootView style={styles.root}>
      <AppProviders>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text>Hello, mobile developer!</Text>
        </View>
      </AppProviders>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  root: {
    flexGrow: 1,
  },
});
