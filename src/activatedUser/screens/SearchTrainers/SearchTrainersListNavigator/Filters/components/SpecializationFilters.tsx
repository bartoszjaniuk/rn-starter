import * as React from 'react';

import { Stack } from '@grapp/stacks';

import { ActivityList } from 'src/activatedUser/screens/ActivateAccount/_internals/components/ActivityList';
import { Specialization } from 'src/activatedUser/screens/ActivateAccount/_internals/models/specialization';
import { ActivityIndicator, Text } from 'src/shared';

import { useTrainerSpecializationsFilters } from '../hooks/useTrainerSpecializationsFilters';

type Props = {
  defaultValue?: string;
  onSelectSpecialization: (specialization: string) => void;
};

const filterSelected = (arr: Specialization[]) => arr.filter((a) => a.isSelected).map((a) => a.label);

export const SpecializationFilters = (props: Props) => {
  const { defaultValue, onSelectSpecialization } = props;
  const { specializations, isLoading, setSpecializations } = useTrainerSpecializationsFilters(
    React.useMemo(() => defaultValue?.split(','), [defaultValue]),
  );
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
      const data = filterSelected(updatedActivities).join(',');
      onSelectSpecialization(data);
      setError('');
    },
    [onSelectSpecialization, setSpecializations, specializations],
  );

  if (isLoading) return <ActivityIndicator />;

  return (
    <Stack space={4}>
      <Text fontWeight="700" size="sm">
        Znajdź trening:
      </Text>
      <ActivityList activities={specializations} onPress={onActivityPress} error={error} />
    </Stack>
  );
};
