import * as React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { FirstLoginNavigator } from 'src/firstLogin/navigation/navigators';

const NativeStack = createNativeStackNavigator();

export const AuthorizedNavigator = () => {
  const [isFirstLogin, setIsFirstLogin] = React.useState(true);
  return (
    <NativeStack.Navigator>
      {isFirstLogin ? (
        <NativeStack.Screen
          name="FirstLoginNavigator"
          component={FirstLoginNavigator}
          options={{
            headerShown: false,
            animationTypeForReplace: 'pop',
            animation: 'fade',
          }}
        />
      ) : (
        <NativeStack.Screen
          name="FirstLoginNavigator"
          component={FirstLoginNavigator}
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
