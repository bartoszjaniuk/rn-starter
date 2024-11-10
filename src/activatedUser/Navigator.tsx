import * as React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useGetUserInfoQuery } from 'src/api/user/hooks';

const NativeStack = createNativeStackNavigator();

export const UserWithRoleNavigator = () => {
  const { data } = useGetUserInfoQuery();
  const isTrainee = data?.role === 'trainee';

  return (
    <NativeStack.Navigator>
      {isTrainee ? (
        <NativeStack.Screen
          name="TraineeNavigator"
          component={TraineeNavigator}
          options={{
            headerShown: false,
            animationTypeForReplace: 'pop',
            animation: 'fade',
          }}
        />
      ) : (
        <NativeStack.Screen
          name="TrainerNavigator"
          component={TrainerNavigator}
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
