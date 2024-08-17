import * as React from 'react';
import { BackHandler } from 'react-native';

import { NavigationProp, useNavigation } from '@react-navigation/native';

import { useFocusEffect } from './useFocusEffect';

const toggleGestureRec = (isEnabled: boolean, parent?: NavigationProp<Record<string, unknown>>) => {
  if (parent) {
    parent.setOptions({ gestureEnabled: isEnabled });
    toggleGestureRec(isEnabled, parent.getParent());
  }
};

export const usePreventBack = (isEnabled = true) => {
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      if (isEnabled) {
        return;
      }

      navigation.setOptions({
        gestureEnabled: false,
      });

      toggleGestureRec(false, navigation.getParent());

      const hardwareBackPressHandler = BackHandler.addEventListener('hardwareBackPress', () => {
        return true;
      });

      return () => {
        toggleGestureRec(true, navigation.getParent());

        navigation.setOptions({
          gestureEnabled: true,
        });
        hardwareBackPressHandler.remove();
      };
    }, [isEnabled, navigation]),
  );
};
