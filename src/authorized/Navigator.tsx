import * as React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ActivatedUserNavigator, FirstLoginNavigator } from 'src/activatedUser/navigation';
import { useGetUserInfoQuery } from 'src/api/user/hooks';
import { LoadingScreen } from 'src/core/components/LoadingScreen';

const NativeStack = createNativeStackNavigator();

export const AuthorizedNavigator = () => {
  const userInfoQuery = useGetUserInfoQuery();
  const isFirstLogin = userInfoQuery.data?.role === 'role_not_set';

  if (userInfoQuery.isLoading) return <LoadingScreen />;

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
