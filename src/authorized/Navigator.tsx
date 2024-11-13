import * as React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ActivatedUserNavigator, FirstLoginNavigator } from 'src/activatedUser/navigation';
import { useGetUserInfoQuery } from 'src/api/user/hooks';

const NativeStack = createNativeStackNavigator();

export const AuthorizedNavigator = () => {
  const { data } = useGetUserInfoQuery();
  const isFirstLogin = data?.role === 'role_not_set';
  console.log('🧠 isFirstLogin: ', isFirstLogin);
  return (
    <NativeStack.Navigator>
      {isFirstLogin ? (
        <NativeStack.Screen
          name="FirstLogin"
          component={FirstLoginNavigator}
          options={{
            headerShown: false,
            animationTypeForReplace: 'pop',
            animation: 'fade',
          }}
        />
      ) : (
        <NativeStack.Screen
          name="ActivatedUserNavigator"
          component={ActivatedUserNavigator}
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
