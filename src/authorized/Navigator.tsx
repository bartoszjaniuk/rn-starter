import * as React from 'react';
import { View } from 'react-native';

import * as SplashScreen from 'expo-splash-screen';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ActivatedUserNavigator, FirstLoginNavigator } from 'src/activatedUser/navigation';
import { useGetUserInfoQuery } from 'src/api/user/hooks';
import { LoadingScreen } from 'src/core/components/LoadingScreen';
import { useAuth } from 'src/providers/AuthContext';
import { Screen } from 'src/screen';
import { Text } from 'src/shared';

const NativeStack = createNativeStackNavigator();

export const FooComponent = () => {
  return (
    <View style={{ backgroundColor: 'purple', borderWidth: 1, borderColor: 'purple', padding: 8, flex: 1 }}>
      <Text>Foo</Text>
    </View>
  );
};

export const AuthorizedNavigator = () => {
  const userInfoQuery = useGetUserInfoQuery();
  const auth = useAuth();

  React.useEffect(() => {
    if (userInfoQuery.error?.status === 409) {
      auth.resetExpiredToken();
    }
  }, [auth, userInfoQuery.error?.status]);

  const isFirstLogin = userInfoQuery.data?.role === 'role_not_set';

  // if (userInfoQuery.isLoading) return <LoadingScreen />;

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
