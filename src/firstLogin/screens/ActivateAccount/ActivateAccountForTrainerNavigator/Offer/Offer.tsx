import * as React from 'react';

import { LoadingScreen } from 'src/core/components/LoadingScreen';
import { goTo } from 'src/navigation';
import { Screen, useNavigator } from 'src/screen';

import * as route from '../../../../navigation/routes';
import { ActivityList, StepLayout } from '../../_internals/components';
import { useTrainerSpecializations } from '../../_internals/hooks';

const Content = () => {
  const { specializations, isLoading, setSpecializations } = useTrainerSpecializations();
  const { updateNavigationData } = useNavigator();
  const [error, setError] = React.useState('');

  const onActivityPress = React.useCallback(
    (activityId: number) => {
      const updatedActivities = specializations.map((specialization) => {
        if (specialization.value === activityId) {
          return { ...specialization, isSelected: !specialization.isSelected };
        }
        return specialization;
      });
      setSpecializations(updatedActivities);
      setError('');
    },
    [setSpecializations, specializations],
  );

  const onSubmit = () => {
    const trainingsPreference = specializations.filter((a) => !!a.isSelected).map((a) => a.label);
    if (trainingsPreference.length <= 0) {
      return setError('Musisz zaznaczyć conajmniej jeden rodzaj treningu');
    }

    updateNavigationData({ trainingsPreference });
    goTo(route.toActivateAccountForTraineePhotos);
  };

  if (isLoading) return <LoadingScreen />;

  return (
    <StepLayout variant="Offer" buttonLabel="Dalej" shouldShowError={false} handleButtonClick={onSubmit}>
      <ActivityList activities={specializations} onPress={onActivityPress} error={error} />
    </StepLayout>
  );
};

export const ActivateAccountForTrainerOffer = () => {
  return (
    <Screen.Navigator.Item>
      <Content />
    </Screen.Navigator.Item>
  );
};
