import * as React from 'react';

import { goTo } from 'src/navigation';
import { Screen } from 'src/screen';

import { ActivityList } from './components/ActivityList';

import * as route from '../../../../navigation/routes';
import { StepLayout } from '../../_internals/components';

const Content = () => {
  const handleNextPress = () => {
    goTo(route.toActivateAccountForTraineePhotos);
  };

  return (
    <StepLayout variant="Target" buttonLabel="Dalej" shouldShowError={false} handleButtonClick={handleNextPress}>
      <ActivityList />
    </StepLayout>
  );
};

export const ActivateAccountForTraineeTarget = () => {
  return (
    <Screen.Navigator.Item>
      <Content />
    </Screen.Navigator.Item>
  );
};
