import * as React from 'react';

import { useGetUserInfoQuery } from 'src/api/user/hooks';
import { LoadingScreen } from 'src/core/components/LoadingScreen';
import { Screen } from 'src/screen';

import { Layout } from './components/Layout';
import { TraineeHeader } from './components/TraineeHeader';
import { TrainerHeader } from './components/TrainerHeader';

import { NoSchedules } from '../../components/NoSchedules';

const TrainerContent = () => {
  return <Layout noSchedulesComponent={<NoSchedules />} type="trainer" />;
};

const TraineeContent = () => {
  return (
    <Layout
      noSchedulesComponent={
        <NoSchedules
          paragraph1="Wyszukaj trenera i umów się na trening"
          paragraph2="umówiony termin pojawi się na tym ekranie"
        />
      }
      type="trainee"
    />
  );
};

export const HomeTrainingList = () => {
  const userInfoQuery = useGetUserInfoQuery();

  const isTrainee = userInfoQuery.data?.role === 'trainee';

  if (userInfoQuery.isLoading) return <LoadingScreen />;
  return (
    <Screen
      HeaderComponent={isTrainee ? <TraineeHeader /> : <TrainerHeader trainerId={userInfoQuery.data?.trainerId} />}
      statusBarStyle="light"
    >
      {isTrainee ? <TraineeContent /> : <TrainerContent />}
    </Screen>
  );
};
