import * as React from 'react';

import { Screen } from 'src/screen';
import { useAuthStore } from 'src/store/auth';

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
  const auth = useAuthStore();

  const isTrainee = auth.user?.role === 'trainee';

  return (
    <Screen
      HeaderComponent={isTrainee ? <TraineeHeader /> : <TrainerHeader trainerId={auth.user?.trainerId} />}
      statusBarStyle="light"
    >
      {isTrainee ? <TraineeContent /> : <TrainerContent />}
    </Screen>
  );
};
