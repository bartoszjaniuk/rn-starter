import * as React from 'react';

import { LoadingScreen } from 'src/core/components/LoadingScreen';
import { goTo } from 'src/navigation';
import { Screen, useNavigator } from 'src/screen';
import { TryAgainError } from 'src/shared/components/TryAgainError/TryAgainError';

import * as route from '../../../../navigation/routes';
import { ActivityList } from '../../_internals/components/ActivityList';
import { StepLayout } from '../../_internals/components/StepLayout';
import { useTrainerSpecializations } from '../../_internals/hooks/useTrainerSpecializations';

const Content = () => {
  const trainerSpecializations = useTrainerSpecializations();
  const { updateNavigationData } = useNavigator();
  const [error, setError] = React.useState('');

  const onActivityPress = React.useCallback(
    (activityId: number) => {
      const updatedActivities = trainerSpecializations.specializations.map((specialization) => {
        if (specialization.value === activityId) {
          return { ...specialization, isSelected: !specialization.isSelected };
        }
        return specialization;
      });
      trainerSpecializations.setSpecializations(updatedActivities);
      setError('');
    },
    [trainerSpecializations],
  );

  const onSubmit = () => {
    const trainingsPreference = trainerSpecializations.specializations
      .filter((a) => !!a.isSelected)
      .map((a) => a.label);
    if (trainingsPreference.length <= 0) {
      return setError('Musisz zaznaczyć conajmniej jeden rodzaj treningu');
    }

    updateNavigationData({ specializations: trainingsPreference });
    goTo(route.toActivateAccountTraineePhotos);
  };

  if (trainerSpecializations.isPending) return <LoadingScreen />;

  if (trainerSpecializations.error)
    return (
      <Screen.Content>
        <TryAgainError onRefetch={trainerSpecializations.refetch} isLoading={trainerSpecializations.isPending} />
      </Screen.Content>
    );

  return (
    <StepLayout variant="Target" buttonLabel="Dalej" shouldShowError={false} handleButtonClick={onSubmit}>
      <ActivityList activities={trainerSpecializations.specializations} onPress={onActivityPress} error={error} />
    </StepLayout>
  );
};

export const ActivateAccountTraineeTarget = () => {
  return (
    <Screen.Navigator.Item>
      <Content />
    </Screen.Navigator.Item>
  );
};
