import * as React from 'react';

import { HomeNavigator } from 'src/activatedUser/navigation';
import { useGetUserInfoQuery } from 'src/api/user/hooks';
import { LoadingScreen } from 'src/core/components/LoadingScreen';
import { Screen } from 'src/screen';

export type HomeParams = {
  trainingId: string;
};

export const BottomTabsHome = () => {
  const userInfoQuery = useGetUserInfoQuery();

  const data = React.useMemo(
    () => ({
      trainingId: '1',
    }),
    [],
  );
  if (userInfoQuery.isLoading) return <LoadingScreen />;

  return <Screen.Navigator as={HomeNavigator} data={data} />;
};
