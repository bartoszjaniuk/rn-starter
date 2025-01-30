import * as React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ActivatedUserNavigator, FirstLoginNavigator } from 'src/activatedUser/navigation';
import { useGetUserInfoQuery } from 'src/api/user/hooks';
import { useAuth } from 'src/providers/AuthContext';

const NativeStack = createNativeStackNavigator();

export const AuthorizedNavigator = () => {
  const auth = useAuth();

  // React.useEffect(() => {
  //   if (userInfoQuery.error?.status === 409) {
  //     auth.resetExpiredToken();
  //   }
  // }, [auth, userInfoQuery.error?.status]);

  const isFirstLogin = auth.user?.role === 'role_not_set';

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
