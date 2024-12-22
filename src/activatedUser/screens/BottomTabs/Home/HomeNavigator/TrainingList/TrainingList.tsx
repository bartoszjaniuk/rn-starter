import * as React from 'react';

import { useGetUserInfoQuery } from 'src/api/user/hooks';
import { LoadingScreen } from 'src/core/components/LoadingScreen';
import { Screen } from 'src/screen';

import { Layout } from './components/Layout';
import { TraineeContent } from './components/TraineeContent';

import { NoSchedules } from '../../components/NoSchedules';

const TrainerContent = () => {
  return <Layout noSchedulesComponent={<NoSchedules />} type="trainer" />;
};

const Content = () => {
  const userInfoQuery = useGetUserInfoQuery();

  if (userInfoQuery.isLoading) return <LoadingScreen />;

  return userInfoQuery.data?.role === 'trainee' ? <TraineeContent /> : <TrainerContent />;
};

export const HomeTrainingList = () => {
  return (
    <Screen.Navigator.Item>
      <Content />
    </Screen.Navigator.Item>
  );
};
